/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { UsuarioChamado } from './usuariochamado.entity';
import { SolucaoProposta } from './solucaoproposta.entity';

@Entity()
export class Chamado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column()
  status: string;

  @ManyToOne(() => Categoria, { eager: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'timestamptz', name: 'data_abertura', default: () => 'CURRENT_TIMESTAMP' })
  dataAbertura: Date;

  @Column({ type: 'timestamptz', name: 'data_fechamento', nullable: true })
  dataFechamento: Date | null;
  
  @OneToMany(() => UsuarioChamado, usuarioChamado => usuarioChamado.chamado)
  usuarioChamados: UsuarioChamado[];

  @OneToMany(() => SolucaoProposta, solucao => solucao.chamado)
  solucaoPropostas: SolucaoProposta[];
}