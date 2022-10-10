<template>
    <div class="content-wrap">
    <div class="header">
      <div class="header-logo"></div>
      <div class="header-title">
        <span>榜单</span>
      </div>

      <div class="header-more">
        <router-link to="/findMusic/toplist" class="more">更多</router-link>
        <div class="bg"></div>
      </div>
    </div>

    <div class="content">
      <div class="bill" v-for="(item) in billList" :key="item.id">
        <div class="bill_top">
          <img class="bill_url" v-lazy="item.url">
          <router-link :to="{path:'/findMusic/toplist',query:{ id:item.id}}" class="icon"></router-link>
          <div class="name">
            <h3>{{item.name}}</h3>
            <a href="" class="play" title="播放"></a>
            <a href="" class="collect" title="收藏"></a>
          </div>
        </div>
        <ul class="bill_bottom" >
          <li v-for="(musicItem,musicIndex) in item.data" :key="musicItem.id">
            <p :class="{ font_color:musicIndex<3 }" class="number">{{ musicIndex+1 }}</p>
            <a class="musicName" :title="musicItem.name">{{ musicItem.name }}</a>
            <div class="open">
              <a href="" class="play_music" title="播放" @click.prevent="setMusic(musicItem.id)"></a>
              <a href="" class="add_music" title="添加到播放列表" @click.prevent="addMusicList(musicItem.id)"></a>
              <a href="" class="collect_music" title="收藏"></a>
            </div>
          </li>
          <div class="visit_all"><a href="" class="all">查看全部></a></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getBillAPI, getPlayListAPI, getSongListAPI } from '@/api/index.js'
import bus from '@/utils/eventBus.js'
export default {
  name: 'billList',
  data () {
    return {
      billList: []
    }
  },
  created () {
    this.initBillList()
  },
  methods: {
    // 获取榜单数据
    async initBillList () {
      // 获取所有榜单
      const { data: res } = await getBillAPI()
      // 提取前三个榜单
      const list = res.list.slice(0, 3)
      list.forEach(async (item) => {
        // 根据榜单id获取榜单信息
        const { data: r } = await getPlayListAPI(item.id)
        const obj = {}
        // 歌单id
        obj.id = item.id
        // 歌单名称 如：飙升榜
        obj.name = item.name
        // 歌单封面
        obj.url = item.coverImgUrl
        // 歌单中的歌曲
        obj.data = r.privileges.slice(0, 10)
        let s = ''
        for (let i = 0; i < 10; i++) {
          s += obj.data[i].id
          if (i !== 9) {
            // eslint-disable-next-line no-unused-vars
            s += ','
          }
        }
        // 通过id查找歌曲详情
        const { data: song } = await getSongListAPI(s)
        song.songs.forEach((item, index) => {
          obj.data[index].name = item.name
        })
        this.billList.push(obj)
      })
    },
    setMusic (id) {
      // 把id传入vuex仓库的setMusic函数
      this.$store.dispatch('setMusics', id)
      // 把音乐id传入vuex本地仓库
      this.$store.dispatch('addMusicList', id)
      setTimeout(() => {
        bus.$emit('play')
      }, 500)
    },
    // 将音乐添加到播放列表
    addMusicList (ids) {
      // 把id传入vuex仓库的setMusic函数
      this.$store.dispatch('addMusicList', ids)
    }
  },
  computed: {
    isLogin () {
      if (localStorage.getItem('COOKIE') != null) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content-wrap{
  width: 689px;
  height: 527px;
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
      height: 28px;
      float: left;
      span {
        font-size: 20px;
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
}
.content{
  height: 472px;
  margin-top: 20px;
  margin-bottom: 40px;
  padding-left: 1px;
  background-image: url('@/components/img/index_bill.png');
  .bill{
    width: 230px;
    height: 100%;
    float: left;
    .bill_top{
      height: 100px;
      padding:20px 0px 0px 19px;
      position: relative;
      img{
        width: 80px;
        height: 80px;
        float: left;

      }
      .icon{
        display: block;
        width: 80px;
        height: 80px;
        background-image: url('@/components/img/coverall.png');
        background-position: -145px -57px;
        position: absolute;
        top: 20px;
        &:hover{
          cursor: pointer;
        }
      }
      .name{
        width: 106px;
        height: 55.5px;
        margin: 6px 0px 0px 10px;
        float: left;
        h3{
          font-size: 14px;
          color: #333333;
          &:hover{
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .play{
          display: block;
          float: left;
          width: 24px;
          height: 24px;
          margin: 10px 10px 0px 0px;
          background-image: url('@/components/img/index.png');
          background-position: -267px -205px;
        }
        .collect{
          display: block;
          float: left;
          width: 22px;
          height: 22px;
          margin: 10px 10px 0px 0px;
          background-image: url('@/components/img/index.png');
          background-position: -300px -205px;
        }
      }
    }
    .bill_bottom{
      width: 100%;
      height: 319px;
      list-style: none;
      li{
        width: 100%;
        height: 32px;
        position: relative;
        &:hover{
          .musicName{
            width: 88px;
            text-decoration: underline;
            cursor: pointer;
          }
          .open{
            display: block;
          }

        }
        .number{
          width: 35px;
          height: 32px;
          line-height: 32px;
          margin-left: 15px;
          color: #666666;
          font-size: 16px;
          text-align: center;
          float: left;
        }
        .font_color{
          color: #C10D0C;
        }
        .musicName{
          width: 175px;
          height: 32px;
          line-height: 32px;
          color: #000;
          display: block;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        .open{
          position: absolute;
          width: 82px;
          height: 100%;
          right: 0px;
          display: none;
          .play_music,.add_music,.collect_music{
            float: left;
            width: 17px;
            height: 17px;
          }
          .play_music{
            margin-top: 7.5px;
            background-image: url('@/components/img/index.png');
            background-position: -267px -268px;
          }
          .add_music{
            margin: 9px 0px 0px 10px;
            background-image: url('@/components/img/icon.png');
            background-position: 0 -700px;
          }
          .collect_music{
            margin: 7.5px 0px 0px 10px;
            background-image: url('@/components/img/index.png');
            background-position: -297px -268px;
          }
        }

      }
      .visit_all{
        width: 56px;
        height: 32px;
        float: right;
        margin-right: 32px;
        .all{
          display: block;
          margin-top: 8px;
          color: #000000;
          text-decoration: none;
          &:hover{
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
  .bill:last-child{
    width: 228px;
  }
}
</style>
