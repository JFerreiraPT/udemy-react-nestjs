import { IsEmail, IsNotEmpty } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class UserCreateDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsEmail()
  email: string;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {}
