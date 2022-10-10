<template>
  <div class="art_other">
    <div class="r_hd">
      <h3 class="h3">入驻歌手</h3>
    </div>

    <!-- 字母索引 -->
    <ul class="r_index">
      <li class="i_li" v-for="(item,index) in indexList" :key="index">
        <a class="li_a" :class="{active: isActive === index}" @click.prevent="artSort(item,index)">{{item}}</a>
      </li>
    </ul>

    <ul class="r_ul">
      <li class="r_li" v-for="item1 in artList1" :key="item1.id">
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

    <div class="a_singer">
      <ul class="s_ul">
        <li class="s_li" v-for="item2 in artList2" :key="item2.id">
          <a>{{item2.name}}</a>
          <i v-if="item2.accountId !== null"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getArtistTypeAPI } from '@/api/index.js'
export default {
  name: 'artOther',
  data () {
    return {
      indexList: [],
      isActive: 0,
      artList1: [],
      artList2: []
    }
  },
  methods: {
    artSort (item, index) {
      if (this.isActive !== index) {
        this.isActive = index
        if (item === '热门') item = -1
        else if (item === '其他') item = 0
        this.$router.push({
          path: '/findMusic/artist',
          query: {
            type: this.type,
            area: this.area,
            initial: item
          }
        })
      }
    },
    // 获取歌手信息
    async getArtistTop () {
      const { data: res } = await getArtistTypeAPI(this.type, this.area, this.initial, 100, 0)
      this.artList1 = res.artists.slice(0, 10)
      this.artList2 = res.artists.slice(10)
    }
  },
  computed: {
    area () {
      return this.$route.query.area
    },
    type () {
      return this.$route.query.type
    },
    initial () {
      if (this.$route.query.initial === undefined) return -1
      return this.$route.query.initial
    }
  },
  watch: {
    area () {
      this.isActive = 0
      this.getArtistTop()
    },
    type () {
      this.isActive = 0
      this.getArtistTop()
    },
    initial () {
      this.getArtistTop()
    }
  },
  mounted () {
    this.indexList.push('热门')
    for (let i = 0; i < 26; i++) {
      this.indexList.push(String.fromCharCode(65 + i))
    }
    this.indexList.push('其他')
    this.getArtistTop()
  }
}
</script>

<style lang="less" scoped>
.art_other {
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
  .r_index{
    width: 722px;
    height: 24px;
    margin-top: 20px;
    margin-left: -3px;
    list-style: none;
    .i_li{
      display: inline;
      float: left;
      margin-left: 3px;
      .li_a{
        font-size: 14px;
        border-radius: 2px;
        color: #000;
        width: 21px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        display: block;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .active{
        color: #fff;
        background: #c20c0c;
      }
    }
    .i_li:first-child,.i_li:last-child{
      .li_a{
        width: 45px;
        height: 24px;
        font-size: 12px;
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
  .a_singer {
    width: 100%;
    border-top: 1px dotted #000;
    .s_ul {
      margin-top: 10px;
      list-style: none;
      .s_li {
        display: inline-block;
        padding-left: 17px;
        height: 30px;
        width: 126px;
        line-height: 23px;
        a {
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
}
</style>
