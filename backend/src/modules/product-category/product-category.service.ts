import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepo: EntityRepository<ProductCategory>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const productCategory = this.productCategoryRepo.create(createProductCategoryDto);
    await this.productCategoryRepo.getEntityManager().persistAndFlush(productCategory);
    return productCategory;
  }

  findAll() {
    console.log('Finding all product categories');
    return this.productCategoryRepo.findAll();
  }

  findOne(id: number) {
    console.log(`Finding product category with id: ${id}`);
    return this.productCategoryRepo.findOne({ id })
  }

  async update(id: number, description: string) {
    let order = this.productCategoryRepo.findOne({ id: id })

    let orderData = {...order, description}

    await this.productCategoryRepo.getEntityManager().persistAndFlush(orderData)

    return orderData
  }
}
