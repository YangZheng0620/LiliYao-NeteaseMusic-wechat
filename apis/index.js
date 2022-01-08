const BASE_URL = 'http://123.207.32.32:9001' // 接口 BASE_URL 地址

class REQUEST {
  request(URL, METHOD, PARAMS) {
    // 使用 Promise 获得返回的结果（resolve 和 reject 来接收）
    return new Promise ((resolve, reject) => {
      wx.request({
        // 基本配置信息
        url: BASE_URL + URL,
        method: METHOD,
        data: PARAMS,

        // 成功回调
        success (res) {
          resolve(res.data)
        },

        // 失败回调
        fail (res) {
          reject(res)
        }

      })
    })
  }

  // 封装 GET 请求
  GET(URL, PARAMS) {
    return this.request(URL, 'GET', PARAMS)
  }

  // 封装 POST 请求
  POST(URL, DATA) {
    return this.request(URL, 'POST', DATA)
  }

}

// 创建对象
const api = new REQUEST()

// 导出对象
export default api