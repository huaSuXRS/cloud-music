<template>
  <div class="t_contral">
    <a class="t_btn play" @click="play"><span class="b_btn"><i class="t_icon"></i>播放</span></a>
    <a class="t_btn add" @click="add"></a>
    <a class="t_btn collect br"><span class="b_span">收藏</span></a>
    <a class="t_btn share br"><span class="b_span">分享</span></a>
    <a class="t_btn download br"><span class="b_span">下载</span></a>
    <a class="t_btn comment br"><span class="b_span">评论</span></a>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'
export default {
  name: 'musicContrller',
  props: ['id'],
  methods: {
    play () {
      this.activeID = this.id
      // 把id传入vuex仓库的setMusic函数
      this.$store.dispatch('setMusics', this.id)
      // 把音乐id传入vuex本地仓库
      this.$store.dispatch('addMusicList', this.id)
      setTimeout(() => {
        bus.$emit('play')
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.t_contral {
  width: 100%;
  height: 31px;
  .t_btn {
    float: left;
    display: block;
    height: 31px;
    padding-right: 5px;
    margin-right: 5px;
    cursor: pointer;
    background: url('@/components/img/button2.png');
    .b_btn {
      height: 31px;
      line-height: 31px;
      background: url('@/components/img/button2.png');
      .t_icon {
        background: url('@/components/img/button2.png');
        float: left;
      }
    }
  }
  .play {
    width: 61px;
    margin-right: 0px;
    background-position: right -428px;
    .b_btn {
      display: block;
      padding: 0 7px 0 8px;
      background-position: 0 -387px;
      color: #fff;
      .t_icon {
        width: 20px;
        height: 18px;
        margin: 6px 2px 2px 0;
        background-position: 0 -1622px;
      }
    }
  }
  .add {
    width: 31px;
    margin-left: -3px;
    background-position: 0 -1588px;
  }
  .br {
    background-position: right -1020px;
    .b_span {
      display: block;
      background: url('@/components/img/button2.png');
      height: 31px;
      padding-right: 2px;
      padding-left: 28px;
      line-height: 31px;
      color: #333;
      min-width: 23px;
      font-family: simsun, \5b8b\4f53;
    }
  }
  .collect {
    .b_span {
      background-position: 0 -977px;
    }
  }
  .share {
    .b_span {
      background-position: 0 -1225px;
    }
  }
  .download {
    .b_span {
      background-position: 0 -2761px;
    }
  }
  .comment {
    .b_span {
      background-position: 0 -1465px;
    }
  }
}
</style>
