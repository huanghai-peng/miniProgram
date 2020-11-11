import {baseURL,timeout} from './config'
// 封装网络请求
export default function request(options){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + options.url,
      method:options.method || 'get',
      data:options.data || {},
      timeout:timeout,
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}