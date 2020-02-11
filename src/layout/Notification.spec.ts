import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Notification from './Notification.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Alert.vue', () => {
  let actions: any
  let notification: any
  let store: any

  beforeEach(() => {
    actions = {
      confirmed: jest.fn(),
      canceled: jest.fn(),
    }
    notification = {
      namespaced: true,
      state: {
        message: 'test message',
        cancelable: true,
      },
      actions,
    }
    store = new Vuex.Store({
      modules: {
        notification,
      },
    })
  })

  it('confirm dispatches "confirmed" event when "Ok" button is clicked', () => {
    const wrapper = shallowMount(Notification, { store, localVue })
    wrapper.find('button.yes').trigger('click')
    expect(actions.confirmed).toHaveBeenCalled()
  })

  it('confirm dispatches "canceled" event when "Cancel" button is clicked', () => {
    const wrapper = shallowMount(Notification, { store, localVue })
    wrapper.find('button.no').trigger('click')
    expect(actions.canceled).toHaveBeenCalled()
  })

  it('alert dispatches "confirmed" event when "Ok" button is clicked', () => {
    notification.state.cancelable = false
    store = new Vuex.Store({
      modules: {
        notification,
      },
    })
    const wrapper = shallowMount(Notification, { store, localVue })
    wrapper.find('button.yes').trigger('click')
    expect(actions.confirmed).toHaveBeenCalled()
  })
})
