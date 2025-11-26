import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario.module';
import { ChamadoModule } from './modules/chamado.module';
import { UsuarioChamadoModule } from './modules/usuariochamado.module';
import { SolucaoPropostaModule } from './modules/solucaoproposta.module';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './modules/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'root',
      database: 'tech_mind_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuarioModule,
    ChamadoModule,
    UsuarioChamadoModule,
    SolucaoPropostaModule,
    AuthModule,
    CategoriaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
