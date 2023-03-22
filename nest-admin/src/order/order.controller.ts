import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Res,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Parser } from 'json2csv';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async all(@Query('page') page: number) {
    return this.orderService.paginate(page, ['order_items']);
  }

  @Post('export')
  async export(@Res() res: Response) {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    });
    const orders = await this.orderService.getall(['order_items']);

    const json = [];

    orders.forEach((order) => {
      json.push({
        ID: order.id,
        Name: order.name,
        Email: order.email,
        'Product Title': '',
        Price: '',
        Quantity: '',
      });

      order.order_items.forEach((item) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product Title': item.product_title,
          Price: item.price,
          Quantity: item.quantity,
        });
      });
    });

    const csv = parser.parse(json);
    res.header('Content-type', 'text/csv');
    res.attachment('orders.csv');
    return res.send(csv);
  }

  @Get('chartData')
  async chart() {
    return this.orderService.chartData();
  }
}
