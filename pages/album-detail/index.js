import {
  getAlbumsContnent,
  getAlbumsInfo,
  getSongDetail
} from '../../apis/api_player'

import {
  rankingStore,
  playerStore
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
    playlistInfo: {},
    playlistHeaderHeight: 0, //  歌单详情头部高度
    picUrl: '',
    name: '',
    albumInfo: '',
    songDetail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const picUrl = options.picUrl
    const name = options.name
    const picId = options.picId
    let picRealUrl = `${picUrl}==/${picId}.jpg`
    this.setData({
      picUrl: picRealUrl,
      name
    })
    // let id = '2537308137'
    getAlbumsContnent(id).then(res => {
      this.setData({
        playlistInfo: res.songs
      })
    })

    getAlbumsInfo(id).then(res => {
      this.setData({
        albumInfo: res
      })
    })

    this.getPlaylistHeaderHeight()
  },
  handleBackBtnClick: function () {
    wx.navigateBack()
  },

  handleSongItemClick: function (event) {
    const id = event.currentTarget.dataset.id


    let newSong = {}
    let index = 0
    let flag = false
    getSongDetail(id).then((res) => {
      newSong = [res.songs[0]]
      this.setData({
        songDetail: [res.songs[0]]
      })

      for (let i = 0; i < this.data.playListSongs.length; i++) {
        if (id === this.data.playListSongs[i].id) {
          index = i
          flag = true
        }
      }

      if (flag) {
        playerStore.setState("playListSongs", this.data.playListSongs)
        playerStore.setState("playListIndex", index)
      } else {
        let playListSongs = newSong.concat(this.data.playListSongs)
        this.setData({
          playListSongs
        })
        playerStore.setState("playListSongs", this.data.playListSongs)
        playerStore.setState("playListIndex", 0)
      }

    })

    playerStore.onState("playListSongs", (res) => {
      this.setData({
        playListSongs: res
      })

    })
    wx.navigateTo({
      url: '/pages/player/index?id=' + id,
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
  // 获取歌单详情头部高度
  getPlaylistHeaderHeight: function () {
    const query = wx.createSelectorQuery()
    query.select('.playlist-header').boundingClientRect()
    query.exec((res) => {
      this.setData({
        playlistHeaderHeight: res[0].height + 20
      })
      rankingStore.onState("moveDistance", (moveDistance) => {
        this.setData({
          playlistHeaderHeight: res[0].height + 20 + moveDistance
        })
      })
    })
  },
  // 回到首页
  backToIndex: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
})