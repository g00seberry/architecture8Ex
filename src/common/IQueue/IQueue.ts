export interface IQueue<T = unknown> {
  enqueue(value: T): void;
  dequeue(): T | undefined;
  isEmpty(): boolean;
}
