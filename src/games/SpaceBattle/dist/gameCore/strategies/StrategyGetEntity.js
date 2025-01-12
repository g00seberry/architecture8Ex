"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyGetEntity = void 0;
var Entity_1 = require("../Entity");
var StrategyGetEntity = /** @class */ (function () {
    function StrategyGetEntity() {
        this.entityId = "";
    }
    StrategyGetEntity.prototype.bind = function (entityId) {
        this.entityId = entityId;
        return this;
    };
    StrategyGetEntity.prototype.execute = function () {
        var reg = (0, Entity_1.getEntityRegister)();
        return reg.getEntity(String(this.entityId));
    };
    return StrategyGetEntity;
}());
exports.StrategyGetEntity = StrategyGetEntity;
