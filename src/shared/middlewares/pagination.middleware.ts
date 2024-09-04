import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PaginationRequestDTO } from '../dto/pagination-request.dto';

export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let page = Number(req.query.page);

    if (page || page == 0) {
      const pagination = {} as PaginationRequestDTO;

      if (page < 1) {
        page = 0;
      }
      pagination.page = page;

      let limit = Number(req.query.limit);

      if (!limit) {
        limit = 10;
      }

      pagination.limit = limit;

      req.pagination = pagination;
    } else {
      const pagination = {} as PaginationRequestDTO;

      pagination.page = 0;

      pagination.limit = 10;

      req.pagination = pagination;
    }
    return next();
  }
}
