import ApiService from '@/services/ApiService';

const Api = new ApiService();

export default class UsersService {
  public static all() {
    return Api.get('/users');
  }

  public static find(id: number) {
    return Api.get(`/users/${id}`);
  }
}
