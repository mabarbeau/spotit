import { mutations } from './notifications'

const { SET_NOTIFICATIONS } = mutations

describe('mutations', () => {
  const Notification = {
    message: 'Test Notification',
    type: 'info',
    read: false,
  }
  const NotificationsCollection = {
    data: [Notification],
    currentPage: 1,
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
    notifications: NotificationsCollection,
  }
  it('sets a collection of spot', () => {
    SET_NOTIFICATIONS(state, NotificationsCollection)
    expect(state.notifications).toEqual(NotificationsCollection)
  })
})
