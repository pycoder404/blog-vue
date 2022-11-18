import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import store from '@/store'
import { getAccessToken } from '@/utils/auth'
axios.defaults.withCredentials = true
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // todo 在permission中在每一个路由变化之前对accessToken进行过期检查，或者使用refreshToken刷新accessToken
    // 给请求都添加一个accessToken
    if (store.getters.accessToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'AccessToken ' + getAccessToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return  res
    // if the custom code is not 20000, it is judged as an error.
    // TODO set code is null as default
    // if (res.code !== 0) {
    //   ElMessage({
    //     message: res.message || 'Response status code error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   // console.log('res is', res)
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.error(error) // for debug
    if (error.response){
      const err = error.response.data
      // todo  redirect to login page for unauthorized user (status 401)
      ElMessageBox({
        message: err.detail || '服务器内部错误，请联系管理员',
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      ElMessageBox({
        message: '服务异常,请联系管理员',
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
