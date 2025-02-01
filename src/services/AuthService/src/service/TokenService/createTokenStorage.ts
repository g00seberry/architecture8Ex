import { ITokenStorage } from "./ITokenStorage";
import { SimpleJsonStorage } from "./SimpleJsonStorage";

export const createTokenStorage = (): ITokenStorage => new SimpleJsonStorage();
