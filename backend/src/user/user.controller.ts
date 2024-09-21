import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private serv: UserService) { }

  //Get request to find all buddys
  //Not scalable. Can be replaced by a search query
  @Get("/buddys")
  public async getAllBuddys() 
  {
    return await this.serv.getAllBuddys();
  }

  @Post("/signup")
  public async signup(@Body() signUpDTO: { username: string; password: string, firstName:string, lastName:string,role:string,email:string})
  {
    return await this.serv.signup(signUpDTO.username,signUpDTO.password,signUpDTO.firstName,signUpDTO.lastName,signUpDTO.role,signUpDTO.email);
  }

  @Post("/login")
  public async login(@Body() loginDTO: { username: string; password: string})
  {
    return await this.serv.login(loginDTO.username,loginDTO.password);
  }
}