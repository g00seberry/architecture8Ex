import { WebSocket } from "ws";
import { IConnection } from "./IConnection";

export class WSConnection implements IConnection {
  constructor(readonly ws: WebSocket) {}
  send(data: unknown) {
    this.ws.send(JSON.stringify(data));
  }
}
