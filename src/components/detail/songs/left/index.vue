<template>
  <div class="left_content">
    <div class="left_header">
      <div class="cover_img">
        <span class="c_bg"></span>
        <img class="cover" v-lazy="songs.al.picUrl" />
      </div>
      <div class="detail">
        <div class="d_hd">
          <i class="d_type"></i>
          <p class="d_name">{{songs.al.name}}</p>
        </div>
        <div class="artist">
          歌手：
          <span class="a_name" v-for="(item,index) in songs.ar" :key="index">{{item.name}}<p v-if="index < songs.ar.length-1"> / </p></span>
        </div>
        <div class="artist">所属专辑：<p class="a_name">{{songs.name}}</p>
        </div>
        <Contrller :id="id"></Contrller>
        <div class="lyric" ref="lyric">
          <p class="ly" v-for="(text,index) in currentLyric.lines" :key="index">{{text.txt}}</p>
        </div>
        <div class="open" v-show="!open"><a @click.prevent="isOpen()">展开<i class="up"></i></a></div>
        <div class="close" v-show="open"><a @click.prevent="isOpen()">收起<i class="down"></i></a></div>
      </div>
    </div>
    <Comment :id="id"></Comment>
  </div>
</template>

<script>
import { getSongListAPI, getLyricAPI } from '@/api/index.js'
import Contrller from '@/components/contrller'
import Lyric from 'lyric-parser'
import Comment from '@/components/comment/index.vue'

export default {
  name: 'detailLeft',
  components: {
    Contrller,
    Comment
  },
  data () {
    return {
      songs: {},
      currentLyric: {},
      open: false
    }
  },
  methods: {
    async getDetail (id) {
      const { data: res } = await getSongListAPI(id)
      this.songs = res.songs[0]
      console.log(res)
    },
    // 获取歌曲歌词
    async getMusicLyric () {
      const { data: res } = await getLyricAPI(this.id)
      this.currentLyric = new Lyric(res.lrc.lyric, this.lyricHandle)
      console.log(this.currentLyric)
    },
    // 是否展开歌词
    isOpen () {
      this.open = !this.open
      if (this.open) {
        this.$refs.lyric.style.height = 'auto'
      } else {
        this.$refs.lyric.style.height = '258px'
      }
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  watch: {
    id (newVal) {
      this.getDetail(newVal)
    }
  },
  created () {
    this.getMusicLyric()
  },
  mounted () {
    this.id = this.$route.query.id
    this.getDetail(this.id)
    this.getMusicLyric()
  }
}
</script>

<style lang="less" scoped>
.left_content {
  width: 709px;
  min-height: 700px;
  margin-right: 271px;
  padding: 47px 30px 40px 39px;
  border-right: 1px solid #d3d3d3;
  box-sizing: border-box;
  .left_header {
    width: 640px;
    .cover_img {
      float: left;
      width: 206px;
      height: 205px;
      position: relative;
      .c_bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-position: -140px -580px;
        background-image: url('@/components/img/coverall.png');
        z-index: 99;
      }
      .cover {
        position: absolute;
        width: 130px;
        height: 130px;
        left: 38px;
        top: 38px;
        border: 0;
      }
    }
    .detail {
      float: right;
      width: 414px;
      .d_type {
        float: left;
        width: 54px;
        height: 24px;
        background-position: 0 -463px;
        background-image: url('@/components/img/icon.png');
      }
      .d_name {
        margin-right: 7px;
        display: block;
        height: 24px;
        line-height: 24px;
        font-size: 24px;
      }
    }
    .artist {
      width: 100%;
      height: 16px;
      margin: 10px 0;
      color: #999;
      .a_name {
        color: #0c73c2;
        display: inline;
        p {
          display: inline;
        }
      }
    }
    .lyric {
      width: 224px;
      height: 258px;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-word;
      white-space: normal;
      margin-top: 13px;
      .ly {
        height: 23px;
        line-height: 23px;
        color: #333;
        letter-spacing: 1px;
      }
    }
    .open,
    .close {
      width: 224px;
      height: 24px;
      line-height: 24px;
      margin-top: 5px;
      a {
        color: #0c73c2;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
        i {
          display: inline-block;
          width: 11px;
          height: 8px;
          background-image: url('@/components/img/icon.png');
        }
      }
    }
    .up {
      background-position: -65px -520px;
    }
    .down {
      background-position: -45px -520px;
    }
  }
  .left_header::after {
    clear: both;
    content: '';
    height: 0;
    display: block;
    visibility: none;
  }
}
</style>
