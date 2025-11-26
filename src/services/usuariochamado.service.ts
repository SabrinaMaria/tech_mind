import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioChamado } from '../entities/usuariochamado.entity';

@Injectable()
export class UsuarioChamadoService {
  constructor(
    @InjectRepository(UsuarioChamado)
    private usuarioChamadoRepository: Repository<UsuarioChamado>,
  ) {}

  async create(usuarioChamado: UsuarioChamado): Promise<UsuarioChamado> {
    return this.usuarioChamadoRepository.save(usuarioChamado);
  }

  async remove(usuarioId: number, chamadoId: number): Promise<void> {
    const resultado = await this.usuarioChamadoRepository.delete({
      usuarioId,
      chamadoId,
    });
    if (resultado.affected === 0) {
      throw new NotFoundException(
        `Associação usuário ${usuarioId} e chamado ${chamadoId} não encontrada`,
      );
    }
  }

  async findOne(usuarioId: number, chamadoId: number): Promise<UsuarioChamado> {
    const registro = await this.usuarioChamadoRepository.findOneBy({
      usuarioId,
      chamadoId,
    });
    if (!registro) {
      throw new NotFoundException(
        `Associação usuário ${usuarioId} e chamado ${chamadoId} não encontrada`,
      );
    }
    return registro;
  }

  findAll(): Promise<UsuarioChamado[]> {
    return this.usuarioChamadoRepository.find();
  }
}
