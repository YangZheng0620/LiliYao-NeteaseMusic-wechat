import {
  getHotSearch,
  getSearchSuggest,
  getSearchResult
} from '../../apis/api_search'

import debounce from '../../utils/debounce'

import stringToNodes from '../../utils/stringToNodes'

// 使用防抖函数进行处理后返回新函数
const debounceGetSearchSuggest = debounce(getSearchSuggest)

const app = getApp()

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
    songsRelatedSinger: [], // 搜索歌曲匹配到的歌手
    songsRelatedSingerName: "", // 搜索歌曲匹配到的歌手名字
    statusHeight: app.globalData.statusHeight, // 状态栏高度
    navBarHeight: app.globalData.navBarHeight, // 导航栏高度
    menuRight: app.globalData.menuRight, // 导航栏高度
    menuBotton: app.globalData.menuBotton, // 导航栏高度
    menuHeight: app.globalData.menuHeight, // 导航栏高度
    searchRecord: [], // 历史搜索记录
    playlistSearchList: [], // 关键词关联歌单
    videoSearchList: [], // 关键词关联视频
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()


    // 获取本地存储历史搜索记录
    wx.getStorage({
      key: 'searchRecord',
      success: (res) => {
        this.setData({
          searchRecord: res.data
        })
      }
    })
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
    this.setData({
      searchKeywords
    })

    // 3. 判断关键字为空字符的处理逻辑
    if (!searchKeywords.length) {
      this.setData({
        suggestSongs: []
      })
      this.setData({
        resultSongs: []
      })
      return
    }

    // 4. 根据关键字进行搜索
    debounceGetSearchSuggest(searchKeywords).then(res => {
      // 1. 获取建议搜索的歌曲
      const suggestSongs = res.result.allMatch
      this.setData({
        suggestSongs
      })

      // 2. 转换成 nodes 节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchKeywords)
        suggestSongsNodes.push(nodes)
      }
      this.setData({
        suggestSongsNodes
      })
    })
  },

  handleSearchAction: function () {
    // 1. 获取到输入关键字
    const searchKeywords = this.data.searchKeywords



    // 2. 搜索歌曲网络请求
    getSearchResult(searchKeywords).then(res => {
      this.setData({
        resultSongs: res.result.songs
      })
      this.setData({
        songsRelatedSingerName: res.result.songs[0].artists[0].name
      });

      // 发送请求寻找歌曲关联歌手
      let name = res.result.songs[0].artists[0].name
      getSearchResult(name, 30, 0, 100).then(res => {
        this.setData({
          songsRelatedSinger: res.result.artists[0]
        });
      })


      // 寻找关联歌单
      getSearchResult(searchKeywords, 30, 0, 1000).then(res => {
        this.setData({
          playlistSearchList: res.result.playlists
        });
      })

      // 寻找关联视频
      getSearchResult(searchKeywords, 30, 0, 1014).then(res => {
        this.setData({
          videoSearchList: res.result.videos
        });
      })

    })

    // 添加搜索历史记录
    let searchRecord = this.data.searchRecord
    // 如果记录已存在，直接返回
    for (let i = 0; i < searchRecord.length; i++) {
      if (searchKeywords == searchRecord[i].value) return
    }

    if (searchRecord.length >= 8) {
      searchRecord.pop() // 删除最早的一条记录
    } else {
      searchRecord.unshift({
        value: searchKeywords,
      })
    }
    // 将历史记录添加到缓存中
    wx.setStorage({
      key: 'searchRecord',
      data: searchRecord,
      success: () => {
        wx.getStorage({
          key: "searchRecord",
          success: (res) => {
            this.setData({
              searchRecord: res.data
            })
          }
        })

      }
    })

    // console.log(this.data.resultSongs);
  },

  handleKeywordItemClick: function (event) {
    // 1.获取点击的关键字
    const keyword = event.currentTarget.dataset.keyword

    // 2.将关键设置到 searchKeywords 中
    this.setData({
      searchKeywords: keyword
    })

    // 3.发送网络请求
    this.handleSearchAction()
  },

  deleteHistroy: function (event) {
    const detail = event.detail
    this.setData({
      searchRecord: detail
    })
  },

  demo: function (event) {
    const value = event.currentTarget.dataset.value
    console.log(value);
    const list = this.data.searchRecord
    console.log(list);
    const newList = list.filter(item => item.value !== value)
    // 将历史记录添加到缓存中
    wx.setStorage({
      key: 'searchRecord',
      data: newList,
      success: () => {
        wx.getStorage({
          key: "searchRecord",
          success: (res) => {
            this.setData({
              searchRecord: res.data
            })
          }
        })

      }
    })
  },
  handleSingerDetail: function (event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/singer/index?id=' + id,
    })
  },

  handleVideoItemClick: function(event) {
    const vid = event.currentTarget.dataset.vid
    console.log(vid);
    wx.navigateTo({
      url: '/pages/video-detail/index?id=' + vid,
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

  },
  // 回到首页
  backToIndex: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  handleBackBtnClick: function () {
    wx.navigateBack()
  },
})