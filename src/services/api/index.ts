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

axiosApi.interceptors.response.use(
  (response) => {
    return { ...response, hasError: false };
  },
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      return { ...error, hasError: true, statue: 500, errorText: error.request?.response || true };
    }
    return {
      ...error,
      hasError: true,
      errorText: error.request?.response || true,
      errorStatus: error.request?.status || 500,
    };
  },
);

// const API = async (props: AxiosRequestConfig, withAuth: boolean = false) => {
const API = async ({ withAuth = false, ...props }) => {
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkRTVVNlciIsIkVudGl0eUlEIjoiZDIyZjAzMTktNTU5OC00N2NiLTg5NGMtM2FkYzkxN2UxNTllIiwiQ2xpZW50U2VjcmV0IjoiMTAwMDo5aTdqWGpYVzFpS3JGN3BycHoyZ0ozNzFQWGg0dzZXajo4WjVQeVhzR1JIbmlNMXJ4L2NxK2tiL0lEd0VOVmE5TyIsIlJvbGUiOiJNdW5pY2lwYWxpdHkiLCJuYmYiOjE2MzMxNTY1OTgsImV4cCI6MTYzMzIxMDU5OCwiaWF0IjoxNjMzMTU2NTk4LCJpc3MiOiJOb3RpZmljYXRpb25TeXN0ZW1TZWN1cml0eSIsImF1ZCI6Ik5vdGlmaWNhdGlvblN5c3RlbSJ9.EBw8MxLaIAbeLm5ukdz0k8hUWdtL_8t_LokC1dRindhv0xjqLuvVOGhYHyOULaYbg3tEK2TIGCGpKaXsFamJjuBcZNWm9-2sOzn60glozi5-sGc0CDXl3J8hegXM_FjQcCiDQqRWOvYwa-m_J6P8DWJdZ9RU0igBx40h3-RVs-PlFiaizHuY1pfDULvDVKRoBZtLIi2EBS1_2mLkVUb5PMX9g56Lhj-Rzdu1ERIkF8Gs0LQbNQ5koqYziRsGE_rroaO-7GBo2bp6HTlp4pRcL3pcg3oA7N1fx4vmJS0fqs-IFJiJvD5-74d1CFf8FJhMUqklk84MwJIw8GmM1NyU6A';
  try {
    let headers = props.headers;
    if (withAuth) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    const res = await axiosApi({ ...props, headers: headers });
    if ((res.status === 401 || res.request.status === 401) && withAuth) {
    }

    return res;
  } catch (e: any) {
    if ((e.status === 401 || e?.request?.status === 401 || e?.response?.statue === 401) && withAuth) {
    }

    return e;
  }
};

export default API as AxiosInstance;
