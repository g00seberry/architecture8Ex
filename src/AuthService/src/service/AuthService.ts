import { ApiError } from "../ApiError/ApiError";
import { getApiErrorMessage } from "../ApiError/getApiErrorMessage";
import { compareHash } from "../common/hashString";
import { getTokensKeyPair } from "../config";
import { UserAuthResponse } from "../types/UserAuthResponse";
import { getTokenService } from "./TokenService/TokenService";
import { getUserService, User } from "./UserService/UserService";

export class AuthService {
  async signUp(password: string, login: string): Promise<any> {
    const userService = await getUserService();
    const candidate = await userService.getUser(login);
    if (candidate)
      throw ApiError.BadRequest(getApiErrorMessage("User already exists"));
    const newUser = await userService.createUser({
      login,
      password,
    });
    return newUser;
  }

  async login(password: string, login: string): Promise<UserAuthResponse> {
    const userService = await getUserService();
    const candidate = (await userService.getUser(login)) as User;
    if (!candidate)
      throw ApiError.BadRequest(getApiErrorMessage("User is not found"));
    const isPassEquals = await compareHash(password, candidate.password);
    if (!isPassEquals)
      throw ApiError.BadRequest(getApiErrorMessage("Wrong login or password"));
    const tokenService = await getTokenService();
    const tokens = tokenService.generateTokenPair(candidate);
    await tokenService.saveToken(candidate.login, tokens.refreshToken);
    return { ...tokens, user: candidate };
  }

  async logout(accessToken: string) {
    const tokenService = await getTokenService();
    const userData = (await tokenService.validateToken(
      accessToken,
      getTokensKeyPair().accessTokenKey
    )) as User;
    const refreshToken = await tokenService.getTokenByKey(userData.login);
    await tokenService.removeToken(String(refreshToken));
  }

  async refreshToken(refreshToken: string): Promise<UserAuthResponse> {
    if (!refreshToken) throw ApiError.Unauthorised();
    const userService = await getUserService();
    const tokenService = await getTokenService();

    const isTokenExist = await tokenService.checkTokenExist(refreshToken);
    if (!isTokenExist) throw ApiError.Unauthorised();
    const tokenData = tokenService.validateToken(
      refreshToken,
      getTokensKeyPair().refreshTokenKey
    ) as { login: string };
    const user = await userService.getUser(tokenData.login);
    if (!user) throw ApiError.Unauthorised();
    const tokens = tokenService.generateTokenPair(user);
    await tokenService.saveToken(user.login, tokens.refreshToken);
    return { ...tokens, user: user };
  }
}

const authService = new AuthService();

export const getAuthService = () => authService;
