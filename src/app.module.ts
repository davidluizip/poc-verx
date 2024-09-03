import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProducersModule } from './core/application/modules/producers.module';
import { ROUTERS } from './shared/constants/routes.constants';

@Module({
  imports: [RouterModule.register(ROUTERS), ProducersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
