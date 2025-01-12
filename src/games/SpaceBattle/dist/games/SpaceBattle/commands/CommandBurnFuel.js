"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBurnFuel = void 0;
var ExceptionCmd_1 = require("../../../gameCore/ExceptionHandlerCmd/ExceptionCmd");
var CommandBurnFuel = /** @class */ (function () {
    function CommandBurnFuel() {
        this.entity = null;
    }
    CommandBurnFuel.prototype.burnFuel = function (gameEnt) {
        this.entity = gameEnt;
        return this;
    };
    CommandBurnFuel.prototype.execute = function () {
        if (!this.entity)
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Unconsistent data. Can`t perform CommandBurnFuel command.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        if (!("fuelTank" in this.entity))
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Wrong entity type. Can`t perform CommandBurnFuel command.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        var fuelTank = this.entity.fuelTank;
        if (!fuelTank)
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Wrong fuelTank", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        fuelTank.burn();
    };
    return CommandBurnFuel;
}());
exports.CommandBurnFuel = CommandBurnFuel;
