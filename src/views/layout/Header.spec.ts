import { shallowMount, createLocalVue } from '@vue/test-utils'
import Header from './Header.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Header.vue', () => {
  let actions: any
  let confirm: any
  let store: any
  let vuetify: any

  beforeEach(() => {
    vuetify = new Vuetify()
    actions = {
      login: jest.fn(),
    }
    confirm = {
      namespaced: true,
      state: {
        me: undefined,
        users: [],
      },
      actions,
    }
    store = new Vuex.Store({
      modules: {
        confirm,
      },
    })
  })

  it('has a link to about page', () => {
    const msg = 'About'
    const wrapper = shallowMount(Header, {
      localVue,
      vuetify,
      store,
      stubs: ['router-link'],
    })
    expect(wrapper.text()).toContain(msg)
  })
})
