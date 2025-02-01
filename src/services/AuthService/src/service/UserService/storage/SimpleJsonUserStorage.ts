import { IUserStorage } from "../IUserStorage";
import * as jsonfile from "jsonfile";
import { User } from "../UserService";
export interface KeyValueData {
  [key: string]: any;
}

export class SimpleJsonUserStorage implements IUserStorage {
  private filename = "src/service/UserService/storage/db.json";
  private data = {};

  public async init(): Promise<void> {
    try {
      this.data = await jsonfile.readFile(this.filename);
    } catch (error) {
      throw Error(error);
    }
  }

  private async saveData(): Promise<void> {
    await jsonfile.writeFile(this.filename, this.data, { spaces: 2 });
  }

  async create(params: { key: string; content: string }): Promise<User> {
    this.data[params.key] = params.content;
    await this.saveData();
    return JSON.parse(params.content);
  }

  async delete(key: string): Promise<void> {
    if (this.data.hasOwnProperty(key)) {
      delete this.data[key];
      await this.saveData();
    } else {
      throw Error("user not found");
    }
  }

  async update(params: { key: string; content: string }): Promise<void> {
    const { key, content } = params;
    if (this.data.hasOwnProperty(key)) {
      this.data[key] = content;
      await this.saveData();
    } else {
      throw Error("user not found");
    }
  }

  async findByKey(key: string): Promise<User | undefined> {
    return this.data[key] ? JSON.parse(this.data[key]) : undefined;
  }
}
