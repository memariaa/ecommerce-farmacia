import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, Length, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_produto'})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "É obrigatório escrever o nome do produto!" })
    @Length(5, 255, { message: "O nome do produto deve conter no mínimo 5 caracteres e no máximo 255 caracteres!" })
    @Column({length: 255, nullable: false})
    nome: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "É obrigatório escrever uma descrição para o produto!" })
    @Length(50, 500, { message: "A descrição do produto deve conter no mínimo 5 caracteres e no máximo 500 caracteres!" })
    @Column({length: 500, nullable: false})
    descricao: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @Column({length: 5000 })
    foto: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsPositive({message: 'O preço deve ser um valor positivo'})
    @IsNotEmpty({ message: "É obrigatório escrever o valor do produto!" })
    @Column({type: 'decimal', precision: 10, scale: 2 })
    preco: number;

}