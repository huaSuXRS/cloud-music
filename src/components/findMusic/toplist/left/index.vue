<template>
  <div class="topList_wrap">
    <div class="topList">
      <!-- 云音乐榜 -->
      <div class="musicList list">
        <h2>云音乐特色榜</h2>
        <ul>
          <li v-for="item in musicList" :key="item.id" :class="{ active: item.id == id }" @click="go(item)">
            <img v-lazy="item.coverImgUrl">
            <p class="title">{{item.name}}</p>
            <p class="tip">{{item.updateFrequency}}</p>
          </li>
        </ul>
      </div>

      <!-- 全球媒体榜 -->
      <div class="globalList list">
        <h2 class="global">全球媒体榜</h2>
        <ul>
          <li v-for="item in globalList" :key="item.id" :class="{ active: item.id == id }" @click="go(item)">
            <img v-lazy="item.coverImgUrl">
            <p class="title">{{item.name}}</p>
            <p class="tip">{{item.updateFrequency}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus'
import { getTopListAPI } from '@/api/index.js'

export default {
  name: 'toplistLeft',
  data () {
    return {
      musicList: [],
      globalList: []
    }
  },
  methods: {
    // 获取排行榜信息
    async initTopList () {
      const { data: res } = await getTopListAPI()
      if (res.code === 200) {
        this.musicList = res.list.slice(0, 4)
        this.globalList = res.list.slice(4)
        bus.$emit('getNum', this.musicList[0].updateFrequency)
        console.log(res)
      }
    },
    go (item) {
      const a = item.id + ''
      if (a !== this.id) {
        this.$router.push({
          path: '/findMusic/toplist',
          query: {
            id: item.id
          }
        })
        // location.reload()
        document.documentElement.scrollTop = 0
      }
      bus.$emit('getNum', item.updateFrequency)
    }
  },
  mounted () {
    this.initTopList()
  },
  computed: {
    id () {
      if (this.$route.query.id === undefined) {
        return '19723756'
      }
      return this.$route.query.id
    }
  }
}
</script>

<style lang="less" scoped>
.topList_wrap {
  width: 239px;
  background-color: rgb(249, 249, 249);
  .topList {
    width: 100%;
    .list {
      margin-top: 40px;
      width: 100%;
      h2 {
        width: 214px;
        padding: 0 10px 12px 15px;
        font-size: 14px;
        color: #000;
        font-family: simsun;
      }
      .global {
        margin-top: 20px;
      }
      ul {
        width: 100%;
        list-style: none;
        li {
          box-sizing: border-box;
          width: 100%;
          height: 62px;
          padding: 10px 0 10px 20px;
          cursor: pointer;
          &:hover{
            background-color: rgb(244,242,242);
          }
          img {
            // display: block;
            width: 40px;
            height: 40px;
            float: left;
            padding-right: 10px;
          }
          .title,
          .tip {
            float: left;
            width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          .title {
            color: #000;
            margin-top: 2px;
            margin-bottom: 8px;
          }
          .tip {
            color: #999;
          }
        }
      }
    }
  }
}
.active{
  background-color: rgb(230,230,230) !important;
}
</style>
