// pages/category/childCpns/h-tab-info/h-tab-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryInfo:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handerTab(event){
      // 获取index
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex:index
      })
      // 向外发出事件
      this.triggerEvent('tabData',{index},{})
    }
  }
})
