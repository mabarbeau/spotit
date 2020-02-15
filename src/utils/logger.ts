import axios from 'axios'

if (!process.env.VUE_APP_LOGGER) {
  console.warn('Warning: external logging not setup')
}
const axiosInstance = process.env.VUE_APP_LOGGER
  ? axios.create({
      baseURL: process.env.VUE_APP_LOGGER,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  : undefined

export default class Logger {
  public static async info(data: any) {
    if (axiosInstance)
      axiosInstance.post('/log/info', { info: JSON.stringify(data) })
  }

  public static async warning(data: any) {
    if (axiosInstance)
      axiosInstance.post('/log/warning', { warning: JSON.stringify(data) })
  }

  public static async error(data: any) {
    if (axiosInstance)
      axiosInstance.post('/log/error', { error: JSON.stringify(data) })
  }
}
