<template>
  <div>
    <HomeHeader></HomeHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeHeader from '@/components/findMusic/HomeHeader/index.vue'
export default {
  name: 'findMusic',
  components: {
    HomeHeader
  }
}
</script>

<style lang="less" scoped>

</style>
