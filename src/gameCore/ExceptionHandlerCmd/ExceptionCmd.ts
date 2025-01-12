import { ICommand } from "../../common/ICommand";
import { IExceptionBase } from "../IExceptionHandler";

export enum ExceptionCmdType {
  "unconsistent data" = "unconsistent data",
  "fuel is expended" = "fuel is expended",
}

export class ExceptionCmd implements IExceptionBase {
  constructor(
    readonly msg: string,
    readonly type: string,
    readonly key: string
  ) {}
}

export const makeExceptionCmdKey = (cmdName: string, errType: string) =>
  `${cmdName}_${errType}`;

export const makeExceptionCmd = (
  msg: string,
  type: ExceptionCmdType,
  cmd: ICommand
) =>
  new ExceptionCmd(msg, type, makeExceptionCmdKey(cmd.constructor.name, type));
