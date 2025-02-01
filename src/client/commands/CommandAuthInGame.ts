import { ICommand } from "../../common/ICommand";
import { authInGame } from "../api/game";
import { AuthData, GameAuthInfo } from "../api/types";

const refreshTokenKey = "refreshToken";
const accessTokenKey = "accessToken";

const saveTokens = (data: AuthData) => {
  try {
    localStorage.setItem(refreshTokenKey, data.refreshToken);
    localStorage.setItem(accessTokenKey, data.accessToken);
  } catch (error) {
    console.error(error);
  }
};

export const getAccessToken = () => localStorage.getItem(accessTokenKey);
export const getRefreshToken = () => localStorage.getItem(refreshTokenKey);

export class CommandAuthInGame implements ICommand {
  constructor(readonly data: GameAuthInfo) {}

  async execute(): Promise<void> {
    try {
      const authData = await authInGame(this.data);
      saveTokens(authData);
    } catch (error) {
      console.error(error);
    }
  }
}
