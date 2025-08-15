import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class ProductCategory {
    @PrimaryKey()
    id!: number

    @Property()
    description!: string
}