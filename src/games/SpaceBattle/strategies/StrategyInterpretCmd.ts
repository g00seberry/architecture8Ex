import { ICommand } from "../../../common/ICommand";
import { IStrategy } from "../../../common/IStrategy";
import { GameMessage } from "../../../types";
import { IoCResolveGameCore } from "../../../gameCore/bootIoC4GameCore";
import { GameEntity } from "../../../gameCore/Entity";
import { CommandLog, SimpleLogger } from "../../../gameCore/commands";
import { CommandBurnFuel } from "../commands/CommandBurnFuel";
import { CommandMoveLinear } from "../commands/CommandMoveLinear";
import { CommandCreateBattle } from "../commands/CommandCreateBattle";

class AdapteeDataWithEntityId {
  constructor(readonly data: unknown) {}
  getId(): string | undefined {
    const msg = this.data as GameMessage;
    if (msg.type === "std" && msg.data.eId) return msg.data.eId;
    return undefined;
  }
}

const cmdsReg = {
  [CommandLog.name]: (data: unknown) =>
    new CommandLog(new SimpleLogger()).log(data),

  [CommandBurnFuel.name]: (data: unknown) => {
    const e = IoCResolveGameCore<GameEntity | undefined>(
      "entityRegister.entity.get"
    )(String(new AdapteeDataWithEntityId(data).getId()));
    if (!e) return undefined;
    return new CommandBurnFuel().burnFuel(e);
  },

  [CommandMoveLinear.name]: (data: unknown) => {
    const e = IoCResolveGameCore<GameEntity | undefined>(
      "entityRegister.entity.get"
    )(String(new AdapteeDataWithEntityId(data).getId()));
    if (!e) return undefined;
    return new CommandMoveLinear().moveLinear(e);
  },

  [CommandCreateBattle.name]: (data: unknown) => new CommandCreateBattle(data),
};

export class StrategyInterpretCmd implements IStrategy<ICommand | undefined> {
  msg: GameMessage | null = null;

  bind(msg: GameMessage): IStrategy<ICommand> {
    this.msg = msg;
    return this;
  }

  execute() {
    if (this.msg.type === "std") {
      const cmd = cmdsReg[this.msg.data.cmdName];
      return cmd?.(this.msg.data);
    } else return undefined;
  }
}
