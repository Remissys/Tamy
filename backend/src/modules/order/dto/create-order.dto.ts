import { User } from '../../user/entities/user.entity';
import { OrderStatus } from '../../order-status/entities/order-status.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';

export class CreateOrderDto {
  user!: User;
  price!: number;
  created: Date;
  status: OrderStatus;
  itens: OrderItem[];

  constructor(user: User, price: number, itens: OrderItem[], status?: OrderStatus, created?: Date) {
    this.user = user;
    this.price = price;
    this.itens = itens;
    this.status = status ?? new OrderStatus(); 
    this.status.id = 1 //Default status
    this.created = created ?? new Date();
  }
}