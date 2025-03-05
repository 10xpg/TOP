// TODO: Ship Factory
export const Ship = function (len) {
  let length = len
  let hits = 0
  let sunkStatus = false

  // Increases number of hits
  const hit = () => {
    return ++hits
  }

  // Calculate whether a ship is sunk based on length
  const isSunk = () => {
    if (hits === length) {
      sunkStatus = true
    }
    return sunkStatus
  }

  return {
    length,
    hit,
    isSunk
  }
}
