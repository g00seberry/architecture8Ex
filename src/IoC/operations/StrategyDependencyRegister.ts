import { IStrategy } from "../../common/IStrategy/IStrategy";
import { IoCDependencyFn } from "../types";
import { StrategyScopeGet } from "./StrategyScopeGet";

export class StrategyDependencyRegister implements IStrategy<void> {
  scopeKey: string | undefined;
  dependencyName: string;
  dependencyFn: IoCDependencyFn;
  bind(
    dependencyName: string,
    dependencyFn: IoCDependencyFn,
    scopeKey?: string
  ) {
    this.scopeKey = scopeKey;
    this.dependencyName = dependencyName;
    this.dependencyFn = dependencyFn;
    return this;
  }
  execute() {
    const scope = new StrategyScopeGet().bind(this.scopeKey).execute();
    scope.data.add(this.dependencyName, this.dependencyFn);
  }
}
