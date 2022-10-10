<template>
  <div class="content_wrap">
    <div class="header">
      <strong class="h_name">入驻歌手</strong>
      <a href="" class="h_all">查看全部></a>
    </div>
    <ul class="content">
      <li v-for="item in artistsList" :key="item.id">
        <a href="" class="singer">
          <img class="s_cover" v-lazy="item.cover">
          <div class="s_info">
            <h4>{{item.name}}</h4>
            <p class="s_state">{{item.info}}</p>
          </div>
        </a>
      </li>
    </ul>
    <div class="btn">
      <a class="b_btn">
        <span>申请成为网易音乐人</span>
      </a>
    </div>

  </div>
</template>

<script>
import { getArtistsAPI } from '@/api/index.js'
export default {
  name: 'regSinger',
  data () {
    return {
      artistsList: []
    }
  },
  methods: {
    async initArtists () {
      const { data: res } = await getArtistsAPI(5001, 5, 1)
      res.artists.forEach((item) => {
        const obj = {}
        obj.name = item.name
        obj.cover = item.picUrl
        obj.id = item.id
        // eslint-disable-next-line eqeqeq
        if (item.alias == '') {
          obj.info = item.name
        } else {
          obj.info = item.alias[0]
        }
        this.artistsList.push(obj)
      })
    }
  },
  mounted () {
    this.initArtists()
  }
}
</script>

<style lang="less" scoped>
.content_wrap{
  width: 250px;
  margin-top: 15px;
  .header{
    position: relative;
    height: 23px;
    width: 210px;
    margin: 0 20px;
    border-bottom: 1px solid #ccc;
    .h_name{
      color: #333333;
    }
    .h_all{
      color: #666666;
      text-decoration: none;
      float: right;
      &:hover{
        text-decoration: underline;
      }
    }
  }
  .content{
    width: 230px;
    margin: 6px 0 14px 20px;
    list-style: none;
    li{
      width: 210px;
      height: 62px;
      margin-top: 14px;
      .singer{
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background-color: rgb(250,250,250);
        &:hover{
          background-color: rgb(244,244,244);
        }
        .s_cover{
          float: left;
          width: 62px;
          height: 100%;
        }
        .s_info{
          float: left;
          width: 133px;
          height: 60px;
          padding-left: 14px;
          border: 1px solid #e9e9e9;
          border-left: none;
          h4,.s_state{
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            margin-top: 8px;
          }
          h4{
            color: #333333;
            font-size: 14px;
          }
          .s_state{
            color: #666666;
          }
        }
      }
    }
  }
  .btn{
    width: 250px;
    height: 31px;
    .b_btn{
      display: block;
      width: 205px;
      height: 31px;
      margin-left: 20px;
      background: url('@/components/img/button2.png') right -100px;
      border-radius: 4px;
      text-decoration: none;
      padding-right: 5px;
      cursor: pointer;
      &:hover{
        background: url('@/components/img/button2.png') right -182px;
        span{
          background: url('@/components/img/button2.png') 0 -141px;
        }
      }
      span{
        display: block;
        width: 205px;
        height: 31px;
        color: #333333;
        font-weight: bold;
        background: url('@/components/img/button2.png') 0 -59px;
        line-height: 31px;
        text-align: center;
      }
    }

  }
}
</style>
