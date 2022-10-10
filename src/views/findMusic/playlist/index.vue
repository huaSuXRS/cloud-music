<template>
  <div class="pl_cont">
    <div class="pl_wrap">
      <NoLogin v-if="!isLogin"></NoLogin>
      <div class="content" v-else-if="isLogin">
        <div class="top">
          <h3 class="t_title">{{cat}}</h3>
          <div class="t_type">
            <span class="t_span" @click.stop="isShowType = !isShowType">选择分类<i class="t_i"></i></span>

            <!-- 选择分类 -->
            <div class="type" v-if="isShowType">
              <div class="header"><i class="h_i"></i></div>
              <div class="t_content">
                <div class="c_header">
                  <a class="c_hd" @click.prevent="goCatList('全部')">全部风格</a>
                </div>
                <dl class="c_con" v-for="(item,index) in catList" :key="index">
                  <dt class="c_t">
                    <i class="t_i" :class="'t_i' + index"></i>{{item.name}}
                  </dt>
                  <dd class="c_d">
                    <div class="c_index" v-for="(arr,index2) in item.sub" :key="index2">
                      <a class="name" @click.prevent="goCatList(arr)" :class="{active: arr===cat}">{{arr}}</a>
                      <span class="sperator">|</span>
                    </div>
                  </dd>
                </dl>
              </div>
              <div class="c_footer"></div>
            </div>
          </div>
          <a class="t_hot">热门</a>
        </div>

        <!-- 中间主体内容 -->
        <ul class="center">
          <li class="c_li" v-for="(sheet,index) in playList" :key="index">
            <div class="c_top">
              <img class="c_cover" v-lazy="sheet.coverImgUrl">
              <div class="c_bg"></div>
              <div class="c_ctrl">
                <div class="c_i c_i1"></div>
                {{sheet.playCount>=10000?parseInt(sheet.playCount/10000)+'万':sheet.playCount}}
                <div class="c_i c_i2"  @click="play(sheet.id)" title="播放"></div>
              </div>
            </div>
            <a class="title">{{sheet.name}}</a>
            <a class="creator">by {{sheet.creator.nickname}}</a>
            <img class="c_icon" v-lazy="sheet.creator.avatarDetail.identityIconUrl" v-if="sheet.creator.avatarDetail != null">
          </li>
        </ul>

        <!-- 分页器 -->
        <Pagination :total="total" :pageNum="pageNum" :pageSize="pageSize" :btnCount="7" @getPageNum="getPageNum"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/index.vue'
import NoLogin from '@/components/n_login/index.vue'
import { getPlayListCatAPI, getCatListAPI, getPlayListAPI } from '@/api/index.js'
import bus from '@/utils/eventBus'

export default {
  name: 'findPlayList',
  components: {
    Pagination,
    NoLogin
  },
  data () {
    return {
      // 页面量
      pageSize: 35,
      // 当前页
      pageNum: 1,
      // 数据总量
      total: 0,
      // 主体中的数据
      playList: [],
      // 播放量
      playCount: '',
      isShowType: false,
      catList: []
    }
  },
  methods: {
    // 获取歌单列表
    async getCat () {
      const { data: res } = await getPlayListCatAPI(this.pageSize, 'hot', this.cat, (this.pageNum - 1) * this.pageSize)
      this.total = res.total
      this.playList = res.playlists
    },
    getPageNum (pageNum) {
      if (this.pageNum !== pageNum) {
        this.pageNum = pageNum
        this.getCat()
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    },
    // 获取全部歌单列表的名称
    async getCatList () {
      const { data: res } = await getCatListAPI()
      Object.values(res.categories).forEach(item => {
        const obj = { name: '', sub: [] }
        obj.name = item
        this.catList.push(obj)
      })
      res.sub.forEach(item => {
        this.catList[item.category].sub.push(item.name)
      })
    },
    // 切换分类
    goCatList (cat) {
      this.$router.push({
        path: '/findMusic/playlist',
        query: {
          cat
        }
      })
      // this.cat = cat
      this.pageNum = 1
      this.isShowType = false
      this.getCat()
    },
    // 播放歌单
    async play (id) {
      this.$store.dispatch('removeAllMusic')
      const { data: res } = await getPlayListAPI(id)
      const length = res.privileges.length
      const musicID = res.privileges[0].id
      let ids = ''
      res.privileges.forEach((item, index) => {
        if (index === length - 1) {
          ids += item.id
        } else {
          ids += item.id + ','
        }
      })
      this.$store.dispatch('setMusics', musicID)
      this.$store.dispatch('addMusicList', ids)
      setTimeout(() => {
        bus.$emit('play')
      }, 500)
    }
  },
  mounted () {
    this.getCat()
    this.getCatList()
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  computed: {
    cat () {
      if (this.$route.query.cat === undefined) return '全部'
      return this.$route.query.cat
    },
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
.pl_cont {
  width: 100%;
  min-height: 600px;
  background-color: rgb(245,245,245);
  .pl_wrap {
    width: 980px;
    min-height: 700px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    .content {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding: 40px;
      .top {
        width: 100%;
        height: 40px;
        border-bottom: 2px solid #c20c0c;
        .t_title {
          float: left;
          font-size: 24px;
          font-weight: normal;
        }
        .t_type {
          float: left;
          width: 86px;
          height: 31px;
          line-height: 31px;
          margin: 2px 0 0 12px;
          color: #333;
          padding: 0 5px 0 0;
          cursor: pointer;
          vertical-align: top;
          background: url('@/components/img/button2.png') right -100px;
          position: relative;
          &:hover {
            background-position: right -182px;
            .t_span {
              background-position: 0 -141px;
            }
          }
          .t_span {
            display: inline-block;
            width: 61px;
            height: 100%;
            color: #0c73c2 !important;
            padding: 0 10px 0 15px;
            background: url('@/components/img/button2.png') 0 -59px;
          }
          .t_i {
            display: inline-block;
            margin-left: 5px;
            width: 8px;
            height: 5px;
            background: url('@/components/img/icon.png') -70px -543px;
          }
          .type {
            width: 720px;
            height: 437px;
            position: absolute;
            top: 35px;
            left: -100px;
            z-index: 100;
            .header {
              width: 100%;
              height: 32px;
              background: url('@/views/findMusic/playlist/img/sltlyr.png') no-repeat;
              .h_i {
                position: absolute;
                top: 2px;
                left: 132px;
                display: inline-block;
                width: 24px;
                height: 11px;
                background: url('@/components/img/iconall.png') -48px 0;
                vertical-align: middle;
              }
            }
            .t_content {
              width: 700px;
              padding: 0 10px;
              background: url('@/views/findMusic/playlist/img/sltlyr.png') repeat-y -720px 0;
              .c_header {
                height: 37px;
                padding-left: 26px;
                border-bottom: 1px solid #e6e6e6;
                font-weight: normal;
                .c_hd {
                  display: inline-block;
                  width: 75px;
                  height: 26px;
                  background: url('@/components/img/button.png') 0 -64px;
                  text-align: center;
                  line-height: 26px;
                  cursor: pointer;
                  user-select: none;
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
              .c_con {
                width: 700px;
                .c_t {
                  float: left;
                  display: inline;
                  width: 70px;
                  margin: 0 -100px 0 26px;
                  padding-top: 15px;
                  border-right: 1px solid #e6e6e6;
                  font-weight: bold;
                  .t_i {
                    width: 23px;
                    height: 23px;
                    margin-right: 8px;
                    margin-bottom: 4px;
                    display: inline-block;
                    background: url('@/components/img/icon.png');
                    vertical-align: middle;
                  }
                  .t_i0 {
                    background-position: -20px -735px;
                  }
                  .t_i1 {
                    background-position: 0 -60px;
                  }
                  .t_i2 {
                    background-position: 0 -88px;
                  }
                  .t_i3 {
                    background-position: 0 -117px;
                  }
                  .t_i4 {
                    background-position: 0 -141px;
                  }
                }
                .c_d {
                  margin-left: 96px;
                  padding: 16px 15px 0 15px;
                  border-left: 1px solid #e6e6e6;
                  line-height: 24px;
                  .c_index {
                    display: inline-block;
                    .name {
                      cursor: pointer;
                      text-decoration: none;
                      &:hover {
                        text-decoration: underline;
                      }
                    }
                    .sperator {
                      margin: 0 8px 0 10px;
                      color: #d8d8d8;
                    }
                  }
                }
              }
              .c_con:after {
                clear: both;
                content: '.';
                display: block;
                height: 0;
                visibility: hidden;
              }
              .c_con:last-child {
                .c_d {
                  padding-bottom: 40px;
                }
              }
            }
            .c_footer {
              width: 720px;
              height: 20px;
              background: url('@/views/findMusic/playlist/img/sltlyr.png') -1440px -12px;
            }
          }
        }
        .t_hot {
          float: right;
          width: 46px;
          height: 29px;
          line-height: 29px;
          text-align: center;
          color: #fff;
          text-decoration: none;
          background: url('@/components/img/button.png') 0 0;
          border-radius: 3px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .center {
        width: 950px;
        margin: 30px 0 0 -50px;
        .c_li {
          display: inline-block;
          width: 140px;
          height: 188px;
          padding: 0 0 30px 50px;
          .c_top {
            width: 140px;
            height: 140px;
            position: relative;
            cursor: pointer;
          }
          .c_cover,
          .c_bg {
            position: absolute;
            top: 0px;
            height: 0px;
            width: 100%;
            height: 100%;
          }
          .c_bg {
            background: url('@/components/img/coverall.png') 0 0;
          }
          .c_ctrl {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 27px;
            background: url('@/components/img/coverall.png') 0 -537px;
            color: #ccc;
            line-height: 27px;
            .c_i {
              background: url('@/components/img/iconall.png');
            }
            .c_i1 {
              float: left;
              width: 14px;
              height: 11px;
              margin: 9px 5px 9px 10px;
              background-position: 0 -24px;
            }
            .c_i2 {
              float: right;
              margin-top: 5px;
              margin-right: 10px;
              width: 16px;
              height: 17px;
              background-position: 0 0;
            }
          }
          .title,
          .creator {
            display: inline-block;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            text-decoration: none;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .title {
            font-size: 14px;
            color: #000;
            margin: 8px 0 3px;
          }
          .creator {
            max-width: 120px;
            color: #666;
          }
          .c_icon {
            display: inline-block;
            height: 13px;
            width: 13px;
            margin-left: 3px;
            margin-top: 1px;
          }
        }
      }
    }
  }
}
.active{
  background: #a7a7a7;
  color: #fff;
  padding: 2px 6px;
}
</style>
