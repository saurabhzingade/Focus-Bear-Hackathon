// item.service.ts 

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnlockRequests } from '../model/unlock.requests.entity';
import { Repository, Timestamp } from 'typeorm';

@Injectable()
export class UnlockRequestService {
  constructor(@InjectRepository(UnlockRequests) private readonly repo: Repository<UnlockRequests>) { }

  public async getAll() {
    return await this.repo.find();
  }

    // Creating a new invite
    public async sendUnlockRequest(invite_id: number,reason:string, timeFrom:Timestamp,timeTo:Timestamp): Promise<UnlockRequests> 
    {
      try 
      {
  
        const request = new UnlockRequests();
        request.invite_id = invite_id;
        request.reason = reason;
        request.timeFrom = timeFrom;
        request.timeTo = timeTo;

        return await this.repo.save(request);
      }
      catch(err)
      {
        console.error('Error sending an invite:', err);
        throw new Error(err);
      }
    }
}