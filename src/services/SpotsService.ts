import ApiService from '@/services/ApiService'

const Api = new ApiService()

export default class SpotsService {
  public static all() {
    return Api.get('/spots')
  }

  public static find(slug: string) {
    return Api.get(`/spots/${slug}`)
  }
}
