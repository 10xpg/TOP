import { Tree } from './bst.js'
import { prettyPrint } from './helpers.js'

function generateRandomArray(max, min = 0) {
  let array = []
  for (let index = min; index < max; index++) {
    array.push(Math.floor(Math.random() * max))
  }
  return array
}

let testArray1 = generateRandomArray(10)
let testTree = new Tree(testArray1)

testTree.insert(11)
testTree.insert(12)
testTree.insert(13)
testTree.insert(14)
testTree.insert(15)
testTree.insert(16)
testTree.insert(17)
testTree.insert(18)
testTree.insert(19)
testTree.insert(20)

console.log(testTree.isBalanced())
prettyPrint(testTree.root)
testTree.rebalance()
console.log(testTree.isBalanced())
prettyPrint(testTree.root)

testTree.levelOrder((node) => {
  console.log(node)
})
testTree.preOrder((node) => {
  console.log(node)
})
testTree.inOrder((node) => {
  console.log(node)
})
testTree.postOrder((node) => {
  console.log(node)
})
