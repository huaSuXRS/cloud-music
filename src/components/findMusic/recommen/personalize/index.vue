<template>
  <div class="content-wrap">
    <div class="header">
      <div class="header-logo"></div>
      <div class="header-title">
        <span>个性化推荐</span>
      </div>

      <div class="header-more">
        <span class="more">更多</span>
        <div class="bg"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personRecommen'
}
</script>

<style lang="less" scoped>
.content-wrap{
  width: 689px;
  height: 350px;
  .header {
    width: 679px;
    height: 33px;
    padding-right: 10px;
    border-bottom: 2px solid #c10d0c;
    .header-logo {
      width: 34px;
      height: 33px;
      background-image: url('@/components/img/index.png');
      background-position: -225px -157px;
      float: left;
    }
    .header-title {
      height: 28px;
      float: left;
      span {
        font-size: 20px;
      }
    }
    .header-more {
      width: 43px;
      height: 16px;
      margin: 9px 0px 0px;
      float: right;
      .more {
        color: #666666;
      }
      .bg {
        width: 15px;
        height: 14px;
        margin-left: 4px;
        float: right;
        background-image: url('@/components/img/index.png');
        background-position: 0px -236px;
      }
    }
  }
}
</style>
