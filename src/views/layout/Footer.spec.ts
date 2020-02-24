import { shallowMount } from '@vue/test-utils'
import Footer from './Footer.vue'

describe('Footer.vue', () => {
  it('has the word footer', () => {
    const wrapper = shallowMount(Footer)
    expect(wrapper.text()).toContain(new Date().getFullYear())
  })
})
