<template>
  <div class="login-panel">
    
    <div class="main-operation">
      <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
        class="demo-ruleForm login-container">
        
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
          <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Cookies from "js-cookie"
 export default {
  name: 'LoginPanel',
  components:{
  },
  data() {
    return {
      loading: false,
      loginForm: {
        account: '',
        password: '',
        src: ''
      },
      fieldRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
        // ,
        // captcha: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        // ]
      },
      checked: true
    }
  },
  methods: {
    login() {
      this.loading = true
      let userInfo = {account:this.loginForm.account, password:this.loginForm.password}
      this.$api.login.login(userInfo).then((res) => {
          if(res.msg != null) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else {
            Cookies.set('token', res.data.token) // 放置token到Cookie
            sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
            sessionStorage.setItem('nickname', res.data.nickname) // 保存用户姓名到本地会话
            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            // this.$store.commit('setCurrentUser',userInfo.account)
            // this.$router.push('/')  // 登录成功，跳转到主页
            this.$router.go(0);
          }
          this.loading = false
        }).catch((res) => {
          this.$message({
          message: res.message,
          type: 'error'
          })
        });
    },
   
    reset() {
      this.$refs.loginForm.resetFields()
    },
   
  },
  mounted() {
  },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor
    })
  }
}

</script>

<style scoped>
  .login-panel {
    font-size: 14px;
    width: 400px;
    text-align: center;
   
  }



  .login-relation {
    font-size: 16px;
    padding: 12px;
    margin-right: 1px;
    background: rgba(200, 209, 204, 0.3);
  }

  .relation-item {
    padding: 12px;
  }

  .relation-item:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
  }

  .main-operation {
    padding: 8px;
    margin-right: 1px;
    /* background: rgba(175, 182, 179, 0.3); */
    border-color: rgba(201, 206, 206, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .main-operation-item {
    margin: 15px;
  }

  .other-operation {
    padding: 15px;
    margin-right: 1px;
    text-align: left;
    border-color: rgba(180, 190, 190, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .other-operation-item {
    padding: 12px;
  }

  .other-operation-item:hover {
    cursor: pointer;
    background: #9e94941e;
    color: rgb(19, 138, 156);
  }

  .personal-footer {
    margin-right: 1px;
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-color: rgba(180, 190, 190, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .personal-footer:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
    background: #b1a6a61e;
  }


  

</style>
