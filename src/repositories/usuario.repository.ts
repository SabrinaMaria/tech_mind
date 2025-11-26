import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioRepository extends Repository<Usuario> {
  constructor(private dataSource: DataSource) {
    super(Usuario, dataSource.createEntityManager());
  }

  async criar(usuario: Usuario): Promise<Usuario | null> {
    const sql = 'SELECT * FROM usuario WHERE email = $1';
    const result = await this.dataSource.query(sql, [usuario]);
    return result[0] || null;
  }
}