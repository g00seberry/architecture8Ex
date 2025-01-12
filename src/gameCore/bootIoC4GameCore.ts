import { ICommand } from "../common/ICommand";
import { StrategyInterpretCmd } from "../games/SpaceBattle/strategies/StrategyInterpretCmd";
import { IoC } from "../IoC/IoC";
import { IoCDependencyContainer } from "../IoC/IoCDependencyContainer";
import { IoCDependencyFn } from "../IoC/types";
import { GameMessage } from "../types";
import { getCommandQueue } from "./CommandQueue";
import { CommandInitCore } from "./commands/CommandInitCore";
import { CommandPush2CmdQueue } from "./commands/CommandPush2CmdQueue";
import {
  CommandGameLoopStopSoft,
  CommandLoopRun,
  CommandLoopStart,
  CommandLoopStop,
} from "./commands/loop";
import { getCoreCmd } from "./CoreCmd";
import { GameEntity, getEntityRegister } from "./Entity";
import { getExceptionHadlerCmd } from "./ExceptionHandlerCmd";
import { StrategyGetEntity } from "./strategies/StrategyGetEntity";

const scopeName = "gameEngine.core";

export const IoCResolveGameCore = <T>(
  dependencyName: string
): IoCDependencyFn<T> => IoC.resolve<T>(dependencyName, scopeName);

const interpreter = new StrategyInterpretCmd();

const defines = [
  { name: "core.get", cb: () => getCoreCmd() },
  {
    name: "core.init",
    cb: () => new CommandInitCore().execute(),
  },
  {
    name: "loop.run",
    cb: () => new CommandLoopRun().execute(),
  },
  { name: "loop.start", cb: () => new CommandLoopStart().execute() },
  { name: "loop.stop", cb: () => new CommandLoopStop().execute() },
  { name: "loop.stopSoft", cb: () => new CommandGameLoopStopSoft().execute() },
  {
    name: "entityRegister.get",
    cb: () => getEntityRegister(),
  },
  {
    name: "entityRegister.entity.get",
    cb: (entityId: string): GameEntity | undefined =>
      new StrategyGetEntity().bind(entityId).execute(),
  },
  { name: "exceptionHandler.get", cb: () => getExceptionHadlerCmd() },
  { name: "cmdQueue.get", cb: () => getCommandQueue() },
  {
    name: "cmdQueue.push",
    cb: (cmd: ICommand) => new CommandPush2CmdQueue(cmd).execute(),
  },

  {
    name: "interpretCommand",
    cb: (data: GameMessage) => interpreter.bind(data).execute(),
  },
];

export const bootIoC4GameCore = () => {
  IoC.resolve<ICommand>("scope.new")(
    new IoCDependencyContainer(),
    scopeName,
    "root"
  ).execute();

  defines.forEach(({ name, cb }) => IoCResolveGameCore("register")(name, cb));
};
