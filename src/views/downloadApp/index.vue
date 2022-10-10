<template>
  <div class="container">
    <NoLogin v-if="!isLogin"></NoLogin>
  </div>
</template>

<script>
import NoLogin from '@/components/n_login/index.vue'
export default {
  name: 'myMusic',
  components: {
    NoLogin
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
.container{
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
}
</style>
