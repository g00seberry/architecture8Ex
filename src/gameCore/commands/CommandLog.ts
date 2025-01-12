import { ICommand } from "../../common/ICommand";

interface ILogger {
  log(data: unknown): void;
}

export class SimpleLogger implements ILogger {
  logReg: string[] = [];
  log(data: unknown): void {
    const strData = JSON.stringify(data);
    this.logReg.push(strData);
    console.log("SimpleLogger:", strData);
  }
}

export class CommandLog implements ICommand {
  data: unknown;
  constructor(readonly logger: ILogger) {}
  log(data: unknown) {
    this.data = data;
    return this;
  }
  execute() {
    this.logger.log(this.data);
  }
}
