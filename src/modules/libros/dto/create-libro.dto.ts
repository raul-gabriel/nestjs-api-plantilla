import { noVacio,maximo } from "src/common/validaciones.dto";

export class CreateLibroDto {
    @noVacio('titulo')
    @maximo(20, 'titulo')
    titulo: string;

    @noVacio('editorial')
    @maximo(50, 'editorial')
    editorial: string;

    @noVacio('autor')
    @maximo(50, 'autor')
    autor: string;
}
