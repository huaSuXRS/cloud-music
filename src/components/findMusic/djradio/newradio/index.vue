<template>
  <div class="na_radio">
    <div class="newradio" v-if="isShowNew">
      <div class="header">
        <h3 class="title">优秀新电台</h3>
      </div>
      <ul class="n_ul">
        <li class="n_li" v-for="newradio,index in newRadioList" :key="index">
          <a class="n_cover"><img class="c_img" v-lazy="newradio.intervenePicUrl"/></a>
          <h3 class="n_name">{{newradio.name}}</h3>
          <p class="n_detail">{{newradio.rcmdtext}}</p>
        </li>
      </ul>
    </div>

    <div class="allradio">
      <div class="header">
        <h3 class="title">电台排行榜</h3>
      </div>
      <ul class="a_ul">
        <li class="a_li" v-for="dj,index in allRadioList" :key="index">
          <a class="a_cover"><img class="c_img" v-lazy="dj.intervenePicUrl"></a>
          <div class="a_con">
            <h3 class="a_title">{{dj.name}}</h3>
            <p class="a_creator">
              <i></i><a>{{dj.dj.nickname}}</a>
              <img v-lazy="dj.dj.avatarDetail.identityIconUrl" v-if="dj.dj.avatarDetail != null">
            </p>
            <p class="a_detail">共{{dj.programCount}}期&nbsp;&nbsp;&nbsp;&nbsp;订阅2597次</p>
          </div>
        </li>
      </ul>
      <Pagination :total="total" :pageNum="pageNum" :pageSize="pageSize" :btnCount="7" @getPageNum="getPageNum" v-if="isShowPager"></Pagination>
    </div>
  </div>
</template>

<script>
import { getDjRadioHotAPI } from '@/api/index.js'
import Pagination from '@/components/pagination/index.vue'

export default {
  name: 'newRadio',
  components: {
    Pagination
  },
  data () {
    return {
      newRadioList: [],
      allRadioList: [],
      pageNum: 1,
      pageSize: 16,
      total: 0,
      isShowNew: true,
      isShowPager: true
    }
  },
  methods: {
    // 获取前五作为优秀电台
    async getNewRadio () {
      const { data: res } = await getDjRadioHotAPI(this.id, 5, 0)
      this.total = res.count
      this.newRadioList = res.djRadios.slice(0, 5)
      if (res.djRadios.length === 0) {
        this.isShowNew = false
      } else {
        this.isShowNew = true
      }
    },
    // 获取当前id下热门电台
    async getAllRadio () {
      const { data: res } = await getDjRadioHotAPI(this.id, this.pageSize, (this.pageNum - 1) * this.pageSize)
      this.allRadioList = res.djRadios.slice(0, this.pageSize)
      if (this.total <= this.pageSize) {
        this.isShowPager = false
      } else {
        this.isShowPager = true
      }
    },
    // 获取当前分页
    getPageNum (page) {
      this.pageNum = page
      this.getAllRadio()
      document.body.scrollTop = document.documentElement.scrollTop = 660
    }
  },
  mounted () {
    this.getNewRadio()
    this.getAllRadio()
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  watch: {
    id () {
      this.getNewRadio()
      this.getAllRadio()
    }
  }
}
</script>

<style lang="less" scoped>
.na_radio {
  width: 100%;
  .newradio {
    width: 100%;
    height: 279px;
    margin-top: 10px;
    .n_ul {
      width: 937px;
      height: 221px;
      margin: 16px 0 0 -37px;
      list-style: none;
      .n_li {
        float: left;
        width: 150px;
        height: 219px;
        margin-left: 37px;
        .n_cover {
          width: 150px;
          height: 150px;
          display: block;
          cursor: pointer;
          .c_img {
            width: 100%;
            height: 100%;
          }
        }
        .n_name {
          margin: 13px 0 6px;
          line-height: 16px;
          font-size: 14px;
          font-weight: normal;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .n_detail {
          line-height: 18px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .header {
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    .title {
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
  }
  .allradio {
    width: 100%;
    margin-top: 35px;
    .a_ul {
      width: 930px;
      margin-left: -30px;
      list-style: none;
      .a_li {
        display: inline-block;
        width: 435px;
        height: 120px;
        margin-left: 30px;
        padding: 20px 0;
        border-bottom: 1px solid #e7e7e7;
        .a_cover {
          display: block;
          float: left;
          width: 120px;
          height: 120px;
          cursor: pointer;
          .c_img {
            width: 100%;
            height: 100%;
          }
        }
        .a_con {
          margin-left: 140px;
          width: 295px;
          .a_title {
            height: 64px;
            margin: 0;
            line-height: 64px;
            font-size: 18px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .a_creator {
            margin-bottom: 6px;
            line-height: 20px;
            i {
              width: 14px;
              height: 15px;
              display: inline-block;
              vertical-align: middle;
              background: url('@/components/img/icon.png') -50px -300px;
            }
            a {
              margin-left: 5px;
              vertical-align: middle;
              color: #333;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }

            }
            img {
                height: 13px;
                width: 13px;
                margin-left: 5px;
                display: inline-block;
                vertical-align: middle;
                border: 0;
              }
          }
          .a_detail {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
