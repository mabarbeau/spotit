import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Notification from './Notification.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Notification.vue', () => {
  let actions: any
  let notification: any
  let store: any

  beforeEach(() => {
    actions = {
      confirmed: jest.fn(),
    }
    notification = {
      namespaced: true,
      state: {
        message: 'test message',
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
})
