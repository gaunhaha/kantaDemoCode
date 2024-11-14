import type { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import { AlertService, type OkOption } from "./AlertService";

/**
 * @description service to call HTTP request via Axios
 */
let app: App | null = null;
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;
  /**
   * @description initialize vue axios
   */

  public static init(app: App<Element>) {
    app = app;
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_API_URL;
    ApiService.setInterceptor();
    ApiService.setHeader();
  }

  private static setInterceptor() {
    ApiService.vueInstance.axios.interceptors.response.use(
      /**
       * If you want to get http information such as headers or status
       * Please return  response => response
       */

      /**
       * Determine the request status by custom code
       * Here is just an example
       * You can also judge the status by HTTP Status Code
       */
      (response) => {
        const res = response;
        return res;
      },
      async (error) => {
        // console.log('error', error)
        if (error.response) {
          if (error.response.data) {
            const errorMessage = error.response.data.errors[0].errorMessage;
            const errorDescription = error.response.data.errors[0].errorDescription;
            const okOption: OkOption = {
              title: "Error",
              text: errorMessage,
              html: errorDescription,
              icon: "error",
              confirmButtonText: "Ok",
            };
            AlertService.okAlert(okOption);
            return Promise.resolve(error);
          }
          else {
            //未預期的error (ex API路徑打錯)
            const okOption: OkOption = {
              title: "Error",
              text: error.message,
              icon: "error",
              confirmButtonText: "Ok",
            };
            AlertService.okAlert(okOption);
            return { data: null } as AxiosResponse;
          }
        }
        else if (error.message == "Request aborted") {
          console.log("Request aborted");
          return { data: null } as AxiosResponse;
        }
        //未預期的error (ex 網路斷線)
        else {
          const okOption: OkOption = {
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonText: "Ok",
          };
          // AlertService.okAlert(okOption);
          return Promise.reject(error);
        }

      }
    );
  }
  /**
   * @description set the default HTTP request headers
   */
  public static setBaseURL(): void {
    ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  }

  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] =
      "application/json";
    ApiService.vueInstance.axios.defaults.headers.common["X-API-KEY"] =
      import.meta.env.VITE_APP_API_KEY;
  }
  public static setSid(): void {
    if (!ApiService.vueInstance || !ApiService.vueInstance.axios) {
      console.warn('ApiService.vueInstance 或 axios 未初始化，尝试重新初始化');
      if (app) ApiService.vueInstance = app;
      else window.location.reload();
      ApiService.vueInstance.use(VueAxios, axios);
      ApiService.setBaseURL();
      ApiService.setInterceptor();
      ApiService.setHeader();
    }
  }
  /**
   * @description 設定一般Api request的 Content type 為Json格式
   */
  public static setJsonHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] =
      "application/json";
  }
  /**
   * @description 設定一般Api request的 content type 為form data
   */
  public static setFileHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] =
      "multipart/form-data";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    ApiService.setSid();
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse> {
    ApiService.setSid();
    return slug == ""
      ? ApiService.vueInstance.axios.get(`${resource} `)
      : ApiService.vueInstance.axios.get(`${resource} /${slug}`);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static getFileBlob(resource: string): Promise<AxiosResponse> {
    ApiService.setSid();
    return ApiService.vueInstance.axios.get(`${resource}`, {
      responseType: "arraybuffer",
    });
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    ApiService.setSid();
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }
  /**
   * @description set the patch HTTP request
   * @param resource: string
   * @param params: any
   * @returns Promise<AxiosResponse>
   */
  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    ApiService.setSid();
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }
  /**
  * @description set the patch HTTP request(用於form file上傳)
  * @param resource: string
  * @param params: any
  * @returns Promise<AxiosResponse>
  */
  public static patchFile(resource: string, params: any): Promise<AxiosResponse> {
    ApiService.setSid();
    return ApiService.vueInstance.axios.patchForm(`${resource}`, params);
  }
  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    ApiService.setSid();
    // ApiService.setHeader();
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * 設定 POST HTTP request (用於form file上傳)
   * @param path 路徑
   * @param params formdata 內容 (body參數)
   * @returns {*}
   */
  public static putFile(path: string, params: any) {
    ApiService.setSid();
    /// 設定form所需的header
    return ApiService.vueInstance.axios.putForm(`${path}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    ApiService.setSid();
    return ApiService.vueInstance.axios.delete(resource);
  }

  public static deleteWithParams(
    resource: string,
    params: any
  ): Promise<AxiosResponse> {
    ApiService.setSid();
    return ApiService.vueInstance.axios.delete(`${resource}`, { data: params });
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: any
   * @returns Promise<AxiosResponse>
   */
  public static paramsPost(
    resource: string,
    params = "" as string
  ): Promise<AxiosResponse> {
    ApiService.setSid();
    return ApiService.vueInstance.axios.post(`${resource}?${params}`);
  }
  /**
   * 設定 POST HTTP request (用於form file上傳)
   * @param path 路徑
   * @param params formdata 內容 (body參數)
   * @returns {*}
   */
  public static postFile(path: string, params: any) {
    ApiService.setSid();
    return ApiService.vueInstance.axios.postForm(`${path}`, params);
  }
}

export default ApiService;
