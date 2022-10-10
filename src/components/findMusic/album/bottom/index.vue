<template>
  <div class="albumBottom">
    <div class="ab_header">
      <h3 class="h_hd">全部新碟</h3>
      <div class="h_cate">
        <span class="h_c" v-for="(item,index) in categroy" :key="index">
          <a @click="changeType(item.area)">{{item.name}}</a>
          <p class="sperator" v-if="index !== categroy.length-1">|</p>
        </span>
      </div>
    </div>

    <ul class="at_ul">
      <li class="at_li" v-for="item in showAlbums" :key="item.id">
        <div class="li_top" :title="item.name">
          <img class="t_cover" v-lazy="item.blurPicUrl">
          <div class="t_bg"></div>
          <span class="t_play" @click="play(item.id)"></span>
        </div>
        <a class="t_title">{{item.name}}</a>
        <p class="t_art">
          <span class="t_auth" v-for="(artist,index) in item.artists" :key="artist.id">
            <a class="t_name" :title="artist.name">{{artist.name}}</a>
            <span v-if="item.artists.length -1 !== index ">&nbsp;/&nbsp;</span>
          </span>
        </p>
      </li>
    </ul>

    <Pagination :total="total" :pageNum="pageNum" :pageSize="pageSize" :btnCount="7" @getPageNum="getPageNum"></Pagination>
  </div>
</template>

<script>
import { getAlbumAPI, getAlbumDetailAPI } from '@/api/index.js'
import Pagination from '@/components/pagination/index.vue'
import bus from '@/utils/eventBus'

export default {
  name: 'albumBottom',
  components: {
    Pagination
  },
  data () {
    return {
      pageSize: 35,
      total: 0,
      type: 'new',
      pageNum: 1,
      // 全部新碟
      allAlbum: [],
      // 展示的全部新碟
      showAlbums: [],
      categroy: [{
        name: '全部',
        area: 'ALL'
      },
      {
        name: '华语',
        area: 'ZH'
      },
      {
        name: '欧美',
        area: 'EA'
      },
      {
        name: '韩国',
        area: 'KR'
      },
      {
        name: '日本',
        area: 'JP'
      }]
    }
  },
  methods: {
    changeType (area) {
      if (area !== this.area) {
        this.$router.push({
          path: '/findMusic/album',
          query: {
            area
          }
        })
      }
    },
    // 获取全部新碟
    async getAll () {
      const { data: res } = await getAlbumAPI(this.pageSize, (this.pageNum - 1) * this.pageSize, this.area, this.type)
      // console.log(res)
      if (res.weekData) {
        this.total = res.weekData.length
        this.allAlbum = res.weekData
      } else {
        this.total = res.monthData.length
        this.allAlbum = res.monthData
      }
      this.getShowAlbum()
    },
    getPageNum (pageNum) {
      if (this.pageNum !== pageNum) {
        this.pageNum = pageNum
        this.getShowAlbum()
      }
    },
    // 获取当前显示的数据
    getShowAlbum () {
      this.showAlbums = this.allAlbum.slice((this.pageNum - 1) * this.pageSize, this.pageSize * this.pageNum)
    },
    // 播放新碟
    async play (id) {
      this.$store.dispatch('removeAllMusic')
      const { data: res } = await getAlbumDetailAPI(id)
      // console.log(res)
      const length = res.songs.length
      const musicID = res.songs[0].id
      let ids = ''
      res.songs.forEach((item, index) => {
        if (index === length - 1) {
          ids += item.id
        } else {
          ids += item.id + ','
        }
      })
      this.$store.dispatch('setMusics', musicID)
      this.$store.dispatch('addMusicList', ids)
      setTimeout(() => {
        bus.$emit('play')
      }, 500)
    }
  },
  mounted () {
    this.getAll()
  },
  computed: {
    area () {
      if (this.$route.query.area === undefined) return 'ALL'
      return this.$route.query.area
    }
  },
  watch: {
    area () {
      this.pageNum = 1
      this.getAll()
    }
  }
}
</script>

<style lang="less" scoped>
.albumBottom{
  width: 100%;
  .ab_header{
    width: 100%;
    height: 42px;
    line-height: 42px;
    border-bottom: 2px solid #c20c0c;
    .h_hd {
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
    .h_cate{
      float: left;
      margin: 2px 0 0 20px;
      .h_c{
        a{
          display: inline-block;
          color: #666;
          text-decoration: none;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
        .sperator{
          display: inline-block;
          margin: 0 10px;
          color: #c7c7c7;
        }
      }
    }
  }
  .at_ul {
    width: 933px;
    margin: 20px 0 0 -33px;
    list-style: none;
    .at_li {
      display: inline-block;
      width: 153px;
      height: 178px;
      padding: 0 0 30px 33px;
      .li_top {
        width: 130px;
        height: 130px;
        position: relative;
        cursor: pointer;
        &:hover{
          .t_play{
            display: block !important;
          }
        }
        .t_cover{
          width: 100%;
          height: 100%;
        }
        .t_bg {
          position: absolute;
          width: 153px;
          height: 130px;
          top: 0;
          left: 0;
          background: url('@/components/img/coverall.png') 0 -845px;
        }
        .t_play{
          display: none;
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 28px;
          height: 28px;
          background: url('@/components/img/iconall.png') 0 -140px;
        }
      }
      .t_title{
        display: inline-block;
        width: 100%;
        margin: 8px 0 3px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        text-decoration: none;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
      .t_art{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        text-decoration: none;
        color: #666;
        .t_name{
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
