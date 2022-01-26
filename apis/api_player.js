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
  return api.get("/artist/detail", {
    id
  })
}

export function getSongComment(id, limit = 10) {
  return api.GET("/comment/music", {
    id,
    limit
  })
}

export function getSingerSongs(id) {
  return api.get("/artists", {
    id
  })
}

export function getSimiSingers(id) {
  return api.get("/simi/artist", {
    id
  })
}

export function getSingerAlbums(id) {
  return api.get("/artist/album", {
    id
  })
}