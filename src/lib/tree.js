// The tree data structure file for the app to store nodes and performing traversal

function Node(node) {
  // Constructor function to create a node
  this.node = node;
  this.left = null;
  this.right = null;
}

function BinaryTree(val) {
  // Constructor function to create a Binary tree
  this.root = null;
  this.traverseList = [];
  if (typeof val !== "undefined") {
    this.root = new Node(val);
  } else {
    throw "root is empty";
  }
  this.insert = function(val, dir) {
    // Insert node at root to left or right provided as dir
    const newNode = new Node(val);
    this.root[dir] = newNode;
  };
  this.insertAt = function(node, val, dir) {
    // Insert node at specified node to left or right provided as dir
    const nodepos = this.levelordertraverse(node); // Makes use of levelordertraverse api to find the node and insert new node
    const newNode = new Node(val);
    nodepos[dir] = newNode;
  };
  this.levelordertraverse = function(search = -1) {
    // Perform levelorder traversel to return the traversed list or support insertAt api. 
    // If search=-1 then returns traversed list else return the node that was to be searched.
    const queue = [];
    var current = this.root;
    queue.push(current);
    if (this.traverseList.length > 0) this.traverseList = [];
    while (queue.length > 0) {
      current = queue.shift();
      if (current !== null) {
        if (search === -1) {
          this.traverseList.push(current.node);
        }
        if (current.node === search && search !== -1) {
          return current;
        }
        if (current.left !== null) {
          queue.push(current.left);
        }
        if (current.right !== null) {
          queue.push(current.right);
        }
      }
    }
  };
  this.preorder = function(node = this.root) { // Perform preorder traversal of the tree
    if (node === this.root && this.traverseList.length > 0)
      this.traverseList = [];
    if (node !== null) {
      this.traverseList.push(node.node);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  };
  this.postorder = function(node = this.root) { // Perform postorder traversal of the tree
    if (node === this.root && this.traverseList.length > 0)
      this.traverseList = [];
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      this.traverseList.push(node.node);
    }
  };
  this.inorder = function(node = this.root) { // Perform inorder traversal of the tree
    if (node === this.root && this.traverseList.length > 0)
      this.traverseList = [];
    if (node !== null) {
      this.inorder(node.left);
      this.traverseList.push(node.node);
      this.inorder(node.right);
    }
  };
  this.getTraversed = function() { // Get the list of traversed nodes after calling any traversal api
    return this.traverseList;
  };
}
export default BinaryTree;
