import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Result } from '../results-api.base';

export const ValidParams = createParamDecorator(
  async (dto: new (obj: any) => any, ctx: ExecutionContext) => {
    try {
      const { filters, pagination, order } = ctx.switchToHttp().getRequest();

      let params = filters;

      if (dto) {
        const dtoInstance = new dto(filters);

        const _filters = removeUndefinedProperties(dtoInstance);

        const filtersDTO = plainToClass(dto, _filters);

        const errors = await validate(filtersDTO);

        if (errors.length > 0) {
          const response = ctx.switchToHttp().getResponse();
          response.setHeader('Content-Type', 'application/json');
          response.status(422).json(Result.Fail('ValidParams', errors, 422));
          return null;
        }
        params = removeUndefinedProperties(filtersDTO);
      }

      return {
        pagination,
        orderBy: order,
        filters: params,
      };
    } catch (error) {
      console.log(error);
    }
  },
);

const removeUndefinedProperties = (obj: any) => {
  const cleanedObj = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      cleanedObj[key] = value;
    }
  });
  return cleanedObj;
};
