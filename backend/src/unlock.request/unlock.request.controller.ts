import { Controller, Get, Post, Body } from '@nestjs/common';
import { UnlockRequestService } from './unlock.request.service';
import { Timestamp } from 'typeorm';

@Controller('unlock-request')
export class UnlockRequestController {
  constructor(private serv: UnlockRequestService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

   // Endpoint to send unlock request a buddy
  // Body requires invite_id, reason, time_from and time_to
  @Post('/send_request')
  public async sendUnlockRequest(@Body() sendRequestDTO: { invite_id: number; reason: string, TimeFrom: Timestamp, TimeTo:Timestamp})
  {
    return await this.serv.sendUnlockRequest(sendRequestDTO.invite_id,sendRequestDTO.reason,sendRequestDTO.TimeFrom,sendRequestDTO.TimeTo);
  }
}