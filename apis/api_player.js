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

export function getSimiSong(id) {
  return api.GET("/simi/song", {
    id
  })
}

export function getSingerDetail(id) {
  return api.GET("/artist/detail", {
    id
  })
}

export function getSongComment(id, limit=10) {
  return api.GET("/comment/music", {
    id,
    limit
  })
}