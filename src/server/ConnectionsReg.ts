import { IContainer } from "../IoC/types";
import { IConnection } from "./IConnection";

class ConnectionsReg implements IContainer<IConnection> {
  reg: Record<string, IConnection> = {};
  add(name: string, data: IConnection) {
    this.reg[name] = data;
  }
  remove(name: string) {
    const data = this.reg[name];
    delete this.reg[name];
    return data;
  }
  get(name: string) {
    return this.reg[name];
  }
}

const connectionsRegister = new ConnectionsReg();

export const getConnectionsRegister = (): IContainer<IConnection> =>
  connectionsRegister;

export const getConnectionsAsArray = () =>
  Object.entries(connectionsRegister.reg);
