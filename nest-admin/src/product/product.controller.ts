import {
  ProductCreateDto,
  ProductUpdateDto,
} from './models/product-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all(@Query('page') page: number) {
    return this.productService.paginate(page);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }

  @Post()
  async create(@Body() body: ProductCreateDto) {
    return this.productService.create({ ...body });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: ProductUpdateDto) {
    await this.productService.update(id, { ...body });
    return this.productService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
