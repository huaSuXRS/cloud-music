<template>
  <div class="artist">
    <div class="artist_con">
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Left from '@/components/findMusic/artist/left/index.vue'
import Right from '@/components/findMusic/artist/right/index.vue'
export default {
  name: 'findPlayList',
  components: {
    Left,
    Right
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="less" scoped>
.artist{
  width: 100%;
  background-color: rgb(245,245,245);
  .artist_con{
    width: 980px;
    min-height: 700px;
    margin: 0 auto;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    background-color: rgb(249, 249, 249);
  }
  .artist_con:after {
    clear: both;
    content: ' ';
    display: block;
    height: 0;
    visibility: hidden;
  }
}
</style>
