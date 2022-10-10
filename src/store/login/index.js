
import { getCookie, setCookie, removeCookie } from '@/utils/cookie'
import { setUserID, getUserID, removeUserID } from '@/utils/userID'
import { getUserInfoAPI, getLoginOutAPI } from '@/api/index.js'

const state = {
  code: 0,
  cookie: getCookie(),
  userId: getUserID(),
  userInfo: {}
}
const mutations = {
  UPDATECOOKIE (state, cookie) {
    state.cookie = cookie
  },
  GETUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  EXIT (state) {
    state.userInfo = {}
    state.userId = ''
    // state.token = "";
    removeCookie()
    removeUserID()
  }
}
const actions = {
  updateCookie (context, cookie) {
    // 将cookie存入本地
    setCookie(cookie)
    // 将cookie存入仓库
    context.commit('UPDATECOOKIE', cookie)
  },
  // 获取用户信息
  async getUserInfo (context, uid, cookie) {
    setUserID(uid)
    const { data: res } = await getUserInfoAPI(uid, cookie)
    context.commit('GETUSERINFO', res)
    // console.log(res)
  },
  // 退出登录
  async exit (context) {
    await getLoginOutAPI()
    context.commit('EXIT')
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
