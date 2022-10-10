<template>
  <!-- 用户未登录 -->
  <div class="unlogin">
    <p class="note">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
    <button class="btn" @click="enter">用户登录</button>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'
export default {
  name: 'myInfo',
  methods: {
    enter () {
      // 显示登录弹框
      bus.$emit('loginFrame')
    }
  }
}
</script>

<style lang="less" scoped>
.unlogin {
  width: 250px;
  height: 126px;
  background: url('@/components/img/index.png') 0 0;
  .note {
    width: 205px;
    margin: 0 auto;
    padding: 16px 0;
    line-height: 22px;
    color: #666666;
  }
  .btn {
    display: block;
    width: 100px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 1px 0 #8a060b;
    border: 0px;
    margin: 0 75px;
    background: url('@/components/img/index.png') 0 -195px;
    cursor: pointer;
    &:hover{
      background-position: -110px -195px;
    }
  }
}
</style>
