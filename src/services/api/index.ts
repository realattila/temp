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
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkRTVVNlciIsIkVudGl0eUlEIjoiZDIyZjAzMTktNTU5OC00N2NiLTg5NGMtM2FkYzkxN2UxNTllIiwiQ2xpZW50U2VjcmV0IjoiMTAwMDpnUG1hMmJERWZRVmdQanQ2K2NERFVqMEtLSWFUUVcxMjpoWXR4bTJHYWVZWUhDc2NlTWxFREFMYzVIS1k1UUN3RiIsIlJvbGUiOiJNdW5pY2lwYWxpdHkiLCJuYmYiOjE2MzMzMzk0MjIsImV4cCI6MTYzMzM5MzQyMiwiaWF0IjoxNjMzMzM5NDIyLCJpc3MiOiJOb3RpZmljYXRpb25TeXN0ZW1TZWN1cml0eSIsImF1ZCI6Ik5vdGlmaWNhdGlvblN5c3RlbSJ9.MRYk2UHdnrv7BVVNRs4NvkL_qKJR3gIXgsVyaEBDfSBxQvT-B-WGuGpBnG00xCFiTQ6FHYlDSKhg9x1Xnm8Z-zisXdU5GSofQeGRQLbEQcANRDF135lk5QwXHFqrrGunyl0WWOCUHiwvZDW_Cn0T0RrV6mzyijHXogffjNNo2f1xbakrUCWFvBkgmwuvoX_njDZwOUCDLDMkspwFiL60CMnBLx_PX1B5MjMNGkyYC4BmbPdlIP13cHkKQFMb_piwIsmcVYXew5UEGuro6ZFCm-R2hxuWDn2bTf1r3eyzWsJU53M0adBcqXM-vqTh9S7BRrcIgOHoCvVU1YOhLXtuZg';
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
