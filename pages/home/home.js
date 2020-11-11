// pages/home/home.js
import {getMultidata,getGoodsData} from '../../servies/home'
const types = ['pop','new','sell']
const SCROLLCONTENT = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    } ,
    currentType:'pop',
    showBackTop:false,
    showTabControl:false,
    tabControlTop:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.请求轮播图和推荐数据
    this._getMultidata()

    // 2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载更多商品
    this._getGoodsData(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /* 监听滚动位置 */
  onPageScroll(options){
    // 保存滚动的位置
    const scrollTop = options.scrollTop
    const flag1 = scrollTop>= SCROLLCONTENT
    if(flag1 != this.data.showBackTop){
      this.setData({
        showBackTop:flag1
      })
    }

    // 控制tab-control的显示和隐藏
    const flag2 = scrollTop>= this.data.tabControlTop
    if(flag2 != this.data.showTabControl){
      this.setData({
        showTabControl:flag2
      })
    }
  },
  // -------------------下面是请求数据函数---------------------
  _getMultidata(){
    getMultidata().then(res=>{
      // 保存banner的数据
      const banners = res.data.data.banner.list;
      // 保存recommend的数据
      const recommends = res.data.data.recommend.list;

      // 将banner和recommend的数据保存到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    // 保存页码
    const page = this.data.goods[type].page + 1
    getGoodsData(type,page).then(res=>{
      // 保存请求过来的商品数据
      const list = res.data.data.list
      // 临时保存数据
      const goods = this.data.goods
      goods[type].list.push(...list)
      goods[type].page += 1
      this.setData({
        goods:goods
      })
    })
  },
  // -----------------下面是处理事件函数-------------------------
  /* 1.监听tab-control的事件 */
  currentClik(event){
    // 1.取出传过来的index
    const index = event.detail;
    this.setData({
      currentType:types[index]
    })

    // 控制两个tab-control的currentIndex
    this.selectComponent('#tab-control1').setCurrentIndex(index)
    this.selectComponent('#tab-control').setCurrentIndex(index)

  },
  imageLoad(){
    // 保存tab-control的offsetTop
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
      this.setData({
        tabControlTop:rect.top
      })
    }).exec()
  }
})