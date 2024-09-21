import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnlockRequestService } from './unlock.request.service';
import { UnlockRequestController } from './unlock.request.controller';
import { UnlockRequests } from '../model/unlock.requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnlockRequests])],
  providers: [UnlockRequestService],
  controllers: [UnlockRequestController],
  exports: []
})
export class UnlockRequestsModule { }