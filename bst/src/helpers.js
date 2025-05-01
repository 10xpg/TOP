class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class Queue {
  constructor(capacity = null) {
    this.capacity = capacity
    this.queue = new Array(capacity)
    this.front = 0
    this.size = 0
  }

  enqueue(data) {
    if (this.size === this.capacity) {
      console.log('Queue full!')
      return
    }
    this.queue[this.front + this.size] = data
    this.size++
  }

  dequeue() {
    if (this.size === 0) {
      console.log('Queue empty!')
      return
    }
    for (let i = 1; i < this.size; i++) {
      this.queue[i - 1] = this.queue[i]
    }
    this.size--
  }

  // Function to display the elements of the queue
  display() {
    if (this.size === 0) {
      console.log('Queue is empty')
      return
    }

    for (let i = 0; i < this.size; i++) {
      process.stdout.write(this.queue[i] + ' <- ')
    }
    console.log()
  }

  // Function to get the front element of the queue
  getFront() {
    if (this.size === 0) {
      // console.log('Queue is empty')
      return null
    } else {
      // console.log('Front Element is: ' + this.queue[this.front])
      return this.queue[this.front]
    }
  }
}

function merge(front, end) {
  let res = []
  let i = 0
  let j = 0

  while (i < front.length && j < end.length) {
    if (front[i] < end[j]) {
      res.push(front[i])
      i++
    } else {
      res.push(end[j])
      j++
    }
  }

  for (; i < front.length; i++) {
    res.push(front[i])
  }

  for (; j < end.length; j++) {
    res.push(end[j])
  }
  return res
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array
  } else {
    let mid = Math.floor(array.length / 2)

    let leftHalf = array.slice(0, mid)
    let rightHalf = array.slice(mid)

    let sortedLeft = mergeSort(leftHalf)
    let sortedRight = mergeSort(rightHalf)

    return merge(sortedLeft, sortedRight)
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}

export { Node, Queue, mergeSort, prettyPrint }
