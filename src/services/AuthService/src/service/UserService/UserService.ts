import { hashString } from "../../common/hashString";
import { IUserStorage } from "./IUserStorage";
import { SimpleJsonUserStorage } from "./storage/SimpleJsonUserStorage";

export type User = { login: string; password: string };

export class UserService {
  constructor(readonly storage: IUserStorage) {}

  async createUser(user: User) {
    return this.storage.create({
      key: user.login,
      content: JSON.stringify({ ...user, password: hashString(user.password) }),
    });
  }

  async deleteUser(login: string) {
    return this.storage.delete(login);
  }

  async updateUser(user: User) {
    return this.storage.update({
      key: user.login,
      content: JSON.stringify({ ...user, password: hashString(user.password) }),
    });
  }

  async getUser(login: string) {
    return this.storage.findByKey(login);
  }
}

const storage = new SimpleJsonUserStorage();
let service: UserService | null = null;

export const getUserService = async () => {
  if (!service) {
    await storage.init();
    service = new UserService(storage);
  }
  return service;
};
