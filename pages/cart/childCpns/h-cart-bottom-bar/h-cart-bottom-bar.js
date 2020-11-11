// pages/cart/childCpns/h-cart-bottom-bar/h-cart-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectAll:{
      type:Boolean,
      value:true
    },
    selectCount:{
      type:Number,
      value:0
    },
    totalPrice:{
      type:Number,
      value:0
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
    selectClick(){
      this.triggerEvent('selectAllClick',{},{})
    }
  }
})
