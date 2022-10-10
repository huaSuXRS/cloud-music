<template>
  <!-- 用户已登录 -->
  <div class="login">
    <div class="header">
      <!-- 用户头像 -->
      <img :src="userInfo.url" alt="">
    </div>
    <div class="info">
      <h4><a class="name">{{userInfo.name}}</a></h4>
      <div class="grade">
        <a href="" class="g_state">{{userInfo.level}}<i class="g_left"></i></a>
      </div>
      <!-- 用户今日未签到 -->
      <button class="unsign">
        <span class="un_con">签到</span>
      </button>
      <!-- 用户今日已签到 -->
      <button class="sign" v-show="false">
        <span class="s_con">已签到</span>
      </button>
    </div>
    <ul class="details">
      <li class="d_con">
        <p class="num">{{userInfo.eventCount}}</p>
        <p class="title">动态</p>
      </li>
      <li class="sperator"></li>
      <li class="d_con">
        <p class="num">{{userInfo.follows}}</p>
        <p class="title">关注</p>
      </li>
      <li class="sperator"></li>
      <li class="d_con">
        <p class="num">{{userInfo.followeds}}</p>
        <p class="title">粉丝</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api/index.js'

export default {
  name: 'LMyInfo',
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async getUserInfo () {
      const { data: res } = await getUserInfoAPI(localStorage.getItem('USERID'), localStorage.getItem('COOKIE'))
      const obj = {}
      obj.id = res.userPoint.userId
      obj.level = res.level
      obj.url = res.profile.avatarUrl
      obj.followeds = res.profile.followeds
      obj.follows = res.profile.follows
      obj.eventCount = res.profile.eventCount
      obj.name = res.profile.nickname
      this.userInfo = obj
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (localStorage.getItem('COOKIE') != null) {
        this.getUserInfo()
      }
    })
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 250px;
  height: 165px;
  padding-top: 20px;
  background: url('@/components/img/index.png') 0 -270px;
  .header {
    float: left;
    width: 80px;
    height: 80px;
    margin-left: 20px;
    padding: 2px;
    background: #fff;
    border: 1px solid #dadada;
    img{
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .info {
    float: left;
    width: 115px;
    height: 90.2px;
    margin-left: 18px;
    padding-top: 3px;
    position: relative;
    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      .name {
        width: auto;
        max-width: 100%;
        vertical-align: middle;
        text-decoration: none;
        cursor: pointer;
        color: #333333;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .grade {
      width: 100%;
      margin-top: 5px;
      &:hover {
        .g_state {
          background: url('@/components/img/icon2.png') -130px -84px;
          .g_left {
            background: url('@/components/img/icon2.png') -192px -84px;
          }
        }
      }
      .g_state {
        display: block;
        width: 15px;
        height: 17px;
        overflow: hidden;
        padding-left: 25px;
        line-height: 18px;
        color: #999;
        font-weight: bold;
        font-style: italic;
        text-decoration: none;
        background: url('@/components/img/icon2.png') -130px -64px;
        .g_left {
          float: right;
          width: 8px;
          height: 17px;
          background: url('@/components/img/icon2.png') -192px -64px;
        }
      }
    }
    .sign,
    .unsign {
      width: 100px;
      height: 31px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      border: 0;
      padding-right: 5px;
      .un_con,
      .s_con {
        display: block;
        width: 60px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        padding: 0 15px 0 20px;
      }
    }
    .unsign {
      cursor: pointer;
      color: #ffffff;
      background: url('@/components/img/button2.png') right -428px;
      .un_con {
        background: url('@/components/img/button2.png') 0 -387px;
      }
      &:hover {
        background: url('@/components/img/button2.png') right -510px;
        .un_con {
          background: url('@/components/img/button2.png') 0 -469px;
        }
      }
    }
    .sign {
      color: #bebebe;
      background: url('@/components/img/button2.png') right -346px;
      .s_con {
        background: url('@/components/img/button2.png') 0 -305px;
      }
    }
  }
  .details {
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-top: 22px;
    padding: 0 25px;
    list-style: none;
    float: left;
    .d_con {
      width: 26px;
      height: 40px;
      color: #666666;
      cursor: pointer;
      &:hover{
        color: rgb(12,115,194);
      }
      .num {
        font-size: 20px;
      }
      .title {
        margin-left: 2px;
      }
    }
    .sperator {
      height: 40px;
      background-color: #e4e4e4;
      width: 1px;
    }
  }
}
</style>
