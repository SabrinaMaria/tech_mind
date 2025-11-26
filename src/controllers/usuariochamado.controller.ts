import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuarioChamadoService } from '../services/usuariochamado.service';
import { UsuarioChamado } from '../entities/usuariochamado.entity';

@Controller('usuario-chamado')
export class UsuarioChamadoController {
  constructor(private readonly usuarioChamadoService: UsuarioChamadoService) {}

  @Get()
  getAll(): Promise<UsuarioChamado[]> {
    return this.usuarioChamadoService.findAll();
  }

  @Get(':usuarioId/:chamadoId')
  getById(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('chamadoId', ParseIntPipe) chamadoId: number,
  ): Promise<UsuarioChamado> {
    return this.usuarioChamadoService.findOne(usuarioId, chamadoId);
  }

  @Post()
  create(@Body() usuarioChamado: UsuarioChamado): Promise<UsuarioChamado> {
    return this.usuarioChamadoService.create(usuarioChamado);
  }

  @Delete(':usuarioId/:chamadoId')
  remove(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('chamadoId', ParseIntPipe) chamadoId: number,
  ): Promise<void> {
    return this.usuarioChamadoService.remove(usuarioId, chamadoId);
  }
}
