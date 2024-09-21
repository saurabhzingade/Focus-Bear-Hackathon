import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { Invite } from '../model/invite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invite])],
  providers: [InviteService],
  controllers: [InviteController],
  exports: []
})
export class InviteModule { }