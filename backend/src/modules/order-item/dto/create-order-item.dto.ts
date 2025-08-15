import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';

export class CreateOrderItemDto {
    product: Product;
    order: Order;
    amount: number;

    constructor(product: Product, order: Order, amount: number) {
        this.product = product;
        this.order = order;
        this.amount = amount;
  }
}