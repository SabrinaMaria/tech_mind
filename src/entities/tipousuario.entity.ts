/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('tipo_usuario')
export class TipoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  nome: 'solicitante' | 'atendente' | 'administrador';

  @OneToMany(() => Usuario, usuario => usuario.tipoUsuario)
  usuarios: Usuario[];
}
