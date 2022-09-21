<template>
  <div class="headbar" :style="{'background':themeColor}"
       :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
    <!-- 导航收缩 -->
    <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" active-text-color="#fff"
               mode="horizontal">
        <el-menu-item index="1" ><span style="font-size:19px;"><b>CET2.0</b><sub></sub></span></el-menu-item>
      </el-menu>
    </span>
    <!-- 导航菜单 -->
    <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" router
               :background-color="themeColor" text-color="#fff" active-text-color="#fff" mode="horizontal"
               @open="handleopen" @close="handleclose" >
        <!-- 导航菜单栏 -->
         <el-menu-item index="1" :route="'/element/element'"><div class="menu-text"><i class="el-icon-s-grid"></i>物质及默认参数</div></el-menu-item>
        <el-menu-item index="2" :disabled="((cas=='')?true:false)" :route="'/evaluate/scenes'" @click="setScenes"><div class="menu-text"><i class="el-icon-umbrella"></i>暴露场景构建</div></el-menu-item>
        <el-menu-item index="3" :disabled="((cas=='')?true:false)" :route="'/evaluate/scenes'" @click="setResults"><div class="menu-text"><i class="el-icon-s-platform"></i>暴露估算结果</div></el-menu-item>
       <el-menu-item index="4" :disabled="((cas=='')?true:false)" :route="'/evaluate/report'"><div class="menu-text"><i class="el-icon-s-order"></i>输出报告</div></el-menu-item>
       <el-menu-item index="5" v-if="'admin'==this.currentUser" :route="'/sys/user'" ><div class="menu-text"><i class="el-icon-s-custom"></i>用户管理</div></el-menu-item>
       <el-menu-item index="6"  :route="'/sys/help'" ><div class="menu-text"><i class="el-icon-help"></i>使用帮助</div></el-menu-item>
        <!--        <el-menu-item index="1" @click="$router.push('/')"><i class="fa fa-home fa-lg"></i>  </el-menu-item>-->
        <!--        <el-menu-item index="2" @click="openWindow('https://gitee.com/liuge1988/kitty')">{{$t("common.projectRepo")}}</el-menu-item>-->
        <!--        <el-menu-item index="3" @click="openWindow('https://gitee.com/liuge1988/kitty/wikis/Home')">{{$t("common.doc")}}</el-menu-item>-->
        <!--        <el-menu-item index="4" @click="openWindow('https://www.cnblogs.com/xifengxiaoma/')">{{$t("common.blog")}}</el-menu-item>-->
      </el-menu>
    </span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor"
               :active-text-color="themeColor" mode="horizontal">

        <el-menu-item index="5" v-if="user.name=='guest'" v-popover:popover-login>
          <!-- 用户信息 -->
          <span class="user-info" >登录</span>
          <el-popover ref="popover-login" placement="bottom-end" trigger="click" :visible-arrow="false">
            <login-panel></login-panel>
          </el-popover>
        </el-menu-item>
        <el-menu-item index="6" v-popover:popover-personal v-else>
          <!-- 用户信息 -->
          <span class="user-info">{{user.nickname}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import mock from "@/mock/index"
    import Action from "@/components/Toolbar/Action"
    import NoticePanel from "@/views/Core/NoticePanel"
    import MessagePanel from "@/views/Core/MessagePanel"
    import PersonalPanel from "@/views/Core/PersonalPanel"
    import LoginPanel from "@/views/Core/LoginPanel"
    import Hamburger from "@/components/Hamburger"
    import NavBar from "@/views/NavBar/NavBar"
    import Elements from "@/views/Element/Element";
    import ElementManage from "../Element/ElementManage";
    export default {
        components: {
            Hamburger,
            Action,
            NoticePanel,
            MessagePanel,
            PersonalPanel,
            LoginPanel,
          NavBar,
          Elements,
          ElementManage,
        },
      data() {
            return {
              cas:'',
                currentUser:null,
                user: {
                    name: "guest",
                    avatar: "",
                    nickname: "游客",
                    registeInfo: "注册时间：2018-12-20 "
                },
                activeIndex: '1',
            }
        },
      created () {
        // this.handleRoute(this.$route)
        this.$api.user.getCurrentUser().then((res)=>{
        this.currentUser = res.msg
      })
      },
      methods: {
            openWindow(url) {
                window.open(url)
            },
            selectNavBar(key, keyPath) {
                console.log(key, keyPath)
            },
            // 折叠导航栏
            onCollapse: function () {
                this.$store.commit('onCollapse')
            },
            // 切换主题
            onThemeChange: function (themeColor) {
                this.$store.commit('setThemeColor', themeColor)
            },
          handleopen() {
            console.log('handleopen')
          },
          handleclose() {
            console.log('handleclose')
          },
          handleselect(a, b) {
            console.log('handleselect')
          },
          // 路由操作处理
          handleRoute (route) {
            // tab标签页选中, 如果不存在则先添加
            var tab = this.mainTabs.filter(item => item.name === route.name)[0]
            if (!tab) {
              tab = {
                name: route.name,
                title: route.name,
                icon: route.meta.icon
              }
              this.mainTabs = this.mainTabs.concat(tab)
            }
            this.mainTabsActiveName = tab.name
            // 切换标签页时同步更新高亮菜单
            if(this.$refs.navmenu != null) {
              this.$refs.navmenu.activeIndex = '' + route.meta.index
              this.$refs.navmenu.initOpenedMenu()
            }
          },
          setResults(){
                this.$store.commit('setResultflag',true);
          },
        setScenes(){
            this.$store.commit('setResultflag',false);

        },
            // // 语言切换
            // changeLanguage(lang) {
            //     lang === '' ? 'zh_cn' : lang
            //     this.$i18n.locale = lang
            //     this.langVisible = false
            // }
        },
        mounted() {
        // if(this.$store.getters.getFlag != ''){
        //   this.activeIndex = "2 + ' '";
        //   this.$router.push('/evaluate/scenes')
        //   this.sysName = "化学品风险评估程序"
        //
        //   var user = sessionStorage.getItem("user")
        //   var nickname = sessionStorage.getItem("nickname")
        //   if (user) {
        //     this.user.name = user
        //     this.user.nickname = nickname
        //   }
        // }else{
          this.$router.push('/')
          this.sysName = "化学品风险评估程序"

          var user = sessionStorage.getItem("user")
          var nickname = sessionStorage.getItem("nickname")
          if (user) {
            this.user.name = user
            this.user.nickname = nickname
          // }
        }

        },
        computed: {
            ...mapState({
                themeColor: state => state.app.themeColor,
                collapse: state => state.app.collapse,
                navTree: state=>state.menu.navTree,
            }),
            casUpdate() {
              return this.$store.getters.getCas;
      },

      },
      watch:{
        casUpdate: function (newVal, oldVal) {
        this.cas = newVal
        console.log(this.cas)
      },
        }
    }
</script>

<style scoped lang="scss">
  .headbar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1030;
    height: 60px;
    line-height: 60px;
    border-color: rgba(180, 190, 190, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
  }

  .hamburg, .navbar {
    float: left;
  }

  .toolbar {
    float: right;
  }

  .lang-item {
    font-size: 16px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: pointer;
  }

  .lang-item:hover {
    font-size: 18px;
    background: #b0d6ce4d;
  }

  .user-info {
    font-size: 20px;
    color: #fff;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }

  .badge {
    line-height: 18px;
  }

  .position-left {
    left: 0px;
  }

  .position-collapse-left {
    left: 65px;
  }
  .menu-text {
    font-size: 18px;;
  }
</style>
