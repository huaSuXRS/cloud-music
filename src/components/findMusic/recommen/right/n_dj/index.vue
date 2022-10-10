<template>
  <div class="content_wrap">
    <div class="header">
      <h3>热门主播</h3>
    </div>
    <ul class="content">
      <li v-for="item in djList" :key="item.id">
        <a href="" class="cover"><img v-lazy="item.cover"></a>
        <div class="info">
          <a href="" class="name">{{item.name}}</a>
          <span class="state">{{item.score}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHotDjAPI } from '@/api/index.js'
export default {
  name: 'hotDj',
  data () {
    return {
      djList: []
    }
  },
  methods: {
    async initDjs () {
      const { data: res } = await getHotDjAPI(5)
      res.data.list.forEach((item) => {
        const obj = {}
        obj.id = item.id
        obj.name = item.nickName
        obj.cover = item.avatarUrl
        obj.score = parseInt(item.score / 10000) + '万'
        this.djList.push(obj)
      })
      // console.log(res)
    }
  },
  mounted () {
    this.initDjs()
  }
}
</script>

<style lang="less" scoped>
.content_wrap{
  width: 250px;
  height: 294px;
  margin-top: 30px;
  .header{
    width: 210px;
    height: 23px;
    margin: 0 20px;
    border-bottom: 1px solid #ccc;
    h3{
      color: #333333;
    }
  }
  .content{
    width: 230px;
    height: 250px;
    margin: 20px 0 0 20px;
    list-style: none;
    li{
      width: 210px;
      height: 50px;
      .cover{
        display: block;
        float: left;
        width: 40px;
        height: 40px;
        box-shadow: 0 0 1px #333333 inset;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        float: left;
        width: 160px;
        height: 43px;
        .name,.state{
          display: block;
          width: 160px;
          height: 22px;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          color: #666666;
        }
        .name{
          color: #000000;
          text-decoration: none;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
