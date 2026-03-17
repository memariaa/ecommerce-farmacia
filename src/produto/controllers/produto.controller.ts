import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";

@Controller('/produtos')
export class ProdutoController {
    constructor(
        private readonly produtoService: ProdutoService
    ) {}

    @Get('/todos')
    @HttpCode(HttpStatus.OK)
    buscarTodos(): Promise<Produto[]>{
        return this.produtoService.buscarTodos();
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    buscarPorNome(@Param('nome') nome: string): Promise<Produto[]>{
        return this.produtoService.buscarPorNome(nome);
    }

    //extras - endpoints para buscar produtos disponíveis e indisponíveis
    @Get('/disponiveis')
    @HttpCode(HttpStatus.OK)
    buscarDisponiveis(): Promise<Produto[]> {
        return this.produtoService.buscarDisponiveis();
    }

    @Get('/indisponiveis')
    @HttpCode(HttpStatus.OK)
    buscarIndisponiveis(): Promise<Produto[]> {
        return this.produtoService.buscarIndisponiveis();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.buscarPorId(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    cadastrar(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.cadastrar(produto);
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    atualizar(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.atualizar(produto);
    }

    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletar(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.produtoService.deletar(id);
    }
}