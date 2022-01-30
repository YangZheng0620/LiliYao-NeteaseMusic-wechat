const app = getApp()

import {
  getUserRecord,
  getUserPlayList,
  logout
} from '../../apis/api_user'

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
    navList: [{
      title: '我的'
    }, ],
    currentTab: 0, // 当前 swiper
    navbarLeft: 0, // 导航栏内容左距离
    navbarWidth: 0, // 导航栏内容宽度
    userInfoList: [], // 用户详情
    userPlayRecord: [], // 用户最近播放记录
    userPlayList: [], // 用户歌单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        // console.log(res.data)
        const userInfo = JSON.parse(res.data)
        this.setData({
          userInfoList: userInfo
        })

        getUserRecord(userInfo.userId).then(res => {
          this.setData({
            userPlayRecord: res.weekData
          })
        })

        getUserPlayList(userInfo.userId).then(res => {
          this.setData({
            userPlayList: res.playlist.splice(1)
          })
        })

      },
      fail: (res) => {
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }
    })

    // 获取导航栏内容宽高
    this.getNavBarStyle()
  },

  // 获取导航栏内容宽高
  getNavBarStyle: function () {
    const query = wx.createSelectorQuery()
    query.select('.navbar-selected').boundingClientRect()
    query.exec((res) => {
      this.setData({
        navbarLeft: res[0].left,
        navbarWidth: res[0].width
      })
    })
  },

  handleSongItemClick: function (event) {
    const id = event.currentTarget.dataset.id
    console.log(id);
    // wx.navigateTo({
    //   url: '/pages/player/index?id=' + id,
    // })

  },

  logout: function () {
    console.log(123);
    // logout()
    wx.removeStorage({
      key: 'userInfo',
    })
    wx.removeStorage({
      key: 'cookies',
    })

    wx.reLaunch({
      url: '/pages/login/index',
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

  // 点击切换
  switchNav: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.index) {
      return false;
    } else {
      const query = wx.createSelectorQuery()
      query.select('.navbar-normal').boundingClientRect()
      query.exec((res) => {
        if (res[0].left !== this.data.left) {
          this.setData({
            navbarLeft: res[0].left,
            navbarWidth: res[0].width
          })
        }
      })

      this.setData({
        currentTab: e.currentTarget.dataset.index
      });
    }
  },

  // 滑动切换
  sliderNav: function (e) {
    if (e.detail.source === 'touch') {
      const query = wx.createSelectorQuery()
      query.select('.navbar-normal').boundingClientRect()
      query.exec((res) => {
        if (res[0].left !== this.data.left) {
          this.setData({
            navbarLeft: res[0].left,
            navbarWidth: res[0].width
          })
        }
      })

      this.setData({
        currentTab: e.detail.current
      });
    }
  }

})