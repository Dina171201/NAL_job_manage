import { IsString } from 'class-validator';
export class RegisterDto {
  @IsString()
  userName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;
}

export class LoginDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}
