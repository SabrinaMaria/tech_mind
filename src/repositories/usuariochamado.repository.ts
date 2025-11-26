import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsuarioChamado } from '../entities/usuariochamado.entity';

@Injectable()
export class UsuarioChamadoRepository extends Repository<UsuarioChamado> {
  constructor(private dataSource: DataSource) {
    super(UsuarioChamado, dataSource.createEntityManager());
  }
}