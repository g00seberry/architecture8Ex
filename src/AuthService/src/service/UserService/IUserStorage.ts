import { User } from "./UserService";

export interface IUserStorage {
  create(params: { key: string; content: string }): Promise<User>;
  update(params: { key: string; content: string }): Promise<void>;
  delete(key: string): Promise<void>;
  findByKey(key: string): Promise<User | undefined>;
}
