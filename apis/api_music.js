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

// 获取推荐歌曲数据
export function getRecommendSongs() {
  return api.GET('/personalized/newsong')
}

// 获取推荐歌单数据
export function getRecommendPlaylists() {
  return api.GET('/personalized')
}

// 获取所有榜单
export function getAllTopList() {
  return api.GET('/toplist')
}

// 获取榜单（歌单）详情
export function getTopListDetail(id) {
  return api.GET('/playlist/detail', {
    id,
  })
}

// 获取歌手分类详情
export function getArtistList(type, limit = 30, offset = 0, area) {
  return api.get('/artist/list', {
    type,
    limit,
    offset,
    area
  })
}


// 登录
export function login(phone, md5_password) {
  return api.post('/login/cellphone', {
    phone,
    md5_password,
  })
}

