import { ProductCreateDto, ProductUpdateDto } from './models/product-create.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    all(page: number): Promise<import("../common/paginated-result.interface").PaginatedResult<import("./models/product.entity").Product>>;
    getById(id: number): Promise<import("./models/product.entity").Product>;
    create(body: ProductCreateDto): Promise<import("./models/product.entity").Product>;
    update(id: number, body: ProductUpdateDto): Promise<import("./models/product.entity").Product>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
