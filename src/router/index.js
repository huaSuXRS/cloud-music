import Vue from 'vue'
import VueRouter from 'vue-router'
import FindMusic from '@/views/findMusic/index.vue'
import MyMusic from '@/views/myMusic/index.vue'
import interestPeople from '@/views/interest/index.vue'
import downloadApp from '@/views/downloadApp/index.vue'
import Recommen from '@/views/findMusic/recommen/index.vue'
import Toplist from '@/views/findMusic/toplist/index.vue'
import Playlist from '@/views/findMusic/playlist/index.vue'
import Djradio from '@/views/findMusic/djradio/index.vue'
import Artist from '@/views/findMusic/artist/index.vue'
import Album from '@/views/findMusic/album/index.vue'
import DetailSongs from '@/views/detail/songs/index.vue'
// import MyDetail from '@/views/detail/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/findMusic/recommen' },
  {
    path: '/findMusic',
    component: FindMusic,
    redirect: '/findMusic/recommen',
    children: [
      { path: 'recommen', component: Recommen },
      { path: 'toplist/:id?', component: Toplist },
      { path: 'playlist/(:limit&:order&:cat&:offset)?', component: Playlist },
      { path: 'djradio', component: Djradio },
      { path: 'artist/:cat?', component: Artist },
      { path: 'album', component: Album }
    ]
  },
  // { path: '/playlist/:id?', component: DetailPlaylist },
  { path: '/myMusic', component: MyMusic },
  { path: '/interest', component: interestPeople },
  { path: '/downloadApp', component: downloadApp },
  { path: '/songs', component: DetailSongs }
  // { path: '/albums', component: MyDetail },
  // { path: '/artists', component: MyDetail },
  // { path: '/playlists', component: MyDetail }
]

const router = new VueRouter({
  routes
})

export default router
