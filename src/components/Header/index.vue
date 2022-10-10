<template>
  <div class="content_wrap">
    <div class="header-wrap">
      <div class="wrap">
        <!-- 头部左边的logo -->
        <a href="/#" class="logo"></a>

        <!-- 头部的导航栏 -->
        <ul class="home-nav">
          <li>
            <span @click='findMusic' :class="{ active: isVisible === 1 }">发现音乐
              <sub v-show="isVisible === 1"></sub>
            </span>
          </li>
          <li>
            <span @click="myMusic" :class="{ active: isVisible === 2 }">我的音乐
              <sub v-show="isVisible === 2"></sub>
            </span>
          </li>
          <li>
            <span @click="interest" :class="{ active: isVisible === 3 }">关注
              <sub v-show="isVisible === 3"></sub>
            </span>
            <sup class="dot"></sup>
          </li>
          <li><span>商城</span></li>
          <li><span>音乐人</span></li>
          <li>
            <span @click="downloadApp" :class="{ active: isVisible === 4 }">下载客户端
              <sub v-show="isVisible === 4"></sub>
            </span>
            <sup class="hot"></sup>
          </li>
        </ul>
        <!-- 登录按钮 -->
        <!-- 未登录 -->
        <div class="login" v-if="!isLogin">
          <a href="" @click.prevent="showLogin">登录</a>
        </div>
        <!-- 已登录 -->
        <div class="ready_login" v-if="isLogin">
          <img :src="userImg">
          <!-- 登陆后的个人信息栏 -->
          <div class="userinfo">
            <i class="u_i"></i>
            <ul>
              <li><a href=""><i class="u_icon i1"></i>
                  <p>我的主页</p>
                </a></li>
              <li><a href=""><i class="u_icon i2"></i>
                  <p>我的消息</p>
                </a></li>
              <li><a href=""><i class="u_icon i3"></i>
                  <p>我的等级</p>
                </a></li>
              <li><a href=""><i class="u_icon i4"></i>
                  <p>VIP会员</p>
                </a></li>
              <li><a href=""><i class="u_icon i5"></i>
                  <p>个人设置</p>
                </a></li>
              <li><a href=""><i class="u_icon i6"></i>
                  <p>实名认证</p>
                </a></li>
              <li><a @click.prevent="exit"><i class="u_icon i7"></i>
                  <p>退出</p>
                </a></li>
            </ul>
          </div>
        </div>
        <!-- 创作者中心 -->
        <div class="creatorCenter">
          <a href="" @click.prevent="toCreatorCenter">创作者中心</a>
        </div>

        <!-- 头部的搜索框 -->
        <div class="search">
          <input type="text" v-model="searchText" placeholder="音乐/视频/电台/用户" onfocus="this.placeholder=''" onblur="this.placeholder='音乐/视频/电台/用户'" @blur="closeSugList" @focus="openSugList">
          <!-- 搜索建议 -->
          <div class="searchSug" ref="sugList">
            <div class="s_title">搜“{{searchText}}” 相关用户&nbsp;&nbsp;&gt;</div>
            <div class="s_list" v-for="(item,index) in searchList.order" :key="index">
              <div class="sl_left" v-if="item == 'songs'">单曲</div>
              <div class="sl_left" v-else-if="item == 'artists'">歌手</div>
              <div class="sl_left" v-else-if="item == 'albums'">专辑</div>
              <div class="sl_left" v-else-if="item == 'playlists'">歌单</div>
              <ul class="sl_right">
                <li class="sl_li" v-for="(item2,index2) in searchList[`${item}`]" :key="index2" @click="goSearcha(item,item2.id)">
                  {{item2.name}}
                  <span class="songs_name" v-show="item == 'songs'">-
                    <p v-for="(item3,index3) in item2.artists" :key="index3">
                      {{item3.name}}
                    </p>
                  </span>
                  <span class="songs_name" v-if="item == 'albums'">
                    -{{item2.artist.name}}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-line" v-show="isVisible !== 1"></div>

    <!-- 弹框 -->
    <div class="login_wrap" v-if="isShowLogin">
      <div class="l_wrap">
        <div class="login_frame"></div>

        <!-- 登录 -->
        <div class="l_frame" v-if="(isShowQRcode || isShowOther) && !isPhone">
          <div class="top l_top">登录<span @click="closeLogin"></span></div>
          <div class="content l_content">
            <!-- 二维码登录 -->
            <div class="QR_code" v-if="isShowQRcode">
              <div class="Q_top">
                <div class="Q_img"></div>
                <div class="Q_right">
                  <h3>扫码登录</h3>
                  <div class="Q_code">
                    <img :src="qrUrl" alt="">
                    <div class="overtime" v-if="isRefresh">
                      <p>二维码已失效</p>
                      <a class="Q_refresh" @click.prevent="refresh">点击刷新</a>
                    </div>
                  </div>
                  <p class="Q_App">使用 <a href="">网易云音乐APP</a> 扫码登录</p>
                </div>
              </div>
              <a class="Q_bottom" @click.prevent="other">选择其他登录模式</a>
            </div>

            <!-- 其他登录方式 -->
            <div class="other" v-if="isShowOther && !isPhone">
              <div class="o_top">
                <div class="o_left">
                  <img src="@/components/img/computer.png" alt="">
                  <a class="btn o_phone" @click.prevent="phoneLogin"><span>手机号登录</span></a>
                  <a class="btn o_regist"><span>注册</span></a>
                </div>
                <div class="o_right">
                  <ul class="o_more">
                    <li><a class="o_mode">
                        <div class="o_icon o_icon1"></div>微信登录
                      </a></li>
                    <li><a class="o_mode">
                        <div class="o_icon o_icon2"></div>QQ登录
                      </a></li>
                    <li><a class="o_mode">
                        <div class="o_icon o_icon3"></div>微博登录
                      </a></li>
                    <li><a class="o_mode">
                        <div class="o_icon o_icon4"></div>网易邮箱帐号登录
                      </a></li>
                  </ul>
                </div>
              </div>
              <div class="o_bottom">
                <input type="checkbox" v-model="agree">
                <p>同意</p>
                <a href="">《服务条款》</a>
                <a href="">《隐私政策》</a>
                <a href="">《儿童隐私政策》</a>
              </div>
              <div class="img" @click="QRCode"></div>
            </div>
          </div>
        </div>

        <!-- 手机号登录 -->
        <div class="phone" v-if="isPhone">
          <div class="top p_top">手机号登录<span @click="closeLogin"></span></div>
          <div class="content p_content">
            <section class="c_top">
              <div class="t_top">
                <span>+86</span>
                <input type="text" class="p_num" placeholder="请输入手机号" v-model="phone" @focus="isNotice = 0" ref="phone">
              </div>
              <!-- 验证码登录 -->
              <div class="t_center t_vcode" v-if="!isPWLogin">
                <input type="text" class="p_vcode" placeholder="请输入验证码" v-model="vcode" @focus="isNotice = 0" ref="vcode">
                <a class="btn get_code" ref="getVCode" @click.prevent="sentVCode"><span>获取验证码</span></a>
                <a class="btn get_code timer" ref="timer"><span>{{timer + 's'}}</span></a>
              </div>

              <!-- 密码登录 -->
              <div class="t_center t_password" v-if="isPWLogin">
                <input type="password" v-model="password" @focus="isNotice = 0" ref="password">
                <a href="">忘记密码?</a>
              </div>

              <div class="t_notice" v-if="isNotice === 1"><span class="t_icon"></span>请输入手机号</div>
              <div class="t_notice" v-if="isNotice === 2"><span class="t_icon"></span>请输入正确的手机号</div>
              <div class="t_notice" v-if="isNotice === 3"><span class="t_icon"></span>请输入验证码</div>
              <div class="t_notice" v-if="isNotice === 4"><span class="t_icon"></span>验证码错误</div>
              <div class="t_notice" v-if="isNotice === 5"><span class="t_icon"></span>手机号或密码错误</div>

              <div class="t_bottom">
                <a class="t_pw" @click.prevent="pwLogin" v-if="!isPWLogin">密码登录</a>
                <a class="t_vcode" @click.prevent="pwLogin" v-if="isPWLogin">短信登录</a>
                <label class="auto"><input type="checkbox">自动登录</label>
              </div>
              <a class="btn t_btn" @click.prevent="loginButton"><span ref="loginButton">登录</span></a>
            </section>
            <div class="c_bottom">
              <a class="p_left" @click.prevent="other">&lt;&nbsp;&nbsp;其他登录方式 </a>
              <a href="" class="p_right">&lt;&nbsp;&nbsp;没有帐号？免费注册</a>
            </div>
          </div>
        </div>

        <!-- 注册
        <div class="regist" v-show="true">
          <div class="top p_top">手机号注册<span></span></div>
          <div class="content r_content">
            <section>
              <div class="r_top">
                <span>+86</span>
                <input type="text" class="p_num" placeholder="请输入手机号">
              </div>
              <div class="r_center">
                <input type="password">
              </div>
              <div class="r_tip"><span class="r_tip1"></span><p>密码不能包含空格</p></div>
              <div class="r_tip"><span class="r_tip2"></span><p>包含字母、数字、符号中至少两种</p></div>
              <div class="r_tip"><span class="r_tip3"></span><p>密码长度为8-20位</p></div>
            </section>
          </div>
        </div> -->
      </div>
    </div>

    <!-- 提示勾选协议 -->
    <div class="agree" v-if="isShowAgree">
      请勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》
    </div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus'
// eslint-disable-next-line no-unused-vars
import { getLoginQrKeyAPI, getLoginQrCreate, getLoginQrCheck, getAccountAPI, getLoginByPasswordAPI, getSearchSugAPI, sentVCodeAPI, getVerifyAPI, getLoginByVCodeAPI } from '@/api/index.js'
import QRCode from 'qrcode'

export default {
  name: 'myHeader',
  data () {
    return {
      // 是否显示导航栏中的三角型
      // 默认显示 “发现音乐” 下的三角型
      isVisible: 1,
      // 是否显示搜索栏中的label
      isLabel: true,
      // 搜索栏文本
      searchText: '',
      // 搜索建议列表
      searchList: [],
      // 是否展示登录框
      isShowLogin: false,
      // 是否显示二维码弹框
      isShowQRcode: false,
      // 是否显示其他登录方式弹框
      isShowOther: false,
      // 是否勾选同意协议
      agree: false,
      // 未勾选协议时提示
      isShowAgree: false,
      // 未勾选协议时提示定时器
      time1: null,
      // 二维码url
      qrUrl: '',
      // 是否显示刷新二维码
      isRefresh: false,
      // 二维码定时器
      timer2: null,
      // 用户是否登录
      isLogin: false,
      // 用户头像
      userImg: '',
      // 是否使用手机号登录
      isPhone: false,
      // 是否使用密码登录
      isPWLogin: false,
      // 手机号
      phone: '',
      // 密码
      password: '',
      // 验证码
      vcode: '',
      // 错误提示
      isNotice: 0,
      // 发送验证码计时器
      timer: 60
    }
  },
  methods: {
    findMusic () {
      if (this.$route.path === '/findMusic') {
        return
      }
      this.isVisible = 1
      this.$router.push('/findMusic')
    },
    myMusic () {
      if (this.$route.path === '/myMusic') {
        return
      }
      this.isVisible = 2
      this.$router.push('/myMusic')
    },
    interest () {
      if (this.$route.path === '/interest') {
        return
      }
      this.isVisible = 3
      this.$router.push('/interest')
    },
    downloadApp () {
      if (this.$route.path === '/downloadApp') {
        return
      }
      this.isVisible = 4
      this.$router.push('/downloadApp')
    },
    // 打开搜索建议
    closeSugList () {
      setTimeout(() => {
        this.$refs.sugList.style.display = 'none'
      }, 100)
    },
    // 隐藏搜索建议
    openSugList () {
      if (this.searchText !== '') {
        this.$refs.sugList.style.display = 'block'
      }
    },
    goSearcha (type, id) {
      this.$router.push({
        path: `/${type}`,
        query: {
          id
        }
      })
    },
    // 获取搜索建议
    async getSearchSug () {
      const { data: res } = await getSearchSugAPI(this.searchText)
      if (res.code === 200) {
        this.searchList = res.result
        console.log(res.result)
      }
    },
    showLogin () {
      // 登录框显示
      this.isShowLogin = true
      this.isShowQRcode = true
      this.initCode()
    },
    // 显示其他登录方式界面
    other () {
      this.isShowOther = true
      this.isShowQRcode = false
      this.isPhone = false
      this.password = ''
      this.vcode = ''
      this.phone = ''
    },
    // 显示二维码登录方式界面
    QRCode () {
      if (this.agree) {
        this.isShowOther = false
        this.isShowQRcode = true
      } else {
        clearTimeout(this.time1)
        this.isShowAgree = true
        this.time1 = setTimeout(() => {
          this.isShowAgree = false
        }, 2000)
      }
    },
    // 关闭登录弹框
    closeLogin () {
      this.isShowLogin = false
      this.isShowOther = false
      this.isShowQRcode = false
      this.isPhone = false
      this.agree = false
      clearInterval(this.timer2)
    },
    lableVisible () {
      this.isLabel = false
    },
    // 获取二维码
    async initCode () {
      // 生成二维码
      const { data: res } = await getLoginQrKeyAPI()
      if (res.code === 200) {
        const { data: res2 } = await getLoginQrCreate(res.data.unikey)
        // 生成二维码地址
        this.qrUrl = await QRCode.toDataURL(res2.data.qrurl)
        // console.log(res2.data.qrurl)
      }
      // console.log(res.data.unikey)
      this.isRefresh = false
      this.checkQRCode(res.data.unikey)

      // this.isLogin = true
    },
    // 检查二维码状态
    checkQRCode (key) {
      this.timer2 = setInterval(async () => {
        const { data: res } = await getLoginQrCheck(key)
        // 二维码已过期
        // 或用户已扫码登录
        if (res.code === 800) {
          this.isRefresh = true
          clearInterval(this.timer2)
        } else if (res.code === 803) {
          // 存储用户登录信息
          this.$store.dispatch('updateCookie', res.cookie)
          this.closeLogin()
          this.Account()
          setTimeout(() => {
            location.reload(true)
            console.log('100')
          }, 600)
          clearInterval(this.timer2)
        }
        // console.log(res)
      }, 5000)
    },
    // 刷新二维码
    refresh () {
      this.isRefresh = false
      this.initCode()
    },
    // 获取账号信息
    async Account () {
      this.isLogin = true
      const cookie = localStorage.getItem('COOKIE')
      const { data: res } = await getAccountAPI(cookie)
      this.$store.dispatch('getUserInfo', res.account.id, cookie)
      setTimeout(() => {
        this.userImg = this.$store.state.login.userInfo.profile.avatarUrl
      }, 500)
    },
    // 退出登录
    async exit () {
      this.isLogin = false
      this.$store.dispatch('exit')
      setTimeout(() => {
        if (this.$route.path === '/findMusic/recommen') {
          location.reload(true)
        } else {
          this.isVisible = 1
          this.$router.push('/')
        }
      }, 500)
    },
    // 手机号登录
    phoneLogin () {
      if (this.agree) {
        this.isPhone = true
      } else {
        clearTimeout(this.time1)
        this.isShowAgree = true
        this.time1 = setTimeout(() => {
          this.isShowAgree = false
        }, 2000)
      }
    },
    // 是否使用密码登录
    pwLogin () {
      this.isPWLogin = !this.isPWLogin
      this.password = ''
      this.vcode = ''
    },
    // 检查输入的数据是否正确
    checkFhone () {
      const re = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      return re.test(this.phone)
    },
    // 发送验证码
    async sentVCode () {
      // if (this.phone === '') {
      //   this.isNotice = 1
      // } else if (this.checkFhone()) {
      //   const { phone } = this
      //   const { data: res } = await sentVCodeAPI(phone)
      //   if (res.code !== 200) {
      //     alert('验证码发送失败,请稍后重试')
      //   }
      //   this.$refs.getVCode.style = 'display: none'
      //   this.$refs.timer.style = 'display: block'
      //   const timer3 = setInterval(() => {
      //     this.timer--
      //     if (this.timer === -1) {
      //       this.$refs.getVCode.style = 'display: block'
      //       this.$refs.timer.style = 'display: none'
      //       clearInterval(timer3)
      //     }
      //   }, 1000)
      //   // console.log(res)
      // } else {
      //   this.isNotice = 2
      // }
    },
    // 验证手机号和验证码是否正确
    async loginButton () {
      let code = 0
      if (this.phone === '') {
        this.isNotice = 1
      } else if (this.checkFhone()) {
        if (this.isPWLogin) {
          // 密码登录
          const { phone, password } = this
          const { data: res } = await getLoginByPasswordAPI(phone, password)
          console.log(res)
          if (res.code === 200) {
            this.$store.dispatch('updateCookie', res.cookie)
            code = 200
          } else {
            this.isNotice = 5
          }
        } else {
          // 验证码登录
          // const { phone, vcode } = this
          // if (vcode === '') {
          //   this.isNotice = 3
          // } else {
          //   // 校验验证码
          //   // const { data: res2 } = await getLoginByVCodeAPI(phone, vcode)
          //   const { data: res1 } = await getVerifyAPI(phone, vcode)
          //   // console.log(res2)
          //   if (res1.code === 200) {
          //     const { data: res2 } = await getLoginByVCodeAPI(phone, vcode)
          //     if (res2.code === 200) {
          //       this.$store.dispatch('updateCookie', res2.cookie)
          //       code = 200
          //     }
          //   } else {
          //     this.isNotice = 4
          //   }
          // }
        }
      } else {
        this.isNotice = 2
      }

      if (code === 200) {
        this.$refs.loginButton.innerHTML = '登录中...'
        setTimeout(() => {
          this.$refs.loginButton.innerHTML = '登录'
          this.Account()
          setTimeout(() => {
            location.reload(true)
          }, 600)
        }, 1000)
      }
    }
  },
  created () {
    bus.$on('isVisible', val => {
      this.isVisible = val
    })
  },
  mounted () {
    if (localStorage.length !== 0 && localStorage.getItem('COOKIE') !== null) {
      this.Account()
    }
    bus.$on('loginFrame', () => {
      this.showLogin()
    })
  },
  watch: {
    searchText () {
      if (this.searchText !== '') {
        this.$refs.sugList.style.display = 'block'
        this.getSearchSug()
      } else {
        this.$refs.sugList.style.display = 'none'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.content_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .header-wrap {
    width: 100%;
    height: 70px;
    background-color: rgb(36, 36, 36);
    .wrap {
      width: 1100px;
      height: 100%;
      margin: 0 auto;
      .logo {
        display: block;
        width: 177px;
        height: 100%;
        background-image: url('./img/topbar.png');
        float: left;
      }
      .home-nav {
        width: 508px;
        height: 100%;
        float: left;
        list-style: none;
        color: rgb(204, 204, 204);
        li {
          float: left;
          height: 100%;
          position: relative;
          span {
            display: flex;
            height: 100%;
            padding: 0 19px;
            cursor: pointer;
            flex-direction: column;
            justify-content: center;
            position: relative;
            font-size: 14px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            sub {
              width: 12px;
              height: 7px;
              position: absolute;
              bottom: 0px;
              background-image: url('./img/topbar.png');
              background-position: -226px 1px;
              left: 50%;
              margin-left: -6px;
            }
            &:hover {
              color: rgb(255, 255, 255);
              background-color: rgb(0, 0, 0);
            }
          }
          .hot {
            width: 28px;
            height: 19px;
            display: block;
            position: absolute;
            top: 21px;
            left: 100px;
            background-image: url('./img/topbar.png');
            background-position: 50px 0px;
          }
          .dot {
            width: 6.5px;
            height: 6px;
            display: block;
            position: absolute;
            top: 24px;
            left: 54px;
            border-radius: 3px;
            background-color: #c20c0c;
          }
        }
      }
      .login {
        width: 28px;
        height: 45px;
        margin: 19px 0 0 20px;
        padding: 0 22px 0 0;
        float: right;
        a {
          display: block;
          width: 28px;
          height: 16px;
          font-size: 12px;
          color: rgb(120, 120, 120);
          text-decoration: none;
          margin: 7px 0 0;
          &:hover {
            text-decoration: underline;
          }
        }
        &:hover {
          a {
            color: rgb(153, 153, 153);
          }
        }
      }
      .ready_login {
        width: 30px;
        height: 30px;
        float: right;
        margin: 19px 0 0 20px;
        padding: 0 22px 0 0;
        position: relative;
        cursor: pointer;
        &:hover {
          .userinfo {
            display: block !important;
          }
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 30px;
          border: none;
        }
        .userinfo {
          position: absolute;
          top: 38px;
          right: -43px;
          width: 158px;
          background: #2b2b2b;
          border: 1px solid #202020;
          box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
          border-radius: 4px;
          z-index: 1000;
          display: none;
          .u_i {
            position: absolute;
            top: -8px;
            left: 50%;
            padding: 0px 5px;
            width: 14px;
            height: 8px;
            margin-left: -7px;
            background: url('@/components/img/toplist.png') -20px 0;
          }
          ul {
            width: 100%;
            list-style: none;
            li {
              width: 100%;
              height: 34px;
              &:hover {
                background-color: rgb(53, 53, 53);
                a {
                  color: #fff;
                }
              }
              a {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                line-height: 34px;
                padding-left: 24px;
                color: #ccc;
                cursor: pointer;
                .u_icon {
                  float: left;
                  width: 18px;
                  height: 18px;
                  background-image: url('@/components/img/toplist.png');
                  margin: 7px 10px 0 0;
                }
                .i1 {
                  background-position: 0 -80px;
                }
                .i2 {
                  background-position: -20px -120px;
                }
                .i3 {
                  background-position: 0 -100px;
                }
                .i4 {
                  background-position: 0 -221px;
                }
                .i5 {
                  background-position: 0 -140px;
                }
                .i6 {
                  background-position: -20px -142px;
                }
                .i7 {
                  background-position: 0 -200px;
                }
                p {
                  line-height: 34px;
                  float: left;
                  width: 100px;
                  text-align: left;
                }
              }
            }
          }
        }
      }
      .creatorCenter {
        width: 74px;
        height: 32px;
        margin: 19px 0 0 12px;
        padding: 0 0 0 16px;
        float: right;
        border: 1px solid #4f4f4f;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        a {
          color: #cccccc;
          font-size: 12px;
          text-decoration: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        &:hover {
          border: 1px solid rgb(204, 204, 204);
          cursor: pointer;
          a {
            color: rgb(255, 255, 255);
          }
        }
      }
      .search {
        width: 158px;
        height: 32px;
        margin: 19px 0 0 0;
        float: right;
        background-image: url('./img/topbar.png');
        background-position: 0px -99px;
        background-color: #fff;
        border-radius: 32px;
        position: relative;
        input {
          width: 75%;
          margin: 0;
          padding: 0;
          color: #9b9b9b;
          line-height: 16px;
          position: absolute;
          top: 10px;
          left: 30px;
          font-size: 12px;
          outline: none;
          border: none;
        }
        .searchSug {
          display: none;
          width: 240px;
          // min-height: 50px;
          background-color: #ffffff;
          position: absolute;
          top: 40px;
          right: 30px;
          z-index: 120;
          left: 0;
          box-sizing: border-box;
          border: 1px solid #bebebe;
          border-radius: 4px;
          box-shadow: 0 4px 7px #555;
          text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
          .s_title {
            color: #666;
            height: 17px;
            padding: 11px 10px;
            border-bottom: 1px solid #e2e2e2;
          }
          .s_list {
            .sl_left {
              float: left;
              width: 52px;
              margin-right: -100px;
              padding: 10px 0 0 10px;
              // border-right: 1px solid #e2e2e2;
              line-height: 17px;
              font-weight: normal;
            }
            .sl_right {
              margin-left: 62px;
              margin-top: -1px;
              padding: 6px 0 5px;
              border-top: 1px solid #e2e2e2;
              border-left: 1px solid #e2e2e2;
              list-style: none;
              .sl_li {
                width: 175px;
                height: 24px;
                text-indent: 12px;
                line-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                &:hover {
                  background-color: rgb(227, 229, 231);
                  cursor: pointer;
                }
                .songs_name {
                  display: inline;
                  height: 100%;
                  line-height: 24px;
                  p {
                    display: inline;
                  }
                }
              }
            }
          }

          .s_list:nth-child(odd) {
            .sl_right {
              background-color: rgb(249, 248, 248);
            }
          }
        }
      }
    }
  }
  .active {
    color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 0);
  }
  .header-line {
    width: 100%;
    height: 5px;
    background-color: rgb(194, 12, 12);
  }
  .login_wrap {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    .l_wrap {
      position: relative;
      width: 100%;
      height: 754px;
      .login_frame {
        position: fixed;
        width: 100%;
        height: 754px;
        background-color: rgba(0, 0, 0, 0.65);
        z-index: 1000;
        // background: transparent;
      }
      .l_frame {
        height: 366px;
        margin-top: -183px;
        .l_content {
          height: 326px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .QR_code {
            width: 528px;
            height: 270px;
            .Q_top {
              width: 528px;
              height: 220px;
              display: flex;
              justify-content: center;
              flex-direction: row;
              align-items: center;
              .Q_img {
                width: 125px;
                height: 220px;
                background: url('@/components/img/phone.png') no-repeat;
                background-size: 100%;
              }
              .Q_right {
                margin-left: 25px;
                width: 200px;
                height: 205px;
                text-align: center;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                h3 {
                  font-size: 18px;
                  font-weight: 500;
                }
                .Q_code {
                  width: 130px;
                  height: 130px;
                  padding: 4px;
                  margin: 13px auto;
                  position: relative;
                  img,
                  .overtime {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                  }
                  .overtime {
                    background: rgba(255, 255, 255, 0.9);
                    p {
                      width: 138px;
                      height: 16px;
                      margin: 45px auto 6px;
                      color: rgba(0, 0, 0, 0.8);
                      font-weight: 500;
                      z-index: 2000;
                    }
                    .Q_refresh {
                      display: block;
                      margin: 0 36px;
                      padding-right: 0;
                      width: 64px;
                      height: 24px;
                      line-height: 24px;
                      text-align: center;
                      border-radius: 4px;
                      text-decoration: none;
                      background: linear-gradient(180deg, #81dd81 0%, #55a055 100%);
                      border: 1px solid #5baf5b;
                      color: #fff;
                      z-index: 2000;
                      cursor: pointer;
                    }
                  }
                }
                .Q_App {
                  width: 200px;
                  line-height: 17px;
                  color: rgba(0, 0, 0, 0.4);
                  a {
                    text-decoration: none;
                    color: #0c73c2;
                  }
                }
              }
            }
            .Q_bottom {
              width: 118px;
              height: 28px;
              display: block;
              border: 1px solid #979797;
              border-radius: 15px;
              line-height: 28px;
              text-align: center;
              margin: 20px auto 0;
              color: rgba(0, 0, 0, 0.8);
              cursor: pointer;
            }
          }
          .other {
            width: 100%;
            height: 266.3px;
            .o_top {
              width: 100%;
              height: 220px;
              display: flex;
              justify-content: center;
              flex-direction: row;
              align-items: center;
              .o_left {
                width: 224px;
                height: 207px;
                padding: 0 35px 3px 40px;
                border-right: 1px dotted #ccc;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                line-height: 31px;
                text-align: center;
                img {
                  width: 224px;
                  height: 120px;
                }
                .o_phone {
                  background-position: right -428px;
                  span {
                    color: #ffffff;
                    background-position: 0 -387px;
                  }
                  &:hover {
                    background-position: right -510px;
                    span {
                      background-position: 0 -469px;
                    }
                  }
                }
                .o_regist {
                  background-position: -27px -100px;
                  span {
                    color: #333333;
                    background-position: 0 -59px;
                  }
                  &:hover {
                    background-position: -27px -182px;
                    span {
                      background-position: 0 -141px;
                    }
                  }
                }
              }
              .o_right {
                width: 148px;
                height: 216.35px;
                padding: 3px 0 3px 39px;
                margin-top: -15px;
                background-color: #ffffff;
                .o_more {
                  width: 148px;
                  height: 100%;
                  list-style: none;
                  li {
                    width: 148px;
                    height: 39px;
                    margin-top: 15px;
                    .o_mode {
                      text-decoration: none;
                      color: #333;
                      line-height: 39px;
                      cursor: pointer;
                      &:hover {
                        text-decoration: underline;
                      }
                      .o_icon {
                        display: inline-block;
                        vertical-align: middle;
                        width: 38px;
                        height: 38px;
                        margin-right: 14px;
                        background: url('@/components/img/icon3.png');
                      }
                      .o_icon1 {
                        background-position: -150px -670px;
                      }
                      .o_icon2 {
                        background-position: -190px -670px;
                      }
                      .o_icon3 {
                        background-position: -231px -670px;
                      }
                      .o_icon4 {
                        background-position: -271px -670px;
                      }
                    }
                  }
                }
              }
            }
            .o_bottom {
              width: 488px;
              height: 16.3px;
              margin-left: 40px;
              margin-top: 30px;
              font-family: NotoSansHans-Regular;
              font-size: 10px;
              color: rgba(0, 0, 0, 0.4);
              line-height: 15px;
              cursor: default;
              input,
              p,
              a {
                vertical-align: middle;
                display: inline-block;
              }
              p {
                margin-left: 2px;
              }
              a {
                text-decoration: none;
                cursor: pointer;
                color: #507daf;
              }
            }
            .img {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 52px;
              height: 52px;
              background-image: url('@/components/img/code.png');
              background-size: 100%;
            }
          }
        }
      }
      .phone {
        margin-top: -156.5px;
        .p_content {
          .c_top {
            margin: 0 auto;
            padding: 30px 0 43px;
            width: 220px;
            .t_center {
              width: 100%;
              height: 32px;
              margin-top: 10px;
            }
            .t_vcode {
              display: flex;
              justify-content: space-between;
              .p_vcode {
                padding: 0 8px;
                width: 120px;
                height: 100%;
                border: 1px solid #cdcdcd;
                border-radius: 2px;
                outline: none;
              }
              .get_code {
                width: 74px;
                height: 31px;
                margin: 0px;
                background-position: right -100px;
                text-decoration: none;
                span {
                  width: 61px;
                  height: 100%;
                  padding: 0 2px 0 7px;
                  background-position: 0 -59px;
                  color: #333333;
                }
                &:hover {
                  background-position: right -182px;
                  span {
                    background-position: 0 -141px;
                  }
                }
              }
              .timer {
                display: none;
                user-select: none;
              }
            }
            .t_password {
              width: 210px;
              height: 30px;
              position: relative;
              input {
                width: 100%;
                height: 100%;
                border: 1px solid #cdcdcd;
                border-radius: 2px;
                padding-left: 8px;
                outline: none;
              }
              a {
                position: absolute;
                top: 7px;
                right: 0px;
                text-decoration: none;
                color: #666;
              }
            }
            .t_notice {
              width: 100%;
              height: 16px;
              margin-top: 5px;
              color: #e33232;
              line-height: 16px;
              .t_icon {
                display: inline-block;
                width: 14px;
                height: 14px;
                margin-top: -2px;
                vertical-align: middle;
                margin-right: 8px;
                background: url('@/components/img/icon.png') -50px -270px;
              }
            }
            .t_bottom {
              width: 100%;
              height: 16px;
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              color: #666;
              .t_pw,
              .t_vcode {
                color: #666;
                text-decoration: none;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
              }
              .auto {
                line-height: 16px;
                input {
                  vertical-align: middle;
                  margin-right: 6px;
                }
              }
            }
            .t_btn {
              width: 220px;
              color: #fff;
              background-position: right -428px;
              margin-top: 20px;
              span {
                background-position: 0 -387px;
              }
              &:hover {
                background-position: right -510px;
                span {
                  background-position: 0 -469px;
                }
              }
            }
          }
          .c_bottom {
            width: 490px;
            display: flex;
            justify-content: space-between;
            padding: 0 19px;
            height: 48px;
            border-top: 1px solid #c6c6c6;
            border-radius: 0 0 4px 4px;
            line-height: 48px;
            background-color: #f7f7f7;
            .p_left {
              color: #0c72c3;
              text-decoration: none;
              cursor: pointer;
            }
            .p_right {
              color: #999;
              text-decoration: none;
              cursor: pointer;
            }
          }
        }
      }
      .regist {
        width: 530px;
        .r_content {
          section {
            margin: 0 auto;
            padding: 30px 0 43px;
            width: 220px;
            .r_center {
              width: 218px;
              height: 30px;
              margin-top: 10px;
              height: 30px;
              line-height: 30px;
              border: 1px solid #cdcdcd;
              border-radius: 2px;
              input {
                width: 202px;
                height: 100%;
                outline: none;
                border: none;
                color: #333;
                padding: 0 8px;
              }
            }
            .r_tip {
              color: #333;
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
  .agree {
    box-sizing: border-box;
    position: fixed;
    width: 320px;
    height: 90px;
    padding: 15px 20px;
    border-radius: 2px;
    top: 325px;
    left: 50%;
    margin-left: -160px;
    background-color: #333333;
    color: #ffffff;
    z-index: 9999;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    user-select: none;
  }
}
.btn {
  display: block;
  width: 223px;
  height: 31px;
  margin-top: 10px;
  background: url('@/components/img/button2.png');
  cursor: pointer;
  text-decoration: none;
  span {
    display: block;
    width: 184px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    padding: 0 15px 0 20px;
    background: url('@/components/img/button2.png');
  }
}
.l_frame,
.phone,
.regist {
  width: 530px;
  margin-left: -265px;
  left: 50%;
  top: 50%;
  z-index: 9999;
  position: fixed;
  .top {
    position: relative;
    margin: 0;
    padding: 0 45px 0 18px;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #191919;
    border-radius: 4px 4px 0 0;
    background: #2d2d2d;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
    span {
      position: absolute;
      top: 16px;
      right: 20px;
      width: 10px;
      height: 10px;
      background: url('@/components/img/close.png') 0 -95px;
      cursor: pointer;
    }
  }
  .content {
    width: 528px;
    border: 1px solid #d8d8d8;
    border-width: 0 1px 1px;
    border-radius: 0 0 4px 4px;
    background: #fff;
    position: relative;
    .t_top,
    .r_top {
      width: 218px;
      height: 30px;
      border: 1px solid #cdcdcd;
      border-radius: 2px;
      span {
        display: inline-block;
        width: 22%;
        height: 100%;
        line-height: 30px;
        color: #333;
        border-right: 1px solid #cdcdcd;
        text-align: center;
      }
      .p_num {
        box-sizing: border-box;
        display: inline-block;
        padding: 0 8px;
        width: 68%;
        height: 100%;
        outline: none;
        border: none;
        color: #333;
        background: none;
      }
    }
  }
}
</style>
