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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSongItemClick: function(event) {
      console.log(event.currentTarget.dataset.id);
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/player/index?id=' + id,
      })
    }
  }
})