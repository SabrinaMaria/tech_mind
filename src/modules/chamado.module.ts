import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChamadoService } from '../services/chamado.service';
import { ChamadoController } from '../controllers/chamado.controller';
import { Chamado } from '../entities/chamado.entity';
import { UsuarioChamado } from '../entities/usuariochamado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chamado, UsuarioChamado])],
  controllers: [ChamadoController],
  providers: [ChamadoService],
})
export class ChamadoModule {}
