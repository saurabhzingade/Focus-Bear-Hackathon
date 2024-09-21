import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { InviteModule } from './invite/invite.module';
import { UnlockRequestsModule } from './unlock.request/unlock.request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: 'mysecretpassword',
      username: 'postgres',
      entities: [],
      database: 'my_database',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    InviteModule,
    UnlockRequestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}