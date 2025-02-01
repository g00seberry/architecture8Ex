import { ITokenStorage } from "./ITokenStorage";
export interface KeyValueData {
  [key: string]: any;
}

export class SimpleJsonStorage implements ITokenStorage {
  private data = {};

  async create(params: { key: string; content: string }): Promise<void> {
    this.data[params.key] = params.content;
  }

  async delete(key: string): Promise<void> {
    if (this.data.hasOwnProperty(key)) {
      delete this.data[key];
    } else {
      console.log(`Key '${key}' not found.`);
    }
  }

  async update(params: { key: string; content: string }): Promise<void> {
    const { key, content } = params;
    if (this.data.hasOwnProperty(key)) {
      this.data[key] = content;
    } else {
      console.log(`Key '${key}' not found.`);
    }
  }

  async findByKey(key: string): Promise<string | null> {
    return this.data[key];
  }

  async findByValue(value: any): Promise<string | null> {
    for (const key in this.data) {
      if (this.data[key] === value) {
        return key;
      }
    }
    return null;
  }
}
