"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_worker_threads_1 = require("node:worker_threads");
var bootIoC4GameCore_1 = require("../../gameCore/bootIoC4GameCore");
var IoC_1 = require("../../IoC/IoC");
var IoCDependencyContainer_1 = require("../../IoC/IoCDependencyContainer");
var IoCResolveStrategyStd_1 = require("../../IoC/IoCResolveStrategyStd");
var IoCScopeTreeContainer_1 = require("../../IoC/IoCScopeTreeContainer");
new IoC_1.CommandIoCBootstrap(new IoCScopeTreeContainer_1.IoCScopeTreeContainer(new IoCDependencyContainer_1.IoCDependencyContainer(), "root"), new IoCResolveStrategyStd_1.IoCResolveStrategyStd()).execute();
var threadId = node_worker_threads_1.workerData.threadId;
var postBack = function (data) {
    node_worker_threads_1.parentPort.postMessage(data);
};
(0, bootIoC4GameCore_1.bootIoC4GameCore)();
(0, bootIoC4GameCore_1.IoCResolveGameCore)("core.init")().then(function () {
    postBack("inited");
    (0, bootIoC4GameCore_1.IoCResolveGameCore)("loop.start")();
    (0, bootIoC4GameCore_1.IoCResolveGameCore)("loop.run")();
});
node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.on("message", function (msg) {
    try {
        var cmd = (0, bootIoC4GameCore_1.IoCResolveGameCore)("interpretCommand")(JSON.parse(msg));
        if (cmd)
            (0, bootIoC4GameCore_1.IoCResolveGameCore)("cmdQueue.push")(cmd);
    }
    catch (error) {
        console.error(error);
    }
});
