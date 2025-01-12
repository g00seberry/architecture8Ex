import { IContainer, IoCDependencyFn } from "./types";

export class IoCDependencyContainer implements IContainer<IoCDependencyFn> {
  data = new Map<string, IoCDependencyFn>();
  add(dependencyName: string, dependencyData: IoCDependencyFn) {
    if (this.data.has(dependencyName))
      throw Error(
        `IoCDependencyContainer: dependency '${dependencyName}' already registered`
      );
    this.data.set(dependencyName, dependencyData);
  }
  get(dependencyName: string): IoCDependencyFn {
    return this.data.get(dependencyName);
  }
  remove(dependencyName: string): IoCDependencyFn {
    const dep = this.data.get(dependencyName);
    this.data.delete(dependencyName);
    return dep;
  }
}
