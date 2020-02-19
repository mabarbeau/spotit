import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Alert from './Alert.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Alert.vue', () => {
  let actions: any
  let alert: any
  let store: any

  beforeEach(() => {
    actions = {
      confirmed: jest.fn(),
    }
    alert = {
      namespaced: true,
      state: {
        messages: ['test message'],
      },
      actions,
    }
    store = new Vuex.Store({
      modules: {
        alert,
      },
    })
  })

  it('confirm dispatches "confirmed" event when "Ok" button is clicked', () => {
    const wrapper = shallowMount(Alert, { store, localVue })
    wrapper.find('button.yes').trigger('click')
    expect(actions.confirmed).toHaveBeenCalled()
  })
})
