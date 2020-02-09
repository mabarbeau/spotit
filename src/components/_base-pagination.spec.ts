import { shallowMount } from '@vue/test-utils'
import BasePagination from './_base-pagination.vue'

describe('_base-pagination.vue', () => {
  it('renders pagination when passed a valid object', () => {
    const name = 'spots'
    const list = {
      current_page: 1,
      data: [
        {
          title: 'Dolores a sunt tempora modi excepturi.',
          slug: 'postman',
        },
      ],
      first_page_url: 'http://spotit.api/spots?page=1',
      from: 1,
      last_page: 7,
      last_page_url: 'http://spotit.api/spots?page=7',
      next_page_url: 'http://spotit.api/spots?page=2',
      path: 'http://spotit.api/spots',
      per_page: 15,
      prev_page_url: null,
      to: 15,
      total: 105,
    }
    const text = 'title'
    const childName = 'spots show'
    const wrapper = shallowMount(BasePagination, {
      propsData: {
        name,
        list,
        text,
        childName,
      },
      stubs: ['router-link'],
    })
    expect(wrapper.text()).toContain(list.data[0].title)
  })
})
