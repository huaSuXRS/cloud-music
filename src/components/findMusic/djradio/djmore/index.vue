<template>
  <div class="djmore">
    <div class="content" v-for="item in radioList" :key="item.id">
      <div class="header">
        <h3 class="title"><span class="t">{{item.name}}</span><span class="t_2">·</span>电台</h3>
      </div>
      <ul class="c_ul">
        <li class="c_li" v-for="dj in item.data" :key="dj.id">
          <a class="l_hd"><img v-lazy="dj.intervenePicUrl" class="l_cover"></a>
          <div class="l_state">
            <h3 class="s_hd">{{dj.name}}</h3>
            <p class="s_p">{{dj.rcmdtext}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getDjRadioHotAPI } from '@/api/index.js'

export default {
  name: 'djCategory',
  data () {
    return {
      radioList: [],
      hotDjID: [2, 6, 3, 2001, 11]
    }
  },
  methods: {
    // 获取热门电台
    async getDjRadioHot () {
      for (let i = 0; i < 5; i++) {
        const { data: res } = await getDjRadioHotAPI(this.hotDjID[i], 4, 0)
        const obj = {}
        obj.id = this.hotDjID[i]
        obj.name = res.djRadios[1].category
        obj.data = res.djRadios.slice(0, 4)
        this.radioList.push(obj)
      }
    }
  },
  mounted () {
    this.getDjRadioHot()
  }
}
</script>

<style lang="less" scoped>
.djmore {
  width: 100%;
  .content {
    margin-top: 35px;
    width: 100%;
    height: 364px;
    .header {
      width: 100%;
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      .title {
        float: left;
        font-size: 24px;
        font-weight: normal;
        .t_2 {
          font-size: 24px;
          font-weight: normal;
          font-family: simsun;
        }
        .t {
          font-size: 24px;
          font-weight: normal;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .c_ul {
      margin-left: -30px;
      width: 930px;
      height: 322px;
      list-style: none;
      .c_li {
        float: left;
        width: 435px;
        height: 120px;
        margin-left: 30px;
        padding: 20px 0;
        border-bottom: 1px solid #e7e7e7;

        .l_hd {
          width: 120px;
          height: 120px;
          display: block;
          float: left;
          cursor: pointer;
          .l_cover {
            width: 100%;
            height: 100%;
          }
        }
        .l_state {
          float: right;
          width: 295px;
          height: 64px;
          margin-top: 10px;
          .s_hd,.s_p{
            display: block;
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
          .s_hd{
            height: 24px;
            margin: 16px 0 20px;
            font-size: 18px;
          }
          .s_p{
            margin-bottom: 6px;
            line-height: 20px;
            color: #999;
          }
        }
      }
      .c_li:nth-child(3),
      .c_li:nth-child(4) {
        border-bottom: 0px;
      }
    }
  }
}
</style>
