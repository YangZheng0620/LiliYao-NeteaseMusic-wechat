import api from './index'

// 获取 MV 列表数据
export function getTopMV(offset, area = '',  order = '', limit = 10) {
  return api.get('/mv/all', {
    offset,
    area,
    limit,
    order
  })
}


/**
 * 请求 MV 的播放地址
 * @param {number} id MV的id
 */
export function getMVURL(id) {
  return api.get('/mv/url', {
    id
  })
}

/**
 * 请求 MV 的播放地址 VID
 * @param {number} id MV的id
 */
export function getMVURLVID(id) {
  return api.get('/video/url', {
    id
  })
}

/**
 * 请求 MV 的详情
 * @param {number} id MV的id
 */
export function getMVDetailID(mvid) {
  return api.get('/mv/detail', {
    mvid
  })
}

// 请求 MV 的详情 VID
// 请求 MV 的详情 VID
export function getMVDetailVID(id) {
  return api.get('/video/detail', {
    id
  })
}

// 获取 MV 的相关视频
export function getRelatedVideo(id) {
  return api.get('/related/allvideo', {
    id
  })
}