import { ICommand } from "../../common/ICommand";
import { authInGame } from "../api/game";
import { AuthData, GameAuthInfo } from "../api/types";

let localStorage: AuthData = { accessToken: "", refreshToken: "" };

const saveTokens = (data: AuthData) => {
  try {
    localStorage = data;
  } catch (error) {
    console.error(error);
  }
};

export const getAccessToken = () => localStorage.accessToken;
export const getRefreshToken = () => localStorage.refreshToken;

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
