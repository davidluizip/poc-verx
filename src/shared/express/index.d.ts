import { UserSession } from 'src/core/dto/user-session.dto';

declare global {
  namespace Express {
    export interface Request {
      user?: UserSession;
      filters: any;
      pagination: {
        page: number;
        limit: number;
      };
      order: OrderByParamsDTO<any>;
    }
  }
}
