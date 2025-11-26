import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolucaoPropostaService } from '../services/solucaoproposta.service';
import { SolucaoPropostaController } from '../controllers/solucaoproposta.controller';
import { SolucaoProposta } from '../entities/solucaoproposta.entity';
import { Chamado } from '../entities/chamado.entity';
import { Usuario } from '../entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolucaoProposta, Chamado, Usuario])],
  controllers: [SolucaoPropostaController],
  providers: [SolucaoPropostaService],
})
export class SolucaoPropostaModule {}
