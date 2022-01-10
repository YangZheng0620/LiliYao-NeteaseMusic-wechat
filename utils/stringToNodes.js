import {
  pinyin,
  match
} from 'pinyin-pro'

export default function stringToNodes(keyword, value) {
  const nodes = []
  if (keyword.toUpperCase().startsWith(value.toUpperCase())) {
    const key1 = keyword.slice(0, value.length)
    const node1 = {
      name: "span",
      attrs: {
        style: "color: #26ce8a; font-size: 14px;"
      },
      children: [{
        type: "text",
        text: key1
      }]
    }
    nodes.push(node1)

    const key2 = keyword.slice(value.length)
    const node2 = {
      name: "span",
      attrs: {
        style: "color: #000000; font-size: 14px;"
      },
      children: [{
        type: "text",
        text: key2
      }]
    }
    nodes.push(node2)
  } else if (match(keyword, value)) { // 中文匹配成功进入判断
    const matchIndex = match(keyword, value) // 匹配索引值
    const matchMin = Math.min(...matchIndex) // 数组最小值
    const matchLength = matchIndex.length // 数组长度
    if (matchMin !== 0) { // 匹配的中文不在开头
      const key1 = keyword.slice(0, matchMin)
      const node1 = {
        name: "span",
        attrs: {
          style: "color: #000000; font-size: 14px;"
        },
        children: [{
          type: "text",
          text: key1
        }]
      }
      nodes.push(node1)

      const key2 = keyword.substr(matchMin, matchLength)
      const node2 = {
        name: "span",
        attrs: {
          style: "color: #26ce8a; font-size: 14px;"
        },
        children: [{
          type: "text",
          text: key2
        }]
      }
      nodes.push(node2)
      // if (matchMin + matchIndex.length < keyword.length) {
      //   const key3 = keyword.slice(matchMin + matchIndex.length)
      //   const node3 = {
      //     name: "span",
      //     attrs: {
      //       style: "color: #26ce8a; font-size: 14px;"
      //     },
      //     children: [{
      //       type: "text",
      //       text: key2
      //     }]
      //   }
      //   nodes.push(node2)
      // }

    } else { // 匹配的中文在开头
      let matchLength = 0
      // 判断是否有空格的情况
      if (keyword.indexOf(" ") == -1) {
        matchLength = matchIndex.length
      } else {
        matchLength = matchIndex.length + 1
      }
      const key1 = keyword.slice(0, matchLength)
      const node1 = {
        name: "span",
        attrs: {
          style: "color: #26ce8a; font-size: 14px;"
        },
        children: [{
          type: "text",
          text: key1
        }]
      }
      nodes.push(node1)

      const key2 = keyword.slice(matchLength)
      const node2 = {
        name: "span",
        attrs: {
          style: "color: #000000; font-size: 14px;"
        },
        children: [{
          type: "text",
          text: key2
        }]
      }
      nodes.push(node2)
    }
  } else { // 英文中文都没有匹配到则进入判断
    const node = {
      name: "span",
      attrs: {
        style: "color: #000000; font-size: 14px;"
      },
      children: [{
        type: "text",
        text: keyword
      }]
    }
    nodes.push(node)
  }
  /* 最简单的方法就是在 for 循环中，用 includes 判断数组是否包含某个值，
     如果包含的话，则设置为绿色，如果不包含，则设置为黑色。相当于将每个字
     都切开，然后一个字符一个字符返回 
  */
  return nodes
}