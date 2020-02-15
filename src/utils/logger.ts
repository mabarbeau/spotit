import axios from 'axios'

if (!process.env.VUE_APP_LOGGER) throw new Error('API is undefined')
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_LOGGER,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default class Logger {
  public static async info(data: any) {
    axiosInstance.post('/log/info', { info: JSON.stringify(data) })
  }

  public static async warning(data: any) {
    axiosInstance.post('/log/warning', { warning: JSON.stringify(data) })
  }

  public static async error(data: any) {
    axiosInstance.post('/log/error', { error: JSON.stringify(data) })
  }
}
