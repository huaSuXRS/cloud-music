<template>
  <div class="albumTop">
    <div class="at_header">
      <p class="h_hd">热门新碟</p>
    </div>
    <ul class="at_ul">
      <li class="at_li" v-for="item in hotAlbums" :key="item.id">
        <div class="li_top">
          <img class="t_cover" v-lazy="item.blurPicUrl">
          <div class="t_bg"></div>
          <span class="t_play" @click="play(item.id)"></span>
        </div>
        <a class="t_title" :title="item.name">{{ item.name }}</a>
        <p class="t_art">
          <span class="t_auth" v-for="(artItem,index) in item.artists" :key="index">
            <a class="t_name" :title="artItem.name">{{ artItem.name }}</a>
            <span v-if="item.artists.length -1 !== index ">&nbsp;/&nbsp;</span>
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getNewAlbumAPI, getAlbumDetailAPI } from '@/api/index.js'
import bus from '@/utils/eventBus'
export default {
  name: 'albumTop',
  data () {
    return {
      // 热门新碟
      hotAlbums: []
    }
  },
  methods: {
    // 获取热门新碟
    async getHotAlbum () {
      const { data: res } = await getNewAlbumAPI()
      this.hotAlbums = res.albums.slice(0, 10)
      console.log(res)
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
    this.getHotAlbum()
  }
}
</script>

<style lang="less" scoped>
.albumTop {
  width: 100%;
  // height: ;
  .at_header {
    width: 100%;
    height: 42px;
    line-height: 42px;
    border-bottom: 2px solid #c20c0c;
    .h_hd {
      float: left;
      font-size: 24px;
    }
  }
  .at_ul {
    width: 933px;
    height: 416px;
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
