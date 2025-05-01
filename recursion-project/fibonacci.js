//  * Fibonacci function using loops returning array whose length == num

function fibs(num) {
  let sequence = [];
  if (num == 0) {
    return sequence;
  }
  if (num == 1) {
    sequence = [0];
    return sequence;
  }

  sequence = [0, 1];
  for (let i = 2; i < num; i++) {
    let value = sequence[i - 1] + sequence[i - 2];
    sequence.push(value);
  }
  return sequence;
}

console.log(fibs(8));

// * Fibonacci function using recursion
function fibsRec(num, recSequence = [0, 1]) {
  console.log("This was printed recursively");
  if (num == 0) {
    recSequence = [];
    return recSequence;
  }
  if (num == 1) {
    recSequence = [0];
    return recSequence;
  }
  if (num == 2) {
    return recSequence;
  }

  recSequence.push(
    recSequence[recSequence.length - 1] + recSequence[recSequence.length - 2]
  );

  return fibsRec(num - 1, recSequence);
}

console.log(fibsRec(8));
