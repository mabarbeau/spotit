import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Show from './Show.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Show.vue', () => {
  let actions: any
  let spots: any
  let store: any

  beforeEach(() => {
    actions = {
      loadSpot: jest.fn(),
    }
    spots = {
      namespaced: true,
      state: {
        spot: {
          title: 'Test Spot',
        },
      },
      actions,
    }
    store = new Vuex.Store({
      modules: {
        spots,
      },
    })
  })

  it('dispatches "loadSpot" when mounted', () => {
    shallowMount(Show, {
      store,
      localVue,
      propsData: {
        slug: 'test',
      },
      stubs: ['router-link', 'base-map'],
    })
    expect(actions.loadSpot).toHaveBeenCalled()
  })
})
