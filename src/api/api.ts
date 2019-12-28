import Router from './router'
import Routes from './routes'

if (!process.env.VUE_APP_API) throw new Error('API is undefined')
export default new Router(process.env.VUE_APP_API, Routes)
