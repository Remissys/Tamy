import { Injectable } from "@nestjs/common";
import { InjectRepository, InjectEntityManager } from "@mikro-orm/nestjs";
import { EntityRepository, EntityManager } from "@mikro-orm/core";
import { ProductCategory } from "./productCategory.entity";
import { ProductCategoryDto } from "./productCategory.dto";

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategory)
        private productCategoryRepo: EntityRepository<ProductCategory>,
        // @InjectEntityManager private readonly em: EntityManager
    ) {}

    create(productCategoryDto: ProductCategoryDto) {
        return this.productCategoryRepo.create({...productCategoryDto})
    }

    findAll() {
        return this.productCategoryRepo.findAll()
    }

    findOne(id: number) {
        return this.productCategoryRepo.findOne({ id })
    }
}