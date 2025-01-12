import { ICommand } from "../../common/ICommand";
import { IQueue } from "../../common/IQueue";
import { IGameEntityRegister } from "../Entity";
import { IExceptionHandler } from "../IExceptionHandler";

export type CoreStatus = "ready" | "fail" | "wait" | "created";

export type CoreConfig = {
  cmdQueue: IQueue<ICommand>;
  cmdExceptionHandler: IExceptionHandler;
  entityRegister: IGameEntityRegister;
};
