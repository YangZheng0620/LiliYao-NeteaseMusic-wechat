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

export function getSingerDescInfo(id) {
  return api.get("/artists", {
    id
  })
}

export function getSingerMV(id) {
  return api.get("/artist/mv", {
    id
  })
}

export function getSingerSongs(id, limit = 100) {
  return api.get("/artist/songs", {
    id,
    limit
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

export function getAlbumsContnent(id) {
  return api.get("/album", {
    id
  })
}


export function getAlbumsInfo(id) {
  return api.get("/album/detail/dynamic", {
    id
  })
}