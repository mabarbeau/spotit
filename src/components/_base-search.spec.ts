import { shallowMount } from '@vue/test-utils'
import BaseSearch from './_base-search.vue'

describe('_base-search.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BaseSearch)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
