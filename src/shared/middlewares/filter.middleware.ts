import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class FilterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const reservedWord: Array<string> = [
      'orderBy',
      'sort',
      'page',
      'per_page',
      'limit',
      'offset',
    ];

    const filters: any = {};

    for (const key in req.query) {
      if (!reservedWord.includes(key) && req.query[key] !== '') {
        filters[key] = req.query[key];
      }
    }

    req.filters = filters;
    next();
  }
}
