import {
  getSingerDescInfo,
  getSimiSingers,
  getSingerAlbums,
  getSingerSongs,
  getSingerMV
} from '../../apis/api_player'

import {
  rankingStore
} from "../../store/index"

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
    playlistHeaderHeight: 0, //  歌单详情头部高度
    singerSongsList: [], // 歌手歌曲
    singerHotSongsList: [], // 歌手精选歌曲
    simiSingersList: [], // 相似歌手信息
    singerDescInfo: [], // 歌手信息
    singerAlbumsList: [], // 歌手专辑信息
    singerMVList: [], // 歌手 MV 列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id

    this.getPageData(id)
  },

  getPageData: function (id) {
    // 获取歌手信息
    getSingerDescInfo(id).then((res) => {
      this.setData({
        singerDescInfo: res.artist
      })

      let arr = [0, 4, 7]

      // 随机获取歌单列表
      let randValue = this.getArrRandValue(arr)

      this.setData({
        singerHotSongsList: res.hotSongs.splice(randValue, 4)
      })
    })

    // 获取歌手全部歌曲
    getSingerSongs(id).then((res) => {
      this.setData({
        singerSongsList: res.songs
      })
    })


    // 获取歌手 MV
    getSingerMV(id).then((res) => {
      this.setData({
        singerMVList: res.mvs
      })
    })

    // 获取相似歌手信息
    getSimiSingers(id).then((res) => {
      this.setData({
        getSimiSingers: res.artists
      })
    })

    // 获取歌手专辑
    getSingerAlbums(id).then((res) => {
      this.setData({
        singerAlbumsList: res.hotAlbums
      })
    })

  },

  // 获取数组随机值
  getArrRandValue: function (arr) {
    if (arr.length < 1) {
      return '';
    }
    let index = Math.floor((Math.random() * arr.length));
    return arr[index];
  },

  handleSingerInfoBtn: function (event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/singer/index?id=' + id,
    })
  },

  // 封装事件处理的方法
  handleVideoItemClick: function (event) {
    // 获取页面 ID
    const id = event.currentTarget.dataset.item.id
    playerStore.dispatch("changeMusicPlayStatusAction", false)
    // 跳转到指定页面
    wx.navigateTo({
      url: `/pages/video-detail/index?id=${id}`,
    });
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
  handleBackBtnClick: function () {
    wx.navigateBack()
  },
  backToIndex: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
})