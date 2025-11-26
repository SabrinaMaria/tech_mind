import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Chamado } from '../entities/chamado.entity';

@Injectable()
export class ChamadoRepository extends Repository<Chamado> {
  constructor(private dataSource: DataSource) {
    super(Chamado, dataSource.createEntityManager());
  }
}