// pages/detail/detail.js
import {getDetail,GoodsInfo,Shop,GoodsParam,recommend} 
  from '../../servies/detail'
  const app = getApp()
  const SCROLLCONTENT = 1000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid:'',
    topImages:[],
    goodsInfo:[],
    shop:[],
    detailInfo:[],
    paramInfo:[],
    comment:[],
    recommend:[],
    isBack:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 取出iid
    const iid = options.iid
    this.setData({
      iid
    })
    // 请求详情页数据
    this._getDetail(iid)

    // 请求推荐数据
    this._recommend()
  },
  onPageScroll(options){
    const flag = options.scrollTop >= SCROLLCONTENT
    if(flag != this.data.isBack){
      this.setData({
        isBack:flag
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // --------------下面是网络请求函数--------------------
  _getDetail(iid){
    getDetail(iid).then(res=>{
      const data = res.data.result
      // 1.保存轮播图topImages数据
      const topImages = data.itemInfo.topImages
      this.setData({
        topImages
      })

      // 2.请求商品的描述加快递goodsInfo数据
      const goodsInfo = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      this.setData({
        goodsInfo
      })

      // 3.请求商铺信息数据
      const shop = new Shop(data.shopInfo)
      this.setData({
        shop
      })

      // 4.请求商品详情和描述
      const detailInfo = data.detailInfo
      this.setData({
        detailInfo
      })

      // 5.请求商品尺寸和规格
      const paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      this.setData({
        paramInfo
      })

      // 6.请求评论数据
      if(data.rate && data.rate.cRate > 0){
        const comment =data.rate.list[0]
        this.setData({
          comment
        }) 
      }
    })
  },
  _recommend(){
    // 请求商品推荐数据
    recommend().then(res=>{
      const recommend = res.data.data.list
      this.setData({
        recommend
      })
    })
  },
  // ----------------下面是处理函数-----------------------
  addCart(){
    // 1.获取数据
    const obj = {}
    obj.iid = this.data.iid
    obj.imageUrl = this.data.topImages[0]
    obj.title = this.data.goodsInfo.title
    obj.desc = this.data.goodsInfo.desc
    obj.price = this.data.goodsInfo.lowNowPrice

    // 2.把obj传给全局对象App
    app.addToCart(obj)

    // 3.提示信息
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})