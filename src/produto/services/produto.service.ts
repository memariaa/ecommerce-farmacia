import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) {}

    // Métodos de busca
    async buscarTodos(): Promise<Produto[]> {
        return this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });
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
        return produto;
    }

    async buscarPorNome(nome:string): Promise<Produto[]>{
        return this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        });
    }

    // Métodos de cadastro, atualização e exclusão
    async cadastrar(produto: Produto): Promise<Produto>{
        return await this.produtoRepository.save(produto);
    }

    async atualizar(produto: Produto): Promise<Produto>{

        if(!produto.id || produto.id <= 0){
            throw new HttpException("O ID do produto é inválido!", HttpStatus.BAD_REQUEST);
        }
        await this.buscarPorId(produto.id);
        return this.produtoRepository.save(produto);
    }

    async deletar(id:number): Promise<void>{
        await this.buscarPorId(id);
        await this.produtoRepository.delete(id);
    }
}