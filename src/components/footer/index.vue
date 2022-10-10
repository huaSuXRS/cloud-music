<template>
  <div class="content_wrap">
    <div class="wrap">
      <div class="copy">
        <p class="top">
          <a href="" class="item">服务条款</a><span class="sperator">|</span>
          <a href="" class="item">隐私政策</a><span class="sperator">|</span>
          <a href="" class="item">儿童隐私政策</a><span class="sperator">|</span>
          <a href="" class="item">版权投诉指引</a><span class="sperator">|</span>
          <a href="" class="item">联系我们</a><span class="sperator">|</span>
          <a href="" class="item">广告合作</a><span class="sperator">|</span>
          <a href="" class="item">廉正举报</a>
        </p>
        <p class="top">
          <span class="sep">网易公司版权所有©1997-2022</span>
          <span class="sep_right">杭州乐读科技有限公司运营：</span>
          <a href="" class="number">浙网文[2021] 1186-054号</a>
        </p>
        <p class="bottom">
          <a href="" class="bottom_content">粤B2-20090191-18 工业和信息化部备案管理系统网站</a>
          <span class="logo"></span><a href="" class="bottom_content">浙公网安备 33010902002564号</a>
        </p>
      </div>

      <ul>
        <li class="unit">
          <a class="icon"></a>
          <div class="one"></div>
        </li>
        <li class="auth">
          <a class="icon"></a>
          <div class="two"></div>
        </li>
        <li class="musician">
          <a class="icon"></a>
          <div class="three"></div>
        </li>
        <li class="reward">
          <a class="icon"></a>
          <div class="four"></div>
        </li>
        <li class="cash">
          <a class="icon"></a>
          <div class="fine"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'myFooter'
}
</script>

<style lang="less" scoped>
.content_wrap{
  position: relative;
  width: 100%;
  height: 173px;
  background-color: #F2F2F2;
  border-top: 1px solid #d3d3d3;
  .wrap{
    width: 980px;
    height: 100%;
    margin: 0 auto;
    .copy{
      width: 520px;
      margin-top: 15px;
      height: 92px;
      position: relative;
      float: left;
      .top{
        width: 520px;
        height: 24px;
        line-height: 24px;
        .item{
          color: #999999;
          line-height: 24px;
          &:hover{
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .sperator{
          color: #C2C2C2;
          margin: 0px 5px;
          line-height: 24px;
        }
        .sep,.sep_right{
          color: #666666;
          &:hover{
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .sep{
          margin-left: 0px;
          margin-right: 14px;
        }
        .number{
          color: #666666;
          &:hover{
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      .bottom{
        height: 28px;
        align-items: center;
        .bottom_content{
          color: #666666;
          display: block;
          float: left;
          &:hover{
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .logo{
          display: block;
          float: left;
          width: 14px;
          height: 14px;
          margin: 0px 3px 0px 8px;
          background-image: url('@/components/img/police.png');
          background-size: cover;
        }
      }
    }
    ul{
      width: 420px;
      height: 70px;
      margin: 33px 0px;
      float: right;
      list-style: none;
      li{
        width: 60px;
        height: 100%;
        margin-left: 30px;
        float: left;
        position: relative;
        .icon{
          display: block;
          width: 50px;
          height: 45px;
          margin: 0px 5px;
          position: absolute;
          top:0px;
          background-size: 110px 552px;
          background-image: url('@/components/img/foot_enter_new.png');
          &:hover{
            cursor: pointer;
          }
        }
        div{
          position: absolute;
          bottom: 0px;
          width: 72px;
          height: 14px;
          background-image: url('@/components/img/foot_enter_tt.png');
          background-size: 180px 139px;
        }
        .three{
          margin-left: 5px;
        }
      }
      .unit{
        margin: 0px;
        .icon{
          background-position: -60px -456.5px;
        }
        .one{
          background-position: 0 -108px;
        }
      }
      .auth{
        .icon{
          background-position: -60px -101px;
        }
        .two{
          margin-left: 8px;
          background-position: -1px -91px;
        }
      }
      .reward{
        .icon{
          background-position: -60px -50px;
        }
        .four{
          margin-left: 7px;
          background-position: 0 -54px;
        }
      }
      .cash{
        .icon{
          background-position: 0 -101px;
        }
        .fine{
          margin-left: 5px;
          background-position: -1px -72px;
        }
      }
    }
  }
  a{
    text-decoration: none;
  }
}

</style>
