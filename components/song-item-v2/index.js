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
    hotNumList: {
      type: Number,
      value: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth, // 屏幕宽度
    hotNumList: [1, 2, 3], // 榜单前三名
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})