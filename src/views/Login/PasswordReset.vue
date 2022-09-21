<template>
  <div style="width:345px;">
    <el-form :model="resetPasswordForm" ref="resetPasswordForm" :rules="rules">
      <el-form-item prop="email">
        <el-input placeholder="注册邮箱" v-model="resetPasswordForm.email">
          <template slot="prepend"><i class="el-icon-message"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input placeholder="验证码" v-model="resetPasswordForm.verifyCode">
          <template slot="prepend"><i class="el-icon-s-promotion"></i></template>
          <el-button slot="append" @click="sendCode('resetPasswordForm')" :disabled="sendBtnFlag">{{sendBtnText}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input placeholder="新密码" v-model="resetPasswordForm.newPassword" show-password>
          <template slot="prepend"><i class="el-icon-edit"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input placeholder="确认新密码" v-model="resetPasswordForm.confirmPassword" show-password>
          <template slot="prepend"><i class="el-icon-edit"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-top: 12px;" @click="resetPassword('resetPasswordForm')">提 交</el-button>
        <el-button style="margin-top: 12px;" @click="resetForm('resetPasswordForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'PasswordReset',

    data() {
      return {
        rules: {
          email: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: ['blur', 'change']
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ],
          verifyCode: [{
            required: true,
            message: '请输入正确的验证码',
            trigger: 'change'
          }],
          newPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'change'
          }],
          confirmPassword: [{
            required: true,
            message: '请再次输入新密码',
            trigger: 'change'
          }],
        },
        resetPasswordForm: {
          email: '',
          verifyCode: '',
          newPassword: '',
          confirmPassword: ''
        },
        sendBtnFlag: false,
        sendBtnText: '发送验证码'

      }
    },
    methods: {
      resetPassword(formName) {
        if (this.resetPasswordForm.newPassword != this.resetPasswordForm.confirmPassword) {
          this.$message({
            message: '两次密码输入不一致',
            type: 'warning'
          });
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.login.resetPassword(
              this.resetPasswordForm
            ).then((res) => {
              if (res.code == 200) {
                  this.$message({
                  message: '密码重置成功，请重新登录',
                  type: 'success'

                });

              } else {
                this.$message({
                  message: '验证码错误',
                  type: 'warning'
                });
              }
            })
          } else {
            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      sendCode(formName) {
        this.$refs[formName].validateField('email',(err) => {
          console.log(err)
        })

        this.$api.login.sendEmail({
          email: this.resetPasswordForm.email
        }).then((res) => {
          if (res.code == 200) {
            this.$message('验证码已发送，请注意查收邮件');
            const _this = this;
        this.sendBtnFlag = true
        let time = 60; //定义时间变量 150s
        let timer = null; //定义定时器
        timer = setInterval(function () {
          if (time == 0) {
            _this.sendBtnText = "重新获取验证码";
            _this.sendBtnFlag = false;
            clearInterval(timer); //清除定时器
          } else {
            _this.sendBtnText = time + "秒后重新获取";
            time--;
          }
        }, 1000)
          } else {
            this.$message({
              message: '该用户不存在',
              type: 'warning'
            });
          }
        })
                
      }

    },
    watch: {

    },
    mounted() {

    }
  }

</script>
