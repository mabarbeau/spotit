import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Confirm from './Confirm.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Confirm.vue', () => {
  let actions: any
  let confirm: any
  let store: any
  let vuetify: any

  beforeEach(() => {
    vuetify = new Vuetify()
    actions = {
      confirmed: jest.fn(),
      canceled: jest.fn(),
    }
    confirm = {
      namespaced: true,
      state: {
        message: {
          title: 'title',
          text: 'text',
        },
      },
      actions,
    }
    store = new Vuex.Store({
      modules: {
        confirm,
      },
    })
  })

  it('dispatches "canceled" event when "Cancel" button is clicked', () => {
    const wrapper = mount(Confirm, {
      localVue,
      vuetify,
      store,
    })
    wrapper.find('.no').trigger('click')
    expect(actions.canceled).toHaveBeenCalled()
  })

  it('dispatches "confirmed" event when "Ok" button is clicked', () => {
    const wrapper = mount(Confirm, {
      localVue,
      vuetify,
      store,
    })
    wrapper.find('.yes').trigger('click')
    expect(actions.confirmed).toHaveBeenCalled()
  })
})
