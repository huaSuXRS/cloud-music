<template>
  <div class="catetop">
    <div class="c_warp c_left">
      <div class="c_hd">
        <a class="hd_name">推荐节目</a>
        <a class="hd_more">更多 &gt;</a>
      </div>
      <ul class="c_ul">
        <li class="c_li" v-for="item1 in pgRecomList" :key="item1.id">
          <a class="l_hd"><img v-lazy="item1.coverUrl"><i></i></a>
          <div class="l_con">
            <p class="l_title">{{item1.name}}</p>
            <p class="l_state">{{item1.cateName}}</p>
          </div>
          <a class="l_com">{{item1.category}}</a>
        </li>
      </ul>
    </div>
    <div class="c_warp c_right">
      <div class="c_hd">
        <a class="hd_name">节目排行榜</a>
        <a class="hd_more">更多 &gt;</a>
      </div>
      <ul class="c_ul">
        <li class="c_li" v-for="(item2,index2) in pgTopList" :key="item2.id">
          <div class="r_rank">
            <span class="r_r">{{ index2 >= 9? index2+1 : '0' + (index2 + 1) }}</span>
          </div>
          <div class="r_hd"><img v-lazy="item2.coverUrl"><i></i></div>
          <div class="r_con">
            <p class="r_title">{{item2.name}}</p>
            <p class="r_state">{{item2.cateName}}</p>
          </div>
          <div class="r_hot">
            <i class="r_h" :style="'width:'+`${item2.score}`+'%'"><i></i></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPorgramRecomAPI, getPorgramTopAPI } from '@/api/index.js'

export default {
  name: 'djCategory',
  data () {
    return {
      pgRecomList: [],
      pgTopList: [],
      limit: 10
    }
  },
  methods: {
    // 获取精彩节目推荐
    async getProgramRecommend () {
      const { data: res } = await getPorgramRecomAPI()
      res.programs.forEach(item => {
        const obj = {}
        obj.id = item.id
        obj.name = item.name
        obj.coverUrl = item.coverUrl
        obj.category = item.radio.category
        obj.cateName = item.radio.name
        this.pgRecomList.push(obj)
      })
      // console.log(this.pgRecomList)
    },
    // 获取节目排行榜
    async getProgramTopList () {
      const { data: res } = await getPorgramTopAPI(this.limit)
      res.toplist.forEach(item => {
        const obj = {}
        obj.id = item.program.id
        obj.name = item.program.name
        obj.score = item.score / 100000 * 100
        obj.coverUrl = item.program.coverUrl
        obj.category = item.program.radio.category
        obj.cateName = item.program.radio.name
        this.pgTopList.push(obj)
      })
    }
  },
  mounted () {
    this.getProgramRecommend()
    this.getProgramTopList()
  }
}
</script>

<style lang="less" scoped>
.catetop {
  width: 100%;
  height: 643px;
  margin-top: 10px;
  .c_warp {
    width: 424px;
    height: 100%;
    .c_hd {
      width: 100%;
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      .hd_name {
        font-size: 24px;
        font-weight: normal;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .hd_more {
        float: right;
        margin-top: 14px;
        color: #666;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .c_ul {
      width: 422px;
      height: 600px;
      list-style: none;
      border: 1px solid #e2e2e2;
      .c_li {
        width: 422px;
        height: 40px;
        padding: 10px 0;
        line-height: 40px;
        &:hover {
          background-color: rgb(238, 238, 238) !important;
          .l_hd,
          .r_hd {
            cursor: pointer;
            i {
              display: block;
            }
          }
        }
        .l_hd,
        .r_hd {
          margin-left: 20px;
          width: 40px;
          height: 40px;
          display: block;
          float: left;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          i {
            display: none;
            position: absolute;
            width: 22px;
            height: 22px;
            top: 50%;
            left: 50%;
            margin: -11px 0 0 -11px;
            // background-position: 0 -85px;
            background: url('@/components/img/iconall.png') 0 -85px;
          }
        }
      }
      .c_li:nth-of-type(even) {
        background: #f7f7f7;
      }
      .c_li:nth-of-type(odd) {
        background: #ffffff;
      }
    }
  }
  .c_left {
    float: left;
    .c_ul {
      .c_li {
        .l_con {
          width: 254px;
          height: 40px;
          margin: 1px 0 0 10px;
          line-height: 20px;
          float: left;
          .l_title,
          .l_state {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .l_state {
            color: #999;
          }
        }
        .l_com {
          margin: 1px 0 0 10px;
          position: relative;
          top: -1px;
          height: 16px;
          padding: 0 6px;
          border: 1px solid #999;
          line-height: 16px;
          color: #999;
          vertical-align: middle;
          cursor: pointer;
          &:hover {
            border: 1px solid #333;
            color: #333;
          }
        }
      }
    }
  }
  .c_right {
    float: right;
    .c_ul {
      .c_li {
        .r_rank {
          float: left;
          width: 47px;
          margin: 6px 0 0 0;
          text-align: center;
          .r_r {
            display: block;
            width: 100%;
            text-align: center;
            color: #999;
            font-size: 14px;
          }
        }
        .r_hd {
          float: left;
          margin: 0px;
        }
        .r_con {
          float: left;
          width: 208px;
          margin: 1px 0 0 10px;
          line-height: 20px;
          .r_title,
          .r_state {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .r_state {
            color: #999;
          }
        }
        .r_hot {
          float: left;
          width: 100px;
          height: 8px;
          margin-top: 16px;
          background: url('@/components/img/table.png') 0 -240px;
          .r_h {
            overflow: hidden;
            padding: 0 4px;
            display: block;
            height: 8px;
            background: url('@/components/img/table.png') right -318px;
            i {
              margin-left: -4px;
              padding: 0 0 0 4px;
              background-position: 0 -304px;
              background: url('@/components/img/table.png') 0 -304px;
              display: block;
              height: 8px;
            }
          }
        }
      }
      .c_li:nth-child(1),.c_li:nth-child(2),.c_li:nth-child(3){
        .r_rank{
          .r_r{
            color: #da4545;
          }
        }
      }
    }
  }
}
</style>
