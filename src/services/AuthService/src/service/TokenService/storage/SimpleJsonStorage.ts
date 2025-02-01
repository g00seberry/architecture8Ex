import { ITokenStorage } from "../ITokenStorage";
import * as jsonfile from "jsonfile";
export interface KeyValueData {
  [key: string]: any;
}

export class SimpleJsonStorage implements ITokenStorage {
  private filename = "src/service/TokenService/storage/db.json";
  private data = {};

  public async init(): Promise<void> {
    try {
      this.data = await jsonfile.readFile(this.filename);
    } catch (error) {
      if ((error as any).code === "ENOENT") {
        this.data = {};
        console.log("File not found, started with empty data");
      } else {
        console.error("Failed to load ", error);
      }
    }
  }

  private async saveData(): Promise<void> {
    await jsonfile.writeFile(this.filename, this.data, { spaces: 2 });
  }

  async create(params: { key: string; content: string }): Promise<void> {
    this.data[params.key] = params.content;
    await this.saveData();
  }

  async delete(key: string): Promise<void> {
    if (this.data.hasOwnProperty(key)) {
      delete this.data[key];
      await this.saveData();
    } else {
      console.log(`Key '${key}' not found.`);
    }
  }

  async update(params: { key: string; content: string }): Promise<void> {
    const { key, content } = params;
    if (this.data.hasOwnProperty(key)) {
      this.data[key] = content;
      await this.saveData();
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
