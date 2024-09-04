import { CulturesModule } from 'src/core/application/modules/cultures.module';
import { ProducersModule } from 'src/core/application/modules/producers.module';

export const ROUTERS = [
  {
    path: '/producers',
    module: ProducersModule,
  },
  {
    path: '/cultures',
    module: CulturesModule,
  },
];
