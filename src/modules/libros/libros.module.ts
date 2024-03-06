import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';

@Module({
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
