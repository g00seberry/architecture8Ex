import { ITokenStorage } from "./ITokenStorage";
import { SimpleJsonStorage } from "./storage/SimpleJsonStorage";

export const createTokenStorage = (): ITokenStorage => new SimpleJsonStorage();
