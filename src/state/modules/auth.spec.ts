import { mutations } from './auth'

const { SET_ME } = mutations

describe('mutations', () => {
  const User = {
    name: 'Test User',
  }
  it('assigns a user to me', () => {
    const state = {
      me: undefined,
    }
    SET_ME(state, User)
    expect(state.me).toEqual(User)
  })
})
