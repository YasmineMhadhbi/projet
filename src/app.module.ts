import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './subCategories/subCategories.module';
import { ProductsModule } from './products/products.module';
import { DepotsModule } from './depots/depots.module';
import { PaymentMethodModule } from './paymentMethod/paymentMethod.module';
import { ServiceCategoryModule } from './servicesCategories/servicecategories.module';
import { ServicesModule } from './services/services.module';
import { QuotesModule } from './quotes/quotes.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './orders/oder.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CartModule } from './cart/cart.module';
import { ProductDetailsModule } from './productDetails/productDetails.module';


@Module({
  imports: [UsersModule,AuthsModule,ConfigModule.forRoot({isGlobal:true}),CategoriesModule,
    SubCategoriesModule,PaymentMethodModule,
    DepotsModule,ProductsModule,ServiceCategoryModule,ServicesModule,QuotesModule,
    OrderModule,DeliveryModule,CartModule,ProductDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
