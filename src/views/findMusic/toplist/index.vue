<template>
  <div class="toplist">
    <div class="toplist_wrap">
      <NoLogin v-if="!isLogin"></NoLogin>
      <Left  v-if="isLogin"></Left>
      <Right  v-if="isLogin"></Right>
    </div>
  </div>
</template>

<script>
import NoLogin from '@/components/n_login/index.vue'
import Left from '@/components/findMusic/toplist/left/index.vue'
import Right from '@/components/findMusic/toplist/right/index.vue'
export default {
  name: 'findPlayList',
  components: {
    NoLogin,
    Left,
    Right
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  computed: {
    isLogin () {
      if (localStorage.getItem('COOKIE') != null) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.toplist{
  width: 100%;
  min-height: 700px;
  background: #f5f5f5;
  .toplist_wrap{
    width: 980px;
    min-height: 700px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    display: flex;
  }
}
</style>
