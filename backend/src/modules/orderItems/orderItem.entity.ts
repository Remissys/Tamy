import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, FloatType, PrimaryKeyProp, Formula } from '@mikro-orm/core'
import { Product } from '../product/product.entity'
import { Order } from '../order/order.entity'

@Entity()
export class OrderItem {
    @PrimaryKey()
    id!: number

    @ManyToOne({ primary: true })
    product!: Product

    @ManyToOne({ primary: true })
    order!: Order

    @Property()
    amount!: number

    // @Property({ type: FloatType })
    // price!: number

    [PrimaryKeyProp]?: ['product', 'order']

    constructor(order: Order, product: Product, amount: number) {
        this.order = order
        this.product = product
        // this.price = product.price * amount
    }
}