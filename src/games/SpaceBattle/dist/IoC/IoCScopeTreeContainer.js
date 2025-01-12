"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoCScopeTreeContainer = void 0;
var Tree_1 = require("./Tree/Tree");
var treeNode2ScopeDataAdapter = function (node) { return ({
    key: String(node.key),
    data: node.data,
}); };
var IoCScopeTreeContainer = /** @class */ (function () {
    function IoCScopeTreeContainer(rootScopeData, rootKey) {
        this.tree = new Tree_1.Tree(rootKey, rootScopeData);
    }
    IoCScopeTreeContainer.prototype.addScope = function (parentScopeKey, scopeKey, data) {
        this.tree.add(parentScopeKey, scopeKey, data);
    };
    IoCScopeTreeContainer.prototype.findScope = function (scopeKey) {
        var data = this.tree.findNodeByKey(scopeKey);
        return data ? treeNode2ScopeDataAdapter(data) : undefined;
    };
    IoCScopeTreeContainer.prototype.removeScope = function (scopeKey) {
        var data = this.tree.findNodeByKey(scopeKey);
        if (data) {
            this.tree.remove(scopeKey);
            return treeNode2ScopeDataAdapter(data);
        }
        return undefined;
    };
    IoCScopeTreeContainer.prototype.parentScope = function (scopeKey) {
        var data = this.tree.findParentNodeByKey(scopeKey);
        return data ? treeNode2ScopeDataAdapter(data) : undefined;
    };
    IoCScopeTreeContainer.prototype.root = function () {
        return treeNode2ScopeDataAdapter(this.tree.root);
    };
    return IoCScopeTreeContainer;
}());
exports.IoCScopeTreeContainer = IoCScopeTreeContainer;
