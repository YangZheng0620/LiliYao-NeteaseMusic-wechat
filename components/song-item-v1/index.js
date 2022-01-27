import {
  playerStore
} from "../../store/index";

import {
  getSongDetail
} from '../../apis/api_player'

// components/song-item-v1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playListSongs: [],
    songDetail: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSongItemClick: function () {
      const id = this.properties.item.id
      console.log(id);
      let newSong = {}
      let index = 0
      let flag = false
      getSongDetail(id).then((res) => {
        console.log(res.songs[0]);
        newSong = [res.songs[0]]
        this.setData({
          songDetail: [res.songs[0]]
        })

        for (let i = 0; i < this.data.playListSongs.length; i++) {
          if (id === this.data.playListSongs[i].id) {
            console.log(this.data.playListSongs[i].id);
            index = i
            flag = true
          }
        }

        if (flag) {
          playerStore.setState("playListSongs", this.data.playListSongs)
          playerStore.setState("playListIndex", index)
        } else {
          let playListSongs = newSong.concat(this.data.playListSongs)
          console.log(playListSongs);
          this.setData({
            playListSongs
          })
          playerStore.setState("playListSongs", this.data.playListSongs)
          playerStore.setState("playListIndex", 0)
        }

      })

      playerStore.onState("playListSongs", (res) => {
        console.log(res);
        this.setData({
          playListSongs: res
        })

      })




      // console.log(demo);
      wx.navigateTo({
        url: '/pages/player/index?id=' + id,
      })


      // // 对歌曲的数据请求和其他操作
      // playerStore.dispatch("playMusicWithSongIdAction", {
      //   id
      // })

    }
  }
})