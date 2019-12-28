import Router from './router'
import Routes from './routes'

if (!process.env.VUE_APP_API) throw new Error('API is undefined')

export default new Router(Routes, {
  baseURL: process.env.VUE_APP_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
