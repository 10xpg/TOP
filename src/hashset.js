class Node {
  constructor(key = null, next = null) {
    this.key = key
    this.next = next
  }
}

class HashSet {
  constructor(loadFactor, capacity = 16) {
    this.loadFactor = loadFactor
    this.capacity = capacity
    this.storage = Array(this.capacity)
      .fill()
      .map(() => new Node())
  }

  hash(key) {
    let hashCode = 0
    const primeNumber = 31
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i)
    }
    return hashCode % this.capacity
  }

  grow() {
    const numberOfEntries = this.entries().length
    if (numberOfEntries > this.capacity * this.loadFactor) {
      const oldStorage = this.storage
      this.capacity = this.capacity * 2

      // Create new empty storage
      this.storage = Array(this.capacity)
        .fill()
        .map(() => new Node())

      // Rehash all existing entries
      oldStorage.forEach((node) => {
        while (node !== null && node.key !== null) {
          // Use set() to rehash and insert each entry
          this.set(node.key, node.value)
          node = node.next
        }
      })
    }
  }

  set(key) {
    const index = this.hash(key)

    if (index < 0 || index >= this.storage.length) {
      throw new Error('Trying to access index out of bounds')
    }

    let currentNode = this.storage[index]

    if (currentNode.key === null) {
      currentNode.key = key
      this.grow()
    } else {
      while (currentNode) {
        if (currentNode.key === key) {
          return
        }
        if (currentNode.next === null) {
          currentNode.next = new Node(key)
          this.grow()
          return
        }
        currentNode = currentNode.next
      }
    }
  }

  get(key) {
    const index = this.hash(key)

    if (index < 0 || index >= this.storage.length) {
      throw new Error('Trying to access index out of bounds')
    }

    let currentNode = this.storage[index]
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.key
      }
      currentNode = currentNode.next
    }
    return null
  }

  has(key) {
    const index = this.hash(key)

    if (index < 0 || index >= this.storage.length) {
      throw new Error('Trying to access index out of bounds')
    }

    let currentNode = this.storage[index]
    while (currentNode) {
      if (currentNode.key === key) {
        return true
      }
      currentNode = currentNode.next
    }
    return false
  }

  remove(key) {
    const index = this.hash(key)

    if (index < 0 || index >= this.storage.length) {
      throw new Error('Trying to access index out of bounds')
    }
    let previousNode
    let currentNode = this.storage[index]
    while (currentNode) {
      if (currentNode.key === key && !currentNode.next && !previousNode) {
        currentNode.key = null

        return true
      } else if (currentNode.key === key && currentNode.next === null) {
        previousNode.next = null
        return true
      } else if (currentNode.key === key && currentNode.next) {
        currentNode.key = currentNode.next.key

        currentNode.next = currentNode.next.next
        return true
      }

      previousNode = currentNode
      currentNode = currentNode.next
    }
    return false
  }

  length() {
    let counter = 0

    this.storage.forEach((item) => {
      let currentNode = item
      while (currentNode && currentNode.key) {
        counter++
        currentNode = currentNode.next
      }
    })
    return counter
  }

  clear() {
    this.storage = Array(this.capacity)
      .fill()
      .map(() => new Node())

    return 'successful'
  }

  keys() {
    const result = []
    this.storage.forEach((item) => {
      let currentNode = item
      while (currentNode && currentNode.key) {
        result.push(currentNode.key)
        currentNode = currentNode.next
      }
    })
    return result
  }

  values() {
    const result = []
    this.storage.forEach((item) => {
      let currentNode = item
      while (currentNode && currentNode.key) {
        result.push(currentNode.key)
        currentNode = currentNode.next
      }
    })
    return result
  }

  entries() {
    const result = []
    this.storage.forEach((item) => {
      let currentNode = item
      while (currentNode && currentNode.key) {
        result.push([currentNode.key])
        currentNode = currentNode.next
      }
    })
    return result
  }
}

export { HashSet }
