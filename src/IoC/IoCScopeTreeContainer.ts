import { Tree, TreeNode } from "./Tree/Tree";
import {
  IContainer,
  IoCDependencyFn,
  IoCScopeContainer,
  IScope,
} from "./types";

const treeNode2ScopeDataAdapter = (
  node: TreeNode<IContainer<IoCDependencyFn>>
): IScope<IContainer<IoCDependencyFn>> => ({
  key: String(node.key),
  data: node.data,
});

export class IoCScopeTreeContainer implements IoCScopeContainer {
  tree: Tree<IContainer<IoCDependencyFn>>;
  constructor(rootScopeData: IContainer<IoCDependencyFn>, rootKey: string) {
    this.tree = new Tree<IContainer<IoCDependencyFn>>(rootKey, rootScopeData);
  }

  addScope(
    parentScopeKey: string,
    scopeKey: string,
    data: IContainer<IoCDependencyFn>
  ) {
    this.tree.add(parentScopeKey, scopeKey, data);
  }

  findScope(scopeKey: string) {
    const data = this.tree.findNodeByKey(scopeKey);
    return data ? treeNode2ScopeDataAdapter(data) : undefined;
  }

  removeScope(scopeKey: string) {
    const data = this.tree.findNodeByKey(scopeKey);
    if (data) {
      this.tree.remove(scopeKey);
      return treeNode2ScopeDataAdapter(data);
    }
    return undefined;
  }

  parentScope(scopeKey: string) {
    const data = this.tree.findParentNodeByKey(scopeKey);
    return data ? treeNode2ScopeDataAdapter(data) : undefined;
  }

  root() {
    return treeNode2ScopeDataAdapter(this.tree.root);
  }
}
