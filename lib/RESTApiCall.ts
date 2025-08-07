import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class RESTApiCall {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `https://antar-admin.vercel.app/api/app/`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get(endpoint: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.get(endpoint, config);
      return response;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  public async post(endpoint: string, data: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.post(endpoint, data, config);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  public async put(endpoint: string, data: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.put(endpoint, data, config);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(endpoint: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.delete(endpoint, config);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    const status = error.response?.status;
    const message =
      error.response?.data?.errors ||
      error.response?.data?.error ||
      error.message;

    return error.response;
  }
}

export default RESTApiCall;
