import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Confirm from './Confirm.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Alert.vue', () => {
  let actions: any
  let confirm: any
  let store: any

  beforeEach(() => {
    actions = {
      confirmed: jest.fn(),
      canceled: jest.fn(),
    }
    confirm = {
      namespaced: true,
      state: {
        message: 'test message',
      },
      actions,
    }
    store = new Vuex.Store({
      modules: {
        confirm,
      },
    })
  })

  it('confirm dispatches "canceled" event when "Cancel" button is clicked', () => {
    const wrapper = shallowMount(Confirm, { store, localVue })
    wrapper.find('button.no').trigger('click')
    expect(actions.canceled).toHaveBeenCalled()
  })

  it('confirm dispatches "confirmed" event when "Ok" button is clicked', () => {
    const wrapper = shallowMount(Confirm, { store, localVue })
    wrapper.find('button.yes').trigger('click')
    expect(actions.confirmed).toHaveBeenCalled()
  })
})
