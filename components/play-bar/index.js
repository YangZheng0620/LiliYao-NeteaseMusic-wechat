import {
  playerStore
} from '../../store/index'

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentSong: {},
    isPlaying: false,
    playAnimState: "paused",
    currentLyricText: "",
    screenWidth: app.globalData.screenWidth, // 屏幕宽度
    scrollWidth: 0,
    scrollPlaying: false
  },
  lifetimes: {
    attached: function () {
      console.log(123);
      this.setupPlayerStoreListener()

    }
  },
  observers: {
    'currentLyricText': function (value) {
      if (value.length > 14) {
        this.setData({ scrollPlaying: true})
      } else {
        this.setData({ scrollPlaying: false})
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handlePlayBarClick: function () {
      wx.navigateTo({
        url: '/pages/player/index?id=' + this.data.currentSong.id,
      })
    },

    setupPlayerStoreListener: function () {

      playerStore.onState("currentLyricText", (res) => {
        this.setData({
          currentLyricText: res
        })
      })

      // 2.播放器监听
      playerStore.onStates(["currentSong", "isPlaying"], ({
        currentSong,
        isPlaying
      }) => {
        if (currentSong) this.setData({
          currentSong
        })
        if (isPlaying !== undefined) {
          this.setData({
            isPlaying,
            playAnimState: isPlaying ? "running" : "paused"
          })
        }
      })


    },

    handlePlayBtnClick: function () {
      playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
    },

  }
})