import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  async create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  async findAll() {
    return this.productCategoryService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productCategoryService.findOne(+id);
  // }

  @Patch()
  update(@Query('id') id: string, @Query('description') description: string) {
    return this.productCategoryService.update(+id, description);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productCategoryService.remove(+id);
  // }
}
