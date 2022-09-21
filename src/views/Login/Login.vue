<template>
  <el-container>
    <el-main>
      <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
        class="demo-ruleForm login-container">
        <h2 class="title">CET</h2>
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:48%;" @click.native.prevent="showRegister">注 册</el-button>
          <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
          <el-link type="white" style="float:right;" @click="showResetPassword">忘记密码</el-link>
          <el-link type="white" style="float: left;margin-left: 180px" @click="downloadhelp">使用帮助</el-link>
        </el-form-item>
      </el-form>
      <el-dialog title="注 册" width="60%" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size"
          label-position="right">
          <el-row>
            <el-col :span="22">
              <el-form-item style="color:red;">
                请使用实名注册
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="dataForm.username" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="nickname">
                <el-input v-model="dataForm.nickname" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="密码" prop="password">
                <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="确认密码" prop="repeatpassword">
                <el-input v-model="dataForm.repeatpassword" type="password" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="职位" prop="career">
                <el-input v-model="dataForm.career" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话号码" prop="mobile">
                <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="dataForm.email" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司" prop="company">
                <el-input v-model="dataForm.company" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="department">
                <el-input v-model="dataForm.department" auto-complete="off"></el-input>
                <el-input type="hidden" v-model="dataForm.filepath" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
          <el-form-item label="附件" prop="filepath" required>
            <span>请上传签字或加盖公章的承诺书</span>
            <el-upload ref="upload" class="upload-demo" action="" multiple
              accept="image/png,image/gif,image/jpg,image/jpeg,pdf" :http-request="uploadFile" :limit=1
              :file-list="fileList" :auto-upload="false" :on-exceed="handleExceed" :on-change="handleBeforeUpload"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-button size="small" @click="downloadDemo">模板下载 </el-button>
          <el-button size="small" type="primary" @click="submitUpload">立即上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/PDF文件，且不超过5MB</div>
          <el-form-item prop="agreement">
            <el-checkbox v-model="agreement">我已阅读并同意</el-checkbox>
            <el-link type="primary" @click="agreementVisible=true" target="_blank">《CET用户注册协议》</el-link>
          </el-form-item>
        </el-form>
        <el-dialog title="CET评估程序用户注册协议" :visible.sync="agreementVisible" width="70%" :modal="false">
          <div style="margin:5px;">
            <agreement></agreement>
          </div>
          <el-button @click="agreementVisible = false">关 闭</el-button>
        </el-dialog>
        <div slot="footer" class="dialog-footer" style="text-align: center; height:10%">
          <el-button icon="el-icon-circle-close" @click="cance">取消</el-button>
          <el-button icon="el-icon-circle-check " @click="register">确认</el-button>
        </div>
      </el-dialog>
    </el-main>
    <el-dialog title="忘记密码" :visible.sync="passwordResetVisible" width="20%" :close-on-click-modal="false">
      <password-reset></password-reset>
    </el-dialog>
    <el-footer class="footer footer-div" height="60px">
      <div class="footer-div">
        <span class="footer-span">版权所有 © copyright 2020 生态环境部南京环境科学研究所. All rights reserved.</span>
        <span class="footer-span">地址：江苏省南京市蒋王庙8号 </span>
        <span class="footer-span">联系方式：025-85287057 </span>
        <span class="footer-span">版本号:V2.0</span>
      </div>
    </el-footer>
<!--    <div class="videoContainer">-->
<!--      <video class="fullscreenVideo" id="bgVid"  autoplay muted loop>-->
<!--        <source src="src/assets/video/CET登录背景.mov" type="video/mp4">-->
<!--        浏览器不支持video标签-->
<!--      </video>-->
<!--    </div>-->
  </el-container>


</template>

<script>
  import {
    mapState
  } from 'vuex'
  import Cookies from "js-cookie"
  import PasswordReset from './PasswordReset.vue'
  import Agreement from './Agreement.vue'
  import axios from "axios";
  import {
    baseUrl
  } from '@/utils/global'
  export default {
    name: 'Login',
    components: {
      Agreement,
      PasswordReset
    },
    data() {
      let reg = /^[A-Za-z0-9]{6,15}$/;
      let passreg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;
      var validateInput = (rule, value, callback) => {

        if (!reg.test(value)) {
          callback(new Error('用户名只能包括数字字母的组合，长度为6-15位'))
        } else {
          this.$api.user.checkUsernameExist({
            'username': value
          }).then((res) => {
            if (res.code == 100) {
              callback(new Error('用户名已存在'))
            } else {
              callback()
            }
          })
        }
      };
      var passwordInput = (rule, value, callback) => {
        if (!passreg.test(value)) {
          callback(new Error('密码必须由字母、数字组成，区分大小写，长度为8-18位'))
        } else {
          callback()
        }
      };
      var repeatpasswordInput = (rule, value, callback) => {
        if (value !== this.dataForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      };

      var checkEmail = (rule, value, callback) => {
        // 验证邮箱的正则表达式
        const regEmail = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/
        if (regEmail.test(value)) {
          this.$api.user.checkEmailExist({
            'email': value
          }).then((res) => {
            if (res.code == 100) {
              console.log(res)
              callback(new Error(res.msg))
            } else {
              callback()
            }
          })
          // 合法的邮箱
        } else {
          callback(new Error('请输入合法的邮箱！！'))

        }

      };




      return {
        loading: false,
        size: 'medium',
        imgurl: './pic/filedemo.jpg',

        dialogImageUrl: '',
        dialogVisible: false,
        formLabelWidth: '80px',
        limitNum: 3,
        form: {},


        loginForm: {
          account: '',
          password: '',
          captcha: '',
          src: '',
        },
        columns: [{
            prop: "id",
            label: "ID",
            minWidth: 40,
            hidden: true
          },
          {
            prop: "username",
            label: "用户名",
            minWidth: 50
          },
          {
            prop: "nickname",
            label: "姓名",
            minWidth: 50
          },
          {
            prop: "password",
            label: "密码",
            minWidth: 100
          },
          {
            prop: "repeatpassword",
            label: "确认密码",
            minWidth: 100
          },
          {
            prop: "positon",
            label: "职位",
            minWidth: 100
          },
          {
            prop: "phone",
            label: "电话号码",
            minWidth: 100
          },
          {
            prop: "email",
            label: "邮箱",
            minWidth: 100
          },
          {
            prop: "company",
            label: "公司",
            minWidth: 100
          },
          {
            prop: "department",
            label: "部门",
            minWidth: 100
          },
          {
            prop: "positon",
            label: "职位",
            minWidth: 100
          },
          {
            prop: "phone",
            label: "电话号码",
            minWidth: 100
          },
          {
            prop: "email",
            label: "邮箱",
            minWidth: 100
          },
          {
            prop: "company",
            label: "公司",
            minWidth: 100
          },
          {
            prop: "department",
            label: "部门",
            minWidth: 100
          },
          {
            prop: "sidentify",
            label: "验证码",
            minWidth: 100
          },
        ],
        fieldRules: {
          account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          sidentify: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        checked: true,
        dataFormRules: {
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              validator: validateInput,
              trigger: 'blur',
            },
          ],
          nickname: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }, ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              validator: passwordInput,
              trigger: 'blur'
            }
          ],
          repeatpassword: [{
              required: true,
              message: '请确认密码',
              trigger: 'blur'
            },
            {
              validator: repeatpasswordInput,
              trigger: 'blur'
            }

          ],


          email: [{
              required: true,
              type: 'email',
              message: '请输入正确邮箱',
              trigger: 'blur'
            },
            {
              validator: checkEmail,
              trigger: 'blur'
            }
          ],
          captcha: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }],

          mobile: [{
              required: true,
              message: '请输入合法手机号码',
              trigger: 'blur'
            }

          ],

          career: [{
            required: true,
            message: '请输入职业',
            trigger: 'blur'
          }],

          company: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          department: [{
            required: true,
            message: '请输入部门',
            trigger: 'blur'
          }],
          filepath: [{
            required: true,
            message: '请上传授权文件',
            trigger: 'blur'
          }],
        },
        // 新增编辑界面数据
        dataForm: {
          id: 0,
          name: '',
          nickname: '',
          password: '',
          repeatpassword: '',
          career: '',
          mobile: '',
          email: '',
          company: '',
          department: '',
          filepath: '',
        },
        agreement: false,
        agreementVisible: false,
        fileList: [],
        headers: {
          Authorization: localStorage.getItem("token")
        },


        passwordResetVisible: false
      }
    },

    methods: {

      login() {
        this.loading = true
        // let userInfo = {account:this.loginForm.account, password:this.loginForm.password, captcha:this.loginForm.captcha}
        let userInfo = {
          account: this.loginForm.account,
          password: this.loginForm.password
        }
        this.$api.login.login(userInfo).then((res) => {
          if (res.msg != null) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else {
            Cookies.set('token', res.data.token) // 放置token到Cookie
            sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
            sessionStorage.setItem('nickname', res.data.nickname) // 保存用户姓名到本地会话
            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            this.$router.push('/') // 登录成功，跳转到主页
          }
          this.loading = false
        }).catch((res) => {
          this.$message({
            message: res.message,
            type: 'error'
          })
        });
      },
      refreshCaptcha: function () {
        this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
      },
      showRegister() {
        //this.$refs.loginForm.resetFields()
        this.dialogVisible = true;
      },
      // 切换主题
      onThemeChange: function (themeColor) {
        this.$store.commit('setThemeColor', themeColor)
      },
      cance() {
        this.dialogVisible = false;
      },
      register: function () {

        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认注册吗?', '提示', {}).then(() => {
              this.editLoading = true
              let params = Object.assign({}, this.dataForm)
              if (this.agreement == false) {
                this.$message({
                  message: '请先勾选我已阅读并同意《CET评估程序用户注册协议》',
                  type: 'warning'
                })
                return
              }
              this.$api.user.add(params).then((res) => {
                this.editLoading = false
                if (res.code == 200) {
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
                } else {
                  this.$message({
                    message: '注册失败, ' + res.msg,
                    type: 'error'
                  })
                  this.editLoading = false
                }
              })
            })
          }
        })
      },
      showResetPassword: function () {
        this.passwordResetVisible = true
      },
      downloadhelp: function (){
        debugger
        this.$api.user.downloadhelp().then((res) => {
          var blob = new Blob([res])
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = '使用帮助.pdf'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
          this.$message({
            message: '下载成功',
            type: 'success'
          })

        })
      },
      uploadFile(param) {
        const fileObject = param.file;
        const formData = new FormData();
        formData.append('file', fileObject);
        axios.post(baseUrl + '/user/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message('文件上传成功')
            this.dataForm.filepath = res.data.msg;
            console.log(this.dataForm.filepath);
          } else {
            this.$message('上传失败，请重试')
          }
        })


      },
      //下载授权模板
      downloadDemo() {
        debugger
        this.$api.user.downloadDemo().then((res) => {
          var blob = new Blob([res])
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = '样例模板.doc'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
          this.$message({
            message: '下载成功',
            type: 'success'
          })

        })

      },

      // 上传文件之前的钩子
      handleBeforeUpload(file) {

        let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
        console.log(extension);

        if (!(extension === 'png' || extension === 'gif' || extension === 'jpg' || extension === 'jpeg' || extension ===
            'pdf')) {
          this.$notify.warning({
            title: '警告',
            message: '请上传格式为png、jpg、jpeg、pdf的文件'
          })
        }
        let size = file.size / 1024 / 1024 / 10;
        if (size > 2) {
          this.$notify.warning({
            title: '警告',
            message: '文件大小必须小于10M'
          })
        }
      },
      // 文件超出个数限制时的钩子
      handleExceed(files, fileList) {

      },
      // 文件列表移除文件时的钩子
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.dataForm.filepath = ''
      },
      // 点击文件列表中已上传的文件时的钩子
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitUpload() {
        this.$refs.upload.submit()
      },



    },
    mounted() {},
    computed: {
      ...mapState({
        themeColor: state => state.app.themeColor
      })
    }
  }

</script>

<style lang="scss" scoped>
.videoContainer{
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}

.videoContainer:before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25,29,34,.65);
}

.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 250px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }

    .abow_dialog {
      display: flex;
      justify-content: center;
      align-items: Center;
      overflow: hidden;

      .el-dialog {
        margin: 0 auto !important;
        height: 70%;
        overflow: hidden;

        .el-dialog__body {
          position: absolute;
          left: 0;
          top: 54px;
          bottom: 0;
          right: 0;
          padding: 0;
          z-index: 1;
          overflow: hidden;
          overflow-y: auto;
        }
      }
    }

  }


  .footer-div {
    margin: 0 auto;
    text-align: center;
  }

  .footer-span {
    display: block;
    float: left;
    margin-right: 100px;
  }

</style>
