const globalData = getApp().globalData

Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: ""
    },
    showUserLogin: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: globalData.statusBarHeight,
    navBarHeight: 44
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleLeftClick: function () {
      this.triggerEvent('click')
    },
    handleLeftClickToIndex: function () {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})