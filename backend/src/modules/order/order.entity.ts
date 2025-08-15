import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, FloatType } from '@mikro-orm/core'
import { OrderStatus } from '../orderStatus/orderStatus.entity';
import { OrderItem } from '../orderItems/orderItem.entity';
import { User } from '../user/user.entity';

@Entity()
export class Order {
    @PrimaryKey()
    id!: number

    @ManyToOne()
    user!: User

    @Property({ type: FloatType })
    price!: number

    @Property()
    created: Date = new Date()

    @ManyToOne({ default: 1})
    status!: OrderStatus

    @OneToMany(() => OrderItem, item => item.order)
    itens = new Collection<OrderItem>(this)

    constructor(user: User) {
        this.user = user
    }
}