export type IoCDependencyFn<T = unknown> = (...args: unknown[]) => T;
export type IoCResolveFn = (dependencyName: string) => IoCDependencyFn;
export type IoCResolveScopeFn = (scopeKey?: string) => IoCResolveFn;

export interface IContainer<T = unknown> {
  get(name: string): T | undefined;
  add(name: string, data: T);
  remove(name: string): T | undefined;
}
export type IScope<TScopeData = unknown> = { key: string; data: TScopeData };
export interface IScopeContainer<TScopeData = unknown> {
  root(): IScope<TScopeData>;
  parentScope(scopeKey: string): IScope<TScopeData> | undefined;
  findScope(scopeKey: string): IScope<TScopeData> | undefined;
  addScope(parentScopeKey: string, scopeKey: string, data: TScopeData);
  removeScope(scopeKey: string): IScope<TScopeData> | undefined;
}
export type IoCScopeContainer = IScopeContainer<IContainer<IoCDependencyFn>>;
