import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, FloatType, PrimaryKeyProp, Formula } from '@mikro-orm/core'
import { Product } from '../../product/entities/product.entity'
import { Order } from '../../order/entities/order.entity'

@Entity()
export class OrderItem {
    @PrimaryKey()
    id!: number

    @ManyToOne()
    product!: Product

    @ManyToOne()
    order!: Order

    @Property()
    amount!: number

    constructor(order: Order, product: Product) {
        this.order = order
        this.product = product
    }
}