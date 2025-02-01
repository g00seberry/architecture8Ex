import { ApiError } from "../ApiError/ApiError";
import { getApiErrorMessage } from "../ApiError/getApiErrorMessage";
import { compareHash, hashString } from "../common/hashString";
import { config } from "../config";
import { UserAuthResponse } from "../types/UserAuthResponse";
import { getTokenService } from "./TokenService/TokenService";
import { getUserService, User } from "./UserService/UserService";

export class AuthService {
  async signUp(password: string, login: string): Promise<UserAuthResponse> {
    const userService = await getUserService();
    const candidate = await userService.getUser(login);
    if (candidate)
      throw ApiError.BadRequest(getApiErrorMessage("User already exists"));
    const newUser = (await userService.createUser({
      login: login,
      password,
    })) as User;
    const tokenService = await getTokenService();
    const tokens = tokenService.generateTokenPair(newUser);
    await tokenService.saveToken(newUser.login, tokens.refreshToken);
    return { ...tokens, user: newUser };
  }

  async login(password: string, login: string): Promise<UserAuthResponse> {
    const userService = await getUserService();
    const candidate = (await userService.getUser(login)) as User;
    if (!candidate)
      throw ApiError.BadRequest(getApiErrorMessage("User is not found"));
    const isPassEquals = await compareHash(
      hashString(password),
      candidate.password
    );
    if (!isPassEquals)
      throw ApiError.BadRequest(getApiErrorMessage("Wrong login or password"));
    const tokenService = await getTokenService();
    const tokens = tokenService.generateTokenPair(candidate);
    await tokenService.saveToken(candidate.login, tokens.refreshToken);
    return { ...tokens, user: candidate };
  }

  async logout(refreshToken: string) {
    const tokenService = await getTokenService();
    return await tokenService.removeToken(refreshToken);
  }

  async refreshToken(refreshToken: string): Promise<UserAuthResponse> {
    const userService = await getUserService();
    if (!refreshToken) throw ApiError.Unauthorised();
    const tokenService = await getTokenService();
    const tokenData = tokenService.validateToken(
      refreshToken,
      config.refreshTokenKey
    ) as { login: string };
    const isTokenExist = await tokenService.checkTokenExist(refreshToken);
    if (!tokenData || !isTokenExist) throw ApiError.Unauthorised();
    const user = (await userService.getUser(tokenData.login)) as User;
    if (!user) throw ApiError.Unauthorised();
    const tokens = tokenService.generateTokenPair(user);
    await tokenService.saveToken(user.login, tokens.refreshToken);
    return { ...tokens, user: user };
  }
}

const authService = new AuthService();

export const getAuthService = () => authService;
