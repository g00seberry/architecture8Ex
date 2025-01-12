import { ICommand } from "../../common/ICommand";
import { IoCResolveServer } from "../bootIoC4Server";
import { IConnection } from "../IConnection";

export class CommandServerConnectionSend implements ICommand {
  constructor(readonly data: unknown) {}
  execute() {
    const connections =
      IoCResolveServer<[string, IConnection][]>("connections.get")();
    connections.forEach(([_, con]) => con.send(JSON.stringify(this.data)));
  }
}
