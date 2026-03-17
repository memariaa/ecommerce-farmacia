import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({name: 'tb_categoria'})
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty({message: 'O campo nome é obrigatório'})
    @Column({length: 100, nullable: false, unique: true})
    nome: string;

    //uma categoria para muitos produtos
    @OneToMany(() => Produto, (produto) => produto.categoria) 
    produtos: Produto[];
}