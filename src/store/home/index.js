// findMusic模块下所有数据

const state = {
  // 排行榜歌单详情
  playList: {},
  ids: ''
}
const mutations = {
  GETPLAYLIST (state, playList) {
    state.playList = playList
  },
  IDS (state, ids) {
    state.ids = ids
  }
}
const actions = {
  // 获取排行榜歌单详情
  async getPlayList (context, playList) {
    context.commit('GETPLAYLIST', playList)
  },
  // 获取歌单歌曲id串
  getIds (context, ids) {
    context.commit('IDS', ids)
  }

}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
