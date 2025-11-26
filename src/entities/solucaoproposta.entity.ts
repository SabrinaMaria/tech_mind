/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Chamado } from './chamado.entity';
import { Usuario } from './usuario.entity';

@Entity('solucao_proposta')
export class SolucaoProposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @ManyToOne(() => Chamado, chamado => chamado.solucaoPropostas, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chamado_id' })
  chamado: Chamado;

  @ManyToOne(() => Usuario, usuario => usuario.solucaoPropostas, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}