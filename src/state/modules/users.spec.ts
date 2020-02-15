import { mutations } from './users'

const { SET_USERS, SET_USER } = mutations

describe('mutations', () => {
  const User = {
    name: 'Test User',
  }
  const Users = {
    currentPage: 1,
    data: [User, User, User],
    firstPageUrl: '/spots/1',
    from: 1,
    lastPage: 10,
    lastPageUrl: '/spots/10',
    nextPageUrl: '/spots/2',
    path: '/spots/',
    perPage: 10,
    prevPageUrl: null,
    to: '?',
    total: 100,
  }
  const state = {
    user: undefined,
    users: undefined,
  }
  it('sets a collection of user', () => {
    SET_USERS(state, Users)
    expect(state.users).toEqual(Users)
  })
  it('sets a user', () => {
    SET_USER(state, User)
    expect(state.user).toEqual(User)
  })
})
