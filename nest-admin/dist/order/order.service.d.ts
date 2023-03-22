import { BaseService } from 'src/common/base-service/base.service';
import { Order } from './models/order.entity';
import { Repository } from 'typeorm';
export declare class OrderService extends BaseService<Order> {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    chartData(): Promise<any>;
}
