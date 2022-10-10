<template>
  <div class="top" ref="top" @click="goTop">

  </div>
</template>

<script>

export default {
  name: 'myTop',
  computed: {
    top () {
      return {
        timer: null
      }
    }
  },
  methods: {
    handleScrollx () {
      if (window.pageYOffset > 0) {
        this.$refs.top.style.display = 'block'
      } else {
        this.$refs.top.style.display = 'none'
      }
    },
    goTop () {
      cancelAnimationFrame(this.timer)
      const length = window.pageYOffset
      const self = this
      self.timer = requestAnimationFrame(function fn () {
        const oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = oTop - length / 10
          self.timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(self.timer)
        }
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrollx, true)
  }
}
</script>

<style lang="less" scoped>
html{
  position: relative;
  .top{
    position: absolute;
    position: fixed;
    display: none;
    bottom: 139px;
    left: 50%;
    margin-left: 520px;
    width: 49px;
    height: 44px;
    background-image: url('@/components/img/sprite.png');
    background-position: -265px -47px;
    &:hover{
      cursor: pointer;
      background-position: -325px -47px;
    }
  }
}
</style>
