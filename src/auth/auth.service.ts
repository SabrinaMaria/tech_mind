import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async login(loginDto: LoginDto) {
    const usuarios = await this.usuarioService.findAll();

    const user = usuarios.find((u) => u.email === loginDto.email);

    if (!user || user.senha !== loginDto.senha) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return {
      token: 'token_simulado_jwt_123456',
      user: user,
    };
  }
}
