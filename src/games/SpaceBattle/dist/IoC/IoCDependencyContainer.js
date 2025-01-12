"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoCDependencyContainer = void 0;
var IoCDependencyContainer = /** @class */ (function () {
    function IoCDependencyContainer() {
        this.data = new Map();
    }
    IoCDependencyContainer.prototype.add = function (dependencyName, dependencyData) {
        if (this.data.has(dependencyName))
            throw Error("IoCDependencyContainer: dependency '".concat(dependencyName, "' already registered"));
        this.data.set(dependencyName, dependencyData);
    };
    IoCDependencyContainer.prototype.get = function (dependencyName) {
        return this.data.get(dependencyName);
    };
    IoCDependencyContainer.prototype.remove = function (dependencyName) {
        var dep = this.data.get(dependencyName);
        this.data.delete(dependencyName);
        return dep;
    };
    return IoCDependencyContainer;
}());
exports.IoCDependencyContainer = IoCDependencyContainer;
