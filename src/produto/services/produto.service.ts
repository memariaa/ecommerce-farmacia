import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ILike, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) {}

    // extras - método para calcular o status do estoque com base na quantidade
    private statusEstoque(produto: Produto): void {
        if (produto.quantidade === 0) {
            produto.estoque = "Esgotado";
        } else if (produto.quantidade <= 5) {
            produto.estoque = "Ultimas unidades";
        } else {
            produto.estoque = "Disponível";
        }
    }

    // Métodos de busca
    async buscarTodos(): Promise<Produto[]> {
        const produtos = await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });

        produtos.forEach(produto => {
            this.statusEstoque(produto);
        });
        return produtos;
    }

    async buscarPorId(id:number): Promise<Produto>{
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }
        });
    
        if(!produto){
            throw new  HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }
        this.statusEstoque(produto);
        return produto;
    }

    async buscarPorNome(nome:string): Promise<Produto[]>{
        const produtos = await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
       });

        produtos.forEach(produto => {
            this.statusEstoque(produto);
        });
        return produtos;
    }

    //extras - método de busca por disponibilidade e indisponibilidade do estoque
    async buscarDisponiveis(): Promise<Produto[]> {
        const produtos = await this.produtoRepository.find({
            where: {
                quantidade: MoreThan(0)
            },
            relations: {
                categoria: true
            }
        });

        produtos.forEach(produto => {
            this.statusEstoque(produto);
        });
        return produtos;
    }

    async buscarIndisponiveis(): Promise<Produto[]> {
        const produtos = await this.produtoRepository.find({
            where: {
                quantidade: 0
            },
            relations: {
                categoria: true
            }
        });

        produtos.forEach(produto => {
            this.statusEstoque(produto);
        });
        return produtos;
    }

    // Métodos de cadastro, atualização e exclusão
    async cadastrar(produto: Produto): Promise<Produto>{
        const novoProduto = await this.produtoRepository.save(produto);
        this.statusEstoque(novoProduto);
        return novoProduto;
    }

    async atualizar(produto: Produto): Promise<Produto>{

        if(!produto.id || produto.id <= 0){
            throw new HttpException("O ID do produto é inválido!", HttpStatus.BAD_REQUEST);
        }
        await this.buscarPorId(produto.id);
        const produtoAtualizado = await this.produtoRepository.save(produto);
        this.statusEstoque(produtoAtualizado);
        return produtoAtualizado;
    }

    async deletar(id:number): Promise<void>{
        await this.buscarPorId(id);
        await this.produtoRepository.delete(id);
    }
}