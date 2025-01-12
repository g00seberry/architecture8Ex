"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMoveLinear = void 0;
var ExceptionCmd_1 = require("../../../gameCore/ExceptionHandlerCmd/ExceptionCmd");
var AdapteeGEMovable_1 = require("../adapters/AdapteeGEMovable");
var CommandMoveLinear = /** @class */ (function () {
    function CommandMoveLinear() {
        this.entity = null;
    }
    CommandMoveLinear.prototype.moveLinear = function (gameEnt) {
        this.entity = new AdapteeGEMovable_1.AdapteeGEMovable(gameEnt);
        return this;
    };
    CommandMoveLinear.prototype.execute = function () {
        if (!this.entity)
            throw (0, ExceptionCmd_1.makeExceptionCmd)("Unconsistent data. Can`t perform CommandMoveLinear command.", ExceptionCmd_1.ExceptionCmdType["unconsistent data"], this);
        var _a = this.entity, location = _a.location, velocity = _a.velocity;
        this.entity.setLocation(location.add(velocity.getVelocityVector()));
    };
    return CommandMoveLinear;
}());
exports.CommandMoveLinear = CommandMoveLinear;
