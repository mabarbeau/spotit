import axios from 'axios';

interface Axios {
    get(url: string): any;
    post(url: string, params: any[]): any;
    put(url: string, params: any[]): any;
    delete(url: string): any;
}
interface AxiosResponse {
    data: any[];
}

export default class ApiService implements Axios {
    private axios: Axios;

    private error: Error | null = null

    constructor(baseURL: string = process.env.VUE_APP_API) {
      this.axios = axios.create({
        baseURL,
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    public async get(url: string) {
      return this.return(this.axios.get(url + window.location.search));
    }

    public async post(url: string, params: string[]) {
      return this.return(this.axios.post(url, params));
    }

    public async put(url: string, params: string[]) {
      return this.return(this.axios.put(url, params));
    }

    public async delete(url: string) {
      return this.return(this.axios.delete(url));
    }

    private async return(response: Promise<AxiosResponse>) {
      return response
        .then(reply => reply.data)
        .catch(error => this.handleError(error));
    }

    // TODO: Error handling
    private handleError(error: Error) {
      this.error = error;
      console.error(error);
      return error;
    }
}
