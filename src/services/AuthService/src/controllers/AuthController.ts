import { NextFunction, Request, Response } from "express";
import { days2Ms } from "../common/days2Ms";
import { getAuthService } from "../service/AuthService";
import { ApiError } from "../ApiError/ApiError";
import { getTokenService } from "../service/TokenService/TokenService";
import { getTokensKeyPair } from "../config";

const authService = getAuthService();

export class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { password, email } = req.body;
      if (!password || !email) throw ApiError.BadRequest("incorrect data");
      const userData = await authService.signUp(password, email);
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { password, email } = req.body;
      if (!password || !email) throw ApiError.BadRequest("incorrect data");
      const userData = await authService.login(password, email);
      res.cookie("accessToken", userData.accessToken, {
        maxAge: days2Ms(30),
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { accessToken } = req.cookies;
      if (!accessToken) throw ApiError.BadRequest("incorrect data");
      await authService.logout(accessToken);
      res.clearCookie("accessToken");
      return res.status(200).json(true);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw ApiError.BadRequest("incorrect data");
      const userData = await authService.refreshToken(refreshToken);
      res.cookie("accessToken", userData.accessToken, {
        maxAge: days2Ms(30),
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async autorize(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { accessToken } = req.cookies;
      const tokenService = await getTokenService();
      const valid = await tokenService.validateToken(
        accessToken,
        getTokensKeyPair().accessTokenKey
      );
      return res.status(200).json(!!valid ? true : false);
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export const getAuthController = () => authController;
