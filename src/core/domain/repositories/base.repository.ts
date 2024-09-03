export abstract class BaseModel<T> {
  abstract create(data: T): Promise<T>;
}
