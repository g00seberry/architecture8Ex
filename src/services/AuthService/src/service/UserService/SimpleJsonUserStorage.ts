import { IUserStorage } from "./IUserStorage";
import { User } from "./UserService";
export interface KeyValueData {
  [key: string]: any;
}

export class SimpleJsonUserStorage implements IUserStorage {
  private data = {};

  async create(params: { key: string; content: string }): Promise<User> {
    this.data[params.key] = params.content;
    return JSON.parse(params.content);
  }

  async delete(key: string): Promise<void> {
    if (this.data.hasOwnProperty(key)) {
      delete this.data[key];
    } else {
      throw Error("user not found");
    }
  }

  async update(params: { key: string; content: string }): Promise<void> {
    const { key, content } = params;
    if (this.data.hasOwnProperty(key)) {
      this.data[key] = content;
    } else {
      throw Error("user not found");
    }
  }

  async findByKey(key: string): Promise<User | undefined> {
    return this.data[key] ? JSON.parse(this.data[key]) : undefined;
  }
}
