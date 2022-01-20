// 获取元素的位置大小信息
export default function (selector) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    // 简写 query.exec(resolve)
    query.exec(res => {
      resolve(res)
    })
  })
}