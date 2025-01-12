import { IExceptionBase } from "./IExceptionBase";

export interface IExceptionHandlerContext {
  err: IExceptionBase;
}
export type ExceptionHandlerFn = (ctx: IExceptionHandlerContext) => void;
export interface IExceptionHandler {
  register(key: string, cb: ExceptionHandlerFn): void;
  handle(ctx: IExceptionHandlerContext): void;
}
