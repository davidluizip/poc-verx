import {
  Paginated,
  PaginationData,
  ProxyFunctions,
} from 'src/shared/types/types';

export type FindManyPaginated<F extends ProxyFunctions> = {
  findManyPaginated: (
    data?: Omit<Parameters<F['findMany']>[0], 'take' | 'skip'>,
    pagination?: PaginationData,
  ) => Promise<Paginated<Awaited<ReturnType<F['findMany']>>[0]>>;
};

export function makeFindManyPaginated(model: ProxyFunctions) {
  return new Proxy(model.findMany, {
    apply: async (target, thisArg, [data, paginationInfo]) => {
      const page = paginationInfo?.page || 1;
      const limit =
        paginationInfo?.limit || paginationInfo?.limit === 0
          ? paginationInfo?.limit
          : 10;

      const query = data || {};
      query.take = limit === 0 ? undefined : limit;
      query.skip = (page - 1) * limit ?? 0;

      const [total, docs] = await Promise.all([
        model.count({
          where: query.where,
        }),
        target.apply(thisArg, [query]),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: docs,
        total,
        limit,
        page,
        totalPages: totalPages === Infinity ? 1 : totalPages,
      };
    },
  });
}
