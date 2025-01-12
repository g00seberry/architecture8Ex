import { ICommand } from "../common/ICommand";
import { IoC } from "../IoC/IoC";
import { IoCDependencyContainer } from "../IoC/IoCDependencyContainer";
import { IoCDependencyFn } from "../IoC/types";
import { CommandPost2Thread } from "./commands/CommandPost2Thread";
import { CommandRunNewGame } from "./commands/CommandRunNewGame";
import { CommandSeedGames } from "./commands/CommandSeedGames";
import { CommandServerConnectionSend } from "./commands/CommandServerConnectionSend";
import { CommandServerGateInit } from "./commands/CommandServerGateInit";
import { CommandServerRestInit } from "./commands/CommandServerRestInit";
import { getConnectionsAsArray } from "./ConnectionsReg";
import { GameInfo, getGamesRepo } from "./games/GamesRepo";

// элиас, чтобы было удобнее работать со скоупом сервера
export const IoCResolveServer = <T>(
  dependencyName: string
): IoCDependencyFn<T> => IoC.resolve<T>(dependencyName, "server");

export const bootIoC4Server = () => {
  // создадим скоуп для команд сервера
  IoC.resolve<ICommand>("scope.new")(
    new IoCDependencyContainer(),
    "server",
    "root"
  ).execute();

  IoCResolveServer("register")("gate.init", () => {
    new CommandServerGateInit().execute();
  });
  IoCResolveServer("register")("rest.init", () => {
    new CommandServerRestInit().execute();
  });
  IoCResolveServer("register")("game.run", (gId: string) =>
    new CommandRunNewGame(gId).execute()
  );
  IoCResolveServer("register")(
    "thread.postMsg",
    (threadId: string, data: unknown) =>
      new CommandPost2Thread(threadId, data).execute()
  );
  IoCResolveServer("register")("connections.get", () =>
    getConnectionsAsArray()
  );
  IoCResolveServer("register")("gamesRepo.get", () => getGamesRepo());
  IoCResolveServer("register")(
    "gamesRepo.game.makeInfo",
    (id: string, name: string, src: string) =>
      ({ id, name, src, status: "stop" } as GameInfo)
  );
  IoCResolveServer("register")("gamesRepo.game.add", (game: GameInfo) => {
    getGamesRepo().add(game.id, game);
  });
  IoCResolveServer("register")("games.init", () => {
    new CommandSeedGames().execute();
  });
  IoCResolveServer("register")("connection.send.broadcast", (data: unknown) => {
    new CommandServerConnectionSend(data).execute();
  });
};
