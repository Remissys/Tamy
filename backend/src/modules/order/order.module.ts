import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { OrderStatus } from '../order-status/entities/order-status.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Order]), MikroOrmModule.forFeature([OrderStatus])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
