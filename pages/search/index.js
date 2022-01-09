import {
  getHotSearch,
  getSearchSuggest
} from '../../apis/api_search'

import debounce from '../../utils/debounce'

import stringToNodes from '../../utils/stringToNodes'

// 使用防抖函数进行处理后返回新函数
const debounceGetSearchSuggest = debounce(getSearchSuggest)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords: [], // 热门搜索数据
    searchKeywords: "", // 用户输入的搜索关键字
    suggestSongs: [], // 建议搜索获取的歌曲
    resultSongs: [], // 用户选择后获取的歌曲
    suggestSongsNodes: [], // 保存搜索关键字节点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
  },

  // 获取数据的网络请求
  getPageData: function () {
    getHotSearch().then(res => {
      this.setData({
        hotKeywords: res.result.hots
      })
    })
  },

  // 获取用户输入返回搜索建议
  handleSearchChange: function (event) {
    // 1. 获取输入的关键字
    const searchKeywords = event.detail

    // 2. 保存关键字
    this.setData({ searchKeywords })

    // 3. 判断关键字为空字符的处理逻辑
    if (!searchKeywords.length) {
      this.setData({ suggestSongs: []})
      this.setData({ resultSongs: [] })
      return
    }

    // 4. 根据关键字进行搜索
    debounceGetSearchSuggest(searchKeywords).then(res => {
      // 1. 获取建议搜索的歌曲
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs})

      // 2. 转换成 nodes 节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchKeywords)
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})