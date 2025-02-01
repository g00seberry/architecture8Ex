import { IUserStorage } from "./IUserStorage";
import { SimpleJsonUserStorage } from "./storage/SimpleJsonUserStorage";

export const createUserStorage = (): IUserStorage =>
  new SimpleJsonUserStorage();
