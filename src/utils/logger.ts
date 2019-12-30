import axios from 'axios'

if (!process.env.VUE_APP_API) throw new Error('API is undefined')
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default class Logger {
  public static async info(data: any) {
    axiosInstance.post('/log/info', { error: JSON.stringify(data) })
  }
  public static async warning(data: any) {
    axiosInstance.post('/log/warning', { error: JSON.stringify(data) })
  }
  public static async error(data: any) {
    axiosInstance.post('/log/error', { error: JSON.stringify(data) })
  }
}