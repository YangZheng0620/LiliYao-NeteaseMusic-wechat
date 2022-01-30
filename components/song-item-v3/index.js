import {
  playerStore
} from "../../store/index";

import {
  getSongDetail
} from '../../apis/api_player'

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0
    },
    item: {
      type: Object,
      value: {}
    },
    showIndex: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth, // 屏幕宽度
    playListSongs: [],
    songDetail: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    }
  }
})