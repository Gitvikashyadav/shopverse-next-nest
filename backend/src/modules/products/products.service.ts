import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { SearchProductsInput } from './dto/search-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(input: CreateProductInput): Promise<ProductDocument> {
    const created = new this.productModel(input);
    return created.save();
  }

  async update(input: UpdateProductInput): Promise<ProductDocument> {
    const { id, ...rest } = input;
    const updated = await this.productModel
      .findByIdAndUpdate(id, rest, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Product not found');
    return true;
  }

  // Search by name OR category, single mixed query
  async searchProducts(
    input: SearchProductsInput,
  ): Promise<ProductDocument[]> {
    const { search } = input;
    if (!search || !search.trim()) {
      return this.findAll();
    }

    const regex = new RegExp(search.trim(), 'i');

    return this.productModel
      .find({
        $or: [{ name: regex }, { category: regex }],
      })
      .exec();
  }

  async findByCategory(category: string): Promise<ProductDocument[]> {
  // case-insensitive match, e.g. "women" matches "Women"
  return this.productModel
    .find({ category: new RegExp(`^${category}$`, 'i') })
    .exec();
}
  async createMany(products: CreateProductInput[]): Promise<ProductDocument[]> {
  const created = await this.productModel.insertMany(products, {
    ordered: false, // continue inserting even if one fails (e.g. duplicate slug)
  });
  return created as ProductDocument[];
}
}