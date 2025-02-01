import { CommandIoCBootstrap, IoC } from "../IoC/IoC";
import { IoCDependencyContainer } from "../IoC/IoCDependencyContainer";
import { IoCResolveStrategyStd } from "../IoC/IoCResolveStrategyStd";
import { IoCScopeTreeContainer } from "../IoC/IoCScopeTreeContainer";
import { IoCDependencyFn } from "../IoC/types";
import { GameMessage } from "../types";
import { entityMove } from "./api/entity";
import { runGame, sendMessage2Game } from "./api/game";
import { GameAuthInfo } from "./api/types";
import { CommandAuthInGame } from "./commands/CommandAuthInGame";
import { CommandSignUpInGame } from "./commands/CommandSignUpInGame";
import { createConnectionWithServer } from "./createConnectionWithServer";

export const IoCResolveClient = <T>(
  dependencyName: string
): IoCDependencyFn<T> => IoC.resolve<T>(dependencyName);

export const bootIoC4Client = () => {
  new CommandIoCBootstrap(
    new IoCScopeTreeContainer(new IoCDependencyContainer(), "root"),
    new IoCResolveStrategyStd()
  ).execute();

  IoCResolveClient("register")("game.sign-up", (data: GameAuthInfo) =>
    new CommandSignUpInGame(data).execute()
  );

  IoCResolveClient("register")("game.auth", (data: GameAuthInfo) =>
    new CommandAuthInGame(data).execute()
  );

  IoCResolveClient("register")("connection.init", () =>
    createConnectionWithServer()
  );

  IoCResolveClient("register")("game.run", (id: string) => runGame(id));

  IoCResolveClient("register")(
    "game.message",
    (id: string, data: GameMessage) => sendMessage2Game(id, data)
  );

  IoCResolveClient("register")("api.entity.move", (eId: string, gId: string) =>
    entityMove(eId, gId)
  );

  IoCResolveClient("register")("game.battle.create", () =>
    IoCResolveClient("game.message")("SpaceBattle", {
      data: { eId: "SpaceBattle", cmdName: "CmdCreateBattle" },
      type: "std",
    } as GameMessage)
  );
};
