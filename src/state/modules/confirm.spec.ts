import { mutations } from './confirm'

const { SET_MESSAGE, DELETE_MESSAGE } = mutations

describe('mutations', () => {
  const message = 'test message'
  const state = {
    message: undefined,
    resolve: undefined,
  }
  it('sets a message', () => {
    SET_MESSAGE(state, message)
    expect(state.message).toEqual(message)
  })
  it('deletes a message', () => {
    DELETE_MESSAGE(state)
    expect(state.message).toEqual(undefined)
  })
})
