<template>
  <div class="content-wrap">
    <div class="header">
      <div class="header-logo"></div>
      <div class="header-title">
        <span>热门推荐</span>
      </div>
      <!-- 热门推荐华语 | 流行 | 摇滚 | 民谣 | 电子 -->
      <div class="header-nav">
        <router-link to="/findMusic/playlist?cat=华语" class="h_name">华语</router-link>
        <span class="sperator">|</span>
        <router-link to="/findMusic/playlist?cat=流行" class="h_name">流行</router-link>
        <span class="sperator">|</span>
        <router-link to="/findMusic/playlist?cat=摇滚" class="h_name">摇滚</router-link>
        <span class="sperator">|</span>
        <router-link to="/findMusic/playlist?cat=民谣" class="h_name">民谣</router-link>
        <span class="sperator">|</span>
        <router-link to="/findMusic/playlist?cat=电子" class="h_name">电子</router-link>
      </div>
      <div class="header-more">
        <router-link to="/findMusic/playlist" class="more" >更多</router-link>
        <div class="bg"></div>
      </div>
    </div>
    <div class="content">
      <div class="reList" v-for="(item,index) in recommenList" :key="item.id" :class="{ active: index%4 === 0}">
        <div class="top">
          <img class="musicImg" v-lazy="recommenList[index].picUrl">
          <img class="bgIcon">
          <div class="bottom">
            <span class="bottomIcon"></span>
            <span class="number">{{ transform[index]}}</span>
            <a class="playIcon" @click.prevent="play(item.id)"></a>
          </div>
        </div>
        <a class="musicTitle">{{ recommenList[index].name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotRecommenAPI, getPlayListAPI } from '@/api/index.js'
import bus from '@/utils/eventBus'

export default {
  name: 'hotRecommen',
  data () {
    return {
      limit: 8,
      recommenList: [],
      imgUrl: '',
      imgItem: 0,
      imgTitle: ''
    }
  },
  created () {
    this.initHotRecommen()
  },
  computed: {
    transform () {
      const result = []
      this.recommenList.forEach(item => {
        if (item.playCount >= 10000) {
          result.push(parseInt(item.playCount / 10000) + '万')
        } else {
          result.push(item.playCount + '')
        }
      })
      return result
    }
  },
  methods: {
    async initHotRecommen () {
      const { data: res } = await getHotRecommenAPI(this.limit)
      res.result.forEach(item => {
        this.recommenList.push(item)
      })
    },
    // 播放歌单
    async play (id) {
      this.$store.dispatch('removeAllMusic')
      const { data: res } = await getPlayListAPI(id)
      const length = res.privileges.length
      const musicID = res.privileges[0].id
      let ids = ''
      res.privileges.forEach((item, index) => {
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
  }
}
</script>

<style lang="less" scoped>
.content-wrap {
  width: 689px;
  height: 523px;
  background-color: white;
  .header {
    width: 679px;
    height: 33px;
    padding-right: 10px;
    border-bottom: 2px solid #c10d0c;
    .header-logo {
      width: 34px;
      height: 33px;
      background-image: url('@/components/img/index.png');
      background-position: -225px -157px;
      float: left;
    }
    .header-title {
      width: 80px;
      height: 28px;
      float: left;
      span {
        font-size: 20px;
      }
    }
    .header-nav {
      width: 250px;
      height: 16px;
      margin: 7px 0px 0px 20px;
      float: left;
      list-style: none;
      .h_name {
        width: 24px;
        height: 14px;
        color: #666666;
        cursor: pointer;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      .sperator {
        width: 3.13px;
        height: 4px;
        margin: 0px 14px;
        color: #cccccc;
      }
    }
    .header-more {
      width: 43px;
      height: 16px;
      margin: 9px 0px 0px;
      float: right;
      .more {
        text-decoration: none;
        cursor: pointer;
        color: #666666;
        &:hover{
          text-decoration: underline;
        }
      }
      .bg {
        width: 15px;
        height: 14px;
        margin-left: 4px;
        float: right;
        background-image: url('@/components/img/index.png');
        background-position: 0px -236px;
      }
    }
  }
  .content {
    width: 100%;
    height: 488px;
    margin-top: 20px;
    .reList {
      width: 140px;
      height: 204px;
      margin: 0px 0px 30px 42px;
      float: left;
      .top{
        width: 100%;
        height: 140px;
        margin-bottom: 5px;
        position: relative;
        .musicImg{
          width: 100%;
          height: 100%;
        }
        .bgIcon{
          width: 100%;
          height: 114px;
          position: absolute;
          top:0px;
          left: 0px;
          background-image: url('@/components/img/coverall.png');
          background-position: 0px 0px;
          cursor: pointer;
        }
        .bottom{
          width: 100%;
          height: 27px;
          position: absolute;
          bottom: 0px;
          background-image: url('@/components/img/coverall.png');
          background-position: 0px -537px;
          .bottomIcon{
            display: block;
            width: 14px;
            height: 11px;
            margin: 9px 5px 9px 10px;
            background-image: url('@/components/img/iconall.png');
            background-position: 0px -22px;
            float: left;
          }
          .number{
            display: block;
            height: 16.8px;
            margin: 8px 0px 0px;
            color: #cccccc;
            float: left;
          }
          .playIcon{
            width: 16px;
            height: 17px;
            float: right;
            background-image: url('@/components/img/iconall.png');
            background-position: 0px 0px;
            margin-top: 5px;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
      .musicTitle{
        font-size: 14px;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
}
.active {
  margin-left: 0px !important;
}
</style>
