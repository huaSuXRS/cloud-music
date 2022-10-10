<template>
  <div class="art_left">
    <div class="art_wrap">
      <div class="recommend">
        <h3 class="title">推荐</h3>
        <ul class="ul">
          <li class="li" v-for="item,index in recommendList" :key="index">
            <a class="name" :class="{active: item.type==type&&item.area==area}" @click="changeArtist(item.area,item.type)">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="other" v-for="artist in artList" :key="artist.area">
        <h3 class="title">{{artist.name}}</h3>
        <ul class="ul">
          <li class="li" v-for="item,index in artist.typeName" :key="index">
            <a class="name" :class="{active: index+1==type&&artist.area==area}" @click="changeArtist(artist.area,index+1)">{{artist.name}}{{item}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'artistLeft',
  data () {
    return {
      // 推荐歌手分类
      recommendList: [
        {
          name: '推荐歌手',
          area: undefined,
          type: undefined
        },
        {
          name: '入驻歌手',
          area: -1,
          type: -1
        }
      ],
      // 歌手分类
      artList: [
        {
          name: '华语',
          area: 7,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        },
        {
          name: '欧美',
          area: 96,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        },
        {
          name: '日本',
          area: 8,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        },
        {
          name: '韩国',
          area: 16,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        },
        {
          name: '其他',
          area: 0,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        }
      ]
    }
  },
  methods: {
    changeArtist (area, type) {
      const a = parseInt(this.area)
      const b = parseInt(this.type)
      if (a !== area || b !== type) {
        this.$router.push({
          path: '/findMusic/artist',
          query: {
            area,
            type
          }
        })
      }
    }
  },
  computed: {
    area () {
      return this.$route.query.area
    },
    type () {
      return this.$route.query.type
    }
  }
}
</script>

<style lang="less" scoped>
.art_left {
  width: 180px;
  float: left;
  background-color: rgb(249, 249, 249);
  .art_wrap {
    margin-top: 51px;
    padding: 0 10px 40px;
    .recommend {
      width: 100%;
    }
    .other {
      margin: 5px 0 0;
      padding-top: 16px;
      border-top: 1px solid #d3d3d3;
    }
  }
}
.title {
  height: 25px;
  padding-left: 14px;
  font-size: 16px;
  font-family: 'Microsoft Yahei';
}
.ul {
  list-style: none;
  .li {
    margin-bottom: 2px;
    width: 160px;
    height: 29px;
    line-height: 29px;
    .name {
      display: block;
      width: 133px;
      height: 29px;
      line-height: 29px;
      padding-left: 27px;
      color: #333;
      cursor: pointer;
      background: url('@/components/findMusic/artist/img/singer.png') 0 -30px;
      &:hover {
        text-decoration: underline;
      }
    }
    .active {
      background-position: 0 0;
      text-decoration: none;
      color: #c20c0c;
      background: url('@/components/findMusic/artist/img/singer.png') 0 0;
    }
  }
}
</style>
