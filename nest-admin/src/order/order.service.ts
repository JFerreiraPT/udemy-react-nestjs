import { BaseService } from 'src/common/base-service/base.service';
import { Injectable } from '@nestjs/common';
import { Order } from './models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async chartData() {
    return this.orderRepository.query(`
      SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, sum(i.price * i.quantity) as sum
      FROM orders o
      JOIN order_items i on o.id = i.order_id
      GROUP BY date;
    `);
  }
}
