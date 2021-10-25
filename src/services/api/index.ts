import axios, {
  AxiosAdapter,
  AxiosBasicCredentials,
  AxiosError,
  AxiosInterceptorManager,
  AxiosProxyConfig,
  AxiosTransformer,
  CancelToken,
  Method,
} from 'axios';

import { AuthService } from 'services/auth-service';

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  headers?: any;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: AxiosAdapter;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  withAuth?: boolean;
}

export interface AxiosResponse<T = any> {
  response?: any;
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
  hasError: boolean;
  errorText?: string;
  errorStatus?: number;
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}

export const axiosApi = axios.create({ baseURL: process.env.API_BASE_URL, timeout: 3000 });

const SERVER_ERROR = 'خطای سرور رخ داده است مجدد تلاش کنید';

axiosApi.interceptors.response.use(
  (response) => {
    return { ...response, hasError: false, errorText: '' };
  },
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      return { ...error, hasError: true, statue: 500, errorText: error.request?.response || SERVER_ERROR };
    }
    return {
      ...error,
      hasError: true,
      errorText: error.request?.response || SERVER_ERROR,
      errorStatus: error.request?.status || 500,
    };
  },
);

// const API = async (props: AxiosRequestConfig, withAuth: boolean = false) => {
const API = async ({ withAuth = false, ...props }) => {
  // try {
  //   let headers = props.headers;
  //   if (withAuth) {
  //     const token = window.localStorage.getItem('token');
  //     headers = { ...headers, Authorization: `Bearer ${token}` };
  //   }
  //   const res = await axiosApi({ ...props, headers: headers });
  //   if ((res.status === 401 || res.request.status === 401) && withAuth) {
  //     return await repeatReuest(res.config);
  //   }

  //   return res;
  // } catch (e: any) {
  //   if ((e.status === 401 || e?.request?.status === 401 || e?.response?.statue === 401) && withAuth) {
  //     return await repeatReuest(e.config);
  //   }
  //   return e;
  // }

  let headers = props.headers;
  if (withAuth) {
    const token = window.localStorage.getItem('token');
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosApi({ ...props, headers: headers });
      if ((res.status === 401 || res.request.status === 401) && withAuth) {
        await repeatReuest(res.config, resolve, reject);
      }
      resolve(res);
    } catch (e: any) {
      if ((e.status === 401 || e?.request?.status === 401 || e?.response?.statue === 401) && withAuth) {
        await repeatReuest(e.config, resolve, reject);
      }
      reject(e);
    }
  });
};

const repeatReuest = async (_config: any, resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
  const AuthServiceInstance = new AuthService();
  return await AuthServiceInstance.renewToken({ state: window.location.href })
    .then(async (user) => {
      window.localStorage.setItem('token', user?.access_token);
      const res = await axiosApi({
        ..._config,
        headers: { ..._config.headers, Authorization: `Bearer ${user?.access_token}` },
      });
      if (res.status === 401 || res.request.status === 401) {
        window.localStorage.removeItem('token');
        AuthServiceInstance.login();
        return reject(res);
      }
      return resolve(res);
    })
    .catch((e) => {
      window.localStorage.removeItem('token');
      AuthServiceInstance.login();
      return reject({ status: 500, hasError: true, errorText: SERVER_ERROR, errorStatus: 500 });
    });
};

export default API as AxiosInstance;
