import { ICommand } from "../../common/ICommand";
import { getCommandQueue } from "../CommandQueue";

export class CommandPush2CmdQueue implements ICommand {
  constructor(readonly cmd: ICommand) {}
  execute() {
    const q = getCommandQueue();
    q.enqueue(this.cmd);
  }
}
