import {
  getPlaylistDetail
} from '../../apis/api_music'

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
    playlistInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const id = options.id
    let id = '2537308137'
    getPlaylistDetail(id).then(res => {
      console.log(res);
      this.setData({
        playlistInfo: res.playlist
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
})