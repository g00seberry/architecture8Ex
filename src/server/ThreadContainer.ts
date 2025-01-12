import { Worker } from "worker_threads";
import { IContainer } from "../IoC/types";

export class ThreadContainer implements IContainer<Worker> {
  reg = new Map<string, Worker>();
  add(id: string, data: Worker) {
    this.reg.set(id, data);
  }
  get(id: string): Worker | undefined {
    return this.reg.get(id);
  }
  remove(id: string): Worker | undefined {
    const w = this.get(id);
    this.reg.delete(id);
    return w;
  }
}

const threadReg = new ThreadContainer();

export const getThreadContainer = (): IContainer<Worker> => threadReg;
