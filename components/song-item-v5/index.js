
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSongItemClick: function (event) {
      const id = this.properties.item.id
      const picUrl = event.currentTarget.dataset.picurl
      const name = event.currentTarget.dataset.name
      const picId = event.currentTarget.dataset.picid
      wx.navigateTo({
        url: `/pages/album-detail/index?id=${id}&picUrl=${picUrl}&picId=${picId}&name=${name}`,
      })

      // // 对歌曲的数据请求和其他操作
      // playerStore.dispatch("playMusicWithSongIdAction", {
      //   id
      // })

    }
  }
})