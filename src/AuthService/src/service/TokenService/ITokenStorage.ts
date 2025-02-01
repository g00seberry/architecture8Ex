export interface ITokenStorage {
  create(params: { key: string; content: string }): Promise<unknown>;
  update(params: { key: string; content: string }): Promise<unknown>;
  delete(key: string): Promise<unknown>;
  findByKey(key: string): Promise<unknown>;
  findByValue(value: string): Promise<unknown>;
}
