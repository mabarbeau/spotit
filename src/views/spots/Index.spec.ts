import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Index from './Index.vue'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

describe('Index.vue', () => {
  let actions: any
  let spots: any
  let store: any

  beforeEach(() => {
    actions = {
      loadSpots: jest.fn(),
    }
    spots = {
      namespaced: true,
      state: {
        spots: {
          currentPage: 1,
          data: [],
          firstPageUrl: '/spots/?page=1',
          from: 1,
          lastPage: 10,
          lastPageUrl: '/spots/?page=10',
          nextPageUrl: '/spots/?page=2',
          path: '/spots',
          perPage: 10,
          prevPageUrl: null,
          to: '/spots',
          total: 1000,
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

  it('dispatches "loadSpots" when mounted', () => {
    shallowMount(Index, {
      store,
      router,
      localVue,
      stubs: ['base-pagination', 'base-map'],
    })
    expect(actions.loadSpots).toHaveBeenCalled()
  })
})
