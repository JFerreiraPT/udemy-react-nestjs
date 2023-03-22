import { UploadController } from './upload.controller';
import { CommonModule } from 'src/common/common.module';
import { Product } from './models/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CommonModule],
  controllers: [ProductController, UploadController],
  providers: [ProductService],
})
export class ProductModule {}
