import {
  HYEventStore
} from 'hy-event-store'

import {
  getAllTopList,
  getTopListDetail
} from '../apis/api_music'

const rankingMap = {
  0: "rankingZero",
  1: "rankingOne",
  2: "rankingTwo"
}

const rankingStore = new HYEventStore({
  state: {
    rankingZero: {},
    rankingOne: {},
    rankingTwo: {}
  },
  actions: {
    getRankingDataAction(ctx) {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      let showArr = []

      for (let i = 0; i < 3; i++) {
        let index = Math.floor((Math.random() * arr.length));
        showArr.push(arr[index])
        arr.splice(index, 1)
      }

      showArr.forEach((item, index) => {
        getAllTopList().then(res => {
          const rankingName = rankingMap[index]

          let id = res.list[item].id

          getTopListDetail(id).then(res => {
            ctx[rankingName] = res.playlist
          })

        })
      })

    }
  }
})

export {
  rankingStore,
}