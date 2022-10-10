<template>
  <div class="recom2">
    <div class="a_regist2">
      <div class="r_hd">
        <h3 class="h3">入驻歌手</h3>
      </div>
      <ul class="r_ul">
        <li class="r_li" v-for="item in artlist" :key="item.id">
          <div class="li_top">
            <img class="t_cover" v-lazy="item.img1v1Url">
            <a class="t_bg"></a>
          </div>
          <div class="t_bottom">
            <p>{{item.name}}</p>
            <i v-if="item.accountId !== null"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getArtistListAPI } from '@/api/index.js'
export default {
  name: 'artRegist',
  data () {
    return {
      artlist: []
    }
  },
  methods: {
    // 获取热门歌手
    async getArtistTop () {
      const { data: res } = await getArtistListAPI(110)
      this.artlist = res.artists
    }
  },
  mounted () {
    this.getArtistTop()
  }
}
</script>

<style lang="less" scoped>
.a_regist2 {
  width: 100%;
  .r_hd {
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    .h3 {
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
    .r_more {
      float: right;
      margin-top: 14px;
      color: #666;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .r_ul {
    width: 736px;
    margin: 20px 0 0 -17px;
    .r_li {
      padding: 0 0 30px 17px;
      width: 130px;
      height: 154px;
      display: inline-block;
      .li_top {
        width: 130px;
        height: 130px;
        position: relative;
        .t_cover,
        .t_bg {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          cursor: pointer;
          background: url('@/components/img/coverall.png') 0 -680px;
        }
      }
      .t_bottom {
        margin-top: 8px;
        width: 100%;
        height: 16px;
        line-height: 16px;
        p {
          display: inline-block;
          max-width: 80%;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        i {
          display: block;
          float: right;
          width: 16px;
          height: 16px;
          cursor: pointer;
          background: url('@/components/img/icon.png') 0 -740px;
        }
      }
    }
  }
}
</style>
