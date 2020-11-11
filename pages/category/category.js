// pages/category/category.js
import {getCategory,getSubCategory,getCategoryDetail} from '../../servies/category'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[],
    categoryData:{},
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.请求分类切换栏数据
    this._getCategory()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  // -------------下面是处理函数---------------
  tabData(event){
    // 取出index
    const currentIndex = event.detail.index
    this.setData({
      currentIndex
    })
    this._getSubCategory(currentIndex)
  },
  // -------------下面是网络请求的函数------------
  _getCategory(){
    getCategory().then(res=>{
      const category = res.data.data.category.list
      this.setData({
        category
      })

      // 初始化每个分类栏的数据
      const categoryData ={}
      for(let i=0;i<category.length;i++){
        categoryData[i]={
          categories:[],
          categoryDetail:{
            pop:[],
            new:[],
            sell:[],
          }
        }
      }

      this.setData({
        categoryData
      })

      // 请求分类栏中的分类数据
      this._getSubCategory(0)

      // 请求分类栏的分类商品数据
      this._getCategoryDetail(0)
    })
  },
  _getSubCategory(index){
    const maitKey = this.data.category[index].maitKey
    getSubCategory(maitKey).then(res=>{
      const categoryData = this.data.categoryData
      categoryData[index].categories = res.data.data.list
      this.setData({
        categoryData
      })
    })

    // 请求分类栏的商品数据
    this. _getCategoryDetail(index)

  },
  _getCategoryDetail(index){
    const miniWallkey = this.data.category[index].miniWallkey
    this._getRealCategoryDetail(index,miniWallkey,'pop')
    this._getRealCategoryDetail(index,miniWallkey,'new')
    this._getRealCategoryDetail(index,miniWallkey,'sell')
  },
  _getRealCategoryDetail(index,miniWallkey,type){
    getCategoryDetail(miniWallkey,type).then(res=>{
      const categoryData = this.data.categoryData
      categoryData[index].categoryDetail[type]=res.data
      this.setData({
        categoryData
      })
    })
  }
})
