import { setMusic, getMusic } from '@/utils/music/index.js'
import { setMusicList, getMusicList, removeMusicList } from '@/utils/musicList/index.js'
import { getSongListAPI } from '@/api/index.js'
const state = {
  // 播放列表
  musicList: [],
  // 当前播放的音乐
  music: {},
  // 添加音乐计数
  count: 0
}
const mutations = {
  // 设置播放列表
  SETMUSICLIST (state, list) {
    state.musicList = list || []
    // console.log('state.musicList' + state.musicList)
  },
  // 设置当前播放的音乐
  SETMUSIC (state, music) {
    state.music = music || {}
    // console.log(state.music)
  }
}
const actions = {
  // 设置当前播放的音乐
  async setMusics (context, id) {
    // 把当前播放的音乐id存入本地仓库
    setMusic(id)
    const { data: res } = await getSongListAPI(id)
    context.commit('SETMUSIC', res.songs[0])
  },
  // 获取当前播放的音乐
  async getMusics (context) {
    const { data: res } = await getSongListAPI(getMusic())
    context.commit('SETMUSIC', res.songs[0])
  },
  // 将音乐添加到播放列表
  async addMusicList (context, ids) {
    state.count++
    let list = getMusicList()
    if (list === null) {
      setMusicList(ids)
      list = ids
      const { data: res } = await getSongListAPI(list)
      context.commit('SETMUSICLIST', res.songs)
      // console.log('res.songs' + res.songs)
    } else {
      // 判断本地仓库的音乐列表中是否已存在该音乐
      if (list.indexOf(ids) === -1) {
        list += ',' + ids
        list = list.replace(',,', ',')
        if (list[0] === ',') {
          list = list.substring(1, list.length)
        }
        setMusicList(list)
        const { data: res } = await getSongListAPI(list)
        context.commit('SETMUSICLIST', res.songs)
        // console.log('res.songs' + res.songs)
      }
    }
    // console.log(state.count)
  },
  // 获取播放列表
  async getMusicLists (context) {
    let list = getMusicList()
    if (list !== null) { list = list.replace(',,', ',') }
    if (list !== null && list.length !== 0 && list[list.length - 1] === ',') {
      list = list.substring(0, list.length - 1)
    }
    const { data: res } = await getSongListAPI(list)
    context.commit('SETMUSICLIST', res.songs)
  },
  // 清空播放列表
  removeAllMusic (context) {
    removeMusicList()
    context.commit('SETMUSICLIST', [])
  },
  // 删除指定的音乐
  async removeMusic (context, id) {
    let list = getMusicList()
    list = list.replace(id + ',', '')
    list = list.replace(',' + id, '')
    list = list.replace(id, '')
    setMusicList(list)
    const { data: res } = await getSongListAPI(list)
    context.commit('SETMUSICLIST', res.songs)
  }
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}
