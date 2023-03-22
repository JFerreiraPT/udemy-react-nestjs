import { IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;
  @IsNotEmpty()
  @ApiProperty()
  last_name: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  role_id: number;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {}
