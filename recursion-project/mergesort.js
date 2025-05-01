// const input = [2, 8, 15, 18, 20, 5, 6, 9, 12, 17];

// const front = input.slice(0, Math.floor(input.length / 2));
// const end = input.slice(Math.floor(input.length / 2));

function merge(front, end) {
  let res = [];
  let i = 0;
  let j = 0;

  while (i < front.length && j < end.length) {
    if (front[i] < end[j]) {
      res.push(front[i]);
      i++;
    } else {
      res.push(end[j]);
      j++;
    }
  }

  for (; i < front.length; i++) {
    res.push(front[i]);
  }

  for (; j < end.length; j++) {
    res.push(end[j]);
  }
  return res;
}

const test = [3, 2, 1, 13, 8, 5, 0, 1];
const test2 = [105, 79, 100, 110];

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  } else {
    let mid = Math.floor(array.length / 2);

    let leftHalf = array.slice(0, mid);
    let rightHalf = array.slice(mid);

    let sortedLeft = mergeSort(leftHalf);
    let sortedRight = mergeSort(rightHalf);

    return merge(sortedLeft, sortedRight);
  }
}

console.log(mergeSort(test));
// console.log(merge([2, 3], [4, 5]));
