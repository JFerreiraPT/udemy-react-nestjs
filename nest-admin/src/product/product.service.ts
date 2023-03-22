import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base-service/base.service';
import { Injectable } from '@nestjs/common';
import { Product } from './models/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
