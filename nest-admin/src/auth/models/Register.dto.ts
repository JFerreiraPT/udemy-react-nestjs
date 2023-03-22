import {
  IsNotEmpty,
  MinLength,
  IsStrongPassword,
  IsEmail,
  IsNumber,
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
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
