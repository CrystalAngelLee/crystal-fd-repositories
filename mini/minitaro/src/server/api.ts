import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './status'
import { baseUrl } from './config'
import { logError } from '../utils/error'

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    // let token = getApp().globalData.token
    // if (!token) login()
    // console.log('params', params)
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    type OptionType = {
      url: string
      data?: object | string
      method?: any
      header: object
      success: any
      error: any
      // xhrFields: object,
    }
    const option: OptionType = {
      url: baseUrl + url,
      data: data,
      method: method,
      // header: { 'content-type': contentType, 'token': token },
      header: { 'content-type': contentType },
      // xhrFields: { withCredentials: true },
      success(res) {
        console.log('res', res)
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    return Taro.request(option)
  },
  get(url: string, data?: object) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post(url: string, data?: object, contentType?: string) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url: string, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url: string, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}
