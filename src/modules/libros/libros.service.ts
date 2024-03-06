import { Injectable } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class LibrosService {

  constructor(@InjectEntityManager() private entityManager: EntityManager) { }
  //http://localhost:3000/libros/

  //listar
  async findAll(): Promise<any> {
    return this.entityManager.query('SELECT * FROM libros');
  }

  //recuperar 
  findOne(id: number): Promise<any> {
    return this.entityManager.query('SELECT * FROM libros where id=?',[id]);
  }

  //crear 
  create(createLibroDto: CreateLibroDto): Promise<any> {
    return this.entityManager.query('CALL insertar_libro(?,?,?)', [createLibroDto.titulo, createLibroDto.editorial, createLibroDto.autor]);
  }

  
  //actualizar
  update(id: number, updateLibroDto: UpdateLibroDto): Promise<any> {
    return this.entityManager.query('CALL modificar_libro(?,?, ?,?)', [id, updateLibroDto.titulo, updateLibroDto.editorial, updateLibroDto.autor]);
  }

  //eliminar
  remove(id: number): Promise<any> {
    return this.entityManager.query('CALL eliminar_libro(?)', [id]);
  }

}
