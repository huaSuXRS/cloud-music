<template>
  <div class="recom">
    <div class="a_regist">
      <div class="r_hd">
        <h3 class="h3">入驻歌手</h3>
        <a class="r_more">更多 &gt;</a>
      </div>
      <ul class="r_ul">
        <li class="r_li" v-for="item2 in artlist2" :key="item2.id">
          <div class="li_top">
            <img class="t_cover" v-lazy="item2.img1v1Url">
            <a class="t_bg"></a>
          </div>
          <div class="t_bottom">
            <p>{{item2.name}}</p>
            <i v-if="item2.accountId !== null"></i>
          </div>
        </li>
      </ul>
    </div>

    <div class="a_regist">
      <div class="r_hd">
        <h3 class="h3">热门歌手</h3>
      </div>
      <ul class="r_ul">
        <li class="r_li" v-for="item1 in artlist1" :key="item1.id">
          <div class="li_top">
            <img class="t_cover" v-lazy="item1.img1v1Url">
            <a class="t_bg"></a>
          </div>
          <div class="t_bottom">
            <p>{{item1.name}}</p>
            <i v-if="item1.accountId !== null"></i>
          </div>
        </li>
      </ul>
    </div>

    <div class="a_singer">
      <ul class="s_ul">
        <li class="s_li" v-for="item3 in artlist3" :key="item3.id">
          <a>{{item3.name}}</a>
          <i v-if="item3.accountId !== null"></i>
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
      artlist1: [],
      artlist2: [],
      artlist3: []
    }
  },
  methods: {
    // 获取热门歌手
    async getArtistTop () {
      const { data: res } = await getArtistListAPI(110)
      this.artlist1 = res.artists.slice(0, 10)
      this.artlist2 = res.artists.slice(10, 20)
      this.artlist3 = res.artists.slice(20)
    }
  },
  mounted () {
    this.getArtistTop()
  }
}
</script>

<style lang="less" scoped>
.a_regist {
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
    width: 736;
    height: 368px;
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
.a_singer{
  width: 100%;
  border-top: 1px dotted #000;
  .s_ul{
    margin-top: 10px;
    list-style: none;
    .s_li{
      display: inline-block;
      padding-left: 17px;
      height: 30px;
      width: 126px;
      line-height: 23px;
      a{
        float: left;
        max-width: 101px;
        vertical-align: middle;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        text-decoration: none;
        cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
      }
      i {
          display: block;
          float: left;
          width: 16px;
          height: 16px;
          cursor: pointer;
          background: url('@/components/img/icon.png') 0 -740px;
          margin: 4px 0 0 2px;
          cursor: pointer;
        }
    }
  }
}
</style>
