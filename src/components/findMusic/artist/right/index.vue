<template>
  <div class="art_right">
    <ArtRegist v-if="isShow === undefined"></ArtRegist>
    <ArtRegist2 v-else-if="isShow == -1"></ArtRegist2>
    <ArtOther v-else></ArtOther>
  </div>
</template>

<script>
import ArtRegist from '@/components/findMusic/artist/right/regist/index.vue'
import ArtRegist2 from '@/components/findMusic/artist/right/regist2/index.vue'
import ArtOther from '@/components/findMusic/artist/right/other/index.vue'
export default {
  name: 'artistRight',
  components: {
    ArtRegist,
    ArtRegist2,
    ArtOther
  },
  computed: {
    isShow () {
      return this.$route.query.area
    }
  }
}
</script>

<style lang="less" scoped>
.art_right{
  float: right;
  width: 719px;
  padding: 40px;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
}
</style>
