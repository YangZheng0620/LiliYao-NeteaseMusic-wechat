import {
  playerStore
} from '../../store/index'

const app = getApp()
const playModeNames = ["order", "repeat", "random"]

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
    scrollPlaying: false,

    show: false,
    canPlaySongList: [],
    canPlaySongCurrentIndex: 0,

    playModeIndex: 0,
    playModeName: "order",

    navBarHeight: app.globalData.navBarHeight, // 导航栏高度
  },
  lifetimes: {
    attached: function () {

      playerStore.onState("playListSongs", (res) => {
        console.log(res);
        this.setData({
          canPlaySongList: res
        })
      })

      playerStore.onState("playListIndex", (res) => {
        console.log(res);
        this.setData({
          canPlaySongCurrentIndex: res
        })
      })


      this.setupPlayerStoreListener()

    }
  },
  observers: {
    'currentLyricText': function (value) {
      if (value.length > 14) {
        this.setData({
          scrollPlaying: true
        })
      } else {
        this.setData({
          scrollPlaying: false
        })
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

    handlePlayBtnClick: function () {
      playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
    },
    onClickHide() {
      this.setData({
        show: false
      });
    },
    onClickShow() {
      this.setData({
        show: true
      });
    },
    handleModeBtnClick: function () {
      // 计算最新的playModeIndex
      let playModeIndex = this.data.playModeIndex + 1
      if (playModeIndex === 3) playModeIndex = 0
      // 设置playerStore中的playModeIndex
      playerStore.setState("playModeIndex", playModeIndex)
    },

    handleSelectBtnClick: function (event) {
      const index = event.currentTarget.dataset.index
      console.log(index);
      playerStore.dispatch("selectNewMusicAction", index)
    },
  }
})