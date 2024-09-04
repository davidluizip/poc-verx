import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CulturesModule } from './core/application/modules/cultures.module';
import { ProducersModule } from './core/application/modules/producers.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ROUTERS } from './shared/constants/routes.constants';
import {
  FilterMiddleware,
  OrderMiddleware,
  PaginationMiddleware,
} from './shared/middlewares';

@Module({
  imports: [
    DatabaseModule,
    RouterModule.register(ROUTERS),
    ProducersModule,
    CulturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FilterMiddleware, OrderMiddleware, PaginationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
