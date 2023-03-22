import { PaginatedResult } from '../paginated-result.interface';
import { Repository } from 'typeorm';
export declare abstract class BaseService<R> {
    protected readonly baseRepository: Repository<R>;
    constructor(baseRepository: Repository<R>);
    getall(relations?: any): Promise<R[]>;
    paginate(page?: number, relations?: any): Promise<PaginatedResult<R>>;
    create(data: any): Promise<R>;
    update(id: string | number, data: any): Promise<import("typeorm").UpdateResult>;
    delete(id: string | number): Promise<import("typeorm").DeleteResult>;
    findOne(condition: any, relations?: any): Promise<R>;
}
