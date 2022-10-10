<template>
  <div class="com_content">
    <div class="top">
      <span class="t_title">评论</span>
      <div class="t_num">共{{total}}条评论</div>
    </div>
    <div class="center">
      <img class="c_header" :src="cover">
      <div class="c_rigth">
        <textarea maxlength="140" class="c_text" placeholder="评论" onfocus="this.placeholder=''" @click.prevent="loginFrame" onblur="this.placeholder='评论'" ref="comment" v-model="commentText"></textarea>
        <div class="c_ctrl">
          <div class="c_i c_i1"></div>
          <div class="c_i c_i2"></div>
          <div class="c_i c_i4" @click.prevent="loginFrame">评论</div>
          <div class="c_i c_i3">{{textLenght1}}</div>
        </div>
        <div class="c_i5">&lt;</div>
      </div>
    </div>
    <div class="bottom">
      <h3 class="b_header">最新评论{{total}}</h3>
      <div class="b_com" v-for="com,index in comList" :key="index">
        <img class="b_h" v-lazy="com.user.avatarUrl">
        <div class="b_rigth">
          <div class="b_top"><span class="nickname">{{com.user.nickname}}</span> ：{{com.content}}</div>
          <div class="b_reply" v-if="com.beReplied[0]">
            <span class="nicn">{{com.beReplied[0].user.nickname}}</span> ：{{com.beReplied[0].content}}
          </div>
          <div class="b_bottom">
            <span class="b_data">{{com.timeStr}}</span>
            <div class="b_r">
              <div class="b_agree">
                <span class="b_i" @click.prevent="loginFrame"></span>
                <span v-if="com.likedCount !== 0">({{com.likedCount}})</span>
              </div>
              <span class="sperator">|</span>
              <span class="b_r" @click.prevent="reply(index,com.user.nickname)">回复</span>
            </div>
          </div>
        </div>

        <div class="reply" v-if="index === showReply && isShowReply">
          <div class="r_icon">
            <em class="r_i r_i1">◆</em>
            <em class="r_i r_i2">◆</em>
          </div>
          <div class="r_cont">
            <textarea maxlength="140" class="r_text" v-model="replyText" ref="replay"></textarea>
            <div class="c_ctrl">
              <div class="c_i c_i1"></div>
              <div class="c_i c_i2"></div>
              <div class="c_i c_i4" @click.prevent="loginFrame">回复</div>
              <div class="c_i c_i3">{{textLenght2}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loading" v-if="comList === null">
      <div class="l_cont">
        <span class="l_icon"></span>加载中
      </div>
    </div>
    <Pagination :total="total" :pageNum="pageNum" :pageSize="pageSize" :btnCount="7" @getPageNum="getPageNum"></Pagination>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'
import Pagination from '@/components/pagination/index.vue'
import { getPlayListCommentAPI, getMusicCommentAPI } from '@/api/index.js'
export default {
  name: 'toplistComment',
  components: {
    Pagination
  },
  data () {
    return {
      cover: 'https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50',
      // 评论内容
      comList: [],
      // 评论总数
      total: 0,
      replyText: '',
      commentText: '',
      showReply: -1,
      isShowReply: false,
      isLogin: false,
      pageSize: 20,
      pageNum: 1
    }
  },
  methods: {
    // 判断用户是否登录，如果未登录则弹出登录框
    loginFrame () {
      if (!this.isLogin) {
        this.$refs.comment.onblur()
        bus.$emit('loginFrame')
      }
    },
    // 获取歌单评论
    async getPlayListComment () {
      const { data: res } = await getPlayListCommentAPI(this.id, this.pageSize, (this.pageNum - 1) * this.pageSize)
      this.total = res.total
      this.comList = res.comments
    },
    // 获取歌曲评论
    async getSongComment () {
      const { data: res } = await getMusicCommentAPI(this.id, this.pageSize, (this.pageNum - 1) * this.pageSize)
      this.total = res.total
      this.comList = res.comments
    },
    reply (showReply, nickname) {
      if (this.showReply === showReply) {
        this.isShowReply = !this.isShowReply
      } else {
        this.isShowReply = true
      }
      if (this.isShowReply) {
        this.showReply = showReply
        this.replyText = '回复' + nickname + '：'
      }
    },
    getPageNum (pageNum) {
      if (this.pageNum !== pageNum) {
        this.pageNum = pageNum
        this.getType()
      }
    },
    getType () {
      if (this.type === '/songs') {
        this.getSongComment()
      }
    }
  },
  mounted () {
    this.getType()
    if (localStorage.getItem('COOKIE') !== null) {
      this.isLogin = true
      setTimeout(() => {
        this.cover = this.$store.state.login.userInfo.profile.avatarUrl
      }, 500)
    } else {
      this.isLogin = false
    }
  },
  computed: {
    type () {
      return this.$route.path
    },
    id () {
      if (this.$route.query.id === undefined) return '19723756'
      return this.$route.query.id
    },
    textLenght1 () {
      return 140 - this.commentText.length
    },
    textLenght2 () {
      return 140 - this.replyText.length
    }
  },
  watch: {
    id () {
      this.pageNum = 1
      // this.getComment()
      this.getType()
    },
    textLenght2 (newVal) {
      if (newVal < 93 && newVal > 88) {
        this.$refs.replay.style = 'height: 40px'
      } else if (newVal < 50 && newVal > 40) {
        this.$refs.replay.style = 'height: 60px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.com_content {
  width: 640px;
  // padding: 0 30px 40px 40px;
  .top {
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #c20c0c;
    .t_title {
      float: left;
      line-height: 28px;
      font-size: 20px;
    }
    .t_num {
      float: left;
      margin: 9px 0 0 20px;
    }
    .t_count {
      float: right;
      margin-top: 5px;
      color: #666666;
      .c1 {
        color: #c20c0c;
      }
    }
  }
  .center {
    width: 100%;
    height: 98px;
    margin: 20px 0px;
    .c_header {
      width: 50px;
      height: 50px;
      margin-right: 12px;
      float: left;
    }
    .c_rigth {
      position: relative;
      width: 578px;
      height: 98px;
      float: right;
      .c_text {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 63px;
        padding: 5px 6px 6px;
        border: 1px solid #cdcdcd;
        border-radius: 2px;
        line-height: 19px;
        resize: none;
        outline: none;
      }
      .c_i5 {
        width: 12px;
        height: 13px;
        background-color: #fff;
        font-size: 18px;
        color: #cdcdcd;
        position: absolute;
        top: 11px;
        left: -9px;
      }
    }
  }
  .c_ctrl {
    widows: 100%;
    height: 25px;
    padding-top: 10px;
    .c_i {
      width: 18px;
      height: 18px;
      cursor: pointer;
      margin-right: 10px;
      float: left;
      background: url('@/components/img/icon.png');
    }
    .c_i1 {
      background-position: -40px -490px;
    }
    .c_i2 {
      background-position: -60px -490px;
    }
    .c_i3 {
      float: right;
      line-height: 25px;
      color: #999;
      background: none;
      cursor: default;
    }
    .c_i4 {
      user-select: none;
      float: right;
      width: 46px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      color: #fff;
      background: url('@/components/img/button.png') -84px -64px;
      &:hover {
        background: url('@/components/img/button.png') -84px -94px;
      }
    }
  }
  .bottom {
    width: 100%;
    .b_header {
      width: 100%;
      height: 20px;
      border-bottom: 1px solid #cfcfcf;
    }
    .b_com {
      width: 640px;
      padding: 15px 0;
      border-top: 1px dotted #ccc;
      .b_h {
        width: 50px;
        height: 50px;
        float: left;
        cursor: pointer;
      }
      .b_rigth {
        width: 580px;
        margin-left: 10px;
        display: inline-block;
        .b_top {
          width: 100%;
          word-break: break-word;
          .nickname {
            color: #0c73c2;
          }
        }
        .b_reply {
          width: 100%;
          margin-top: 10px;
          line-height: 20px;
          background: #f4f4f4;
          border: 1px solid #dedede;
          color: #666;
          padding: 8px 19px;
          box-sizing: border-box;
          word-break: break-word;
          .nicn {
            color: #0c73c2;
          }
        }
        .b_bottom {
          width: 100%;
          height: 16px;
          margin-top: 15px;
          .b_data {
            color: #999;
          }
          .b_r {
            float: right;
            .b_agree {
              display: inline-block;
              color: #333;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
              .b_i {
                display: inline-block;
                width: 15px;
                height: 14px;
                margin-right: 5px;
                background: url('@/components/img/icon2.png') -150px 0;
                vertical-align: -2px;
              }
            }
            .sperator {
              margin: 0 8px;
              color: #ccc;
            }
            .b_r {
              display: inline-block;
              color: #666;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
      .reply {
        position: relative;
        width: 578px;
        margin: 15px 0px 15px 60px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        background: #f8f8f8;
        .r_icon {
          position: absolute;
          top: -9px;
          right: 5px;
          width: 14px;
          height: 14px;
          overflow: hidden;
          .r_i{
            text-align: left;
            font-family: 'SimSun';
            font-size: 15px;
            font-style: normal;
            font-weight: normal;
            width: 14px;
            height: 10px;
            line-height: normal;
          }
          .r_i1 {
            color: #d9d9d9;
          }
          .r_i2 {
            color: #f8f8f8;
            position: absolute;
            top: 1px;
            left: 0px;
          }
        }
        .r_cont {
          padding: 15px;
          width: 548px;
          .r_text {
            width: 536px;
            height: 20px;
            outline: none;
            padding: 5px 6px 6px;
            border: 1px solid #cdcdcd;
            border-radius: 2px;
            line-height: 19px;
            resize: none;
          }
        }
      }
    }
  }
  .loading {
    width: 670px;
    height: 66px;
    .l_cont {
      width: 100%;
      height: 100%;
      padding: 20px 0;
      text-align: center;
      box-sizing: border-box;
      line-height: 26px;
      .l_icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 2px;
        background: url('@/components/img/loading.gif');
      }
    }
  }
}
.active {
  background-position: -170px 0 !important;
}
</style>
