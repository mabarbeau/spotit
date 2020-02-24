import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import Header from './Header.vue'

Vue.use(Vuetify)

describe('Header.vue', () => {
  it('has a link to about page', () => {
    const msg = 'About'
    const wrapper = shallowMount(Header, {
      stubs: ['router-link'],
    })
    expect(wrapper.text()).toContain(msg)
  })
})
