import { mutations } from './notifications'

const { SET_NOTIFICATIONS } = mutations

describe('mutations', () => {
  const Notification = {
    message: 'Test Notification',
    read: false,
  }
  const NotificationsCollection = {
    data: [Notification],
    currentPage: 1,
    firstPageUrl: '/notifications/?page=1',
    from: 1,
    lastPage: 10,
    lastPageUrl: '/notifications/?page=10',
    nextPageUrl: '/notifications/?page=2',
    path: '/notifications/',
    perPage: 10,
    prevPageUrl: null,
    to: '?',
    total: 100,
  }
  const state = {
    notifications: NotificationsCollection,
    unread: 0,
  }
  it('sets a collection of notifications', () => {
    SET_NOTIFICATIONS(state, NotificationsCollection)
    expect(state.notifications).toEqual(NotificationsCollection)
  })
})
