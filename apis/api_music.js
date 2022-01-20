import api from './index'

/**
 * 获取轮播图数据
 * @param {number} type 不同平台的类型
 */
export function getBanners(type) {
  return api.GET('/banner', {
    type: 2
  })
}


// 获取歌单详情数据
export function getPlaylistDetail(id) {
  return api.GET('/playlist/detail/dynamic', {
      id,
  })
}

// 获取推荐歌单数据
export function getRecommendSongs() {
  return api.GET('/personalized/newsong')
}