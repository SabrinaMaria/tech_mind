/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chamado } from './chamado.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @OneToMany(() => Chamado, chamado => chamado.categoria)
  chamados: Chamado[];

  @OneToMany(() => Usuario, usuario => usuario.categoria)
  usuarios: Usuario[];
}