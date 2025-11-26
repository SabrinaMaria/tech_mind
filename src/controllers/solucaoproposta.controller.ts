import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SolucaoPropostaService } from '../services/solucaoproposta.service';

@Controller('solucao-proposta')
export class SolucaoPropostaController {
  constructor(private readonly solucaoService: SolucaoPropostaService) {}

  @Post()
  create(@Body() dados: any) {
    return this.solucaoService.create(dados);
  }

  @Get('chamado/:chamadoId')
  findAllByChamado(@Param('chamadoId', ParseIntPipe) chamadoId: number) {
    return this.solucaoService.findAllByChamado(chamadoId);
  }
}
