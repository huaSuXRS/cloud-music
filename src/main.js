import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入这个懒加载插件
import VueLazyload from 'vue-lazyload'

// 引入vuex
import store from './store'

// 注册
Vue.use(VueLazyload, { // 添加自定义选项
  // preLoad: 1.3,
  // // error: '../static/icon/white.png', // 加载错误时候的图片
  // loading: '@/assets/loading.gif' // 加载中的图片
  // attempt: 7,
  // listenEvents: ['scroll']
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
