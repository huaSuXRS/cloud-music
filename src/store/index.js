import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import music from './music/index.js'
import login from './login/index.js'
import home from './home/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // 实现Vuex仓库模块化
  modules: {
    music,
    login,
    home
  }
})
