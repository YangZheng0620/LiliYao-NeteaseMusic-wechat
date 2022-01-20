import {
  getBanners,
  getRecommendSongs
} from '../../apis/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'


const app = getApp()

const throttleQueryRect = throttle(queryRect) // 使用节流生成新函数来使用

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
      },
      {
        title: '手写的从前'
      },
    ],
    currentTab: 0, // 当前 swiper
    navbarLeft: 0, // 导航栏内容左距离
    navbarWidth: 0, // 导航栏内容宽度
    banners: [], // 轮播图数据
    swiperHeight: 0, // 轮播图图片的高度,
    recommendSongs: [], // 推荐歌曲列表
    recommendSongMenu: [], // 获取推荐歌单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航栏内容宽高
    this.getNavBarStyle()

    this.getPageData()
  },

  // 网络请求封装的方法
  getPageData: function () {
    getBanners().then((res) => {
      this.setData({
        banners: res.banners
      })
    })


    // 获取推荐歌曲数据
    getRecommendSongs().then(res => {
      const recommendSongs = res.result.slice(0, 5)
      this.setData({
        recommendSongs,
        recommendSongMenu: res.result
      })
    })

    // // 获取华语歌单数据
    // getSongMenu("华语").then(res => {
    //   this.setData({ recommendSongMenu: res.playlists })
    // })

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

  // 轮播图图片加载完成后触发方法
  handleSwiperImageLoaded: function () {
    // 获取图片的高度
    throttleQueryRect('.swiper-image').then(res => {

      const rect = res[0]
      this.setData({
        swiperHeight: rect
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

  // 点击切换
  switchNav: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.index) {
      return false;
    } else {
      queryRect('.navbar-normal').then(res => {

        const rect = res[0]
        if (rect.left !== this.data.left) {
          this.setData({
            navbarLeft: rect.left,
            navbarWidth: rect.width
          })
        }

      })
      // const query = wx.createSelectorQuery()
      // query.select('.navbar-normal').boundingClientRect()
      // query.exec((res) => {
      //   if (res[0].left !== this.data.left) {
      //     this.setData({
      //       navbarLeft: res[0].left,
      //       navbarWidth: res[0].width
      //     })
      //   }
      // })

      this.setData({
        currentTab: e.currentTarget.dataset.index
      });
    }
  },

  // 滑动切换
  sliderNav: function (e) {
    if (e.detail.source === 'touch') {
      queryRect('.navbar-normal').then(res => {

        const rect = res[0]
        if (rect.left !== this.data.left) {
          this.setData({
            navbarLeft: rect.left,
            navbarWidth: rect.width
          })
        }

      })

      this.setData({
        currentTab: e.detail.current
      });
    }
  }


})