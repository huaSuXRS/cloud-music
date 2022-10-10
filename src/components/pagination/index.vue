<template>
  <div class="page_cont">
    <div class="page_wrap">
      <button :disabled="pageNum === 1" @click="$emit('getPageNum', pageNum - 1)" class="change pre" :class="{move1: pageNum === 1}">上一页</button>
      <button @click="$emit('getPageNum', 1)" class="btn" :class="{active: pageNum === 1}">1</button>
      <span v-show="centerBtn.star > 1">...</span>
      <!-- 中间按钮部分 -->
      <button v-for="page in centerBtn.end-1" :key="page" v-show="page >= centerBtn.star-1" @click="$emit('getPageNum', page + 1 )" class="btn" :class="{active: pageNum === page+1}">{{page+1}}</button>
      <span v-show="centerBtn.end < totalPage - 1 ">...</span>
      <button v-show="centerBtn.end < totalPage" @click="$emit('getPageNum', totalPage)" class="btn" :class="{active: pageNum === totalPage}">{{totalPage}}</button>
      <button :disabled="pageNum === totalPage" @click="$emit('getPageNum', pageNum + 1)" class="change next" :class="{move2: pageNum === totalPage}">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myPagination',
  props: ['total', 'pageSize', 'btnCount', 'pageNum'],
  computed: {
    // 总页数
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    },
    // 中间的按钮
    centerBtn () {
      let star = Math.max(1, this.pageNum - Math.floor(this.btnCount / 2))
      let end = Math.min(this.totalPage, this.pageNum + Math.floor(this.btnCount / 2))
      if (star === 1 && this.totalPage >= 9) end = 8
      if (end === this.totalPage) star = this.totalPage - 7
      return { star, end }
    },
    id () {
      if (this.$route.query.id === undefined) return '19723756'
      return this.$route.query.id
    }
  }
}
</script>

<style lang="less" scoped>
.page_cont {
  width: 100%;
  height: 26px;
  margin: 20px 0;
  text-align: center;
  line-height: 26px;
  .page_wrap {
    width: 670px;
    height: 100%;
    margin: 0 auto;

    .change {
      width: 71px;
      height: 26px;
      line-height: 26px;
      color: #333;
      margin: 0 1px 0 2px;
      border: 1px solid #ccc;
      border-radius: 2px;
      background: url('@/components/img/button.png');
      cursor: pointer;
    }
    .pre {
      padding-left: 11px;
      background-position: 0 -560px;
      &:hover {
        background-position: 0 -590px;
      }
    }
    .next {
      padding-right: 11px;
      background-position: -75px -560px;
      &:hover {
        background-position: -75px -590px;
      }
    }
    .btn {
      height: 24px;
      padding: 0 8px;
      background-color: #fff;
      line-height: 24px;
      margin: -1px 1px 0 2px;
      border: 1px solid #ccc;
      border-radius: 2px;
      vertical-align: middle;
      cursor: pointer;
      &:hover {
        border: 1px solid #000;
      }
    }
  }
}
.move1,
.move2 {
  color: #cacaca !important;
  cursor: default !important;
}
.move1 {
  background-position: 0 -620px !important;
}
.move2 {
  background-position: -75px -620px !important;
}
.active {
  background: url('@/components/img/button.png') 0 -650px !important;
  cursor: default !important;
  color: #fff;
}
</style>
