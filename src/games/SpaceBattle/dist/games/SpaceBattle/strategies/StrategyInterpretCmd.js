"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyInterpretCmd = void 0;
var bootIoC4GameCore_1 = require("../../../gameCore/bootIoC4GameCore");
var commands_1 = require("../../../gameCore/commands");
var CommandBurnFuel_1 = require("../commands/CommandBurnFuel");
var CommandMoveLinear_1 = require("../commands/CommandMoveLinear");
var AdapteeDataWithEntityId = /** @class */ (function () {
    function AdapteeDataWithEntityId(data) {
        this.data = data;
    }
    AdapteeDataWithEntityId.prototype.getId = function () {
        var msg = this.data;
        if (msg.type === "std" && msg.data.eId)
            return msg.data.eId;
        return undefined;
    };
    return AdapteeDataWithEntityId;
}());
var cmdsReg = (_a = {},
    _a[commands_1.CommandLog.name] = function (data) {
        return new commands_1.CommandLog(new commands_1.SimpleLogger()).log(data);
    },
    _a[CommandBurnFuel_1.CommandBurnFuel.name] = function (data) {
        var e = (0, bootIoC4GameCore_1.IoCResolveGameCore)("entityRegister.entity.get")(String(new AdapteeDataWithEntityId(data).getId()));
        if (!e)
            return undefined;
        return new CommandBurnFuel_1.CommandBurnFuel().burnFuel(e);
    },
    _a[CommandMoveLinear_1.CommandMoveLinear.name] = function (data) {
        var e = (0, bootIoC4GameCore_1.IoCResolveGameCore)("entityRegister.entity.get")(String(new AdapteeDataWithEntityId(data).getId()));
        if (!e)
            return undefined;
        return new CommandMoveLinear_1.CommandMoveLinear().moveLinear(e);
    },
    _a);
var StrategyInterpretCmd = /** @class */ (function () {
    function StrategyInterpretCmd() {
        this.msg = null;
    }
    StrategyInterpretCmd.prototype.bind = function (msg) {
        this.msg = msg;
        return this;
    };
    StrategyInterpretCmd.prototype.execute = function () {
        if (this.msg.type === "std") {
            var cmd = cmdsReg[this.msg.data.cmdName];
            return cmd === null || cmd === void 0 ? void 0 : cmd(this.msg.data);
        }
        else
            return undefined;
    };
    return StrategyInterpretCmd;
}());
exports.StrategyInterpretCmd = StrategyInterpretCmd;
