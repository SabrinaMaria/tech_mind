/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Chamado } from './chamado.entity';

@Entity('usuario_chamado')
export class UsuarioChamado {
  @PrimaryColumn({ name: 'usuario_id' })
  usuarioId: number;

  @PrimaryColumn({ name: 'chamado_id' })
  chamadoId: number;

  @ManyToOne(() => Usuario, usuario => usuario.usuarioChamados, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Chamado, chamado => chamado.usuarioChamados, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chamado_id' })
  chamado: Chamado;
}