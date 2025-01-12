import { ICommand } from "../../common/ICommand";
import { IoCResolveServer } from "../bootIoC4Server";

export class CommandSeedGames implements ICommand {
  execute() {
    IoCResolveServer("gamesRepo.game.add")(
      IoCResolveServer("gamesRepo.game.makeInfo")(
        "SpaceBattle",
        "Space Battle!",
        "games/SpaceBattle/dist/games/SpaceBattle/index.js"
      )
    );
  }
}
