class TreeNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class TreeMap {
  constructor() {
    this.root = null;
  }

  // Insert a key-value pair into the tree
  put(key, value) {
    this.root = this._put(this.root, key, value);
  }

  _put(node, key, value) {
    if (node === null) {
      return new TreeNode(key, value);
    }

    if (key < node.key) {
      node.left = this._put(node.left, key, value);
    } else if (key > node.key) {
      node.right = this._put(node.right, key, value);
    } else {
      node.value = value; // Update value if key already exists
    }

    return node;
  }

  // Get the value associated with a key
  get(key) {
    return this._get(this.root, key);
  }

  _get(node, key) {
    if (node === null) {
      return undefined;
    }

    if (key < node.key) {
      return this._get(node.left, key);
    } else if (key > node.key) {
      return this._get(node.right, key);
    } else {
      return node.value;
    }
  }

  // Remove a key-value pair from the tree
  remove(key) {
    this.root = this._remove(this.root, key);
  }

  _remove(node, key) {
    if (node === null) {
      return null;
    }

    if (key < node.key) {
      node.left = this._remove(node.left, key);
    } else if (key > node.key) {
      node.right = this._remove(node.right, key);
    } else {
      // Node to delete found
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node with two children
      let minNode = this._findMin(node.right);
      node.key = minNode.key;
      node.value = minNode.value;
      node.right = this._remove(node.right, minNode.key);
    }

    return node;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Inorder traversal to get sorted key-value pairs
  inorderTraversal() {
    const result = [];
    this._inorder(this.root, result);
    return result;
  }

  _inorder(node, result) {
    if (node !== null) {
      this._inorder(node.left, result);
      result.push([node.key, node.value]);
      this._inorder(node.right, result);
    }
  }
}

// Test the TreeMap
const treeMap = new TreeMap();

treeMap.put(5, "five");
treeMap.put(3, "three");
treeMap.put(7, "seven");
treeMap.put(1, "one");
treeMap.put(9, "nine");

console.log("Initial TreeMap:");
console.log(treeMap.inorderTraversal());

console.log("\nGet value for key 3:", treeMap.get(3));
console.log("Get value for key 6:", treeMap.get(6));

treeMap.put(3, "THREE");
console.log("\nAfter updating key 3:");
console.log(treeMap.inorderTraversal());

treeMap.remove(5);
console.log("\nAfter removing key 5:");
console.log(treeMap.inorderTraversal());

