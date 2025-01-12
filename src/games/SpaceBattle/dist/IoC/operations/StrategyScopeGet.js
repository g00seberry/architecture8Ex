"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyScopeGet = void 0;
var IoC_1 = require("../IoC");
var StrategyScopeGet = /** @class */ (function () {
    function StrategyScopeGet() {
    }
    StrategyScopeGet.prototype.bind = function (scopeKey) {
        this.scopeKey = scopeKey;
        return this;
    };
    StrategyScopeGet.prototype.execute = function () {
        var root = IoC_1.IoC.scopes.root();
        var actualScope = this.scopeKey
            ? IoC_1.IoC.scopes.findScope(this.scopeKey)
            : root;
        if (!actualScope)
            throw Error("undefined scope key ".concat(this.scopeKey));
        return actualScope;
    };
    return StrategyScopeGet;
}());
exports.StrategyScopeGet = StrategyScopeGet;
