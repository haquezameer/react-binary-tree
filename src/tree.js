function Node(node) {
  this.node = node;
  this.left = null;
  this.right = null;
}

function BinaryTree(val) {
  var root;
  //   console.log(val);
  if (typeof val !== undefined) {
    this.root = new Node(val);
  } else throw "root is empty";
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

    while (queue.length > 0) {
      current = queue.shift();
      if (current !== null) {
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
}

var tree = new BinaryTree(5);
tree.insert(6, "left");
tree.insert(7, "right");
tree.levelordertraverse();
tree.insertAt(6, 10, "left");
console.log(JSON.stringify(tree));
