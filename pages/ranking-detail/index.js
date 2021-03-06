import {
  rankingStore,
  playerStore
} from "../../store/index"

import {
  getTopListDetail
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
    rankingInfo: {},
    rankingHeaderHeight: 0, //  榜单详情头部高度
    rankingName: "", // 榜单名字
    rankingSongList: [], // 歌单歌曲列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type === 'rank') {
      const name = options.ranking
      this.setData({
        rankingName: name
      })

      // rankingStore.dispatch("getRankingDataAction")
      rankingStore.onState(name, this.getRankingDataHandler)
    } else {
      const id = options.id
      getTopListDetail(id).then((res) => {
          this.setData({
            rankingInfo: res.playlist,
            rankingSongList: res.playlist.tracks.splice(0, 50)
          })
        }

      )
    }




    this.getPlaylistHeaderHeight()
  },
  handleSongItemClick: function (event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.rankingSongList)
    playerStore.setState("playListIndex", index)
  },
  getRankingDataHandler: function (res) {
    this.setData({
      rankingInfo: res,
      rankingSongList: res.tracks.splice(0, 50)
    })
  },

  // 获取榜单详情头部高度
  getPlaylistHeaderHeight: function () {
    const query = wx.createSelectorQuery()
    query.select('.ranking-header').boundingClientRect()
    query.exec((res) => {
      this.setData({
        rankingHeaderHeight: res[0].height + 20
      })
      rankingStore.onState("moveDistance", (moveDistance) => {
        this.setData({
          rankingHeaderHeight: res[0].height + 20 + moveDistance
        })
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