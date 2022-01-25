import {
  getBanners,
  getRecommendSongs,
  getRecommendPlaylists
} from '../../apis/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
import {
  rankingStore,
  rankingMap
} from '../../store/index'

const app = getApp()

const throttleQueryRect = throttle(queryRect, 1000, { trailing: true }) // 使用节流生成新函数来使用

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
    screenWidth: app.globalData.screenWidth, // 屏幕宽度
    navList: [{
        title: '推荐'
      },
      {
        title: '音乐馆'
      },
    ],
    currentTab: 0, // 当前 swiper
    navbarLeft: 0, // 导航栏内容左距离
    navbarWidth: 0, // 导航栏内容宽度
    banners: [], // 轮播图数据
    swiperHeight: 0, // 轮播图图片的高度,
    recommendSongs: [], // 推荐歌曲列表
    recommendSongMenu: [], // 推荐歌曲总列表
    recommendPlaylists: [], // 推荐歌单
    rankings: {
      0: {},
      1: {},
      2: {}
    }, // 榜单数据（初始化数据保证数据顺序）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航栏内容宽高
    this.getNavBarStyle()

    this.getPageData()

    // 发起共享数据的请求
    rankingStore.dispatch("getRankingDataAction")

    // 从 store 中获取共享数据
    rankingStore.onState("rankingZero", this.getRankingHandler(0))
    rankingStore.onState("rankingOne", this.getRankingHandler(1))
    rankingStore.onState("rankingTwo", this.getRankingHandler(2))
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

    // 获取推荐歌单数据
    getRecommendPlaylists().then(res => {

      let arr = []
      for (let i = 1; i <= 23; i++) {
        arr.push(i)
      }

      // 随机获取歌单列表
      let randValue = this.getArrRandValue(arr)

      this.setData({
        recommendPlaylists: res.result.splice(randValue, 6)
      })
    })



  },

  // 调用 rank-store 中的 action 方法获取巅峰榜数据
  getRankingHandler: function (idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      const id = res.id
      const name = res.name
      const coverImgUrl = res.tracks[0].al.picUrl
      const songList = res.tracks.slice(0, 3)
      const playCount = res.playCount
      const rankingObj = {
        id,
        name,
        coverImgUrl,
        playCount,
        songList
      }
      const newRankings = {
        ...this.data.rankings,
        [idx]: rankingObj
      }
      this.setData({
        rankings: newRankings
      })
    }
  },


  // 获取数组随机值
  getArrRandValue: function (arr) {
    if (arr.length < 1) {
      return '';
    }
    let index = Math.floor((Math.random() * arr.length));
    return arr[index];
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
  // 点击巅峰榜触发
  handleRankingItemClick: function (event) {
    const idx = event.currentTarget.dataset.idx
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongPage(rankingName)
  },

  // 跳转到榜单详情
  navigateToDetailSongPage: function (rankingName) {
    wx.navigateTo({
      url: `/pages/ranking-detail/index?ranking=${rankingName}`
    })
  },

  // 轮播图图片加载完成后触发方法
  handleSwiperImageLoaded: function () {
    // 获取图片的高度
    throttleQueryRect('.swiper-image').then(res => {

      const rect = res[0]
      this.setData({
        swiperHeight: rect.height
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