import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SolucaoProposta } from '../entities/solucaoproposta.entity';

@Injectable()
export class SolucaoPropostaRepository extends Repository<SolucaoProposta> {
  constructor(private dataSource: DataSource) {
    super(SolucaoProposta, dataSource.createEntityManager());
  }
}