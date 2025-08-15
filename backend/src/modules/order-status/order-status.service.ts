import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatus)
    private orderStatusRepo: EntityRepository<OrderStatus>,
  ) {}

  async create(createOrderStatusDto: CreateOrderStatusDto) {
    const orderStatus = this.orderStatusRepo.create(createOrderStatusDto);
    await this.orderStatusRepo.getEntityManager().persistAndFlush(orderStatus);
    return orderStatus;
  }

  findAll() {
    console.log('Finding all order statuses');
    return this.orderStatusRepo.findAll();
  }

  findOne(id: number) {
    console.log(`Finding order status with id: ${id}`);
    return this.orderStatusRepo.findOne({ id });
  }
}
