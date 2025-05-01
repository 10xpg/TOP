import { Node, mergeSort, Queue } from './helpers.js'

class Tree {
  constructor(array = [], root = null) {
    this.array = array
    this.root = root
  }

  buildTree(array) {
    let withoutDuplicates = new Set(mergeSort(array))
    let sortedArrayWithoutDuplicates = new Array(...withoutDuplicates)
    console.log(sortedArrayWithoutDuplicates)

    let start = 0
    let end = sortedArrayWithoutDuplicates.length - 1

    // base case
    if (end === 0) {
      return null
    }

    // root node
    let mid = Math.floor((end + start) / 2)
    let root = new Node(sortedArrayWithoutDuplicates[mid])

    let q = [{ node: root, range: [start, end] }]
    let frontIndex = 0

    while (frontIndex < q.length) {
      let front = q[frontIndex]
      let curr = front.node
      let [s, e] = front.range
      let index = s + Math.floor((e - s) / 2)

      // if left subtree exists
      if (s < index) {
        let midLeft = s + Math.floor((index - 1 - s) / 2)
        let left = new Node(sortedArrayWithoutDuplicates[midLeft])
        curr.left = left
        q.push({ node: left, range: [s, index - 1] })
      }
      // if right subtree exists
      if (e > index) {
        let midRight = index + 1 + Math.floor((e - index - 1) / 2)
        let right = new Node(sortedArrayWithoutDuplicates[midRight])
        curr.right = right
        q.push({ node: right, range: [index + 1, e] })
      }
      frontIndex++
    }
    this.root = root
    return root
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value)
    }
    if (root.data === null) {
      return new Node(value)
    }

    if (root.data === value) {
      return this.root
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left)
    } else if (value > root.data) {
      root.right = this.insert(value, root.right)
    }

    this.root = root
    return this.root
  }

  // helper method for finding successor in subtree
  getSuccessor(node) {
    node = node.right
    while (node !== null && node.left !== null) {
      node = node.left
    }
    return node
  }

  deleteItem(value, root = this.root) {
    // Base case
    if (root === null) {
      return root
    }

    // If value to be searched is in a subtree
    if (root.data > value) {
      root.left = this.deleteItem(value, root.left)
    } else if (root.data < value) {
      root.right = this.deleteItem(value, root.right)
    } else {
      // If root matches with the given key

      // Cases when root has 0 children or
      // only right child
      if (root.left === null) return root.right

      // When root has only left child
      if (root.right === null) return root.left

      // When both children are present
      let successor = this.getSuccessor(root)
      root.data = successor.data
      root.right = this.deleteItem(successor.data, root.right)
    }
    return root
  }

  find(value, root = this.buildTree(this.array)) {
    if (!root) {
      return null
    }
    if (root.data === value) {
      return root
    }
    if (value < root.data) {
      return this.find(value, root.left)
    } else if (value > root.data) {
      return this.find(value, root.right)
    }
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') throw new Error('levelOrder expects a callback function')

    let root = this.buildTree(this.array)
    if (root === null) return

    const queue = new Queue()
    queue.enqueue(root)

    while (queue.size) {
      let current = queue.getFront()
      callback(current)
      if (current.left) queue.enqueue(current.left)
      if (current.right) queue.enqueue(current.right)
      queue.dequeue()
    }
  }

  inOrder(callback, root = this.buildTree(this.array)) {
    if (typeof callback !== 'function') {
      throw new Error('inOrder expects a callback function')
    }
    if (root === null) return
    this.preOrder(callback, root.left)
    callback(root)
    this.preOrder(callback, root.right)
  }

  preOrder(callback, root = this.buildTree(this.array)) {
    if (typeof callback !== 'function') {
      throw new Error('preOrder expects a callback function')
    }

    if (root === null) return
    callback(root)
    this.preOrder(callback, root.left)
    this.preOrder(callback, root.right)
  }

  postOrder(callback, root = this.buildTree(this.array)) {
    if (typeof callback !== 'function') {
      throw new Error('postOrder expects a callback function')
    }
    if (root === null) return
    this.preOrder(callback, root.left)
    this.preOrder(callback, root.right)
    callback(root)
  }

  height(node, root = this.buildTree(this.array)) {
    if (root === null) return

    let depth = -1
    let height = -1

    const queue = []
    queue.push(root)
    let level = 0

    while (queue.length > 0) {
      const n = queue.length
      for (let i = 0; i < n; i++) {
        const frontNode = queue.shift()
        if (frontNode.data === node) depth = level
        if (frontNode.left !== null) queue.push(frontNode.left)
        if (frontNode.right !== null) queue.push(frontNode.right)
      }
      level++
    }

    height = level - depth - 1
    return height
  }

  depth(node, root = this.buildTree(this.array)) {
    if (root === null) return

    let depth = -1

    const queue = []
    queue.push(root)
    let level = 0

    while (queue.length > 0) {
      const n = queue.length
      for (let i = 0; i < n; i++) {
        const frontNode = queue.shift()
        if (frontNode.data === node) depth = level
        if (frontNode.left !== null) queue.push(frontNode.left)
        if (frontNode.right !== null) queue.push(frontNode.right)
      }
      level++
    }

    return depth
  }

  isBalanced() {
    let balanced = true
    this.preOrder((node) => {
      let leftHeight = this.height(node.left) + 1
      let rightHeight = this.height(node.right) + 1
      let difference = Math.abs(leftHeight - rightHeight)
      if (difference > 1) {
        balanced = false
      }
    })
    return balanced
  }
  rebalance() {
    let store = []
    this.inOrder((node) => {
      store.push(node.data)
    })
    console.log(store)
    this.root = this.buildTree(store)
  }
}

export { Tree }
