import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Res,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/Register.dto';
import { User } from 'src/user/models/user.entity';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<User> {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }

    const { role_id, ...data } = body;

    const passHashed = await bcrypt.hash(data.password, 12);
    return this.userService.create({
      ...body,
      role: { id: role_id },
      password: passHashed,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.login(email, password);

    const token = await this.jwtService.signAsync({
      id: user.id,
      name: user.first_name,
    });

    //if we want to send it on cookies
    response.cookie('jwt', token, { httpOnly: true });

    return user;
  }

  @UseGuards(AuthGuard)
  //this intercept allows us to filter what to show on response, using with exclude() on model
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user')
  async authUser(@Req() request: Request) {
    return this.userService.findOne({
      id: await this.authService.getAuthUser(request),
    });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
