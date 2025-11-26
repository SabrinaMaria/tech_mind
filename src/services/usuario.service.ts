import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async hasAdmin(): Promise<boolean> {
    const count = await this.usuarioRepository.count({
      where: { tipoUsuario: { id: 3 } },
    });
    return count > 0;
  }

  create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.usuarioRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    const resultado = await this.usuarioRepository.update(id, usuario);

    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    return this.findOne(id);
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['tipoUsuario', 'categoria'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return usuario;
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: ['tipoUsuario', 'categoria'],
    });
  }
}
