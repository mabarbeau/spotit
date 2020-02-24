import { getters, mutations, actions } from './confirm'

const { SET_MESSAGE, DELETE_MESSAGE } = mutations
const { confirm, confirmed, canceled } = actions

const message = 'test message'
const state = {
  message: undefined,
  resolve: undefined,
}

describe('mutations', () => {
  it('sets a message', () => {
    SET_MESSAGE(state, message)
    expect(state.message).toEqual(message)
  })
  it('deletes a message', () => {
    DELETE_MESSAGE(state)
    expect(state.message).toEqual(undefined)
  })
})

describe('actions', () => {
  const context = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    state,
    getters,
    rootState: {},
    rootGetters: {},
  }

  it('returns a promise', () => {
    const response = confirm(context, message)
    expect(response instanceof Promise).toBe(true)
  })
  it('resolves when "confirmed" is called', () => {
    const localState = {
      message,
      resolve: jest.fn(),
    }
    confirmed({ ...context, ...{ state: localState } })
    expect(localState.resolve).toBeCalled()
  })
  it('resolves when "canceled" is called', () => {
    const localState = {
      message,
      resolve: jest.fn(),
    }
    canceled({ ...context, ...{ state: localState } })
    expect(localState.resolve).toBeCalled()
  })
})
