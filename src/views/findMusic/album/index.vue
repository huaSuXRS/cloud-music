<template>
  <div class="album">
    <div class="album_wrap">
      <Top></Top>
      <Bottom></Bottom>
    </div>
  </div>
</template>

<script>
import Top from '@/components/findMusic/album/top/index.vue'
import Bottom from '@/components/findMusic/album/bottom/index.vue'
export default {
  name: 'findPlayList',
  components: {
    Top,
    Bottom
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="less" scoped>
.album{
  width: 100%;
  background-color: rgb(245,245,245);
  .album_wrap{
    width: 900px;
    min-height: 700px;
    padding: 40px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
  }
}
</style>
