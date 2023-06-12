import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Users from './entities/user.entity';
import { AuthDto } from 'src/auth/dto/create-auth.dto';

import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/jwt/jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private readonly userRepo: Repository<Users>, private jwtService: JwtService) {}

  async signUp(signUp: AuthDto.SignUp): Promise<Users> {
    const { name, email, password } = signUp;

    const isEmailExists = await this.userRepo.findOne({ where: { email } });
    if (isEmailExists) throw new ConflictException('EMAIL EXISTS');

    const user = this.userRepo.create({
      name,
      email,
      password,
    });

    await this.userRepo.save(user);

    return user;
  }

  async signIn(signIn: AuthDto.SignIn): Promise<{ accessToken: string }> {
    const { email, password } = signIn;
    const user = await this.userRepo.findOne({ where: { email } });

    if (!(user && (await bcrypt.compare(password, user.password)))) throw new UnauthorizedException('SIGNIN FAIL');
    const payload: Payload = { id: user.id, email: user.email };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
