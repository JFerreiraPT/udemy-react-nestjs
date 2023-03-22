import { BaseService } from 'src/common/base-service/base.service';
import { roleCreateDto } from './models/roleCreate.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './models/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  // async findOne(condition: any): Promise<Role> {
  //   return this.roleRepository.findOne({
  //     where: condition,
  //     relations: ['permissions'],
  //   });
  // }
}
