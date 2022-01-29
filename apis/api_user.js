import api from './index'

// 获取用户播放记录
export function getUserRecord(uid, type = 1) {
  return api.get('/user/record', {
    uid,
    type
  })
}

// 获取用户歌单
export function getUserPlayList(uid, limit = 30, offset = 0) {
  return api.get('/user/playlist', {
    uid,
    limit,
    offset
  })
}