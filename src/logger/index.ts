import axios from 'axios'

export default class Logger {
  public static message(data: any) {
    axios.post(`${process.env.VUE_APP_LOGGER}/log/message`, data)
  }

  public static warning(data: any) {
    axios.post(`${process.env.VUE_APP_LOGGER}/log/warning`, data)
  }

  public static error(data: any) {
    axios.post(`${process.env.VUE_APP_LOGGER}/log/error`, data)
  }
}
