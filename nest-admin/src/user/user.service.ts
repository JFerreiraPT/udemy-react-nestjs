import { UserUpdateDto } from './models/UserCreate.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from 'src/common/base-service/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  // async getall(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  // async paginate(page = 1) {
  //   const take = 15;

  //   const [users, total] = await this.userRepository.findAndCount({
  //     take,
  //     skip: (page - 1) * take,
  //   });

  //   return {
  //     data: users,
  //     meta: {
  //       page,
  //       last_page: Math.ceil(total / take),
  //       total,
  //     },
  //   };
  // }

  // async create(data): Promise<User> {
  //   return this.userRepository.save(data);
  // }

  // async update(id: string, data) {
  //   return this.userRepository.update(id, data);
  // }

  // async delete(id: string) {
  //   return this.userRepository.delete(id);
  // }

  // async findOne(condition): Promise<User> {
  //   return this.userRepository.findOne({ where: condition });
  // }

  async login(email: string, password: string): Promise<User> {
    const user = await this.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
