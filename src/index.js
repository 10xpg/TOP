function knightMoves(start, end) {
  const q = []
  q.push([start])

  let visited = new Set()
  visited.add(start)

  while (q.length) {
    let currentPath = q.shift()
    let currentPosition = currentPath[currentPath.length - 1]

    if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
      return currentPath
    }

    const allPossibilities = getPossibleMoves(currentPosition)
    allPossibilities.forEach((possibleMove) => {
      const visitedkey = possibleMove.toString()

      if (isValidPosition(possibleMove) && !visited.has(visitedkey)) {
        const newPath = [...currentPath, possibleMove]
        q.push(newPath)
        visited.add(visitedkey)
      }
    })
  }
  return 'No path found'
}

function getPossibleMoves(position) {
  const [x, y] = position
  const moves = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2]
  ]
  return moves
}

function isValidPosition(position) {
  const [x, y] = position

  return x >= 0 && x <= 7 && y >= 0 && y <= 7
}

console.log(knightMoves([0, 0], [3, 3]))
