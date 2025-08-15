import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { OrderStatusModule } from './modules/order-status/order-status.module';
import { ProductModule } from './modules/product/product.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    OrderModule,
    OrderItemModule,
    OrderStatusModule,
    ProductModule,
    ProductCategoryModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
