"use strict";
/**
 * Простое дерево, чтобы смоделировать скоупы, в нем много недочетов, но не будем на этом останавливаться.
 * Скоупы будут моделироваться через интерфейс, поэтому реализацию дерева всегда можно будет подменить
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
var Tree = /** @class */ (function () {
    function Tree(key, rootData) {
        this.root = rootData ? { key: key, data: rootData, children: [] } : null;
    }
    Tree.prototype.add = function (parentKey, childKey, childData) {
        var parentNode = this.findNodeByKey(parentKey);
        if (parentNode) {
            var newChild = {
                key: childKey,
                data: childData,
                children: [],
            };
            parentNode.children.push(newChild);
            return true;
        }
        return false;
    };
    Tree.prototype.findNodeByKey = function (key) {
        return this._findNodeByKeyRecursive(this.root, key);
    };
    Tree.prototype._findNodeByKeyRecursive = function (node, key) {
        if (!node)
            return undefined;
        if (node.key === key)
            return node;
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var found = this._findNodeByKeyRecursive(child, key);
            if (found)
                return found;
        }
        return undefined;
    };
    Tree.prototype.findParentNodeByKey = function (key) {
        return this._findParentNodeByKeyRecursive(this.root, key);
    };
    Tree.prototype._findParentNodeByKeyRecursive = function (node, key) {
        var _a;
        if (!node)
            return undefined;
        var setKeys = new Set((_a = node.children) === null || _a === void 0 ? void 0 : _a.map(function (e) { return e.key; }));
        if (setKeys.has(key))
            return node;
        for (var _i = 0, _b = node.children; _i < _b.length; _i++) {
            var child = _b[_i];
            var found = this._findParentNodeByKeyRecursive(child, key);
            if (found)
                return found;
        }
        return undefined;
    };
    Tree.prototype.remove = function (key) {
        if (!this.root)
            return false;
        if (this.root.key === key) {
            this.root = null;
            return true;
        }
        return this._removeNodeRecursive(this.root, key);
    };
    Tree.prototype._removeNodeRecursive = function (node, key) {
        for (var i = 0; i < node.children.length; i++) {
            if (node.children[i].key === key) {
                node.children.splice(i, 1);
                return true;
            }
            if (this._removeNodeRecursive(node.children[i], key))
                return true;
        }
        return false;
    };
    return Tree;
}());
exports.Tree = Tree;
