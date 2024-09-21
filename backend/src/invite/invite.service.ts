import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invite } from '../model/invite.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class InviteService {
  constructor(@InjectRepository(Invite) private readonly repo: Repository<Invite>) { }

  public async getAll() {
    return await this.repo.find();
  }

  // Get invite requests to buddy 
  // Return all invite requests the buddy
  public async getInviteRequests(user_id: string): Promise<Invite[]> {
    try 
    {
      return await this.repo.find({where: { buddy: {user_id}}, relations:['buddy']});
    } 
    catch (error) 
    {
      console.error('Error fetching invites:', error);
      throw new Error('Could not fetch invites');
    }
  }

  // Creating a new invite
  public async sendInviteRequest(user_id: UUID,buddy_id:UUID): Promise<Invite> 
  {
    try 
    {
      //If an invite exists among the pair, throw an error
      const existing_invite = await this.repo.findOne({ where: { user_id:user_id,buddy_id:buddy_id  }, relations: ['user', 'buddy'], });

      if(existing_invite)
          throw new NotFoundException(`Invite has already been sent`);

      const invite = new Invite();
      invite.user_id = user_id;
      invite.buddy_id = buddy_id;

      return await this.repo.save(invite);
    }
    catch(err)
    {
      console.error('Error sending an invite:', err);
      throw new Error(err);
    }
  }

  // Sending invite response (Sends 1 for accept and 0 for reject)
  public async respondInviteRequest(invite_id: number,invite_response:number): Promise<String> 
  {
    try 
    {
      //If an invite exists among the pair, throw an error
      const existing_invite = await this.repo.findOne({ where: { invite_id:invite_id} });

      if(!existing_invite)
          throw new NotFoundException(`Invite not found`);

      console.log(invite_response);
      if(invite_response!=0 && invite_response!= 1)
        throw new NotFoundException(`Invalid invite response`);

      existing_invite.invite_response = invite_response;

      await this.repo.save(existing_invite);

      return "Invite Response Recorded";
    }
    catch(err)
    {
      console.error('Error sending an invite:', err);
      throw new Error(err);
    }
  }

  // Get all buddys for a user who have accepted invites
  public async getAllAcceptedBuddys(user_id: string): Promise<Invite[]> {
    try 
    {
      return await this.repo.find({where: { user_id: user_id, invite_response:1}, relations:['buddy']});
    } 
    catch (error) 
    {
      console.error('Error fetching invites:', error);
      throw new Error('Could not fetch invites');
    }
  }
  
}