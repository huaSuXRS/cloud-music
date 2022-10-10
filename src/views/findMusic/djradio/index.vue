<template>
  <div class="dj_content">
    <div class="dj_wrap">
      <Category></Category>
      <div v-if="isShowMore">
        <DjTop></DjTop>
        <Djmore></Djmore>
      </div>
      <div v-else>
        <NewRadio></NewRadio>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@/components/findMusic/djradio/category/index.vue'
import DjTop from '@/components/findMusic/djradio/djtop/index.vue'
import Djmore from '@/components/findMusic/djradio/djmore/index.vue'
import NewRadio from '@/components/findMusic/djradio/newradio/index.vue'

export default {
  name: 'findPlayList',
  components: { Category, DjTop, Djmore, NewRadio },
  computed: {
    isShowMore () {
      if (this.$route.query.id === undefined) return true
      return false
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="less" scoped>
.dj_content{
width: 100%;
background: #f5f5f5;
.dj_wrap{
  width: 900px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    padding: 40px;
}
}
</style>
