import { getters, mutations, actions } from './auth'
const { SET_ME } = mutations
const { getMe, login } = actions

const User = {
  name: 'Test User',
}
const state = {
  me: null,
}

describe('mutations', () => {
  it('assigns a user to me', () => {
    SET_ME(state, User)
    expect(state.me).toEqual(User)
  })
})

// describe('actions', () => {
//   let actions
//   beforeEach(() => {
//     actions = {
//       loadUsers: jest.fn(),
//     }
//   })
//   const context = {
//     dispatch: jest.fn(),
//     commit: jest.fn(),
//     state,
//     getters,
//     rootState: {},
//     rootGetters: {},
//   }
//   it('resolves when "confirmed" is called', () => {
//     const response = getMe(context)
//   })
// })
