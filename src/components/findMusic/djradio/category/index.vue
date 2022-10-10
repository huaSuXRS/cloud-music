<template>
  <div class="cate_content">
    <div class="cate">
      <ul class="c_ul">
        <li class="c_li" v-for="category in categoryList" :key="category.id">
          <div class="li_con" @click="chooseCategory(category.id)" :class="{active: isActive == category.id}">
            <div class="l_icon" :style="`background:url(${category.picWebUrl})`"></div>
            <p class="l_name">{{category.name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="left"></div>
    <div class="rigth"></div> -->
  </div>
</template>

<script>
import { getCateList } from '@/api/index.js'

export default {
  name: 'djCategory',
  data () {
    return {
      categoryList: []
      // isActive: -1
    }
  },
  methods: {
    // 获取category数据
    async getCategory () {
      const { data: res } = await getCateList()
      this.categoryList = res.categories.slice(0, 18)
      // console.log(this.categoryList)
    },
    // 更换选择目标
    chooseCategory (id) {
      if (this.isActive !== id) {
        this.isActive = id
        this.$router.push({
          path: `${this.$route.path}`,
          query: {
            id: `${id}`
          }
        })
      }
    }
  },
  mounted () {
    this.getCategory()
  },
  computed: {
    isActive () {
      if (this.$route.query.id === undefined) return -1
      return this.$route.query.id
    }
  }
}
</script>

<style lang="less" scoped>
.cate_content {
  width: 100%;
  height: 194px;
  margin-bottom: 20px;
  position: relative;
  .cate {
    width: 100%;
    height: 100%;
    .c_ul {
      width: 933px;
      height: 100%;
      margin-left: -33px;
      list-style: none;
      .c_li {
        width: 70px;
        height: 72px;
        float: left;
        margin: 0 0 25px 33px;
        cursor: pointer;
        .li_con {
          width: 70px;
          height: 70px;
          text-align: center;
          color: #888;
          .l_icon {
            width: 48px;
            height: 48px;
            margin: 2px auto 0;
            background-position: 0 0;
          }
        }
      }
    }
  }
  .left,
  .rigth {
    width: 20px;
    height: 30px;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    cursor: pointer;
    opacity: 0.25;
    background: url('@/components/findMusic/djradio/img/radio.png');
  }
  .left {
    left: -26px;
    background-position: 0 -30px;
  }
  .rigth {
    right: -26px;
    background-position: -30px -30px;
  }
}
.active {
  background: url('@/components/findMusic/djradio/img/radio_bg.png') -70px 0;

  .l_icon {
    background-position: -48px 0 !important;
  }
  .l_name {
    color: #d35757;
  }
}
</style>
