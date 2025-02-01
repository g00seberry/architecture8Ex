import { ICommand } from "../../common/ICommand";
import { signUpInGame } from "../api/game";
import { GameAuthInfo } from "../api/types";

export class CommandSignUpInGame implements ICommand {
  constructor(readonly data: GameAuthInfo) {}

  async execute(): Promise<void> {
    try {
      await signUpInGame(this.data);
    } catch (error) {
      console.error(error);
    }
  }
}
