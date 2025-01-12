"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootIoC4GameCore = exports.IoCResolveGameCore = void 0;
var StrategyInterpretCmd_1 = require("../games/SpaceBattle/strategies/StrategyInterpretCmd");
var IoC_1 = require("../IoC/IoC");
var IoCDependencyContainer_1 = require("../IoC/IoCDependencyContainer");
var CommandQueue_1 = require("./CommandQueue");
var CommandInitCore_1 = require("./commands/CommandInitCore");
var CommandPush2CmdQueue_1 = require("./commands/CommandPush2CmdQueue");
var loop_1 = require("./commands/loop");
var CoreCmd_1 = require("./CoreCmd");
var Entity_1 = require("./Entity");
var ExceptionHandlerCmd_1 = require("./ExceptionHandlerCmd");
var StrategyGetEntity_1 = require("./strategies/StrategyGetEntity");
var scopeName = "gameEngine.core";
var IoCResolveGameCore = function (dependencyName) { return IoC_1.IoC.resolve(dependencyName, scopeName); };
exports.IoCResolveGameCore = IoCResolveGameCore;
var interpreter = new StrategyInterpretCmd_1.StrategyInterpretCmd();
var defines = [
    { name: "core.get", cb: function () { return (0, CoreCmd_1.getCoreCmd)(); } },
    {
        name: "core.init",
        cb: function () { return new CommandInitCore_1.CommandInitCore().execute(); },
    },
    {
        name: "loop.run",
        cb: function () { return new loop_1.CommandLoopRun().execute(); },
    },
    { name: "loop.start", cb: function () { return new loop_1.CommandLoopStart().execute(); } },
    { name: "loop.stop", cb: function () { return new loop_1.CommandLoopStop().execute(); } },
    { name: "loop.stopSoft", cb: function () { return new loop_1.CommandGameLoopStopSoft().execute(); } },
    {
        name: "entityRegister.get",
        cb: function () { return (0, Entity_1.getEntityRegister)(); },
    },
    {
        name: "entityRegister.entity.get",
        cb: function (entityId) {
            return new StrategyGetEntity_1.StrategyGetEntity().bind(entityId).execute();
        },
    },
    { name: "exceptionHandler.get", cb: function () { return (0, ExceptionHandlerCmd_1.getExceptionHadlerCmd)(); } },
    { name: "cmdQueue.get", cb: function () { return (0, CommandQueue_1.getCommandQueue)(); } },
    {
        name: "cmdQueue.push",
        cb: function (cmd) { return new CommandPush2CmdQueue_1.CommandPush2CmdQueue(cmd).execute(); },
    },
    {
        name: "interpretCommand",
        cb: function (data) { return interpreter.bind(data).execute(); },
    },
];
var bootIoC4GameCore = function () {
    IoC_1.IoC.resolve("scope.new")(new IoCDependencyContainer_1.IoCDependencyContainer(), scopeName, "root").execute();
    defines.forEach(function (_a) {
        var name = _a.name, cb = _a.cb;
        return (0, exports.IoCResolveGameCore)("register")(name, cb);
    });
};
exports.bootIoC4GameCore = bootIoC4GameCore;
