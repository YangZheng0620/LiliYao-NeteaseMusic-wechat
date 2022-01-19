// app.js
App({
  onLaunch() {

    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    // 获取状态栏高度
    this.globalData.statusHeight = systemInfo.statusBarHeight
    // 获取屏幕宽度
    this.globalData.screenWidth = systemInfo.screenWidth

    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    // 胶囊距右方间距
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    // 胶囊距底部间距
    this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    // 胶囊高度
    this.globalData.menuHeight = menuButtonInfo.height;

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    statusHeight: 0, // 状态栏高度
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    screenWidth: 0, // 屏幕宽度
  }
})