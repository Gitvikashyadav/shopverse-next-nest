import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProductsInput } from './dto/create-products.input';
import { ProductsService } from './products.service';

import { Product } from './entities/product.entity';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { SearchProductsInput } from './dto/search-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  // Get All Products
  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  // Get Single Product
  @Query(() => Product, { name: 'product' })
  findOne(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  // Create Product
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput')
    createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  // Update Product
  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput')
    updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(updateProductInput);
  }

  // Delete Product
  @Mutation(() => Boolean)
  deleteProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }

  // Search Product
  @Query(() => [Product])
  searchProducts(
    @Args('searchProductsInput')
    searchProductsInput: SearchProductsInput,
  ) {
    return this.productsService.searchProducts(searchProductsInput);
  }

  // Get Categories
  @Query(() => [Product], { name: 'productsByCategory' })
findByCategory(@Args('category') category: string) {
  return this.productsService.findByCategory(category);
}

  @Mutation(() => [Product])
  createProducts(
    @Args('createProductsInput')
    createProductsInput: CreateProductsInput,
  ) {
    return this.productsService.createMany(createProductsInput.products);
  }
}
