import { ICommand } from "../common/ICommand";
import { IStrategy } from "../common/IStrategy/IStrategy";
import { CommandIoCBootstrap, IoC } from "./IoC";
import { IoCDependencyContainer } from "./IoCDependencyContainer";
import { IoCResolveStrategyStd } from "./IoCResolveStrategyStd";
import { IoCScopeTreeContainer } from "./IoCScopeTreeContainer";
import { IScope } from "./types";

test("init IoC", async () => {
  new CommandIoCBootstrap(
    new IoCScopeTreeContainer(new IoCDependencyContainer(), "root"),
    new IoCResolveStrategyStd()
  ).execute();
  const rootScope = IoC.resolve<IStrategy<IScope>>("scope.get")().execute();
  // @ts-ignore
  expect(Array.from(rootScope.data.data.keys())).toEqual([
    "register",
    "scope.new",
    "scope.get",
  ]);
});

test("register test", async () => {
  new CommandIoCBootstrap(
    new IoCScopeTreeContainer(new IoCDependencyContainer(), "root"),
    new IoCResolveStrategyStd()
  ).execute();
  IoC.resolve("register")("inc", (x: number) => x + 1);

  expect(IoC.resolve("inc")(1)).toEqual(2);
});

test("scope tests", async () => {
  new CommandIoCBootstrap(
    new IoCScopeTreeContainer(new IoCDependencyContainer(), "root"),
    new IoCResolveStrategyStd()
  ).execute();

  IoC.resolve<ICommand>("scope.new")(
    new IoCDependencyContainer(),
    "level1",
    "root"
  ).execute();

  IoC.resolve<ICommand>("scope.new")(
    new IoCDependencyContainer(),
    "level2",
    "level1"
  ).execute();

  IoC.resolve("register")("level1fn", () => "level1fn.log", "level1");
  IoC.resolve("register")(
    "overrided",
    () => "level1fn.overrided.log",
    "level1"
  );

  IoC.resolve("register")("level2fn", () => "level2fn.log", "level2");
  IoC.resolve("register")(
    "overrided",
    () => "level2fn.overrided.log",
    "level2"
  );

  const resolveLevel1 = <T>(depName: string) =>
    IoC.resolve<T>(depName, "level1");
  const resolveLevel2 = <T>(depName: string) =>
    IoC.resolve<T>(depName, "level2");

  expect(resolveLevel1("level1fn")()).toEqual("level1fn.log");
  expect(resolveLevel2("level2fn")()).toEqual("level2fn.log");
  expect(resolveLevel2("overrided")()).toEqual("level2fn.overrided.log");
});
