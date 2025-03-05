import { Ship } from './ship'

describe('Ship Factory Tests', () => {
  test('Ship should return a ship object with length argument', () => {
    const ship = Ship(2)
    expect(ship).toHaveProperty('length', 2)
    expect(ship).toHaveProperty('hit')
    expect(ship).toHaveProperty('isSunk')
  })

  test('hit() should return 1 when called once', () => {
    const ship = Ship(3)
    expect(ship.hit()).toBe(1)
  })

  test('isSunk() should return false if ship is not fully hit', () => {
    const ship = Ship(3)

    // first hit
    ship.hit()
    expect(ship.isSunk()).toBe(false)

    // second hit
    ship.hit()
    expect(ship.isSunk()).toBe(false)
  })

  test('test isSunk() method when hits equals length', () => {
    const ship = Ship(3)
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
  })
})
