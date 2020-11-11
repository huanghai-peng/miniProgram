// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartLists:[],
    selectAll:true,
    selectCount:0,
    totalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.首次加载商品数据
    this.setData({
      cartLists:app.globalData.cartLists
    })
    this.refreshData()

    // 2.进行商品回调
    app.addCartCallback = () => {
      this.setData({
        cartLists: app.globalData.cartLists
      })
      this.refreshData()
    }

    // 监听每一个商品的切换
    app.changeGoodsState=(index,datas)=>{
      this.setData({
        [`cartLists[${index}]`]:datas[0]
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartLists.find(item => !item.checked)
      this.setData({
        selectAll: selectAll
      })
      this.refreshData()
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 如果购物车没有商品则全选按钮不选中，否则相反
    if(this.data.cartLists.length==0){
      this.setData({
        selectAll:false
      })
    }else{
      this.setData({
        selectAll:true
      })
    }
    // 导航头部标题
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartLists.length})`,
    })
  },
  // -----------------处理函数---------------
  selectAllClick(){
    // 判断是否全部被选中
    if(this.data.selectAll){//全部被选中
      this.data.cartLists.forEach((item)=>{
        item.checked=false
      })
    }else{//某些没有选中或者全部没选中
      this.data.cartLists.forEach((item)=>{
        item.checked=true
      })
    }
    this.setData({
      cartLists:this.data.cartLists,
      selectAll:!this.data.selectAll
    }) 

    this.refreshData()
  },
  refreshData(){
    // 监听总价和商品个数
    let totalPrice = 0
    let selectCount = 0
    for (let item of this.data.cartLists){
      if(item.checked){
        totalPrice += item.price * item.counter
        selectCount+=1
      }
    }
    this.setData({
      totalPrice:totalPrice,
      selectCount
    })

    
  }
})