import { ICommand } from "../../common/ICommand";
import { IExceptionHandler } from "../IExceptionHandler";
import { IExceptionBase } from "../IExceptionHandler/IExceptionBase";
import {
  IExceptionHandlerContext,
  ExceptionHandlerFn,
} from "../IExceptionHandler/IExceptionHandler";

export class ExceptionHandlerContextCmd implements IExceptionHandlerContext {
  cmd: ICommand;
  err: IExceptionBase;
  constructor(newCmd: ICommand, newErr: IExceptionBase) {
    this.cmd = newCmd;
    this.err = newErr;
  }
}

export const makeExceptionHadlerContextCmd = (
  newCmd: ICommand,
  newErr: IExceptionBase
): IExceptionHandlerContext => new ExceptionHandlerContextCmd(newCmd, newErr);

export class ExceptionHandlerCmd implements IExceptionHandler {
  // пока что пусть будет один обработчик на исключение
  handlers: Map<string, ExceptionHandlerFn> = new Map();
  handle(ctx: ExceptionHandlerContextCmd): void {
    const {
      err: { key },
    } = ctx;
    const handler = this.handlers.get(key);
    // должно быть исклчение или дефолтная обработка ?
    handler?.(ctx);
  }
  register(key: string, cb: ExceptionHandlerFn): void {
    // тут нужны проверки
    this.handlers.set(key, cb);
  }
}
