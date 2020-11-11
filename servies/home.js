import request from './request'

// 1.请求轮播图和推荐数据
export function getMultidata(){
  return request({
    url:'/home/multidata'
  })
}

// 2.请求商品数据
export function getGoodsData(type,page){
  return request({
    url:'/home/data',
    data:{
      type,
      page
    }
  })
}