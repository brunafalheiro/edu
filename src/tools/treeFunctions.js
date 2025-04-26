class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
		this.isBeingVisited = false;
		this.found = false;
	}
}

class TreeFunctions {
  static createTree({ treeStore, rootValue }) {
    treeStore.value = new TreeNode(rootValue);
  }

  static async insertNode(tree, value, animate = true, onLineChange = null) {
    if (!tree) {
      if (onLineChange) onLineChange(1);
      return new TreeNode(value);
    }
    
    if (animate) {
      tree.isBeingVisited = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      tree.isBeingVisited = false;
    }
    
    if (value < tree.value) {
      if (onLineChange) onLineChange(3);
      tree.left = await TreeFunctions.insertNode(tree.left, value, animate, onLineChange);
      return tree;
    }
  
    if (value > tree.value) {
      if (onLineChange) onLineChange(4);
      tree.right = await TreeFunctions.insertNode(tree.right, value, animate, onLineChange);
      return tree;
    }
    
    if (onLineChange) onLineChange(6);
    return tree;
  }
  
  static async generateRandomTree(nodeCount) {
    if (nodeCount <= 0) return null;

    let usedValues = new Set();
    while (usedValues.size < nodeCount) {
      usedValues.add(Math.floor(Math.random() * 101));
    }

    let values = [...usedValues];
    let root = new TreeNode(values[0]);

    for (let i = 1; i < values.length; i++) {
      await TreeFunctions.insertNode(root, values[i], false);
    }

    return root;
  }

  static async removeNode(tree, value, onLineChange = null) {
    if (!tree) {
      if (onLineChange) onLineChange(1);
      return null;
    }

    tree.isBeingVisited = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    tree.isBeingVisited = false;

    if (value < tree.value) {
      if (onLineChange) onLineChange(2);
      tree.left = await TreeFunctions.removeNode(tree.left, value, onLineChange);
      return tree;
    }

    if (value > tree.value) {
      if (onLineChange) onLineChange(3);
      tree.right = await TreeFunctions.removeNode(tree.right, value, onLineChange);
      return tree;
    }

    if (!tree.left && !tree.right) {
      if (onLineChange) onLineChange(5);
      return null;
    }

    if (!tree.left) {
      if (onLineChange) onLineChange(6);
      return tree.right;
    }
    
    if (!tree.right) {
      if (onLineChange) onLineChange(6);
      return tree.left;
    }

    if (onLineChange) onLineChange(8);
    let minValueNode = TreeFunctions.findMinNode(tree.right);
    tree.value = minValueNode.value;
    tree.right = await TreeFunctions.removeNode(tree.right, minValueNode.value, onLineChange);
    return tree;
  }

  static findMinNode(tree) {
    while (tree.left) tree = tree.left;
    return tree;
  }

  static async searchNode(tree, value, onLineChange = null) {
    if (!tree) {
      if (onLineChange) onLineChange(1);
      return null;
    }

    TreeFunctions.resetFoundFlag(tree);

    tree.isBeingVisited = true;
    await new Promise(resolve => setTimeout(resolve, 500));

    if (tree.value === value) {
      if (onLineChange) onLineChange(2);
      tree.isBeingVisited = false;
      tree.found = true; 
      return tree;
    }

    tree.isBeingVisited = false;

    if (value < tree.value) {
      if (onLineChange) onLineChange(3);
      return TreeFunctions.searchNode(tree.left, value, onLineChange);
    }
    if (onLineChange) onLineChange(4);
    return TreeFunctions.searchNode(tree.right, value, onLineChange);
  }

  static resetFoundFlag(tree) {
    if (!tree) return;
    tree.found = false;
    TreeFunctions.resetFoundFlag(tree.left);
    TreeFunctions.resetFoundFlag(tree.right);
  }
}

export { TreeFunctions };
