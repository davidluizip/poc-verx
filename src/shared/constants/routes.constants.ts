import { ProducersModule } from 'src/core/application/modules/producers.module';

export const ROUTERS = [
  {
    path: '/producers',
    module: ProducersModule,
  },
];
