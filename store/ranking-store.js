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
    rankingTwo: {},
    moveDistance: 0,
  },
  actions: {
    getRankingDataAction(ctx) {
      let arr = [0, 1, 2, 3, 5, 7, 8, 15]
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

    },
    changeMoveDistance(ctx, height) {
      ctx.moveDistance = height
    }
  }
})

export {
  rankingStore,
  rankingMap
}