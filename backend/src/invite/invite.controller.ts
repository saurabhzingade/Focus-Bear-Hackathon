
import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { InviteService } from './invite.service';
import { UUID } from 'crypto';

@Controller('invite')
export class InviteController {
  constructor(private serv: InviteService) { }

  // Endpoint to get all invites to buddy 
  // Params require user_id of buddy logged in
  @Get('/recieved_invites')
  public async getInviteRequests(@Query('user_id') user_id: UUID) 
  {
    return await this.serv.getInviteRequests(user_id);
  }

  // Endpoint to request a buddy
  // Body requires user_id of user logged in and user_id of buddy to send a request to
  @Post('/send_invite')
  public async sendInviteRequest(@Body() sendInviteDTO: { user_id: UUID; buddy_id: UUID})
  {
    return await this.serv.sendInviteRequest(sendInviteDTO.user_id,sendInviteDTO.buddy_id);
  }

  // Endpoint to accept or reject invite (done by buddy)
  // Body requires invite_id and 1 or 0 
  @Post('/respond_invite')
  public async respondInviteRequest(@Body() respondInviteDTO: { invite_id: number; invite_response: number})
  {
    return await this.serv.respondInviteRequest(respondInviteDTO.invite_id,respondInviteDTO.invite_response);
  }

  // Route to get all buddys who have accepted requests
  @Get('/get_all_accepted_buddys')
  public async getAllAcceptedBuddys(@Query('user_id') user_id: UUID) 
  {
    return await this.serv.getAllAcceptedBuddys(user_id);
  }
}