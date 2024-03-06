import { applyDecorators } from "@nestjs/common";
import { IsNotEmpty, MaxLength } from "class-validator";

export function noVacio(campo: string) {
    return applyDecorators(
        IsNotEmpty({ message: `El campo ${campo} no debe estar vacío` }),
    );
}

export function maximo(limite: number, campo: string) {
    return applyDecorators(
        MaxLength(limite, { message: `El campo ${campo} no debe superar los ${limite} caracteres` })
    );
}
