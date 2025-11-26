import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ChamadoService } from '../services/chamado.service';
import { Chamado } from '../entities/chamado.entity';

@Controller('chamado')
export class ChamadoController {
  constructor(private readonly chamadoService: ChamadoService) {}

  @Get()
  findAll(): Promise<Chamado[]> {
    return this.chamadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Chamado> {
    return this.chamadoService.findOne(id);
  }

  @Post()
  create(@Body() dados: any): Promise<Chamado> {
    return this.chamadoService.create(dados);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() chamado: Partial<Chamado>,
  ): Promise<Chamado> {
    return this.chamadoService.update(id, chamado);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.chamadoService.remove(id);
  }
}
