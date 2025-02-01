import { NextFunction, Request, Response } from "express";
import { authService } from "../service/AuthService";
import { days2Ms } from "../common/days2Ms";
import { getTokenPayloadFromResponse } from "../common/token/getTokenPayloadFromResponse";

export class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;
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

  async makeResetPasswordMeta(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      await authService.makeResetPasswordMeta(email, password);
      return res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  async makeActivationLinkMeta(_: Request, res: Response, next: NextFunction) {
    try {
      const user = getTokenPayloadFromResponse(res);
      await authService.makeActivationLinkMeta(user);
      return res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
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

export const authController = new AuthController();
