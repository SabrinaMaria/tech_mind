import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../modules/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
