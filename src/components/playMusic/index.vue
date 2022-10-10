<template>
  <div class="content_wrap" ref="content_wrap" @mouseover="moveUp" @mouseout="moveDown">
    <div class="wrap" ref="wrap">
      <div class="list" v-show="isShowList">
        <div class="header">
          <h4>播放列表({{JSON.parse(JSON.stringify(musiclist)).length}})</h4>
          <a href="" class="collect_all"><span class="icon"></span> 收藏全部</a>
          <span class="line">|</span>
          <a href="" class="delete" @click.prevent="removeAllMusic"><span class="del_icon"></span>清除</a>
          <div class="m_title">{{song.name}}</div>
          <div class="close" @click="hiddenList()"></div>
        </div>

        <div class="music_content">
          <div class="left">
            <div class="notice" v-if="JSON.parse(JSON.stringify(musiclist)).length === 0">
              <i class="n_icon"></i>
              你还没有添加任何歌曲
              <br>
              去首页<a href="" class="a">发现音乐</a>，或在<a href="" class="a">我的音乐</a>收听自己收藏的歌单。
            </div>
            <ul class="playlist" v-if="JSON.parse(JSON.stringify(musiclist)).length !== 0">
              <li v-for="item in musiclist" :key="item.id" :class="{active: item.id === song.id}" @click="setMusic(item.id)">
                <div class="jt"><span class="jt_bg" :class="{active1: item.id === song.id}"></span></div>
                <div class="col col_1">{{item.name}}</div>
                <div class="col col_2">
                  <a href="" class="i i_coll" title="收藏"></a>
                  <a href="" class="i i_share" title="分享"></a>
                  <a href="" class="i i_dl" title="下载"></a>
                  <a href="" class="i i_del" title="删除" @click.prevent="deleteMusic($event,item.id,song.id)"></a>
                </div>
                <div class="col col_3">
                  <p :title="artistItem.name" v-for="artistItem in item.ar" :key="artistItem.id">{{artistItem.name}}</p>
                </div>
                <div class="col col_4">{{min(item.dt)}}:{{sec(item.dt)}}</div>
                <div class="col col_5"><a href="" class="link"></a></div>
              </li>
            </ul>
          </div>
          <div class="right" ref="lyric">
            <div class="lyric_part">
              <p v-for="(lyric,index) in currentLyric.lines" :key="lyric.id" :class="{active : index === lyricIndex}">{{lyric.txt}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="top">
        <div class="icon">
          <div class="lock" v-if="isLock" @click="lock"></div>
          <div class="unlock" v-else-if="!isLock" @click="lock"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="operation">
          <a href="" title="上一首" class="pre" @click.prevent="pre"></a>
          <a href="" class="star" title="播放/暂停" @click.prevent="pause" v-show="isShow === 1"></a>
          <a href="" class="stop" title="播放/暂停" @click.prevent="play" v-show="isShow === 0"></a>
          <a href="" title="下一首" class="nex" @click.prevent="nex"></a>
        </div>
        <div class="cover">
          <img :src="cover" alt="" v-show="cover !== ''">
          <a class="bg"></a>
        </div>
        <div class="play">
          <div class="m_info">
            <a href="" class="m_name" :title="song.name">{{song.name}}</a>
            <a href="" class="m_auth" :title="111">{{auth}}</a>
            <a href="" class="m_playlist" title="来自榜单" v-show="auth !== ''"></a>
          </div>
          <div class="m_bar" @click="isShowVolume = false">
            <audio :src="music" class="bar" ref="audio"></audio>
            <div class="barbg" @mousemove="moveMouseX($event)" @click="changeMouseX($event)" ref="barbg">
              <div class="m_ready" :style="'width:'+`${width}`+'%'"></div>
              <div class="m_btn" :style="'left:'+`${width}`+'%'" @mousedown="moveBar()" @mouseup="stopMoveBar()" @mouseover="stopMoveBar()"></div>
            </div>
            <span class="m_time">{{currentTime}} / {{duration}}</span>
          </div>
        </div>
        <div class="oper">
          <a href="" class="icon_1" title="画中画歌词"></a>
          <a href="" class="icon_2" title="收藏"></a>
          <a href="" class="icon_3" title="分享"></a>
        </div>
        <div class="ctrl">
          <div href="" class="icon_1" @click="volume()" ref="ctrl"></div>
          <div class="volume" v-show="isShowVolume" @mouseout="stopMove()">
            <!-- @mousemove="getMouseY($event)" -->
            <div class="v_ctrl" @mousemove="moveMouseY($event)" @click="changeMouseY($event)" ref="v_ctrl">
              <div class="v-bar" :style="'height:'+`${volumeHeight}`+'px'"></div>
              <div class="v_btn" :style="'bottom:'+`${volumeHeight - 12}`+'px'" @mousedown="move()" @mouseup="stopMove()"></div>
            </div>
          </div>
          <a href="" class="icon_2 loop1" title="循环" v-show="loop === 1" @click.prevent="loop=2"></a>
          <a href="" class="icon_2 loop2" title="随机" v-show="loop === 2" @click.prevent="loop=3"></a>
          <a href="" class="icon_2 loop3" title="单曲循环" v-show="loop === 3" @click.prevent="loop=1"></a>
          <div href="" class="icon_3" title="播放列表" @click.prevent="ShowList">
            <p v-show="JSON.parse(JSON.stringify(musiclist)).length>0">{{JSON.parse(JSON.stringify(musiclist)).length}}</p>
          </div>
          <span class="tip" ref="tip">已添加到播放列表</span>
          <span class="tip2" ref="tip2">已开始播放</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongUrlAPI, getSongListAPI, getLyricAPI } from '@/api/index.js'
import bus from '@/utils/eventBus.js'
import Lyric from 'lyric-parser'

export default {
  name: 'playMusic',
  data () {
    return {
      // 用于判断显示暂停键还是播放键
      isShow: 0,
      // 是否显示播放列表
      isShowList: 0,
      // tip定时器
      time1: null,
      timer3: null,
      // 当前播放的音乐(播放器)
      music: '',
      // 用于判断是否有音乐添加到播放列表
      count: 0,
      // 播放器进度条
      audio: '',
      // 当前播放的音乐详情
      song: {},
      // 当前播放的音乐作者名
      auth: '',
      // 当前播放音乐的封面
      cover: '',
      // 当前音乐的时长
      duration: '00:00',
      // 是否显示音量控制
      isShowVolume: false,
      // 音量高度
      volumeHeight: 43.5,
      // 判断音量控制键是否可以拖动
      isMove: false,
      // 当前音乐播放进度
      currentTime: '00:00',
      // 循环播放
      loop: 1,
      // 当前歌曲播放比例
      width: 0,
      // 是否允许拖拽播放进度条
      isMoveBar: false,
      // 进度条定时器
      timer2: '',
      // 当前播放的音乐的歌词
      currentLyric: '',
      // 当前放到哪一句歌词
      lyricIndex: 0,
      // 歌词定时器
      lyricTimer: null,
      // 当前播放的是列表里的第几首歌
      musicIndex: -1,
      // 是否锁定播放器
      isLock: false,
      // 播放器是否上移
      isMoveUp: false
    }
  },
  methods: {
    // onblur () {
    //   this.isShowVolume = false
    // },
    // 点击播放按钮
    pause () {
      this.isShow = 0
      this.$refs.audio.pause()
    },
    // 点击暂停按钮
    play () {
      if (JSON.parse(JSON.stringify(this.musiclist)).length !== 0 || localStorage.getItem('MUSIC') !== null) {
        this.isShow = 1
        this.$refs.audio.play()
        this.WatchBar()
        this.setLyricTimer()
      }
    },
    // 点击音量按钮
    volume () {
      this.isShowVolume = !this.isShowVolume
    },
    // 判断音量控制键是否可以移动
    move () {
      // 音量控制键可以拖动
      this.isMove = true
    },
    stopMove () {
      // 音量控制键不可以拖动
      this.isMove = false
    },
    moveMouseY (e) {
      if (this.isMove) {
        this.volumeHeight = Math.min(Math.max(this.$refs.v_ctrl.getBoundingClientRect().top + 93 - e.clientY, 0), 93)
        if (this.volumeHeight <= 0) {
          this.$refs.ctrl.style.backgroundPositionX = '-104px'
          this.$refs.ctrl.style.backgroundPositionY = '-69px'
        } else {
          this.$refs.ctrl.style.backgroundPositionX = '-2px'
          this.$refs.ctrl.style.backgroundPositionY = '-248px'
        }
        this.audio.volume = this.volumeHeight / 93
      }
    },
    changeMouseY (e) {
      this.volumeHeight = Math.min(Math.max(this.$refs.v_ctrl.getBoundingClientRect().top + 93 - e.clientY, 0), 93)
      if (this.volumeHeight <= 0.5) {
        this.$refs.ctrl.style.backgroundPositionX = '-104px'
        this.$refs.ctrl.style.backgroundPositionY = '-69px'
      } else {
        this.$refs.ctrl.style.backgroundPositionX = '-2px'
        this.$refs.ctrl.style.backgroundPositionY = '-248px'
      }
      this.audio.volume = this.volumeHeight / 93
    },
    ShowList () {
      this.isShowList = !this.isShowList
      if (this.isShowVolume) {
        this.isShowVolume = false
      }
    },
    min (item) {
      if (parseInt(item / 60000) < 10) {
        return '0' + parseInt(item / 60000)
      } else {
        return parseInt(item / 60000)
      }
    },
    sec (item) {
      const x = parseInt(item / 60000)
      const y = parseInt(item / 1000 - x * 60)
      if (y < 10) return '0' + y
      else return y
    },
    hiddenList () {
      this.isShowList = 0
    },
    getMusicList () {
      return this.$store.state.music.musicList
    },
    // 获取当前播放的音乐
    async initMusic () {
      // console.log(this.musicNow)
      const { data: res } = await getSongUrlAPI(this.musicNow.id)
      // 获取音乐播放路径
      this.music = res.data[0].url
      // this.music = this.music.replace(/m801.music/g, 'm701.music')
      this.audio = this.$refs.audio
      if (this.audio.paused === true) {
        this.isShow = 0
      } else {
        this.isShow = 1
      }
      this.audio.volume = 0.5
    },
    // 获取歌曲详情
    async initMusicDetail () {
      const { data: res } = await getSongListAPI(this.musicNow.id)
      // 获取当前音乐详情
      this.song = res.songs[0]
      this.auth = this.song.ar[0].name
      this.cover = this.song.al.picUrl
      // console.log(this.song)
      // 获取并格式化音乐时长
      this.duration = this.min(this.song.dt) + ':' + this.sec(this.song.dt)
    },
    // 获取歌曲歌词
    async getMusicLyric () {
      const { data: res } = await getLyricAPI(this.musicNow.id)
      this.currentLyric = new Lyric(res.lrc.lyric, this.lyricHandle)
    },
    // 开启歌词定时器
    setLyricTimer () {
      clearInterval(this.lyricTimer)
      this.lyricTimer = setInterval(() => {
        for (let i = 0; i < this.currentLyric.lines.length; i++) {
          if (this.currentLyric.lines[i].time > this.audio.currentTime * 1000) {
            this.lyricIndex = i - 1
            break
          }
        }
      }, 100)
    },
    // 允许拖拽进度条
    moveBar () {
      this.isMoveBar = true
    },
    // 禁止拖拽进度条
    stopMoveBar () {
      if (this.isMoveBar) {
        this.isMoveBar = false
        this.WatchBar()
        this.audio.currentTime = (this.width / 100) * this.audio.duration
      }
    },
    // 拖拽进度条
    moveMouseX (e) {
      if (this.isMoveBar) {
        clearInterval(this.timer2)
        this.timer2 = ''
        this.width = Math.min(Math.max(((e.clientX - this.$refs.barbg.getBoundingClientRect().left) / 466) * 100, 0), 100)
      }
    },
    changeMouseX (e) {
      this.width = Math.min(Math.max(((e.clientX - this.$refs.barbg.getBoundingClientRect().left) / 466) * 100, 0), 100)
      this.audio.currentTime = (this.width / 100) * this.audio.duration
    },
    // 进度条监视
    WatchBar () {
      clearInterval(this.timer2)
      this.timer2 = setInterval(() => {
        this.width = (this.audio.currentTime / this.audio.duration) * 100
        this.duration = this.min(this.audio.duration * 1000) + ':' + this.sec(this.audio.duration * 1000)
        this.currentTime = this.min(this.audio.currentTime * 1000) + ':' + this.sec(this.audio.currentTime * 1000)
        // 播放完毕
        if (this.audio.currentTime === this.audio.duration) {
          if (this.loop === 1 || this.loop === 2) {
            this.nex()
          } else {
            this.loopMusic()
          }
          clearInterval(this.timer2)
        }
      }, 100)
    },
    // 上一首歌
    pre () {
      if (JSON.parse(JSON.stringify(this.musiclist)).length !== 0) {
        let index = this.musicIndex - 1
        if (index === -1) index = this.musiclist.length - 1
        if (this.loop === 1 || this.loop === 3) {
          this.setMusic(this.musiclist[index].id)
        } else if (this.loop === 2) {
          this.setMusic(this.musiclist[parseInt(Math.random() * this.musiclist.length)].id)
        }
      }
    },
    // 下一首歌
    nex () {
      if (JSON.parse(JSON.stringify(this.musiclist)).length !== 0) {
        let index = this.musicIndex + 1
        if (index === this.musiclist.length) index = 0
        if (this.loop === 1 || this.loop === 3) {
          this.setMusic(this.musiclist[index].id)
        } else if (this.loop === 2) {
          this.setMusic(this.musiclist[parseInt(Math.random() * this.musiclist.length)].id)
        }
        this.play()
      }
    },
    // 循环当前播放
    loopMusic () {
      this.setMusic(this.musiclist[this.musicIndex].id)
    },
    // 设置当前播放的音乐
    setMusic (id) {
      this.$store.dispatch('setMusics', id)
      // eslint-disable-next-line prefer-const
      let timerr
      const lastId = this.musicNow.id
      if (timerr) clearInterval(timerr)
      timerr = setInterval(() => {
        if (lastId !== this.musicNow.id) {
          setTimeout(() => {
            this.play()
          }, 400)
          clearInterval(timerr)
        }
      }, 100)
    },
    // 是否解锁固定播放器
    lock () {
      this.isLock = !this.isLock
      this.WatchMusic()
    },
    // 鼠标移上去时显示播放器
    moveUp () {
      this.isMoveUp = true
      this.WatchMusic()
    },
    // 鼠标移上去时隐藏播放器
    moveDown () {
      this.isMoveUp = false
      this.WatchMusic()
    },
    // 监听播放器是否显示
    WatchMusic () {
      this.timer = setInterval(() => {
        // this.isShowVolume = false
        // 如果播放器处于解锁状态，则定时关闭播放器
        if (this.isLock || this.isMoveUp) {
          this.$refs.content_wrap.style.bottom = 0 + 'px'
        } else if (!this.isLock && !this.isShowList && !this.isMoveUp) {
          this.$refs.content_wrap.style.bottom = -42 + 'px'
        }
        clearInterval(this.timer)
      }, 1000)
    },
    // 清除所有的音乐
    removeAllMusic () {
      this.$store.dispatch('removeAllMusic')
    },
    // 删除播放列表中指定的音乐
    deleteMusic (e, id, cid) {
      // this.setMusic(this.musiclist[this.musicIndex].id)
      e.stopPropagation()
      if (id === cid) {
        this.nex()
      }
      this.$store.dispatch('removeMusic', id)
    }
  },
  watch: {
    // 侦听是否有添加音乐到播放列表
    musiclist (newVal, oldVal) {
      const newLenght = JSON.parse(JSON.stringify(newVal)).length
      const oldLengh = JSON.parse(JSON.stringify(oldVal)).length
      if (this.count !== this.$store.state.music.count) {
        clearTimeout(this.time1)
        if (newLenght > oldLengh) {
          this.$refs.tip.style.display = 'block'
          this.time1 = setTimeout(() => {
            this.$refs.tip.style.display = 'none'
          }, 2000)
        }
        this.count = this.$store.state.music.musicList
      }
      setTimeout(() => {
        for (let i = 0; i < this.musiclist.length; i++) {
          if (this.musiclist[i].id === this.musicNow.id) {
            this.musicIndex = i
            break
          }
        }
      }, 200)
    },
    // 侦听当前播放的音乐
    musicNow () {
      this.initMusic()
      this.initMusicDetail()
      this.getMusicLyric()
      setTimeout(() => {
        for (let i = 0; i < this.musiclist.length; i++) {
          if (this.musiclist[i].id === this.musicNow.id) {
            this.musicIndex = i
            break
          }
        }
      }, 200)
    },
    lyricIndex () {
      this.$refs.lyric.scrollTop = (this.lyricIndex - 2) * 32
    }
  },
  computed: {
    // 获取音乐播放列表
    musiclist () {
      return this.$store.state.music.musicList
    },
    musicNow () {
      return this.$store.state.music.music
    }
  },
  mounted () {
    this.WatchMusic()
    this.$store.dispatch('getMusicLists')
    this.$store.dispatch('getMusics')
    bus.$on('play', () => {
      this.play()
      this.audio.autoplay = true
      clearTimeout(this.time3)
      this.$refs.tip2.style.display = 'block'
      this.time3 = setTimeout(() => {
        this.$refs.tip2.style.display = 'none'
      }, 2000)
    })
  },
  created () {
    this.count = this.$store.state.music.count
  }
}
</script>

<style lang="less" scoped>
.content_wrap {
  width: 100%;
  height: 53px;
  position: fixed;
  bottom: 0px;
  background: url('@/components/img/playbar.png') repeat-x 0px 0px;
  transition: bottom 0.2s linear;
  .wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .list {
      width: 986px;
      height: 301px;
      top: -295px;
      position: absolute;
      z-index: -9999;
      left: 50%;
      margin-left: -482px;
      border-radius: 6px 6px 0px 0px;
      .header {
        width: 100%;
        height: 41px;
        background: url('@/components/img/playlist_bg.png') -2px 0;
        position: relative;
        h4 {
          position: absolute;
          left: 25px;
          top: 0;
          height: 39px;
          line-height: 39px;
          font-size: 14px;
          color: #e2e2e2;
        }
        .collect_all {
          position: absolute;
          color: #cccccc;
          top: 12px;
          left: 398px;
          line-height: 15px;
          text-decoration: none;
          &:hover {
            color: #fff;
            text-decoration: underline;
            .icon {
              background-position: -24px -20px;
            }
          }
          .icon {
            display: block;
            width: 16px;
            height: 16px;
            float: left;
            margin: 1px 6px 0 0;
            background: url('@/components/img/playlist.png') -24px 0;
          }
        }
        .line {
          position: absolute;
          top: 13px;
          left: 477px;
          height: 15px;
          border-left: 1px solid #000;
          border-right: 1px solid #2c2c2c;
        }
        .delete {
          width: 43px;
          height: 15px;
          color: #cccccc;
          position: absolute;
          left: 490px;
          top: 12px;
          line-height: 15px;
          text-decoration: none;
          &:hover {
            color: #fff;
            text-decoration: underline;
            .del_icon {
              background-position: -51px -20px;
            }
          }
          .del_icon {
            display: block;
            width: 13px;
            height: 15px;
            margin: 1px 6px 0 0;
            float: left;
            background: url('@/components/img/playlist.png') -51px 0;
          }
        }
        .m_title {
          position: absolute;
          left: 595px;
          top: 0;
          width: 346px;
          text-align: center;
          height: 39px;
          line-height: 39px;
          color: #fff;
          font-size: 14px;
        }
        .close {
          position: absolute;
          top: 6px;
          right: 8px;
          width: 30px;
          height: 30px;
          overflow: hidden;
          text-indent: -999px;
          cursor: pointer;
          background: url('@/components/img/playlist.png') -195px 9px;
          &:hover {
            background-position: -195px -20px;
          }
        }
      }
      .music_content {
        width: 982px;
        height: 260px;
        overflow: hidden;
        background: url('@/components/img/playlist_bg.png') repeat-y -1014px 0;
        position: relative;
        .left {
          position: absolute;
          top: 0px;
          left: 0px;
          height: 255px;
          width: 561px;
          background-color: #121212;
          overflow: hidden;
          overflow-y: auto;
          z-index: 4;
          &::-webkit-scrollbar {
            width: 6px;
            height: 8px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #868686;
            border-radius: 15px;
          }
          &::-webkit-scrollbar-track {
            background-color: #000;
          }
          .notice {
            width: 553px;
            height: 86px;
            color: #aaa;
            padding-top: 85px;
            text-align: center;
            line-height: 43px;
            .n_icon {
              position: relative;
              top: -4px;
              display: inline-block;
              width: 36px;
              height: 29px;
              margin-right: 3px;
              vertical-align: middle;
              background: url('@/components/img/playlist.png') -138px 0;
            }
            a {
              color: #aaa;
            }
          }
          .playlist {
            height: 260px;
            width: 553px;
            list-style: none;
            li {
              width: 100%;
              height: 28px;
              cursor: pointer;
              &:hover {
                background-color: rgb(25, 25, 25);
                .col {
                  color: #fff;
                }
                .i {
                  visibility: visible !important;
                }
              }
              .jt {
                width: 10px;
                height: 28px;
                float: left;
                padding-left: 10px;
                span {
                  display: none;
                  width: 10px;
                  height: 13px;
                  margin-top: 8px;
                  background: url('@/components/img/playlist.png') -182px 0;
                }
              }
              .col {
                height: 100%;
                padding-left: 10px;
                float: left;
                line-height: 28px;
              }
              .col_1 {
                width: 246px;
                color: #cccccc;
              }
              .col_2 {
                width: 88px;
                .i {
                  float: left;
                  margin: 7px 0 0 10px;
                  width: 16px;
                  height: 16px;
                  background-image: url('@/components/img/playlist.png');
                  background-position: 0 0;
                  visibility: hidden;
                }
                .i_coll {
                  margin-left: 0px;
                  background-position: -24px 0;
                  &:hover {
                    background-position: -24px -20px;
                  }
                }
                .i_share {
                  width: 14px;
                  &:hover {
                    background-position: 0px -20px;
                  }
                }
                .i_dl {
                  width: 14px;
                  background-position: -57px -50px;
                  &:hover {
                    background-position: -80px -50px;
                  }
                }
                .i_del {
                  width: 13px;
                  background-position: -51px 0px;
                  &:hover {
                    background-position: -51px -20px;
                  }
                }
              }
              .col_3 {
                width: 70px;
                color: #9b9b9b;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                &:hover {
                  text-decoration: underline;
                }
              }
              .col_4 {
                width: 40px;
                color: #666666;
              }
              .col_5 {
                width: 33px;
                .link {
                  display: block;
                  float: left;
                  height: 100%;
                  line-height: 28px;
                  cursor: pointer;
                  width: 14px;
                  height: 15px;
                  margin: 7px 0px 0px 13px;
                  background: url('@/components/img/playbar.png');
                  background-position: -110px -103px;
                  &:hover {
                    background-position: -130px -103px;
                  }
                }
              }
            }
          }
        }
        .right {
          position: absolute;
          left: 560px;
          top: 0;
          width: 423px;
          height: 220px;
          padding: 20px 0;
          overflow: hidden;
          overflow-y: auto;
          // z-index: -3;
          &::-webkit-scrollbar {
            width: 6px;
            height: 8px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #868686;
            border-radius: 15px;
          }
          &::-webkit-scrollbar-track {
            background-color: #000;
          }
          .lyric_part {
            position: absolute;
            width: 420px;
            left: 2px;
            p {
              color: #989898;
              word-wrap: break-word;
              text-align: center;
              line-height: 32px;
              height: auto !important;
              transition: color 0.7s linear;
            }
            .active {
              color: #fff;
              font-size: 14px;
            }
          }
        }
      }
    }
    .top {
      width: 100%;
      height: 20px;
      top: -10px;
      position: absolute;
      .icon {
        width: 52px;
        height: 100%;
        float: right;
        margin-right: 15px;
        background: url('@/components/img/playbar.png') repeat-x 0 -380px;
        position: relative;
        .lock {
          width: 18px;
          height: 18px;
          margin: 6px 0px 0px 17px;
          background: url('@/components/img/playbar.png') no-repeat -100px -380px;
          cursor: pointer;
          position: absolute;
        }
        .unlock{
          width: 18px;
          height: 18px;
          margin: 6px 0px 0px 17px;
          background: url('@/components/img/playbar.png') no-repeat -80px -380px;
          cursor: pointer;
          position: absolute;
        }
      }
    }
    .bottom {
      width: 980px;
      height: 47px;
      margin: 0 auto;
      position: absolute;
      bottom: 0px;
      left: 50%;
      margin-left: -490px;
      .operation {
        width: 137px;
        height: 42px;
        padding-top: 6px;
        float: left;
        position: relative;
        .pre,
        .nex {
          display: block;
          width: 28px;
          height: 28px;
          margin: 5px 8px 0px 0px;
          float: left;
          background-image: url('@/components/img/playbar.png');
        }
        .pre {
          background-position: 0 -130px;
          &:hover {
            background-position: -30px -130px;
          }
        }
        .nex {
          position: absolute;
          right: 21px;
          background-position: -80px -130px;
          &:hover {
            background-position: -110px -130px;
          }
        }
        .star,
        .stop {
          display: block;
          position: absolute;
          width: 36px;
          height: 36px;
          left: 36px;
          background-image: url('@/components/img/playbar.png');
        }
        .star {
          background-position: -40px -165px;
        }
        .stop {
          background-position: 0 -204px;
        }
      }
      .cover {
        width: 34px;
        height: 35px;
        float: left;
        margin: 6px 15px 0 0;
        position: relative;
        background: url('@/components/img/default_album.jpg');
        background-size: 100%;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        .bg {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          display: block;
          background: url('@/components/img/playbar.png') no-repeat 0 -80px;
        }
      }
      .play {
        width: 581px;
        height: 37px;
        float: left;
        .m_info {
          width: 100%;
          height: 28px;
          .m_name,
          .m_auth,
          .m_playlist {
            display: block;
            float: left;
            height: 100%;
            line-height: 28px;
            text-decoration: none;
            cursor: pointer;
          }
          .m_name {
            color: #e8e8e8;
            &:hover {
              text-decoration: underline;
            }
          }
          .m_auth {
            color: #9b9b9b;
            margin-left: 15px;
            &:hover {
              text-decoration: underline;
            }
          }
          .m_playlist {
            width: 14px;
            height: 15px;
            margin: 7px 0px 0px 13px;
            background: url('@/components/img/playbar.png');
            background-position: -110px -103px;
            &:hover {
              background-position: -130px -103px;
            }
          }
        }
        .m_bar {
          width: 100%;
          height: 9px;
          position: relative;
          user-select: none;
          .bar {
            position: absolute;
            top: -50px;
          }
          .barbg {
            width: 466px;
            height: 9px;
            position: relative;
            background: url('@/components/img/statbar.png') no-repeat right 0;
            cursor: pointer;
            .m_ready {
              position: absolute;
              top: 0px;
              left: 0px;
              width: 0%;
              height: 9px;
              background: url('@/components/img/statbar.png') no-repeat left -66px;
            }
            .m_btn {
              position: absolute;
              top: -7px;
              left: 0px;
              width: 22px;
              height: 24px;
              margin-left: -11px;
              background: url('@/components/img/iconall.png') 0 -250px;
              &:hover {
                background: url('@/components/img/iconall.png') 0 -280px;
              }
            }
          }
          .m_time {
            position: absolute;
            top: -3px;
            right: 30px;
            color: #797979;
            text-shadow: 0 1px 0 #121212;
          }
        }
      }
      .oper {
        width: 87px;
        height: 37px;
        float: left;
        .icon_1,
        .icon_2,
        .icon_3 {
          width: 25px;
          height: 25px;
          float: left;
          margin: 11px 2px 0px 0px;
          cursor: pointer;
          background-image: url('@/components/img/playbar.png');
        }
        .icon_1 {
          background-image: url('@/components/img/DLVi.jpg');
          background-position: 0px 0px;
          &:hover {
            background-position: 0px -25px;
          }
        }
        .icon_2 {
          background-position: -88px -163px;
          &:hover {
            background-position: -88px -189px;
          }
        }
        .icon_3 {
          background-position: -114px -163px;
          &:hover {
            background-position: -114px -189px;
          }
        }
      }
      .ctrl {
        width: 113px;
        height: 37px;
        float: left;
        padding-left: 13px;
        position: relative;
        .icon_1,
        .icon_2,
        .icon_3 {
          width: 25px;
          height: 25px;
          float: left;
          margin: 11px 2px 0px 0px;
          cursor: pointer;
          background-image: url('@/components/img/playbar.png');
        }
        .icon_1 {
          background-position: -2px -248px;
          &:hover {
            background-position: -31px -248px;
          }
        }
        .volume {
          position: absolute;
          top: -113px;
          left: 10px;
          clear: both;
          width: 32px;
          height: 113px;
          background: url('@/components/img/playbar.png') 0 -503px;
          cursor: pointer;
          user-select: none;
          .v_ctrl {
            width: 4px;
            height: 93px;
            margin: 11px 0px 0px 14px;
            position: relative;
            user-select: none;
            .v-bar {
              width: 100%;
              height: 0px;
              position: absolute;
              bottom: 0px;
              left: 0px;
              background: url('@/components/img/playbar.png') -40px bottom;
              user-select: none;
            }
            .v_btn {
              width: 18px;
              height: 20px;
              position: absolute;
              bottom: 0px;
              // top: 0px;
              left: -7px;
              background: url('@/components/img/iconall.png') -40px -250px;
              user-select: none;
            }
          }
        }
        .icon_2 {
          position: absolute;
          top: 0px;
          left: 40px;
        }
        .loop1 {
          background-position: -3px -344px;
          &:hover {
            background-position: -33px -344px;
          }
        }
        .loop2 {
          background-position: -66px -248px;
          &:hover {
            background-position: -93px -248px;
          }
        }
        .loop3 {
          background-position: -66px -344px;
          &:hover {
            background-position: -93px -344px;
          }
        }
        .icon_3 {
          width: 37px;
          padding-left: 20px;
          position: relative;
          margin-left: 27px;
          background-position: -43px -68px;
          &:hover {
            background-position: -43px -98px;
          }
          p {
            color: #666666;
            position: absolute;
            top: 6px;
            left: 31px;
          }
        }
        .tip {
          position: absolute;
          top: -51px;
          right: -26px;
          clear: both;
          width: 152px;
          height: 49px;
          color: #fff;
          background: url('@/components/img/playbar.png') 0 -287px;
          text-align: center;
          line-height: 37px;
          display: none;
        }
        .tip2 {
          position: absolute;
          top: -51px;
          right: -26px;
          clear: both;
          width: 152px;
          height: 49px;
          color: #fff;
          background: url('@/components/img/playbar.png') 0 -287px;
          text-align: center;
          line-height: 37px;
          display: none;
        }
      }
    }
  }
}
.active {
  background-color: rgb(25, 25, 25);
}
.active1 {
  display: block !important;
}
</style>
