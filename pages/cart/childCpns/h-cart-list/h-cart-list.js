// pages/cart/childCpns/h-cart-list/h-cart-list.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartLists:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkClick(event){
      const index = event.currentTarget.dataset.index
      const datas = app.globalData.cartLists.filter((item)=>item.iid == this.properties.cartLists[index].iid )
      datas[0].checked = !datas[0].checked
      // 2.监听切换
      app.changeGoodsState(index,datas)
    }
  }
})
