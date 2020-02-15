import { mutations } from './spots'

const { SET_SPOTS, SET_SPOT } = mutations

describe('mutations', () => {
  const Spot = {
    name: 'Test Spot',
  }
  const Spots = { data: [Spot, Spot, Spot] }
  const state = {
    spot: undefined,
    spots: undefined,
  }
  it('sets a collection of spot', () => {
    SET_SPOTS(state, Spots)
    expect(state.spots).toEqual(Spots)
  })
  it('sets a spot', () => {
    SET_SPOT(state, Spot)
    expect(state.spot).toEqual(Spot)
  })
})
