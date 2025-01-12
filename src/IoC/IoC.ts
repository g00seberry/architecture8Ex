import { ICommand } from "../common/ICommand";
import { StrategyScopeNew } from "./operations/StrategyScopeNew";
import { IContainer, IoCDependencyFn, IoCScopeContainer } from "./types";
import { StrategyScopeGet } from "./operations/StrategyScopeGet";
import { StrategyDependencyRegister } from "./operations/StrategyDependencyRegister";
import { IStrategy } from "../common/IStrategy/IStrategy";

export class IoC {
  static scopes: IoCScopeContainer;
  static resolveStrategy: IStrategy<IoCDependencyFn> | null = null;
  static resolve<T>(
    dependencyName: string,
    scopeKey?: string
  ): IoCDependencyFn<T> {
    if (IoC.resolveStrategy === null)
      throw new Error("IoC: resolveStrategy is null");
    return this.resolveStrategy
      .bind(dependencyName, scopeKey)
      .execute() as IoCDependencyFn<T>;
  }
}

export class CommandIoCBootstrap implements ICommand {
  constructor(
    scopes: IoCScopeContainer,
    resolveStrategy: IStrategy<IoCDependencyFn>
  ) {
    IoC.scopes = scopes;
    IoC.resolveStrategy = resolveStrategy;
  }

  execute() {
    const scopes = IoC.scopes;
    const rootScope = scopes.root();
    rootScope.data.add(
      "register",
      (
        dependencyName: string,
        dependencyFn: IoCDependencyFn,
        scopeKey?: string
      ) =>
        new StrategyDependencyRegister()
          .bind(dependencyName, dependencyFn, scopeKey)
          .execute()
    );

    IoC.resolve("register")(
      "scope.new",
      (
        depContainer: IContainer<IoCDependencyFn>,
        scopeKey: string,
        parentScopeKey?: string
      ) => new StrategyScopeNew().bind(depContainer, scopeKey, parentScopeKey)
    );

    IoC.resolve("register")("scope.get", (scopeKey?: string) =>
      new StrategyScopeGet().bind(scopeKey)
    );
  }
}
