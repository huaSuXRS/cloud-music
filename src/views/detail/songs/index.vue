<template>
  <div class="content">
    <HomeHeader></HomeHeader>
    <div class="content_rap">
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/findMusic/HomeHeader/index.vue'
import Left from '@/components/detail/songs/left/index.vue'
import Right from '@/components/detail/songs/right/index.vue'

export default {
  name: 'myDetail',
  components: {
    HomeHeader,
    Left,
    Right
  }
}
</script>

<style lang="less" scoped>
.content{
  width: 100%;
  min-height: 700px;
  background-color: rgb(245,245,245);
  .content_rap{
    width: 980px;
    min-height: 700px;
    margin: 0 auto;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    background-color: #fff;
  }
}
</style>
