import Router from './router'
import routes from './routes'

if (!process.env.VUE_APP_API) throw new Error('API is undefined')

const axiosOptions = {
  baseURL: process.env.VUE_APP_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

export default new Router(routes, axiosOptions)
