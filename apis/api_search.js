import api from './index'

// 热门搜索
export function getHotSearch() {
  return api.GET('/search/hot')
}

// 搜索建议
export function getSearchSuggest(keywords) {
  return api.GET('/search/suggest', {
    keywords,
    type: 'mobile', // 返回移动端数据
  })
}

// 搜索歌曲结果
export function getSearchResult(keywords, limit=30, offeset=0, type=1) {
  return api.GET('/search', {
    keywords,
    limit,
    offeset,
    type
  })
}