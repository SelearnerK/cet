<template>
  <el-dialog title="修改密码" width="30%" :visible.sync="passwordVisible" :close-on-click-modal="false" :modal=false>
    <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
      <el-form-item label="旧密码" prop="" >
        <el-input type="password" v-model="dataForm.oldPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="">
        <el-input type="password" v-model="dataForm.newPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="">
        <el-input type="password" v-model="dataForm.confirmPassword" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button size="small"  @click="passwordVisible = false">取消</el-button>
            <el-button size="small"  type="primary" @click="changePassword">确认</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import axios from 'axios';
    export default {
      name: 'MessagePanel',
      data(){
        return {
          dataForm:{
            oldPassword:null,
            newPassword:null,
            confirmPassword:null,
          },
          passwordVisible:false,
          size: 'small',
          dataFormRules: {
            label: [
              { required: true, message: '请输入名称', trigger: 'blur' }
            ]
          },
        }
      },
      methods:{
        setPasswordVisible: function (passwordVisible) {
          this.passwordVisible = passwordVisible
        },
        changePassword:function () {
          //let params = Object.assign({}, this.dataForm)
          if(this.dataForm.newPassword != this.dataForm.confirmPassword){
            this.$message({
                message:'两次密码输入不一致',
                type: 'error'
              })
              return
          }
          this.$api.user.changePassword(this.dataForm).then((res)=>{
            if(res.code == 200) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.passwordVisible = false
            } else {
              
              this.$message({
                message: res.msg,
                type: 'error'
              })

            }

          })
        }
      }


    }
</script>

<style scoped>

</style>
