/* eslint-disable @typescript-eslint/no-namespace */
import { IsEmail, IsString, Matches } from 'class-validator';

export namespace AuthDto {
  export class SignUp {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})')
    password: string;
  }

  export class SignIn {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }
}
