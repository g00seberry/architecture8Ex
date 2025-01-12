import { IStrategy } from "../../common/IStrategy/IStrategy";
import { IoC } from "../IoC";
import { IContainer, IoCDependencyFn, IScope } from "../types";

export class StrategyScopeNew implements IStrategy<IScope> {
  scopeKey: string;
  parentScopeKey: string | undefined;
  depContainer: IContainer<IoCDependencyFn>;
  bind(
    depContainer: IContainer<IoCDependencyFn>,
    scopeKey: string,
    parentScopeKey?: string
  ) {
    this.scopeKey = scopeKey;
    this.parentScopeKey = parentScopeKey;
    this.depContainer = depContainer;
    return this;
  }
  execute() {
    const scopes = IoC.scopes;
    const rootScope = scopes.root();
    const { scopeKey, parentScopeKey } = this;
    const actualParentKey = parentScopeKey ?? rootScope.key;
    scopes.addScope(actualParentKey, scopeKey, this.depContainer);
    return scopes.findScope(scopeKey);
  }
}
