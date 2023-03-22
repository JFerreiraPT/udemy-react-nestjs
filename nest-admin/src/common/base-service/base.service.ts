import { PaginatedResult } from '../paginated-result.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class BaseService<R> {
  constructor(protected readonly baseRepository: Repository<R>) {}

  async getall(relations?): Promise<R[]> {
    return await this.baseRepository.find({ relations: relations });
  }

  async paginate(page = 1, relations?): Promise<PaginatedResult<R>> {
    const take = 15;

    const [data, total] = await this.baseRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations: relations,
    });

    return {
      data,
      meta: {
        page,
        last_page: Math.ceil(total / take),
        total,
      },
    };
  }

  async create(data): Promise<R> {
    return this.baseRepository.save(data);
  }

  async update(id: string | number, data) {
    return this.baseRepository.update(id, data);
  }

  async delete(id: string | number) {
    return this.baseRepository.delete(id);
  }

  async findOne(condition, relations?): Promise<R> {
    return this.baseRepository.findOne({
      where: condition,
      relations: relations,
    });
  }
}
