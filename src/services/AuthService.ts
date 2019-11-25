import ApiService from './ApiService'

const Api = new ApiService()

export default class AuthService {
  public static login(params: any) {
    return Api.post('/auth/login', params)
  }
}
