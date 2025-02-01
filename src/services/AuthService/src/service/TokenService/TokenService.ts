import { config, getTokensKeyPair } from "../../config";
import { TokenPair, TokenPayload } from "../../types/TokenPair";
import { createToken } from "../../common/token/createToken";
import { verifyToken } from "../../common/token/verifyToken";
import { ITokenStorage } from "./ITokenStorage";
import { SimpleJsonStorage } from "./storage/SimpleJsonStorage";

export class TokenService {
  constructor(readonly tokenStorage: ITokenStorage) {}

  generateTokenPair(payload: TokenPayload): TokenPair {
    const { accessTokenKey, refreshTokenKey } = getTokensKeyPair();
    const accessToken = createToken(payload, accessTokenKey, {
      expiresIn: config.accessTokenExpiresIn,
    });
    const refreshToken = createToken(payload, refreshTokenKey, {
      expiresIn: config.refreshTokenExpiresIn,
    });
    return { accessToken, refreshToken };
  }

  async saveToken(key: string, content: string) {
    const token = await this.getTokenByKey(key);
    if (token) {
      return this.tokenStorage.update({
        content,
        key,
      });
    }
    return this.tokenStorage.create({
      content,
      key,
    });
  }

  validateToken(token: string, tokenKey: string) {
    return verifyToken<TokenPayload>(token, tokenKey);
  }

  async removeToken(token: string) {
    const key = await this.tokenStorage.findByValue(token);
    return await this.tokenStorage.delete(String(key));
  }

  async getTokenByKey(key: string) {
    try {
      return this.tokenStorage.findByKey(key);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async checkTokenExist(refreshToken: string) {
    return !!(await this.tokenStorage.findByValue(refreshToken));
  }
}

const storage = new SimpleJsonStorage();
let service: TokenService | null = null;

export const getTokenService = async () => {
  if (!service) {
    await storage.init();
    service = new TokenService(storage);
  }
  return service;
};
