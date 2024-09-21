import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }

  public async getAllBuddys() {
    return await this.repo.find({ where: { role:"Buddy" },select: ['user_id','firstName','lastName', 'email'] });
  }

  async signup(username: string ,password: string,firstName: string,lastName:string,role:string,email:string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.email = email;
    try 
    {
      const existing_user1 = await this.repo.findOne({ where: { username:username } });

      if(existing_user1)
          throw new NotFoundException(`User with username '${username}' exists`);

      const existing_user2 = await this.repo.findOne({ where: { email:email } });

      if(existing_user2)
          throw new NotFoundException(`User with email '${email}' exists`);

      return this.repo.save(user);
    }
    catch(err)
    {
      console.error('Error signing up:', err);
      throw new Error(err);
    }
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.repo.findOne({ where: { username:username } });
    if(!user)
        throw new NotFoundException(`User with username '${username}' not found`);
    if(user.password == password)
    {
        user.lastLoggedIn = new Date();
        this.repo.save(user);
        return user;
    }
    else
        throw new NotFoundException(`Incorrect password`);
  }

  findByUsername(username: string): Promise<User> {
    return this.repo.findOne({ where: { username } });
  }
}