<template>
  <div class="right">
    <Top></Top>
    <MusicList></MusicList>
    <Comments></Comments>
  </div>
</template>

<script>
import Top from '@/components/findMusic/toplist/right/top/index.vue'
import MusicList from '@/components/findMusic/toplist/right/list/index.vue'
import Comments from '@/components/comment/index.vue'

export default {
  name: 'toplistRight',
  components: {
    Top,
    MusicList,
    Comments
  }
}
</script>

<style lang="less" scoped>
.right{
  width: 740px;
  background-color: #ffffff;
  border-left: 1px solid #d3d3d3;
  padding-bottom: 50px;
}
</style>
