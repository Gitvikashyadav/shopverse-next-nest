import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}