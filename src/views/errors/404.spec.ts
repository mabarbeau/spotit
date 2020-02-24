import { shallowMount } from '@vue/test-utils'
import NotFound from './404.vue'

describe('404.vue', () => {
  it('it says "Page not found"', () => {
    const wrapper = shallowMount(NotFound)
    expect(wrapper.text()).toContain('Page not found')
  })
})
