import {
  getMVURL,
  getMVDetailID,
  getRelatedVideo
} from '../../apis/api_video'


const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusHeight, // 状态栏高度
    navBarHeight: app.globalData.navBarHeight, // 导航栏高度
    menuRight: app.globalData.menuRight, // 导航栏高度
    menuBotton: app.globalData.menuBotton, // 导航栏高度
    menuHeight: app.globalData.menuHeight, // 导航栏高度
    mvURLInfo: {}, //  MV 视频 URL 信息
    mvDetail: {}, // MV 视频详情
    relatedVideos: [], // 相关视频信息
    mvHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传入的 ID
    const id = options.id
    // 获取页面数据
    this.getPageData(id)

    // 获取 MV 高度
    this.getMVHeight()
  },
  // 获取页面数据的网络请求方法
  getPageData: function (id) {
    // 请求 MV 播放地址
    getMVURL(id).then((res) => {
      this.setData({
        mvURLInfo: res.data
      })
    })

    // 请求 MV 视频详情
    getMVDetailID(id).then((res) => {
      this.setData({
        mvDetail: res.data
      })
    })

    // 请求相关视频信息
    getRelatedVideo(id).then((res) => {
      this.setData({
        relatedVideos: res.data
      })
    })
  },

  // 封装事件处理的方法
  handleVideoItemClick: function (event) {
    // 获取页面 ID
    const id = event.currentTarget.dataset.item.vid
    // 跳转到指定页面
    wx.navigateTo({
      url: `/pages/video-detail-v2/index?id=${id}`,
    });
  },

  // 获取 MV 高度
  getMVHeight: function () {
    const query = wx.createSelectorQuery()
    query.select('.video').boundingClientRect()
    query.exec((res) => {
      this.setData({
        mvHeight: res[0].height
      })
    })


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
  // 回到首页
  backToIndex: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  handleBackBtnClick: function () {
    wx.navigateBack()
  },
})