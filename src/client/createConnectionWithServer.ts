import { ClientRequestArgs } from "http";
import { WebSocket } from "ws";
import { IStrategy } from "../common/IStrategy";
import { getAccessToken } from "./commands/CommandAuthInGame";
import { IConnection } from "./IConnection";

class ConnectionStd implements IConnection {
  constructor(readonly socket: WebSocket) {}
  send(data: unknown): void {
    this.socket.send(JSON.stringify(data));
  }
  on(name: string, cb: (...args: any[]) => void) {
    this.socket.on(name, cb);
  }
}

class StrategyCreateNewConnection implements IStrategy<Promise<IConnection>> {
  socket: WebSocket | null = null;
  options: ClientRequestArgs | null = null;
  url: string = "";
  bind(
    url: string,
    options: ClientRequestArgs
  ): IStrategy<Promise<IConnection>> {
    this.url = url;
    this.options = options;
    return this;
  }

  async execute(): Promise<IConnection> {
    return new Promise((res) => {
      this.socket = new WebSocket(this.url, this.options);
      this.socket.on("open", () => {
        console.log(`socket opened on ${this.url}`);
        res(new ConnectionStd(this.socket));
      });
      this.socket.on("message", (data) => {
        console.log(data);
      });
    });
  }
}

let conn: IConnection | null = null;

export const createConnectionWithServer = async (): Promise<IConnection> => {
  if (!conn)
    conn = await new StrategyCreateNewConnection()
      .bind("ws://localhost:8080", {
        headers: { "x-client-token": getAccessToken() },
      })
      .execute();
  return conn;
};
export const getConnectionWithServer = (): IConnection => {
  if (!conn) throw Error("connection is not set");
  return conn;
};
