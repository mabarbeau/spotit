import { shallowMount, createLocalVue } from '@vue/test-utils'
import BaseSearch from './_base-search.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()

localVue.use(VueRouter)
const router = new VueRouter()

describe('_base-search.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BaseSearch, { router, localVue })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
