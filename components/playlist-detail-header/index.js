import {
  rankingStore
} from "../../store/index"

let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlistInfo: {
      type: Object,
      value: {}
    },
    navBarHeight: {
      type: Number,
      value: 0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    coverHeight: 450,
    coverTransition: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTouchStart(event) {
      startY = event.touches[0].clientY;
      this.setData({
        coverTransition: '',
      });

    },

    handleTouchMove(event) {
      moveY = event.touches[0].clientY;
      moveDistance = moveY - startY; // 手指移动的距离
      // 动态更新 coverTransform 的状态值
      if (moveDistance <= 0) return;
      if (moveDistance >= 60) {
        moveDistance = 60;
      }

      rankingStore.dispatch("changeMoveDistance", moveDistance)

      this.setData({
        coverHeight: 450 + moveDistance,
      });

    },

    handleTouchEnd() {
      rankingStore.dispatch("changeMoveDistance", 0)
      this.setData({
        coverHeight: 450,
        coverTransition: 'height 1.2s ease'
      });
    },
  }
})