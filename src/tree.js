function Node(node) {
  this.node = node;
  this.left = null;
  this.right = null;
}

function BinaryTree(val) {
  this.root = null;
  this.traverseList = [];
  if (typeof val !== "undefined") {
    this.root = new Node(val);
  } else {
    throw "root is empty";
  }
  this.insert = function(val, dir) {
    const newNode = new Node(val);
    this.root[dir] = newNode;
  };
  this.insertAt = function(node, val, dir) {
    const nodepos = this.levelordertraverse(node);
    const newNode = new Node(val);
    nodepos[dir] = newNode;
  };
  this.levelordertraverse = function(search = -1) {
    const queue = [];
    var current = this.root;
    queue.push(current);
    if ( this.traverseList.length > 0)
      this.traverseList = [];
    while (queue.length > 0) {
      current = queue.shift();
      if (current !== null) {
        if (search === -1) {
          this.traverseList.push(current.node);
        }
        if (current.node === search && search != -1) {
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
  this.preorder = function(node = this.root) {
    if (node === this.root && this.traverseList.length > 0)
      this.traverseList = [];
    if (node !== null) {
      this.traverseList.push(node.node);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  };
  this.postorder = function(node = this.root) {
    if (node === this.root && this.traverseList.length > 0)
      this.traverseList = [];
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      this.traverseList.push(node.node);
    }
  };
  this.inorder = function(node = this.root) {
    if (node === this.root && this.traverseList.length > 0)
      this.traverseList = [];
    if (node !== null) {
      this.inorder(node.left);
      this.traverseList.push(node.node);
      this.inorder(node.right);
    }
  };
  this.init = function(root) {
    const tree = new BinaryTree(root);
    return tree;
  };
  this.getTraversed = function() {
    return this.traverseList;
  };
}
export default BinaryTree;
