// *  Node class declaration
class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

// * LinkedList class declaration
class LinkedList {
  constructor(start = null) {
    this.start = start;
  }

  // TODO: append(value)
  append(value) {
    // create a new node
    let node = new Node(value);
    // variable for tracking current node
    let current;

    // if linked-list is empty .ie. NULL
    if (this.start == null) {
      // make the head of linked-list the node
      this.start = node;
    } else {
      // if linked list is not empty, set the currentNode tracker to the head of linked-list
      current = this.start;
      while (current.nextNode) {
        //   while the currentNode points to another node and not NULL update tracker to the next node
        current = current.nextNode;
        // when we arrive at a currentNode whose next points to NULL we are at the last element of the linked list
      }
      //   we update the next of the last node to point to a new node with the value and its nextNode property is set to null
      current.nextNode = node;
    }
  }

  // TODO: prepend(value)
  prepend(value) {
    let node = new Node(value);
    let current;

    if (this.start == null) {
      this.start = node;
    } else {
      current = this.start;
      node.nextNode = current;
      this.start = node;
    }
  }

  // TODO: size
  size() {
    let current;
    let counter = 0;
    if (this.start == null) {
      return counter;
    } else {
      current = this.start;
      counter++;
      while (current.nextNode) {
        counter++;
        current = current.nextNode;
      }
      return counter;
    }
  }

  // TODO: head
  head() {
    return this.start;
  }

  // TODO: tail
  tail() {
    let current;
    if (this.start == null) {
      return null;
    } else {
      current = this.start;
      while (current.nextNode) {
        current = current.nextNode;
      }
      return current;
    }
  }

  // TODO: at(index)
  at(index) {
    let current = this.start;
    if (current === null) {
      return null;
    } else {
      if (index === 0) {
        return current;
      } else if (index < 0) {
        return undefined;
      } else {
        for (let i = 1; i <= index; i++) {
          current = current.nextNode;
        }
        return current;
      }
    }
  }

  // TODO: pop
  pop() {
    let node = this.at(this.size() - 2);
    node.nextNode = null;
  }

  // TODO: contains(value)
  contains(value) {
    let current = this.head();

    while (current.nextNode) {
      if (current.value === value) {
        return current.value === value;
      }
      current = current.nextNode;
    }
    return current.value === value;
  }

  // TODO: find(value)
  find(value) {
    let counter = 0;
    let current = this.head();

    while (current) {
      if (current.value === value) {
        return counter;
      }
      current = current.nextNode;
      counter++;
    }
    return null;
  }

  // TODO: toString
  toString() {
    let current = this.head();
    let result = "";

    if (!current) {
      return result;
    } else {
      while (current) {
        result = result + `( ${current.value} )` + " -> ";
        current = current.nextNode;
      }
      result = result + "null";
      return result;
    }
  }

  // TODO: insertAt(value,index)
  insertAt(value, index) {
    let result = this.at(index);
    let beforeResult = this.at(index - 1);
    let node = new Node(value, result);
    beforeResult.nextNode = node;
  }

  // TODO: removeAt(index)
  removeAt(index) {
    let currentNode = this.at(index);
    let previousNode = this.at(index - 1);
    let nextNode = this.at(index + 1);
    if (previousNode === undefined) {
      currentNode.nextNode = null;
      this.start = nextNode;
    } else {
      previousNode.nextNode = nextNode;
    }
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.append("cow");

console.log(list.toString());
console.log(list.size());
// console.log(list.at(6));
list.removeAt(0);
console.log(list.toString());
