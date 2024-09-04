import { ProxyFunctions } from 'src/shared/types/types';
import { FindManyPaginated, makeFindManyPaginated } from './find-many.proxy';

export type ProxyPrismaModel<F extends ProxyFunctions> = F &
  FindManyPaginated<F>;

export function ProxyPrismaModel<F extends ProxyFunctions>(
  model: F,
): ProxyPrismaModel<F> {
  Reflect.set(model, 'findManyPaginated', makeFindManyPaginated(model));

  return model as ProxyPrismaModel<F>;
}
