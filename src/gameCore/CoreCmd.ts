import { CoreConfig } from "./ICore/ICore";

export class CoreCmd {
  config: CoreConfig;
  async init(cnf: CoreConfig) {
    this.config = cnf;
    return this;
  }
}
const core = new CoreCmd();

export const getCoreCmd = () => core;
