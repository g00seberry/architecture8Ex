"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyScopeNew = void 0;
var IoC_1 = require("../IoC");
var StrategyScopeNew = /** @class */ (function () {
    function StrategyScopeNew() {
    }
    StrategyScopeNew.prototype.bind = function (depContainer, scopeKey, parentScopeKey) {
        this.scopeKey = scopeKey;
        this.parentScopeKey = parentScopeKey;
        this.depContainer = depContainer;
        return this;
    };
    StrategyScopeNew.prototype.execute = function () {
        var scopes = IoC_1.IoC.scopes;
        var rootScope = scopes.root();
        var _a = this, scopeKey = _a.scopeKey, parentScopeKey = _a.parentScopeKey;
        var actualParentKey = parentScopeKey !== null && parentScopeKey !== void 0 ? parentScopeKey : rootScope.key;
        scopes.addScope(actualParentKey, scopeKey, this.depContainer);
        return scopes.findScope(scopeKey);
    };
    return StrategyScopeNew;
}());
exports.StrategyScopeNew = StrategyScopeNew;
