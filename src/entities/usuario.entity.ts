/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TipoUsuario } from './tipousuario.entity';
import { UsuarioChamado } from './usuariochamado.entity';
import { SolucaoProposta } from './solucaoproposta.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @ManyToOne(() => TipoUsuario, { eager: true })
  @JoinColumn({ name: 'tipo_usuario_id' })
  tipoUsuario: TipoUsuario;

  @ManyToOne(() => Categoria, { eager: true, nullable: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
  
  @OneToMany(() => UsuarioChamado, uc => uc.usuario)
  usuarioChamados: UsuarioChamado[];

  @OneToMany(() => SolucaoProposta, sp => sp.usuario)
  solucaoPropostas: SolucaoProposta[];
}