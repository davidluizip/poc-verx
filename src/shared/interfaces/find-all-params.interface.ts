import { OrderByParamsDTO } from '../dto/order-by.dto';
import { PaginationRequestDTO } from '../dto/pagination-request.dto';

export interface IFindAllRequest<P> {
  filters: P;
  pagination: PaginationRequestDTO;
  orderBy?: OrderByParamsDTO<P>;
}
