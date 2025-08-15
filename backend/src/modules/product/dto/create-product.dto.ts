import { ProductCategory } from '../../product-category/entities/product-category.entity';

export class CreateProductDto {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  deleted: boolean;

  constructor(name: string, price: number, category: ProductCategory, deleted: boolean = false) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.deleted = deleted; // Default value for 'deleted' is false
  }
}