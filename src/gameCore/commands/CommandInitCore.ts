import { ICommand } from "../../common/ICommand";
import { getCommandQueue } from "../CommandQueue";
import { getCoreCmd } from "../CoreCmd";
import { getEntityRegister } from "../Entity";
import { getExceptionHadlerCmd } from "../ExceptionHandlerCmd";

export class CommandInitCore implements ICommand {
  async execute() {
    const cmdQueue = getCommandQueue();
    const cmdExceptionHandler = getExceptionHadlerCmd();
    const entityRegister = getEntityRegister();
    const core = getCoreCmd();
    return core.init({
      cmdQueue,
      cmdExceptionHandler,
      entityRegister,
    });
  }
}
