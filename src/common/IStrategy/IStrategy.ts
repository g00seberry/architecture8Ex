export interface IStrategy<T> {
  bind(...args: unknown[]): IStrategy<T>;
  execute(): T;
}
