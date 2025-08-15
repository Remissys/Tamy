import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ProductCategoryDto } from "./productCategory.dto";

@Entity()
export class ProductCategory {
    @PrimaryKey()
    id!: number

    @Property()
    description!: string

    // constructor(dto: ProductCategoryDto) {
    //     this.description = dto.description
    //
    // }
}