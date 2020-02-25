import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Alert from './Alert.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Alert.vue', () => {
  let actions: any
  let alert: any
  let store: any
  let vuetify: any

  beforeEach(() => {
    vuetify = new Vuetify()
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
    const wrapper = mount(Alert, {
      localVue,
      vuetify,
      store,
    })
    wrapper.find('.yes').trigger('click')
    expect(actions.confirmed).toHaveBeenCalled()
  })
})
