<template>
  <div class="right_list">
    <div class="top">
      <span class="t_title">歌曲列表</span>
      <div class="t_num">{{lenght}}首歌</div>
      <div class="t_count">播放：<strong class="c1">{{playCount}}</strong>次</div>
    </div>
    <table class="list">
      <thead class="header">
        <tr class="l_h">
          <th class="l_rank"></th>
          <th class="l_name">标题</th>
          <th class="l_time">时长</th>
          <th class="l_auth">歌手</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr class="l_b" v-for="(item,index) in songList" :key="item.id">
          <td class="l_td l_rank">
            <span class="td_num">{{index+1}}</span>
            <i class="td_icon"></i>
          </td>
          <td class="l_td l_name">
            <img v-lazy="item.al.picUrl" v-show="index < 3">
            <div class="n1">
              <span class="n_i" title="播放" @click.prevent="setMusic(item.id)" :class="{active: item.id === activeID}"></span>
              <p class="n_p" :title="item.al.name">{{item.al.name}}</p>
            </div>
          </td>
          <td class="l_td l_time">
            <div class="t_time">{{min(item)}}:{{sec(item)}}</div>
            <div class="t_contrl">
              <div class="i t_add" title="添加到播放列表" @click.prevent="addMusicList(item.id)"></div>
              <div class="i t_collect" title="收藏"></div>
              <div class="i t_share" title="分享"></div>
              <div class="i t_download" title="下载"></div>
            </div>
          </td>
          <td class="l_td l_auth" :title="item.ar[0].name">
            {{item.ar[0].name}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getSongListAPI } from '@/api/index.js'
import bus from '@/utils/eventBus.js'
export default {
  name: 'rightList',
  data () {
    return {
      lenght: 0,
      playCount: 0,
      songList: [],
      // isActive: false,
      activeID: -1
    }
  },
  methods: {
    async getSongList (ids) {
      const { data: res } = await getSongListAPI(ids)
      this.songList = res.songs
      this.$store.dispatch('getIds', ids)

      // console.log(this.songList)
    },
    min (song) {
      if (parseInt(song.dt / 60000) < 10) {
        return '0' + parseInt(song.dt / 60000)
      } else return parseInt(song.dt / 60000)
    },
    sec (song) {
      const x = parseInt(song.dt / 60000)
      const y = parseInt(song.dt / 1000 - x * 60)
      if (y < 10) return '0' + y
      else return y
    },
    setMusic (id) {
      this.activeID = id
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
    playList () {
      return this.$store.state.home.playList
    }
  },
  watch: {
    playList () {
      this.lenght = this.playList.privileges.length
      this.playCount = this.playList.playlist.playCount
      let str = ''
      this.playList.privileges.forEach((item, index) => {
        if (index === this.lenght - 1) {
          str += item.id
        } else {
          str += item.id + ','
        }
      })
      this.getSongList(str)
    }
  }
}
</script>

<style lang="less" scoped>
.right_list {
  width: 670px;
  padding: 0 30px 40px 40px;
  .top {
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #c20c0c;
    .t_title {
      float: left;
      line-height: 28px;
      font-size: 20px;
    }
    .t_num {
      float: left;
      margin: 9px 0 0 20px;
    }
    .t_count {
      float: right;
      margin-top: 5px;
      color: #666666;
      .c1 {
        color: #c20c0c;
      }
    }
  }
  .list {
    width: 100%;
    border: 1px solid #d9d9d9;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    .header {
      height: 38px;
      line-height: 18px;
      padding: 8px 10px;
      background: url('@/components/img/table.png') repeat-x 0 0;
      th {
        color: #666;
        padding: 8px 10px;
        font-weight: normal;
        text-align: left;
        border-right: 1px solid #d9d9d9;
      }
      .l_rank {
        width: 77px;
        padding: 0px;
      }
      .l_name {
        width: 305px;
      }
      .l_time {
        width: 70px;
      }
      .l_auth {
        width: 153px;
        border-right: 0px;
      }
    }
    .body {
      width: 100%;
      .l_b {
        width: 100%;
        height: 18px;
        &:hover {
          .l_time {
            .t_time {
              display: none !important;
            }
            .t_contrl {
              display: block !important;
            }
          }
        }
        .l_td {
          padding: 6px 10px;
          line-height: 18px;
          text-align: left;
          height: 18px;
        }
        .l_rank {
          width: 67px;
          .td_num {
            float: left;
            display: block;
            width: 25px;
            line-height: 18px;
            text-align: center;
            color: #999;
          }
          .td_icon {
            float: right;
            display: block;
            width: 16px;
            height: 17px;
            margin: 0 8px;
            background: url('@/components/img/icon.png') -67px -283px;
          }
        }
        .l_name {
          img {
            width: 50px;
            height: 50px;
            margin-right: 14px;
            float: left;
            cursor: pointer;
          }
          .n1 {
            width: 286px;
            height: 18px;
            height: 18px;
            line-height: 18px;
            margin-right: 20px;
            // float: left;
            .n_i {
              display: block;
              float: left;
              width: 17px;
              height: 17px;
              margin-right: 8px;
              background: url('@/components/img/table.png') 0 -103px;
              cursor: pointer;
              &:hover {
                background-position: 0px -128px;
              }
            }
            .n_p {
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
        .l_time {
          .t_time {
            display: block;
          }
          .t_contrl {
            display: none;
            width: 80px;
            height: 17px;
            .i {
              float: left;
              margin-left: 4px;
              width: 17px;
              height: 17px;
              background: url('@/components/img/table.png');
              cursor: pointer;
            }
            .t_add {
              margin-left: 0px;
              background: url('@/components/img/icon.png');
              background-position: 3px -700px;
              &:hover {
                background-position: -19px -700px;
              }
            }
            .t_collect {
              background-position: 0 -174px;
              &:hover {
                background-position: -20px -174px;
              }
            }
            .t_share {
              background-position: 0 -195px;
              &:hover {
                background-position: -20px -195px;
              }
            }
            .t_download {
              background-position: -80px -174px;
              &:hover {
                background-position: -103px -174px;
              }
            }
          }
        }
        .l_auth {
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      tr:nth-child(1),
      tr:nth-child(2),
      tr:nth-child(3) {
        height: 70px;
        .l_td {
          height: 58px;
          .n1{
            margin-top: 16px;
          }
        }
      }
      tr:nth-child(even) {
        background: #e5e5e5;
      }
      tr:nth-of-type(odd) {
        background: #f6f6f6;
      }
    }
  }
}
.active {
  background-position: -20px -128px !important;
}
</style>
