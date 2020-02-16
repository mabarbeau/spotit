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
  let users: any
  let store: any

  beforeEach(() => {
    actions = {
      loadUsers: jest.fn(),
    }
    users = {
      namespaced: true,
      state: {
        users: {
          currentPage: 1,
          data: [],
          firstPageUrl: '/users/?page=1',
          from: 1,
          lastPage: 10,
          lastPageUrl: '/users/?page=10',
          nextPageUrl: '/users/?page=2',
          path: '/users',
          perPage: 10,
          prevPageUrl: null,
          to: '/users',
          total: 1000,
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

  it('dispatches "loadUsers" when mounted', () => {
    shallowMount(Index, {
      store,
      router,
      localVue,
      stubs: ['base-pagination', 'base-map'],
    })
    expect(actions.loadUsers).toHaveBeenCalled()
  })
})
