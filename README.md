<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



# Instalacion y configuracion manual

Este repositorio contiene un proyecto NestJS que incluye configuración para variables de entorno, conexión con una base de datos MySQL, y la creación de un módulo completo para manejar libros. Sigue las instrucciones a continuación para configurar y ejecutar el proyecto.

1) Instalación de Módulos

```bash
$ npm install class-validator class-transformer --save
$ npm install @nestjs/config --save-dev
$ npm install @nestjs/typeorm typeorm mysql2
```
1. Crea copea los archivos y directorios `src/config` y `src/common` en la raíz de tu proyecto.
2. Configura las variables de entorno en un archivo `.env` en la raíz de tu proyecto.
3. Importa las configuraciones en `app.module.ts` de la siguiente manera:
   
```typescript
   
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
4. Configura el archivo main.ts para incluir validaciones y el puerto de escucha:

```typescript

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('config.port');

  //validacion
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Corriendo en el puerto: ${port}`);
}
bootstrap();
```
5. Creación de Módulos   
<p> Para agregar un nuevo módulo a tu aplicación, como un módulo para manejar libros, utiliza el siguiente comando CLI de NestJS: (rest api/yes)</p>
<p>ejemplo:</p>
  
```bash
nest g resource modules/libros --no-spec
```

6. cambiar id: String a id: number  (controlador)
7. implementar DTO (src/modules/libros/dto/create.libro.dto.ts) ejemplo:
   
```typescript
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
```
8. implementar los servicios ejemplo:
   
```typescript
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

```

# Instalacion y configuracion manual

## Correr la app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



