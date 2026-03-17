import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";

@Controller('/categorias')
export class CategoriaController {
    constructor(
        private readonly categoriaService: CategoriaService
    ) {}

    @Get('/todos')
    @HttpCode(HttpStatus.OK)
    buscarTodos(): Promise<Categoria[]>{
        return this.categoriaService.buscarTodos();
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    buscarPorNome(@Param('nome') nome: string): Promise<Categoria[]>{
        return this.categoriaService.buscarPorNome(nome);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<Categoria>{
        return this.categoriaService.buscarPorId(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    cadastrar(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.cadastrar(categoria);
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    atualizar(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.atualizar(categoria);
    }

    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletar(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.categoriaService.deletar(id);
    }
}