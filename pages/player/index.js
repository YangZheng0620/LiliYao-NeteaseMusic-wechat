import {
  audioContext,
  playerStore
} from '../../store/index'

const playModeNames = ["order", "repeat", "random"]
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
    screenWidth: app.globalData.screenWidth, // 屏幕宽度

    currentSong: {},
    durationTime: 0,
    lyricInfos: [],

    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: "",

    isPlaying: false,
    playingName: "pause",

    playModeIndex: 0,
    playModeName: "order",

    isMusicLyric: true,
    currentPage: 0,
    contentHeight: 0,
    sliderValue: 0,
    isSliderChanging: false,
    lyricScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取传入的id
    const id = options.id
    this.setData({
      id
    })

    playerStore.dispatch("playMusicWithSongIdAction", {
      id
    })
    this.setupPlayerStoreListener()

    // 3.动态计算内容高度
    const globalData = getApp().globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusBarHeight
    const navBarHeight = globalData.navBarHeight
    const deviceRadio = globalData.deviceRadio
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({
      contentHeight,
      isMusicLyric: deviceRadio >= 2
    })
  },

  handleSwiperChange: function (event) {
    const current = event.detail.current
    this.setData({
      currentPage: current
    })
  },

  handleSliderChanging: function (event) {
    const value = event.detail.value
    const currentTime = this.data.durationTime * value / 100
    this.setData({
      isSliderChanging: true,
      currentTime
    })
  },

  handleSliderChange: function (event) {
    // 1.获取slider变化的值
    const value = event.detail.value

    // 2.计算需要播放的currentTIme
    const currentTime = this.data.durationTime * value / 100

    // 3.设置context播放currentTime位置的音乐
    // audioContext.pause()
    audioContext.seek(currentTime / 1000)

    // 4.记录最新的sliderValue, 并且需要讲isSliderChaning设置回false
    this.setData({
      sliderValue: value,
      isSliderChanging: false
    })
  },

  handleBackBtnClick: function () {
    wx.navigateBack()
  },

  handleModeBtnClick: function () {
    // 计算最新的playModeIndex
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3) playModeIndex = 0

    // 设置playerStore中的playModeIndex
    playerStore.setState("playModeIndex", playModeIndex)
  },

  handlePlayBtnClick: function () {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },

  handlePrevBtnClick: function () {
    playerStore.dispatch("changeNewMusicAction", false)
  },
  handleNextBtnClick: function () {
    playerStore.dispatch("changeNewMusicAction")
  },

  // ========================   数据监听   ======================== 
  handleCurrentMusicListener: function ({
    currentSong,
    durationTime,
    lyricInfos
  }) {
    if (currentSong) this.setData({
      currentSong
    })
    if (durationTime) this.setData({
      durationTime
    })
    if (lyricInfos) this.setData({
      lyricInfos
    })
  },

  setupPlayerStoreListener: function () {
    // 1.监听currentSong/durationTime/lyricInfos
    playerStore.onStates(["currentSong", "durationTime", "lyricInfos"], this.handleCurrentMusicListener)

    // 2.监听currentTime/currentLyricIndex/currentLyricText
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
      currentTime,
      currentLyricIndex,
      currentLyricText
    }) => {
      // 时间变化
      if (currentTime && !this.data.isSliderChanging) {
        const sliderValue = currentTime / this.data.durationTime * 100
        this.setData({
          currentTime,
          sliderValue
        })
      }
      // 歌词变化
      if (currentLyricIndex) {
        this.setData({
          currentLyricIndex,
          lyricScrollTop: currentLyricIndex * 65
        })
      }
      if (currentLyricText) {
        this.setData({
          currentLyricText
        })
      }
    })

    // 3.监听播放模式相关的数据
    playerStore.onStates(["playModeIndex", "isPlaying"], ({
      playModeIndex,
      isPlaying
    }) => {
      if (playModeIndex !== undefined) {
        this.setData({
          playModeIndex,
          playModeName: playModeNames[playModeIndex]
        })
      }

      if (isPlaying !== undefined) {
        this.setData({
          isPlaying,
          playingName: isPlaying ? "pause" : "resume"
        })
      }
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
    playerStore.offStates(["currentSong", "durationTime", "lyricInfos"], this.handleCurrentMusicListener)
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

  }
})