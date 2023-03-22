import { OrderService } from './order.service';
import { Response } from 'express';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    all(page: number): Promise<import("../common/paginated-result.interface").PaginatedResult<import("./models/order.entity").Order>>;
    export(res: Response): Promise<Response<any, Record<string, any>>>;
    chart(): Promise<any>;
}
