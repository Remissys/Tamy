import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from '../order-status/entities/order-status.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: EntityRepository<Order>,
    @InjectRepository(OrderStatus)
    private orderStatusRepo: EntityRepository<OrderStatus>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepo.create(createOrderDto);
    await this.orderRepo.getEntityManager().persistAndFlush(order);
    return order;
  }

  findAll() {
    console.log('Finding all orders');
    return this.orderRepo.findAll();
  }

  findOne(id: number) {
    console.log(`Finding order with id: ${id}`);
    return this.orderRepo.findOne({ id });
  }

  async update(id: number, status_id: number) {
    let order = this.orderRepo.findOne({ id: id })
    const status = this.orderStatusRepo.find({ id: status_id })

    let orderData = {...order, status}

    await this.orderRepo.getEntityManager().persistAndFlush(orderData)

    return orderData
  }
}
