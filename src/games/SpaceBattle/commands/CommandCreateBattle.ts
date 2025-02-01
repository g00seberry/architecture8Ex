import { ICommand } from "../../../common/ICommand";
import { checkAuth } from "../api/checkAuth";
import { postBack } from "../postBack";

let battleCount = 0;

export class CommandCreateBattle implements ICommand {
  constructor(readonly data) {}

  async execute() {
    console.log(this.data);
    const isAuthorized = await checkAuth(this.data);
    if (isAuthorized) {
      battleCount++;
      postBack({ gId: "spaceBattle", battleId: battleCount });
    } else {
      battleCount++;
      postBack({ gId: "spaceBattle", error: "unautorized" });
    }
  }
}
