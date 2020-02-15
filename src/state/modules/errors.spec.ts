import { mutations } from './errors'

const { SET_ERROR } = mutations

describe('mutations', () => {
  const error = new Error('Test Error')
  const state = {
    error: undefined,
  }
  it('sets an error', () => {
    SET_ERROR(state, error)
    expect(state.error).toEqual(error)
  })
})
