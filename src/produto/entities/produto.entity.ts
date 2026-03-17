import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, Length, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_produto'})
export class Produto {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "É obrigatório escrever o nome do produto!" })
    @Length(5, 255, { message: "O nome do produto deve conter no mínimo 5 caracteres e no máximo 255 caracteres!" })
    @Column({length: 255, nullable: false})
    @ApiProperty()
    nome: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "É obrigatório escrever uma descrição para o produto!" })
    @Length(50, 500, { message: "A descrição do produto deve conter no mínimo 5 caracteres e no máximo 500 caracteres!" })
    @Column({length: 500, nullable: false})
    @ApiProperty()
    descricao: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @Column({length: 5000 })
    @ApiProperty()
    foto: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsPositive({message: 'O preço deve ser um valor positivo'})
    @IsNotEmpty({ message: "É obrigatório escrever o valor do produto!" })
    @Column({type: 'decimal', precision: 10, scale: 2 })
    @ApiProperty()
    preco: number;

    // extras - mostra a quantidade de produtos e o status do estoque (que é calculado dinamicamente na service de acordo com a quantidade)
    @Min(0, { message: 'O estoque não pode ter valor negativo' })
    @Column({default: 0})
    @ApiProperty()
    quantidade: number;

    // não é armazenado no banco, serve somente para o retorno
    @ApiProperty()
    estoque: string;

    //muitos produtos para uma categoria
    @ApiProperty({ type: () => Categoria })
    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, { 
        onDelete: "CASCADE" 
    })
    categoria: Categoria;

}