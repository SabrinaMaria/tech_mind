import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioChamado } from '../entities/usuariochamado.entity';
import { UsuarioChamadoService } from '../services/usuariochamado.service';
import { UsuarioChamadoController } from '../controllers/usuariochamado.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioChamado])],
  controllers: [UsuarioChamadoController],
  providers: [UsuarioChamadoService],
  exports: [UsuarioChamadoService],
})
export class UsuarioChamadoModule {}