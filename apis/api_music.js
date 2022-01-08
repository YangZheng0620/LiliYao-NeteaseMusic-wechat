import api from './index'

/**
 * 获取轮播图数据
 * @param {number} type 不同平台的类型
 */
export function getBanner(type) {
  return api.GET('/banner', {
    type: 2
  })
}