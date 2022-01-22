import api from './index'

export function getSongDetail(ids) {
  return api.GET("/song/detail", {
    ids
  })
}

export function getSongLyric(id) {
  return api.GET("/lyric", {
    id
  })
}