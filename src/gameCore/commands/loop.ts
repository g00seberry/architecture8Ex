import { ICommand } from "../../common/ICommand";
import { getCoreCmd } from "../CoreCmd";
import { makeExceptionHadlerContextCmd } from "../ExceptionHandlerCmd/ExceptionHandlerCmd";

let isGameLoopActive = false;

export class CommandLoopRun implements ICommand {
  async execute() {
    const core = getCoreCmd();
    const { cmdExceptionHandler, cmdQueue } = core.config;
    while (isGameLoopActive) {
      const cmd = cmdQueue.dequeue();
      try {
        if (cmd) {
          cmd.execute();
        } else {
          await new Promise((res) => setTimeout(res, 10));
        }
      } catch (error) {
        cmdExceptionHandler.handle(makeExceptionHadlerContextCmd(cmd, error));
      }
    }
  }
}

export class CommandLoopStart implements ICommand {
  execute() {
    isGameLoopActive = true;
  }
}
export class CommandLoopStop implements ICommand {
  execute() {
    isGameLoopActive = false;
  }
}

export class CommandGameLoopStopSoft implements ICommand {
  execute() {
    new CommandLoopStop().execute();
    const core = getCoreCmd();
    const { cmdExceptionHandler, cmdQueue } = core.config;
    while (!cmdQueue.isEmpty()) {
      const cmd = cmdQueue.dequeue();
      try {
        cmd.execute();
      } catch (error) {
        cmdExceptionHandler.handle(makeExceptionHadlerContextCmd(cmd, error));
      }
    }
  }
}
