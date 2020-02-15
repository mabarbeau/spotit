import { mutations } from './auth'

const { SET_ME } = mutations

describe('mutations', () => {
  const User = {
    name: 'Test User',
  }
  it('assigns a user to me', () => {
    // mock state
    const state = {
      me: undefined,
    }
    // apply mutation
    SET_ME(state, User)
    // assert result
    expect(state.me).toEqual(User)
  })
})
