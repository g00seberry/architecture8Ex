"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandIoCBootstrap = exports.IoC = void 0;
var StrategyScopeNew_1 = require("./operations/StrategyScopeNew");
var StrategyScopeGet_1 = require("./operations/StrategyScopeGet");
var StrategyDependencyRegister_1 = require("./operations/StrategyDependencyRegister");
var IoC = /** @class */ (function () {
    function IoC() {
    }
    IoC.resolve = function (dependencyName, scopeKey) {
        if (IoC.resolveStrategy === null)
            throw new Error("IoC: resolveStrategy is null");
        return this.resolveStrategy
            .bind(dependencyName, scopeKey)
            .execute();
    };
    IoC.resolveStrategy = null;
    return IoC;
}());
exports.IoC = IoC;
var CommandIoCBootstrap = /** @class */ (function () {
    function CommandIoCBootstrap(scopes, resolveStrategy) {
        IoC.scopes = scopes;
        IoC.resolveStrategy = resolveStrategy;
    }
    CommandIoCBootstrap.prototype.execute = function () {
        var scopes = IoC.scopes;
        var rootScope = scopes.root();
        rootScope.data.add("register", function (dependencyName, dependencyFn, scopeKey) {
            return new StrategyDependencyRegister_1.StrategyDependencyRegister()
                .bind(dependencyName, dependencyFn, scopeKey)
                .execute();
        });
        IoC.resolve("register")("scope.new", function (depContainer, scopeKey, parentScopeKey) { return new StrategyScopeNew_1.StrategyScopeNew().bind(depContainer, scopeKey, parentScopeKey); });
        IoC.resolve("register")("scope.get", function (scopeKey) {
            return new StrategyScopeGet_1.StrategyScopeGet().bind(scopeKey);
        });
    };
    return CommandIoCBootstrap;
}());
exports.CommandIoCBootstrap = CommandIoCBootstrap;
