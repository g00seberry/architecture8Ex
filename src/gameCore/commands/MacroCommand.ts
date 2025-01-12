import { ICommand } from "../../common/ICommand";

export class MacroCommand implements ICommand {
  commands: ICommand[] = [];
  bind(commands: ICommand[]) {
    this.commands = commands;
  }
  execute() {
    this.commands.forEach((cmd) => cmd.execute());
  }
}
