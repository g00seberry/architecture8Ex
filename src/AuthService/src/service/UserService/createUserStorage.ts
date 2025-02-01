import { IUserStorage } from "./IUserStorage";
import { SimpleJsonUserStorage } from "./SimpleJsonUserStorage";

export const createUserStorage = (): IUserStorage =>
  new SimpleJsonUserStorage();
