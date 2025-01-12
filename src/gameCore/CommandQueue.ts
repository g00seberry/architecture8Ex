import { ICommand } from "../common/ICommand";
import { IQueue } from "../common/IQueue/IQueue";

export class CommandQueue implements IQueue<ICommand> {
  list: ICommand[] = [];
  enqueue(item: ICommand) {
    this.list.push(item);
  }
  dequeue(): ICommand | undefined {
    return this.list.shift();
  }
  isEmpty(): boolean {
    return this.list.length === 0;
  }
}

// только одна очередь команд на игру
const cmdQueue = new CommandQueue();
export const getCommandQueue = () => cmdQueue;
