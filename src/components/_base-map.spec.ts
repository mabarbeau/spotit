import { shallowMount } from '@vue/test-utils'
import BaseMap from './_base-map.vue'

describe('_base-map.vue', () => {
  it('renders a map', () => {
    const wrapper = shallowMount(BaseMap)
    expect(wrapper.find('.gm-style')).toBeDefined()
  })
})
