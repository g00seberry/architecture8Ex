import { ICommand } from "../../common/ICommand";
import { getThreadContainer } from "../ThreadContainer";

export class CommandPost2Thread implements ICommand {
  constructor(readonly id: string, readonly data: unknown) {}
  execute() {
    try {
      const reg = getThreadContainer();
      const thread = reg.get(this.id);
      thread?.postMessage(JSON.stringify(this.data));
    } catch (error) {
      console.error(error);
    }
  }
}
