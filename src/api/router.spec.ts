import Router, {
  RouteNotFoundException,
  ParamNotFoundException,
} from './router'

jest.mock('axios')

if (!process.env.VUE_APP_API) console.warn('API is undefined')

const router = new Router({
  root: '/',
  nested: {
    once: '/nested/once',
    twice: {
      url: '/nested/twice/url',
    },
  },
  parameters: {
    one: '/:id',
    two: '/:name/:id',
  },
})

describe('the api router', () => {
  it('gets the correct url from the root', () => {
    const url = router['url']('root')
    expect(url).toBe('/')
  })
  it('expects the url is not wrong', () => {
    const url = router['url']('root')
    expect(url).not.toBe('/wrong')
  })
  it('gets the correct url when nested once', () => {
    const url = router['url']('nested.once')
    expect(url).toBe('/nested/once')
  })
  it('gets the correct url when nested twice', () => {
    const url = router['url']('nested.twice.url')
    expect(url).toBe('/nested/twice/url')
  })
  it('gets the correct url with one parameter', () => {
    const id = 1
    const url = router['url']('parameters.one', { id })
    expect(url).toBe(`/${id}`)
  })
  it('gets the correct url with two parameters', () => {
    const parameters = {
      name: 'users',
      id: 1,
    }
    const url = router['url']('parameters.two', parameters)
    expect(url).toBe('/users/1')
  })
  it('throws route not found error', () => {
    expect(() => {
      router['url']('wrong')
    }).toThrow(RouteNotFoundException)
  })
  it('throws missing parameters error', () => {
    expect(() => {
      router['url']('parameters.one', { wrong: 1 })
    }).toThrow(ParamNotFoundException)
  })
})
