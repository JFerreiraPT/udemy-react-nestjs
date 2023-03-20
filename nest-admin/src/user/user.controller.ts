import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto, UserUpdateDto } from './models/UserCreate.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async all(): Promise<User[]> {
    return await this.userService.getall();
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const hashedPassword = await bcrypt.hash('1234', 12);
    return this.userService.create({ password: hashedPassword, ...body });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UserUpdateDto) {
    await this.userService.update(id, body);

    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
