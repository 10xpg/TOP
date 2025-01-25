// const input = [2, 8, 15, 18, 4, 5, 6, 9, 12, 17];

// const front = input.slice(0, Math.floor(input.length / 2));
// const end = input.slice(Math.floor(input.length / 2), input.length);

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

const test = [9, 3, 7, 5, 6, 4, 8, 2];

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  } else {
    let lowerIndex = array.indexOf(array[0]);
    let higherIndex = array.indexOf(array[array.length - 1]);

    if (lowerIndex < higherIndex) {
      let mid = Math.ceil((lowerIndex + higherIndex) / 2);

      let leftHalf = array.slice(lowerIndex, mid);
      let rightHalf = array.slice(mid, higherIndex + 1);

      mergeSort(leftHalf);
      mergeSort(rightHalf);
      merge(leftHalf, rightHalf);
    }
  }
}

console.log(mergeSort(test));
