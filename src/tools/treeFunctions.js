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

  static insertNode(tree, value) {
    if (!tree) return new TreeNode(value);
    
    if (value < tree.value) {
      tree.left = TreeFunctions.insertNode(tree.left, value);
      return tree;
    }
  
    if (value > tree.value) {
      tree.right = TreeFunctions.insertNode(tree.right, value);
      return tree;
    }
    
    return tree;
  }
  
  static generateRandomTree(nodeCount) {
    if (nodeCount <= 0) return null;

    let usedValues = new Set();
    while (usedValues.size < nodeCount) {
      usedValues.add(Math.floor(Math.random() * 101));
    }

    let values = [...usedValues];
    let root = new TreeNode(values[0]);

    for (let i = 1; i < values.length; i++) {
      TreeFunctions.insertNode(root, values[i]);
    }

    return root;
  }

  static async removeNode(tree, value) {
    if (!tree) return null;

    // Mark the node as being visited
    tree.isBeingVisited = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    tree.isBeingVisited = false;

    if (value < tree.value) {
      tree.left = await TreeFunctions.removeNode(tree.left, value);
      return tree;
    }

    if (value > tree.value) {
      tree.right = await TreeFunctions.removeNode(tree.right, value);
      return tree;
    }

    // Case 1: Node without child
    if (!tree.left && !tree.right) return null;

    // Case 2: Node with one child
    if (!tree.left) return tree.right;
    if (!tree.right) return tree.left;

    // Case 3: Node with two children
    let minValueNode = TreeFunctions.findMinNode(tree.right);
    tree.value = minValueNode.value;
    tree.right = await TreeFunctions.removeNode(tree.right, minValueNode.value);
    return tree;
  }

  // Auxiliar function to find the node with the smallest value in a subtree
  static findMinNode(tree) {
    while (tree.left) tree = tree.left;
    return tree;
  }

  static async searchNode(tree, value) {
    if (!tree) return null;

    // Reset the 'found' flag in the tree
    TreeFunctions.resetFoundFlag(tree);

    // Highlight the node being visited
    tree.isBeingVisited = true;
    await new Promise(resolve => setTimeout(resolve, 500));

    if (tree.value === value) {
      tree.isBeingVisited = false;
      tree.found = true; 
      return tree;
    }

    tree.isBeingVisited = false;

    if (value < tree.value) return TreeFunctions.searchNode(tree.left, value);
    return TreeFunctions.searchNode(tree.right, value);
  }

  // Auxiliar function to reset the 'found' flag in the tree
  static resetFoundFlag(tree) {
    if (!tree) return;
    tree.found = false;
    TreeFunctions.resetFoundFlag(tree.left);
    TreeFunctions.resetFoundFlag(tree.right);
  }
}

export { TreeFunctions };
