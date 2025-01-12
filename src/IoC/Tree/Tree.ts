/**
 * Простое дерево, чтобы смоделировать скоупы, в нем много недочетов, но не будем на этом останавливаться.
 * Скоупы будут моделироваться через интерфейс, поэтому реализацию дерева всегда можно будет подменить
 */

type Key = string | number;

export interface TreeNode<T> {
  key: Key;
  data: T;
  children: TreeNode<T>[];
}

export class Tree<T> {
  root: TreeNode<T> | null;

  constructor(key: Key, rootData?: T) {
    this.root = rootData ? { key, data: rootData, children: [] } : null;
  }

  add(parentKey: Key, childKey: Key, childData: T): boolean {
    const parentNode = this.findNodeByKey(parentKey);
    if (parentNode) {
      const newChild: TreeNode<T> = {
        key: childKey,
        data: childData,
        children: [],
      };
      parentNode.children.push(newChild);
      return true;
    }
    return false;
  }

  findNodeByKey(key: Key): TreeNode<T> | undefined {
    return this._findNodeByKeyRecursive(this.root, key);
  }

  private _findNodeByKeyRecursive(
    node: TreeNode<T> | undefined,
    key: Key
  ): TreeNode<T> | undefined {
    if (!node) return undefined;
    if (node.key === key) return node;
    for (const child of node.children) {
      const found = this._findNodeByKeyRecursive(child, key);
      if (found) return found;
    }
    return undefined;
  }

  findParentNodeByKey(key: Key): TreeNode<T> | undefined {
    return this._findParentNodeByKeyRecursive(this.root, key);
  }

  private _findParentNodeByKeyRecursive(
    node: TreeNode<T> | undefined,
    key: Key
  ): TreeNode<T> | undefined {
    if (!node) return undefined;
    const setKeys = new Set(node.children?.map((e) => e.key));
    if (setKeys.has(key)) return node;
    for (const child of node.children) {
      const found = this._findParentNodeByKeyRecursive(child, key);
      if (found) return found;
    }
    return undefined;
  }

  remove(key: Key): boolean {
    if (!this.root) return false;
    if (this.root.key === key) {
      this.root = null;
      return true;
    }
    return this._removeNodeRecursive(this.root, key);
  }

  private _removeNodeRecursive(node: TreeNode<T>, key: Key): boolean {
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].key === key) {
        node.children.splice(i, 1);
        return true;
      }
      if (this._removeNodeRecursive(node.children[i], key)) return true;
    }
    return false;
  }
}
