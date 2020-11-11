// components/h-goods-item/h-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
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
    itemClick(event){
      // 保存iid
      // const iid = this.data.item.iid
      const iid = event.currentTarget.dataset.iid
      // 跳转到详情页并携带iid
      if(iid){
        wx.navigateTo({
          url: '/pages/detail/detail?iid='+iid,
        })
      }  
    }
  }
})
