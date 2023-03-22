import { BaseService } from 'src/common/base-service/base.service';
import { Product } from './models/product.entity';
import { Repository } from 'typeorm';
export declare class ProductService extends BaseService<Product> {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
}
