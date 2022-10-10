<template>
  <div class="list_content">
    <div class="top">
      <div class="t_img">
        <img :src="playList.coverImgUrl" alt="">
        <span class="t_bg"></span>
      </div>
      <div class="t_content">
        <div class="t_title">
          <h2>{{playList.name}}</h2>
        </div>
        <div class="t_state">
          <i></i>
          <span class="s_1">最近更新：{{playList.date}}</span>
          <span class="s_2">（{{tip}}）</span>
        </div>
        <div class="t_contral">
          <a class="t_btn play" @click="play"><span class="b_btn"><i class="t_icon"></i>播放</span></a>
          <a class="t_btn add"  @click="add"></a>
          <a class="t_btn collect br"><span class="b_span">({{playList.subscribedCount}})</span></a>
          <a class="t_btn share br"><span class="b_span">({{playList.shareCount}})</span></a>
          <a class="t_btn download br"><span class="b_span">下载</span></a>
          <a class="t_btn comment br"><span class="b_span">({{playList.commentCount}})</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus'
import { getPlayListAPI } from '@/api/index.js'

export default {
  name: 'toplistRight',
  data () {
    return {
      playList: {},
      tip: '刚刚更新'
    }
  },
  methods: {
    async getPlayList () {
      const { data: res } = await getPlayListAPI(this.id)
      this.$store.dispatch('getPlayList', res)
      const obj = {}
      obj.id = res.playlist.id
      obj.name = res.playlist.name
      obj.coverImgUrl = res.playlist.coverImgUrl
      obj.subscribedCount = res.playlist.subscribedCount
      obj.shareCount = res.playlist.shareCount
      obj.commentCount = res.playlist.commentCount
      const trackUpdateTime = res.playlist.trackUpdateTime
      const update = new Date(trackUpdateTime)
      const month = update.getMonth() + 1
      const date = update.getDate()
      obj.date = month + '月' + date + '日'
      this.playList = obj
    },
    // 播放歌单
    play () {
      this.$store.dispatch('removeAllMusic')
      const musicID = this.$store.state.home.playList.privileges[0].id
      const ids = this.$store.state.home.ids
      this.$store.dispatch('setMusics', musicID)
      this.$store.dispatch('addMusicList', ids)
      setTimeout(() => {
        bus.$emit('play')
      }, 500)
      console.log(musicID)
    },
    // 将歌单添加到播放列表
    add () {
      const ids = this.$store.state.home.ids
      this.$store.dispatch('addMusicList', ids)
    }
  },
  computed: {
    id () {
      if (this.$route.query.id === undefined) {
        return '19723756'
      }
      return this.$route.query.id
    }
  },
  watch: {
    id () {
      this.getPlayList()
    }
  },
  mounted () {
    this.getPlayList()
    bus.$on('getNum', (tip) => {
      this.tip = tip
    })
  }
}
</script>

<style lang="less" scoped>
.list_content{
  width: 740px;
  .top{
    box-sizing: border-box;
    width: 740px;
    height: 238px;
    padding: 40px;
    .t_img{
      float: left;
      width: 150px;
      height: 150px;
      padding: 3px;
      border: 1px solid #ccc;
      position: relative;
      img,.t_bg{
        position: absolute;
        top: 3px;
        left: 3px;
        width: 150px;
        height: 150px;
      }
      .t_bg{
        background: url('@/components/img/coverall.png') -230px -380px;
      }
    }
    .t_content{
      float: right;
      width: 473px;
      height: 163px;
      .t_title{
        margin: 16px 0 4px;
        width: 100%;
        height: 24px;
        h2{
          width: 100%;
          height: 100%;
          line-height: 24px;
          font-size: 20px;
        }
      }
      .t_state{
        width: 100%;
        height: 35px;
        margin: 0 0 20px;
        line-height: 35px;
        i{
          display: block;
          width: 13px;
          height: 13px;
          float: left;
          margin: 9px 0 0 3px;
          background: url('@/components/img/icon.png') -18px -682px;
        }
        .s_1{
          margin-left: 5px;
          color: #666666;
        }
        .s_2{
          color: #999999;
        }
      }
      .t_contral{
        width: 100%;
        height: 31px;
        .t_btn{
          float: left;
          display: block;
          height: 31px;
          padding-right: 5px;
          margin-right: 5px;
          cursor: pointer;
          background: url('@/components/img/button2.png');
          .b_btn{
            height: 31px;
            line-height: 31px;
            background: url('@/components/img/button2.png');
            .t_icon{
              background: url('@/components/img/button2.png');
              float: left;
            }
          }
        }
        .play{
          width: 61px;
          margin-right: 0px;
          background-position: right -428px;
          .b_btn{
            display: block;
            padding: 0 7px 0 8px;
            background-position: 0 -387px;
            color: #fff;
            .t_icon{
              width: 20px;
              height: 18px;
              margin: 6px 2px 2px 0;
              background-position: 0 -1622px;
            }
          }
        }
        .add{
          width: 31px;
          margin-left: -3px;
          background-position: 0 -1588px;
        }
        .br{
          background-position: right -1020px;
          .b_span{
            display: block;
            background: url('@/components/img/button2.png');
            height: 31px;
            padding-right: 2px;
            padding-left: 28px;
            line-height: 31px;
            color: #333;
            min-width: 23px;
            font-family: simsun,\5b8b\4f53;
          }
        }
        .collect{
          .b_span{
            background-position: 0 -977px;
          }
        }
        .share{
          .b_span{
            background-position: 0 -1225px;
          }
        }
        .download{
          .b_span{
            background-position: 0 -2761px;
          }
        }
        .comment{
          .b_span{
            background-position: 0 -1465px;
          }
        }
      }
    }
  }
}
</style>
