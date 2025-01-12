import { ICommand } from "../../common/ICommand";

export class CommandThreadPostMsg implements ICommand {
  constructor(
    readonly threadId: string,
    readonly msgName: string,
    readonly data: unknown
  ) {}
  execute() {
    let payload = { threadId: this.threadId, data: this.data };
    postMessage(this.msgName, JSON.stringify(payload));
  }
}
