import request from './request'

// 1.请求分类页面的切换栏数据
export function getCategory(){
  return request({
    url:'/category'
  })
}

// 2.请求分类栏中的分类数据
export function getSubCategory(maitKey){
  return request({
    url:'/subcategory',
    data:{
      maitKey
    }
  })
}

// 3.请求分类中的分类商品数据
export function getCategoryDetail(miniWallkey,type){
  return request({
    url:'/subcategory/detail',
    data:{
      miniWallkey,
      type
    }
  })
}