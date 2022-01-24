import {
  getSongComment
} from '../../apis/api_player'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songId: {
      type: Number,
      value: 0,
      observer: function (newVal) {
        getSongComment(newVal).then(res => {
          this.setData({
            normalComments: res.comments
          })
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    normalComments: [],
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})