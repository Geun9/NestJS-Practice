import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import Users from './entities/user.entity';
import { AuthDto } from 'src/auth/dto/create-auth.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(@Body(ValidationPipe) signUp: AuthDto.SignUp): Promise<Users> {
    return this.userService.signUp(signUp);
  }

  @Get()
  async singIn(@Body(ValidationPipe) signIn: AuthDto.SignIn): Promise<{ accessToken: string }> {
    return this.userService.signIn(signIn);
  }
}
