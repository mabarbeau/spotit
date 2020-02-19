import { mutations } from './alert'

const { ADD_ALERT, DELETE_ALERT } = mutations

describe('mutations', () => {
  const message = 'test message'
  it('sets a message', () => {
    const state = {
      messages: [],
      total: 0,
    }
    ADD_ALERT(state, message)
    expect(state.messages).toEqual([message])
  })
  it('increments total when message is added', () => {
    const state = {
      messages: [],
      total: 0,
    }
    ADD_ALERT(state, message)
    expect(state.total).toBe(1)
  })
  it('deletes a message', () => {
    const state = {
      messages: [message],
      total: 1,
    }
    DELETE_ALERT(state)
    expect(state.messages.length).toBe(0)
  })
  it("doesn't decrement total when message is removed", () => {
    const state = {
      messages: [message, message],
      total: 2,
    }
    DELETE_ALERT(state)
    expect(state.total).toBe(2)
  })
  it('resets total when all messages are removed', () => {
    const state = {
      messages: [message, message],
      total: 2,
    }
    DELETE_ALERT(state)
    DELETE_ALERT(state)
    expect(state.total).toBe(0)
  })
})
