Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认标题"
    },
    rightText: {
      type: String,
      value: "更多"
    },
    showRightItem: {
      type: Boolean,
      value: true
    },
    showSearchItem: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    titleWidth: 0, // 标题宽度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTitleWidth: function () {
      const query = wx.createSelectorQuery()
      query.in(this).select('.title').boundingClientRect()
      query.exec((res) => {
        this.setData({
          titleWidth: res[0].width
        })
      })
    },

    deleteAllHistoryRecord: function () {
      wx.removeStorage({
        key: 'searchRecord',
        success: () => {
          this.triggerEvent('historyEvent', [])

        }
      })


    }
  },

  lifetimes: {
    // 生命周期函数
    attached: function () {
      this.getTitleWidth()
    },
  },
})