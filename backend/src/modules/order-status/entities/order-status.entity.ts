import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class OrderStatus {
    @PrimaryKey()
    id!: number

    @Property()
    description!: string
}