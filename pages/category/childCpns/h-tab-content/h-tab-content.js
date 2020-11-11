// pages/category/childCpns/h-tab-content/h-tab-content.js
const SCROLLCONTENT = 1000
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryData:{
      type:Object,
      value:{}
    },
    currentIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentType:'pop',
    scrollTop:0,
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    currentClik(event){
      const index = event.detail
      this.typeClick(index)
    },
    typeClick(index){
      const currentType = ['pop','new','sell']
      this.setData({
        currentType:currentType[index]
      })
    },
    scrollBack(){
      this.setData({
        isShow:false,
        scrollTop:0
      })
    },
    srcollPosition(e){
      const scrollTop = e.detail.scrollTop
      const flag = scrollTop>=SCROLLCONTENT
      if(flag !=this.data.isShow){
        this.setData({
          isShow:flag
        })
      }
    }
  }
})
