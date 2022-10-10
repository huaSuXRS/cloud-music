<template>
  <div class="right_content">
    <div class="top">
      <h3 class="t_header">相似歌曲</h3>
      <ul class="t_ul">
        <li class="t_li">
          <div class="t_name"></div>
          <div class="t_art"></div>
          <div class="t_ctrl">
            <a class="play"></a>
            <a class="add"></a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dSongsRight'
}
</script>

<style lang="less" scoped>
.right_content{
  width: 270px;
  padding: 20px 40px 40px 30px;
  .top{
    .t_header{
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
    }
  }
}
</style>
