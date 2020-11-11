// components/h-tab-control/h-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
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
    tabClick(event){
      // 1.保存index
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex:index
      })
  
      // 2.向外发出事件
      this.triggerEvent('currentClik',index,{})

      
    },
    setCurrentIndex(index) {
      this.setData({
        currentIndex: index
      })
    }
  }
})
