import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chamado } from '../entities/chamado.entity';
import { UsuarioChamado } from '../entities/usuariochamado.entity';

interface CreateChamadoData {
  titulo: string;
  descricao: string;
  status: string;
  categoria: { id: number };
  usuarioId?: number;
}

@Injectable()
export class ChamadoService {
  constructor(
    @InjectRepository(Chamado)
    private chamadoRepository: Repository<Chamado>,

    @InjectRepository(UsuarioChamado)
    private usuarioChamadoRepository: Repository<UsuarioChamado>,
  ) {}

  async create(dados: CreateChamadoData): Promise<Chamado> {
    const novoChamado = await this.chamadoRepository.save({
      titulo: dados.titulo,
      descricao: dados.descricao,
      status: dados.status,
      categoria: dados.categoria,
    });

    if (dados.usuarioId) {
      const vinculo = new UsuarioChamado();
      vinculo.chamadoId = novoChamado.id;
      vinculo.usuarioId = Number(dados.usuarioId);

      await this.usuarioChamadoRepository.save(vinculo);
    }

    return novoChamado;
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.chamadoRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Chamado com id ${id} não encontrado`);
    }
  }

  async update(id: number, chamado: Partial<Chamado>): Promise<Chamado> {
    const resultado = await this.chamadoRepository.update(id, chamado);

    if (resultado.affected === 0) {
      throw new NotFoundException(`Chamado com id ${id} não encontrado`);
    }

    return this.findOne(id);
  }

  async findOne(id: number): Promise<Chamado> {
    const chamado = await this.chamadoRepository.findOne({
      where: { id },
      relations: ['categoria', 'usuarioChamados', 'usuarioChamados.usuario'],
    });

    if (!chamado) {
      throw new NotFoundException(`Chamado com id ${id} não encontrado`);
    }
    return chamado;
  }

  findAll(): Promise<Chamado[]> {
    return this.chamadoRepository.find({
      relations: ['categoria', 'usuarioChamados', 'usuarioChamados.usuario'],
    });
  }
}
