<template>
  <div class="map" v-on:mouseover="stopBanner" v-on:mouseout="starBanner">
    <!-- <img class="map-background" v-lazy="imgUrl"> -->
    <div class="map-wrap">
      <!-- 轮播图左侧上一页按钮 -->
      <div class="left" @click="beforeImg"></div>

      <!-- 轮播图 -->
      <div class="wrap-left">
        <!-- 轮播的图片 -->
        <transition name="fade">
          <img v-show="isShow" v-lazy="imgUrl" @click="goTo(imgList[imgItem].type,imgList[imgItem].id)">
        </transition>

        <!-- 轮播图下方的焦点 -->
        <ul>
          <li v-for="(index,item) in imgList" :key="item" @click="changeImg(index,item)" :class="{ active: item === imgItem }"></li>
        </ul>
      </div>

      <!-- 下载客户端 -->
      <div class="wrap-right">
        <div class="top" @click="toDownloadApp"></div>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
      </div>

      <!-- 轮播图右侧下一页按钮 -->
      <div class="right" @click="nextImg"></div>
    </div>

    <div class="map-background">
      <!-- <img class="bg" v-lazy="bgUrl"> -->
      <div :style="{backgroundImage:'url('+ bgUrl +')'}" class="bg"></div>
    </div>
  </div>
</template>

<script>
import { getBannerAPI } from '@/api/index.js'
import bus from '@/utils/eventBus'
export default {
  name: 'rotationMap',
  created () {
    this.getBanner()
    this.starBanner()
  },
  data () {
    return {
      // 用于存放获取的轮播图图片
      imgList: [],
      // 轮播图数量，用于生成焦点
      imgNum: 0,
      // 当前显示的图片的路径
      imgUrl: '',
      // 背景图片路径
      bgUrl: '',
      // 转存所点击的 li 的 index
      imgItem: 0,
      // 记录播放的计时器
      timer: function () {},
      isShow: true,
      // 转存imgItem
      itemNUm: 0
    }
  },
  methods: {
    async getBanner () {
      const { data: res } = await getBannerAPI()
      res.banners.forEach(item => {
        this.imgList.push({ url: item.imageUrl, id: item.targetId, type: item.targetType })
      })
      this.imgNum = this.imgList.length
      this.imgUrl = this.imgList[0].url
      this.bgUrl = this.imgList[0].url
    },
    toDownloadApp () {
      if (this.$route.path === '/downloadApp') { return }
      // 点击 “下载客户端” 时修改顶部导航栏 “下载客户端” 的样式
      bus.$emit('isVisible', 4)
      this.$router.push('/downloadApp')
    },
    changeImg (index, item) {
      this.imgItem = item
      // 点击相应焦点切换相应图片
      this.imgUrl = index.url
      setTimeout(() => {
        this.bgUrl = this.imgUrl
      }, 20)
    },
    beforeImg () {
      this.imgItem--
      if (this.imgItem === -1) {
        this.imgItem = this.imgList.length - 1
      }
      this.imgUrl = this.imgList[this.imgItem].url
      setTimeout(() => {
        this.bgUrl = this.imgUrl
      }, 20)
    },
    nextImg () {
      this.imgItem++
      if (this.imgItem === this.imgList.length) {
        this.imgItem = 0
      }
      this.imgUrl = this.imgList[this.imgItem].url
      setTimeout(() => {
        this.bgUrl = this.imgUrl
      }, 1)
    },
    // 播放图片
    starBanner () {
      this.timer = setInterval(() => {
        this.isShow = false
        this.itemNUm = this.imgItem
        this.imgItem = -2
        setTimeout(() => {
          this.isShow = true
          this.imgItem = this.itemNUm
          this.imgItem++
          if (this.imgItem === this.imgList.length) {
            this.imgItem = 0
          }
          setTimeout(() => {
            this.imgUrl = this.imgList[this.imgItem].url
          }, 1)
          setTimeout(() => {
            this.bgUrl = this.imgUrl
          }, 2)
        }, 1700)
      }, 4000)
    },
    // 暂停轮播
    stopBanner () {
      clearInterval(this.timer)
    },
    goTo (type, id) {
      // let path
      // if (type === 1) path = '/song'
      // else if (type === 10) path = '/album'
      // this.$router.push({
      //   path,
      //   query: {
      //     id
      //   }
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.map{
  width: 100%;
  height: 285px;
  position: relative;
  .map-wrap{
    width: 982px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .wrap-left{
      width: 730px;
      height: 100%;
      float: left;
      position: relative;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
      ul{
        position: absolute;
        top: 259px;
        left: 50%;
        margin-left: -115px;
        list-style: none;
        li{
          width: 23px;
          height: 23px;
          float: left;
          background-position: 2.5px -343px;
          cursor: pointer;
          background-image: url('@/components/img/banner.png');
          &:hover{
            background-image: url('@/components/img/banner.png');
            background-position: 23.5px -343px;
          }
        }
        li.active{
          background-image: url('@/components/img/banner.png');
          background-position: 23.5px -343px;
        }
      }
      .fade-enter-active{
        animation:fadeImg 1.7s;
      }
      .fade-leave-to{
         animation:fadeImg 1.7s reverse;
      }
      @keyframes fadeImg {
        from{
           opacity: 0.5;
        }
        to{
          opacity: 1;
        }
      }
    }
    .wrap-right{
      width: 252px;
      height: 100%;
      float: right;
      background-image: url('@/components/img/download.png');
      .top{
        width: 215px;
        height: 56px;
        margin: 186px 0 0 19px;
        background-image: url('@/components/img/download.png');
        background-position: 1px 63px;
        cursor: pointer;
      }
      p{
        display: block;
        width: 100%;
        height: 16px;
        color: #8d8d8d;
        font-size: 12px;
        margin: 10px 0;
        text-align: center;
      }

    }
    .left,.right{
      width: 37px;
      height: 63px;
      position: absolute;
      top: 50%;
      margin-top:-31.5px;
      background-image: url('@/components/img/banner.png');
    }
    .left{
      left: -68px;
      background-position: 0 -359px;
      &:hover{
        background-position: 0 -430px;
      }
    }
    .right{
      right: -68px;
      background-position: 0 -506px;
      &:hover{
        background-position: 0 -578px;
      }
    }
  }
  .map-background{
    width: 100%;
    height: 285px;
    position: absolute;
    top: 0px;
    z-index: -9999;
     .bg{
      width: 100%;
      height: 100%;
      background: no-repeat;
      background-position: center center;
      background-size: 4000px;
      -webkit-filter: blur(30px); /* Chrome, Opera */
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);
      filter: blur(45px);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
</style>
