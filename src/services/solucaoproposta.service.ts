import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolucaoProposta } from '../entities/solucaoproposta.entity';
import { Chamado } from '../entities/chamado.entity';
import { Usuario } from '../entities/usuario.entity';

interface CreateSolucaoDto {
  descricao: string;
  chamadoId: number;
  usuarioId: number;
}

@Injectable()
export class SolucaoPropostaService {
  constructor(
    @InjectRepository(SolucaoProposta)
    private solucaoRepository: Repository<SolucaoProposta>,

    @InjectRepository(Chamado)
    private chamadoRepository: Repository<Chamado>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dados: CreateSolucaoDto): Promise<SolucaoProposta> {
    const chamado = await this.chamadoRepository.findOneBy({
      id: dados.chamadoId,
    });
    if (!chamado) throw new NotFoundException('Chamado não encontrado');

    if (chamado.status === 'Fechado') {
      const usuario = await this.usuarioRepository.findOne({
        where: { id: dados.usuarioId },
        relations: ['tipoUsuario'],
      });

      if (usuario?.tipoUsuario?.id !== 3) {
        throw new ForbiddenException(
          'Este chamado está fechado. Apenas administradores podem enviar novas respostas.',
        );
      }
    }

    const novaSolucao = this.solucaoRepository.create({
      descricao: dados.descricao,
      chamado: { id: dados.chamadoId },
      usuario: { id: dados.usuarioId },
    });

    return this.solucaoRepository.save(novaSolucao);
  }

  async findAllByChamado(chamadoId: number): Promise<SolucaoProposta[]> {
    return this.solucaoRepository.find({
      where: { chamado: { id: chamadoId } },
      relations: ['usuario'],
      order: { data: 'ASC' },
    });
  }
}
