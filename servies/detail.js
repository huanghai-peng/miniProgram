import request from './request'

export function getDetail(iid){
  return request({
    url:'/detail',
    data:{
      iid
    }
  })
}

// 商品的描述信息和快递信息
export class GoodsInfo{
  constructor(itemInfo,columns,services){
    this.columns = columns;
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.desc = itemInfo.desc;
    this.oldPrice = itemInfo.oldPrice;
    this.lowNowPrice = itemInfo.lowNowPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.services = services
  }
}

// 店铺信息
export class Shop {
  constructor(shopInfo){
    this.cSells = shopInfo.cSells;
    this.cGoods = shopInfo.cGoods;
    this.score = shopInfo.score ;
    this.name = shopInfo.name;
    this.shopLogo = shopInfo.shopLogo;
  }
}

// 商品尺寸和规格
export class GoodsParam{
  constructor(info,rule){
      this.image = info.images ? info.images[0] : '';
      this.info = info.set;
      this.tables = rule.tables
  }
}

// 商品推荐数据
export function recommend(){
  return request({
    url:'/recommend'
  })
}



