import { Entity, PrimaryKey, Property, FloatType, ManyToOne } from "@mikro-orm/core";
import { ProductCategory } from "../../product-category/entities/product-category.entity";

@Entity()
export class Product {
    @PrimaryKey()
    id!: number

    @Property()
    name!: string

    @Property({ type: FloatType })
    price!: number

    @ManyToOne()
    category!: ProductCategory

    @Property({ default: false })
    deleted!: boolean

    constructor(category: ProductCategory) {
        this.category = category
    }
}