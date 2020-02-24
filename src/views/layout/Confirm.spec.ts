import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Confirm from './Confirm.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Confirm.vue', () => {
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

  it('dispatches "canceled" event when "Cancel" button is clicked', () => {
    const wrapper = shallowMount(Confirm, {
      store,
      localVue,
    })
    wrapper.find('#no').trigger('click')
    expect(actions.canceled).toHaveBeenCalled()
  })

  it('dispatches "confirmed" event when "Ok" button is clicked', () => {
    const wrapper = shallowMount(Confirm, {
      store,
      localVue,
    })
    wrapper.find('#yes').trigger('click')
    expect(actions.confirmed).toHaveBeenCalled()
  })
})
