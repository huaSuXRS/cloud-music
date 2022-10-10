<template>
  <div class="n_login bg">
    <div class="btn bg" @click="enter"></div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'
export default {
  name: 'noLogin',
  methods: {
    enter () {
      // 显示登录弹框
      bus.$emit('loginFrame')
    }
  }
}
</script>

<style lang="less" scoped>
.n_login{
  width: 807px;
  height: 268px;
  margin: 0 auto 0;
  padding-top: 104px;
  .btn{
    display: block;
    width: 167px;
    height: 45px;
    margin: 202px 0 0 482px;
    text-indent: 100px;
    &:hover{
      cursor: pointer;
    }
  }
}
.bg{
  background: url('@/components/img/mymusic.png') no-repeat 0 9999px;
  background-size: 100%;
  background-position: 0 104px;
}
</style>
