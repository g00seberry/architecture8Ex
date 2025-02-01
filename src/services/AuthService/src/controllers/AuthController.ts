import { NextFunction, Request, Response } from "express";
import { days2Ms } from "../common/days2Ms";
import { getAuthService } from "../service/AuthService";
import { ApiError } from "../ApiError/ApiError";

const authService = getAuthService();

export class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { password, email } = req.body;
      if (!password || !email) throw ApiError.BadRequest("incorrect data");
      const userData = await authService.signUp(password, email);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: days2Ms(30),
        httpOnly: true,
      });
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
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: days2Ms(30),
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw ApiError.BadRequest("incorrect data");
      const removedToken = authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json(removedToken);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw ApiError.BadRequest("incorrect data");
      const userData = await authService.refreshToken(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: days2Ms(30),
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export const getAuthController = () => authController;
