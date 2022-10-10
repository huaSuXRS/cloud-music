<template>
  <div class="header-wrap">
    <div class="wrap">
      <ul class="nav">
        <li>
          <router-link to="/findMusic/recommen" @click.native="isActive=1"><span :class="{ active: isActive === 1}">推荐</span></router-link>
        </li>
        <li>
          <router-link to="/findMusic/toplist" @click.native="isActive=2"><span :class="{ active: isActive === 2}">排行榜</span></router-link>
        </li>
        <li>
          <router-link to="/findMusic/playlist" @click.native="isActive=3"><span :class="{ active: isActive === 3}">歌单</span></router-link>
        </li>
        <li>
          <router-link to="/findMusic/djradio" @click.native="isActive=4"><span :class="{ active: isActive === 4}">主播电台</span></router-link>
        </li>
        <li>
          <router-link to="/findMusic/artist" @click.native="isActive=5"><span :class="{ active: isActive === 5}">歌手</span></router-link>
        </li>
        <li>
          <router-link to="/findMusic/album" @click.native="isActive=6"><span :class="{ active: isActive === 6}">新碟上架</span></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeHeader',
  data () {
    return {
      isActive: 1
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  },
  watch: {
    path () {
      console.log('watch')
      if (this.path.indexOf('/findMusic/recommen') !== -1) this.isActive = 1
      else if (this.path.indexOf('/findMusic/toplist') !== -1) this.isActive = 2
      else if (this.path.indexOf('/findMusic/playlist') !== -1) this.isActive = 3
      else if (this.path.indexOf('/findMusic/djradio') !== -1) this.isActive = 4
      else if (this.path.indexOf('/findMusic/artist') !== -1) this.isActive = 5
      else if (this.path.indexOf('/findMusic/album') !== -1) this.isActive = 6
      else this.isActive = 0
    }
  },
  mounted () {
    const path = this.$route.path
    if (path.indexOf('/findMusic/recommen') !== -1) this.isActive = 1
    else if (path.indexOf('/findMusic/toplist') !== -1) this.isActive = 2
    else if (path.indexOf('/findMusic/playlist') !== -1) this.isActive = 3
    else if (path.indexOf('/findMusic/djradio') !== -1) this.isActive = 4
    else if (path.indexOf('/findMusic/artist') !== -1) this.isActive = 5
    else if (path.indexOf('/findMusic/album') !== -1) this.isActive = 6
    else this.isActive = 0
  }
}
</script>

<style lang='less' scoped>
.header-wrap {
  width: 100%;
  height: 34px;
  background-color: rgb(194, 12, 12);
  .wrap {
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    .nav {
      width: 744px;
      height: 100%;
      padding: 0 0 0 180px;
      list-style: none;
      li {
        height: 100%;
        float: left;
        cursor: pointer;
        a {
          text-decoration: none;
          span {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 20px;
            margin: 7px 17px 0;
            padding: 0 13px;
            color: rgb(255, 255, 255);
            font-size: 12px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
.active {
  background-color: rgb(155, 9, 9);
}
</style>
