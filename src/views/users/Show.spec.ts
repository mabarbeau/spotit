import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Show from './Show.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Show.vue', () => {
  let actions: any
  let users: any
  let store: any
  let vuetify: any

  beforeEach(() => {
    vuetify = new Vuetify()
    actions = {
      loadUser: jest.fn(),
    }
    users = {
      namespaced: true,
      state: {
        user: {
          title: 'Test User',
        },
      },
      actions,
    }
    store = new Vuex.Store({
      modules: {
        users,
      },
    })
  })

  it('dispatches "loadUser" when mounted', () => {
    shallowMount(Show, {
      store,
      localVue,
      vuetify,
      propsData: {
        id: 'fake-uid',
      },
      stubs: ['router-link', 'base-map'],
    })
    expect(actions.loadUser).toHaveBeenCalled()
  })
})
