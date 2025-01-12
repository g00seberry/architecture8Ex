export interface IConnection {
  send(data: unknown): void;
  on(name: string, cb: (...args: any[]) => void);
}
