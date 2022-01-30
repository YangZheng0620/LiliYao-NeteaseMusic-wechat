// components/playlist-area/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认歌单"
    },
    recommendPlaylists: {
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
    handleMenuItemClick: function (event) {
      const item = event.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/playlist-detail/index?id=${item.id}`,
      });
    },
  }
})