"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyDependencyRegister = void 0;
var StrategyScopeGet_1 = require("./StrategyScopeGet");
var StrategyDependencyRegister = /** @class */ (function () {
    function StrategyDependencyRegister() {
    }
    StrategyDependencyRegister.prototype.bind = function (dependencyName, dependencyFn, scopeKey) {
        this.scopeKey = scopeKey;
        this.dependencyName = dependencyName;
        this.dependencyFn = dependencyFn;
        return this;
    };
    StrategyDependencyRegister.prototype.execute = function () {
        var scope = new StrategyScopeGet_1.StrategyScopeGet().bind(this.scopeKey).execute();
        scope.data.add(this.dependencyName, this.dependencyFn);
    };
    return StrategyDependencyRegister;
}());
exports.StrategyDependencyRegister = StrategyDependencyRegister;
