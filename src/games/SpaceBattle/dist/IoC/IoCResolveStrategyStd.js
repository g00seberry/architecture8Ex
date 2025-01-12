"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoCResolveStrategyStd = void 0;
var IoC_1 = require("./IoC");
var IoCResolveStrategyStd = /** @class */ (function () {
    function IoCResolveStrategyStd() {
    }
    IoCResolveStrategyStd.prototype.bind = function (dependencyName, scopeKey) {
        this.dependencyName = dependencyName;
        this.scopeKey = scopeKey;
        return this;
    };
    IoCResolveStrategyStd.prototype.execute = function () {
        var rootScope = IoC_1.IoC.scopes.root();
        var lookingScope = IoC_1.IoC.scopes.findScope(this.scopeKey);
        if (!lookingScope)
            return rootScope.data.get(this.dependencyName);
        while (lookingScope) {
            var dep = lookingScope.data.get(this.dependencyName);
            if (dep)
                return dep;
            lookingScope = IoC_1.IoC.scopes.parentScope(lookingScope.key);
        }
        return undefined;
    };
    return IoCResolveStrategyStd;
}());
exports.IoCResolveStrategyStd = IoCResolveStrategyStd;
