import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepo: EntityRepository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemRepo.create(createOrderItemDto);
    await this.orderItemRepo.getEntityManager().persistAndFlush(orderItem);
    return orderItem;
  }

  findAll() {
    console.log('Finding all order items');
    return this.orderItemRepo.findAll();
  }

  findOne(id: number) {
    console.log(`Finding order item with id: ${id}`);
    return this.orderItemRepo.findOne({ id });
  }
}
