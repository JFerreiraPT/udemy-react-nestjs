import {
  IsNotEmpty,
  MinLength,
  IsStrongPassword,
  IsEmail,
} from 'class-validator';

export class RegisterDto {
  @MinLength(3)
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsNotEmpty()
  password_confirm: string;
}
