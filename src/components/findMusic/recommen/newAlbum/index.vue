<template>
  <div class="content-wrap">
    <div class="header">
      <div class="header-logo"></div>
      <div class="header-title">
        <span>新碟上架</span>
      </div>

      <div class="header-more">
        <router-link to="/findMusic/album" class="more">更多</router-link>
        <div class="bg"></div>
      </div>
    </div>

    <div class="content">
      <div class="content-roll">
        <div class="roll">
          <!-- ,{ move_left: count === item.id } -->
          <ul class="album-ul" v-for="item in ulNum" :key="item.id" :class="[{ local_left: item.id === 0 },{ move_left: countLeft === item.id},{ move_right: countRight === item.id}]" ref="roll">
            <li class="album-li" v-for="(item,index) in albumList" :key="item.id" >
              <div class="album-img">
                <img class="picUrl" v-lazy="item.picUrl" />
                <span class="bg-img"></span>
                <span class="p-play" @click="play(item.id)"></span>
              </div>
              <p class="name" :title="item.name">{{ item.name }}</p>
              <p class="artist">
                <span class="artist-content" v-for="artItem in artists[index]" :key="artItem.id">
                  <a href="" class="artist-name" :title="artItem.name">{{ artItem.name }}</a>
                  <span v-show=" JSON.parse(JSON.stringify(artists[index])).length !== 1 ">&nbsp;/&nbsp;</span>
                </span>
              </p>
            </li>
          </ul>
        </div>

      </div>
      <div class="left" @click="preImg"></div>
      <div class="right" @click="nexImg"></div>
    </div>
  </div>
</template>

<script>
import { getNewAlbumAPI, getAlbumDetailAPI } from '@/api/index.js'
import bus from '@/utils/eventBus'
export default {
  name: 'newAlbum',
  data () {
    return {
      albumList: [],
      artistList: [],
      artists: [],
      ulNum: [
        { id: 0 },
        { id: 1 }
      ],
      countLeft: 2,
      countRight: 2
    }
  },
  created () {
    this.initNewAlbumAPI()
  },
  methods: {
    async initNewAlbumAPI () {
      const { data: res } = await getNewAlbumAPI()
      res.albums.forEach((item, index) => {
        if (index < 10) {
          this.albumList.push({ id: item.id, picUrl: item.picUrl, name: item.name, artists: item.artists })
        }
      })
      this.albumList.forEach((item, index) => {
        this.artists.push(item.artists)
      })
    },
    preImg () {
      if (this.countLeft !== 2) {
        this.countLeft = 2
      }
      if (this.countRight !== 2) {
        this.countRight = 2
      }
      const roll = this.$refs.roll
      for (let i = 0; i < roll.length; i++) {
        roll[i].style.left = roll[i].offsetLeft + 645 + 'px'
        if (roll[i].offsetLeft >= 643) {
          this.countLeft = i
        }
      }
    },
    nexImg () {
      const roll = this.$refs.roll
      if (this.countRight !== 2) {
        this.countRight = 2
      }
      if (this.countLeft !== 2) {
        this.countLeft = 2
      }
      for (let i = 0; i < roll.length; i++) {
        roll[i].style.left = roll[i].offsetLeft - 645 + 'px'
        if (roll[i].offsetLeft <= -1288) {
          this.countRight = i
        }
      }
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
  }
}
</script>

<style lang="less" scoped>
.content-wrap {
  width: 689px;
  height: 280px;
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
  .content {
    width: 671px;
    height: 186px;
    padding: 0px 0px 0px 16px;
    margin-top: 20px;
    position: relative;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;
    .content-roll {
      width: 645px;
      height: 180px;
      float: left;
      overflow: hidden;
      .roll {
        width: 2580px;
        height: 180px;
        position: relative;
        .album-ul {
          width: 1290px;
          height: 150px;
          margin: 28px 0px 0px;
          list-style: none;
          position: absolute;
          transition: left 0.5s linear;
          left: 0px;
          .album-li {
            width: 118px;
            height: 150px;
            margin-left: 11px;
            background: url('@/components/img/index.png') no-repeat -261px 100px;
            // background-position: ;
            position: relative;
            float: left;
            cursor: pointer;
            &:hover{
              .album-img{
                .p-play{
                  display: block !important;
                }
              }
            }
            .album-img {
              width: 100px;
              height: 100px;
              position: relative;
              .picUrl {
                display: block;
                width: 100px;
                height: 100px;
                background-size: 100%;
              }
              .bg-img {
                display: block;
                position: absolute;
                width: 118px;
                height: 100px;
                top: 0;
                left: 0;
                background-image: url('@/components/img/coverall.png');
                background-position: 0 -570px;
              }
              .p-play{
                position: absolute;
                bottom: 5px;
                right: 5px;
                display: none;
                width: 22px;
                height: 22px;
                background: url('@/components/img/iconall.png') 0 -85px;
              }
            }
            .name,
            .artist {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              position: absolute;
              text-decoration: none;
            }
            .name {
              color: #000000;
              bottom: 27px;
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
            .artist {
              color: #666666;
              bottom: 9px;
              .artist-content {
                text-decoration: none;
                .artist-name {
                  text-decoration: none;
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          }
        }
        .local_left{
          left: -1290px;
        }
        .move_left{
          position: absolute;
          left: -1290px !important;
          transition: left 0s linear;
        }
        .move_right{
          position: absolute;
          left: 645px !important;
          transition: left 0s linear;
        }
      }
    }

    .left,
    .right {
      width: 17px;
      height: 17px;
      background-image: url('@/components/img/index.png');
      position: absolute;
      top: 71px;
    }
    .left {
      background-position: -260px -75px;
      left: 4px;
      &:hover {
        cursor: pointer;
        background-position: -280px -75px;
      }
    }
    .right {
      background-position: -300px -75px;
      right: 4px;
      &:hover {
        cursor: pointer;
        background-position: -320px -75px;
      }
    }
  }
}
</style>
