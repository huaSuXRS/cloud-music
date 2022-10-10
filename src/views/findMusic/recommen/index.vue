<template>
  <div>
    <RotationMap></RotationMap>
    <div class="contain">
      <div class="wrap">
        <div class="contain-left">
          <HotRecommen></HotRecommen>
          <!-- <PersonRecommen></PersonRecommen> -->
          <NewAlbum></NewAlbum>
          <Bill v-if="isLogin"></Bill>
        </div>
        <div class="contain-right">
          <!-- 未登录 -->
          <NMyinfo v-if="!isLogin"></NMyinfo>
          <!-- 已登录 -->
          <LMyinfo v-else-if="isLogin"></LMyinfo>
          <Singer></Singer>
          <Dj></Dj>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RotationMap from '@/components/findMusic/recommen/rotationMap/index.vue'
import HotRecommen from '@/components/findMusic/recommen/hot/index.vue'
// import PersonRecommen from '@/components/findMusic/recommen/personalize/index.vue'
import NewAlbum from '@/components/findMusic/recommen/newAlbum/index.vue'
import Bill from '@/components/findMusic/recommen/bill/index.vue'
import NMyinfo from '@/components/findMusic/recommen/right/n_myinfo/index.vue'
import LMyinfo from '@/components/findMusic/recommen/right/l_myinfo/index.vue'
import Singer from '@/components/findMusic/recommen/right/n_singer/index.vue'
import Dj from '@/components/findMusic/recommen/right/n_dj/index.vue'

export default {
  name: 'findRecommen',
  components: {
    RotationMap,
    HotRecommen,
    // PersonRecommen,
    NewAlbum,
    Bill,
    NMyinfo,
    LMyinfo,
    Singer,
    Dj
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
.contain{
  width: 100%;
  min-height: 950px;
  background-color: rgb(245,245,245);
  .wrap{
    width: 981px;
    margin: 0 auto;
    background-color: white;
    .contain-left{
      box-sizing: border-box;
      width: 729px;
      min-height: 950px;
      padding: 20px 20px 40px;
      float: left;
      background-color: white;
      border: 1.5px solid rgb(216,216,216);
      border-bottom: 0px;
    }
    .contain-right{
      width: 250px;
      float: right;
      min-height: 950px;
      // height: 1393px;
      background-color: white;
      border-right: 1.5px solid rgb(216,216,216);
    }
  }
}
</style>
