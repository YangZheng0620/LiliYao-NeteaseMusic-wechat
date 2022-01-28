const app = getApp()

import {
  getTopMV
} from '../../apis/api_video'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusHeight: app.globalData.statusHeight, // 状态栏高度
    navBarHeight: app.globalData.navBarHeight, // 导航栏高度
    menuRight: app.globalData.menuRight, // 导航栏高度
    menuBotton: app.globalData.menuBotton, // 导航栏高度
    menuHeight: app.globalData.menuHeight, // 导航栏高度
    navList: [{
      title: 'MV'
    }, ],
    currentTab: 0, // 当前 swiper
    navbarLeft: 0, // 导航栏内容左距离
    navbarWidth: 0, // 导航栏内容宽度
    topMVs: [], // mv 列表数据
    hasMore: true,
    areaList: [{
        index: 0,
        name: '全部',
      },
      {
        index: 1,
        name: '内地',
      },
      {
        index: 2,
        name: '港台',
      },
      {
        index: 3,
        name: '欧美',
      },
      {
        index: 4,
        name: '日本',
      },
      {
        index: 5,
        name: '韩国',
      },
    ],
    currentAreaIndex: 0, // 歌手地区索引
    currentTypeIndex: 0, // 歌手类型索引
    currentAreaValue: '', // 歌手地区值
    currentTypeValue: -1, // 歌手类型值
    currentAreaName: '全部', // 歌手地区名字
    currentTypeName: '全部', // 歌手类型名字
    option1: [{
        text: '上升最快',
        value: '上升最快',
      },
      {
        text: '最热',
        value: '最热',
      },
      {
        text: '最新',
        value: '最新',
      },
    ],
    value1: '上升最快',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航栏内容宽高
    this.getNavBarStyle()

    //获取视频列表
    this.getTopMVData(0, this.data.currentAreaValue)
  },

  // 获取导航栏内容宽高
  getNavBarStyle: function () {
    const query = wx.createSelectorQuery()
    query.select('.navbar-selected').boundingClientRect()
    query.exec((res) => {
      this.setData({
        navbarLeft: res[0].left,
        navbarWidth: res[0].width
      })
    })
  },
  // 封装网络请求的方法
  getTopMVData(offset, area, limit) {
    // 判断是否可以请求数据（hasMore 为 false 且 offset 不为 0，则不需要再请求数据）
    // 第一次请求数据可以过这个判断，增加 offset 的判断是为了避免 hasMore 初始化为 false 的情况
    if (!this.data.hasMore && offset !== 0) return

    // 展示加载动画
    wx.showNavigationBarLoading()


    // 开始请求数据
    getTopMV(offset, area, limit).then((res) => {
      let newData = this.data.topMVs
      
      // 第一次请求数据，则使用新数据
      if (offset === 0) {
        newData = res.data

        // 第 n 次请求数据，则将新数据和原数据进行拼接
      } else {

        newData = newData.concat(res.data)
      }
      // 设置数据
      this.setData({
        topMVs: newData,
        hasMore: res.hasMore
      })

      // 关闭加载动画
      wx.hideNavigationBarLoading()

      // 关闭下拉刷新动画（数据加载完后主动停止，不设置则会在一定时间内停止）
      if (offset === 0) {
        wx.stopPullDownRefresh();
      }
    })




  },

  // 封装事件处理的方法
  handleVideoItemClick: function (event) {
    // 获取页面 ID
    const id = event.currentTarget.dataset.item.id
    console.log(id);
    // 跳转到指定页面
    wx.navigateTo({
      url: `/pages/video-detail/index?id=${id}`,
    });
  },

  handleAreaActiveItem: function (event) {
    // console.log(event.currentTarget.dataset.value);
    const value = event.currentTarget.dataset.name
    const index = event.currentTarget.dataset.index
    const name = event.currentTarget.dataset.name
    this.setData({
      currentAreaIndex: index,
      currentAreaValue: value,
      currentAreaName: name
    })

    this.getTopMVData(0, this.data.currentAreaValue, this.data.value1) // 下拉刷新后覆盖掉原来的数据
  },

  changeOrderValue: function (event) {
    const order = event.detail
    this.setData({
      value1: order
    })
    console.log(order);
    this.getTopMVData(0, this.data.currentAreaValue, order) // 下拉刷新
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getTopMVData(0, this.data.currentAreaValue, this.data.value1) // 下拉刷新后覆盖掉原来的数据
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 如果 hasMore 为 false，则没有更多数据，不需要继续加载
    // 和原数据进行拼接达到加载数据效果，保存最新的 hasMore 来判断数据是否加载完全
    this.getTopMVData(this.data.topMVs.length + 1, this.data.currentAreaValue, this.data.value1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})