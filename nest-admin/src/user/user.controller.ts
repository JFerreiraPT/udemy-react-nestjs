import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Param,
  Delete,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto, UserUpdateDto } from './models/UserCreate.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async all(@Query('page') page: number) {
    return await this.userService.paginate(page, ['role']);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const hashedPassword = await bcrypt.hash('1234', 12);
    return this.userService.create({
      password: hashedPassword,
      role: { id: body.role_id },
      ...body,
    });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto) {
    const { first_name, last_name } = body;
    const id = await this.authService.getAuthUser(request);
    //user can only update first_name and last_name
    await this.userService.update(id, { first_name, last_name });

    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords must match');
    }

    const id = await this.authService.getAuthUser(request);

    await this.userService.update(id, {
      password: await bcrypt.hash(password, 12),
    });

    return {
      message: 'Password changed successfully',
    };
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne({ id }, ['role']);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;

    await this.userService.update(id, {
      ...data,
      role: { id: role_id },
    });

    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
