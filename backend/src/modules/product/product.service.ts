
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: EntityRepository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    await this.productRepo.getEntityManager().persistAndFlush(product);
    return product;
  }

  findAll() {
    console.log('Finding all products');
    return this.productRepo.findAll();
  }

  findOne(id: number) {
    console.log(`Finding product with id: ${id}`);
    return this.productRepo.findOne({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
