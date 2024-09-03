export interface UseCase<TModel> {
  run(...args: any[]): Promise<TModel>;
}
