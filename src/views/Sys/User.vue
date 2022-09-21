<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.label" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:role:view" type="primary"
            @click="findPage(null)" />
        </el-form-item>
        <!-- <el-form-item>
          <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:add" type="primary"
                     @click="handleAdd"/>
        </el-form-item> -->
      </el-form>
    </div>

    <!--表格内容栏-->
    <kt-table :height="650" permsNotify="sys:user:notify" permsEdit="sys:user:edit" permsDelete="sys:user:delete"
      :data="pageResult" :columns="columns" @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete"
      @handleNotify="handleNotify" :showNotify=true>
    </kt-table>
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
        label-position="right">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="!operation" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="currentUserStatus">
          <el-radio-group v-model="dataForm.status">
            <el-radio-button label="0" value="0">待审核</el-radio-button>
            <el-radio-button label="1" value="1">正 常</el-radio-button>
            <el-radio-button label="2" value="2">停 用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dataForm.username" :disabled="!operation" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input v-model="dataForm.password" :disabled="!operation" type="password" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="职位" prop="career">
          <el-input v-model="dataForm.career" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="dataForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="dataForm.company" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="dataForm.department" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="mobile">
          <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click="downloadProve">下载审核文件</el-button>
        <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submit" :loading="editLoading">
          {{$t('action.submit')}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="发送邮件" width="40%" :visible.sync="notifyVisible" :close-on-click-modal="false">
      <el-form :model="email" label-width="80px" :rules="emailRules" ref="email" :size="size" label-position="right">

        <el-form-item label="标题" prop="title">
          <el-input v-model="email.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="career">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="email.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="notifyVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="sendEmail" :loading="editLoading">
          发送
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import KtTable from "@/views/Core/KtTable"
  import KtButton from "@/views/Core/KtButton"

  import {
    format
  } from "@/utils/datetime"

  export default {
    components: {
      KtTable,
      KtButton,
    },
    data() {
      let reg = /^[A-Za-z0-9]{6,15}$/;
      var validateInput = (rule, value, callback) => {
        if (!reg.test(value)) {
          callback(new Error('用户名只能包括数字字母的组合，长度为6-15位'))
        } else {
          callback()
        }
      }
      return {
        size: 'small',
        currentUserStatus: 0,
        notifyVisible: false,
        filters: {
          label: ''

        },

        columns: [

        ],
        pageRequest: {
          pageNumber: 1,
          pageSize: 10
        },
        pageResult: {},
        email: {},
        emailRules: {
          title: [{
            message: '请输入标题',
            trigger: 'blur'
          }],
          content: [{
            message: '请输入内容',
            trigger: 'blur'
          }],
        },
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        notifyDialogVisible: false,
        dataFormRules: {
          username: [{
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              validator: validateInput,
              trigger: 'blur'
            }
          ],
          password: [{
            message: '请输入密码',
            trigger: 'blur'
          }],
          nickname: [{
            message: '请输入姓名',
            trigger: 'blur'
          }],
          email: [{
            type: 'email',
            message: '请输入正确邮箱',
            trigger: 'blur'
          }]

        },
        // 新增编辑界面数据
        dataForm: {
          id: 0,
          name: '',
          password: '123456',
          nickname: '小明',
          province: '',
          city: '',
          area: '',
          address: '西北农林科技大学信息工程学院',
          email: 'swan1861@163.com',
          mobile: '12345678',
          status: 1,
          gmtCreate: null,
          department: '',
        },
      }
    },
    methods: {
      // 获取分页数据
      sendEmail: function () {

        this.$api.user.sendEmail(this.email).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.notifyVisible = false
        })
      },
      handleNotify: function (data) {
        this.notifyVisible = true
        this.email.toEmail = data.row.email
      },
      downloadProve: function () {
        let param = {
          'username': this.dataForm.username
        }
        this.$api.user.downloadProve(param).then((res) => {
          var blob = new Blob([res])
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          let fileType = this.getFileType(this.dataForm.filepath)

          downloadElement.download = this.dataForm.username + fileType; //下载后文件名

          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象 
        })
      },
      getFileType(filePath) {
        let index = filePath.lastIndexOf('.')
        let fileType = filePath.slice(index)
        console.log(fileType)
        return fileType
      },
      findPage: function (data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest.columnFilters = {
          label: {
            name: "label",
            value: this.filters.label
          },
        };
        //this.pageRequest.username = this.filters.label
        this.$api.user.findPage(this.pageRequest).then((res) => {
          this.pageResult = res.data
          //this.findUserRoles()
        }).then(data != null ? data.callback : '')
      },
      // 加载用户角色信息
      findUserRoles: function () {
        this.$api.role.findAll().then((res) => {
          // 加载角色集合
          this.roles = res.data
        })
      },
      // 批量删除
      handleDelete: function (data) {
        this.$api.user.batchDelete(data.params).then(data != null ? data.callback : '')
      },
      // 显示新增界面
      handleAdd: function () {
        this.dialogVisible = true;
        this.operation = true;
        this.dataForm = {
          username: '',
          password: '',
          nickname: '',
          address: '',
          email: '',
          mobile: '',
          role: 1,
          status: 1
        }
      },
      // 显示编辑界面
      handleEdit: function (params) {
        this.dialogVisible = true
        this.operation = false
        this.dataForm = Object.assign({}, params.row)
      },
      submit: function () {
        if (this.operation) {
          this.addSubmit()
        } else {
          this.updateSubmit()
        }
      },
      // 新增
      addSubmit: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认添加吗？', '提示', {}).then(() => {
              this.editLoading = true
              this.dataForm.status = this.currentUserStatus
              let params = Object.assign({}, this.dataForm)

              this.$api.user.add(params).then((res) => {
                this.editLoading = false
                if (res.code == 200) {
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  })
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
                } else {
                  this.$message({
                    message: '操作失败, ' + res.msg,
                    type: 'error'
                  })
                  this.editLoading = false
                }
                this.findPage(null)
              })
            })
          }
        })
      },
      // 编辑
      updateSubmit: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认修改吗？', '提示', {}).then(() => {
              this.editLoading = true
              let params = Object.assign({}, this.dataForm)

              this.$api.user.update(params).then((res) => {
                this.editLoading = false
                if (res.code == 200) {
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  })
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
                } else {
                  this.$message({
                    message: '操作失败, ' + res.msg,
                    type: 'error'
                  })
                  this.editLoading = false
                }
                this.findPage(null)
              })
            })
          }
        })
      },
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property])
      },
      statusFormat: function (row, column, cellValue, index) {
        switch (cellValue) {
          case 0:
            return '待审核'
            break
          case 1:
            return '正 常'
            break
          case 2:
            return '停 用'
            break
          default:
            return '停 用'
        }

      },
      // 处理表格列过滤显示
      initColumns: function () {
        this.columns = [
          // {prop: "id", label: "ID", minWidth: 40,hidden:true},
          {
            prop: "username",
            label: "用户名",
            minWidth: 50
          },
          {
            prop: "nickname",
            label: "姓名",
            minWidth: 100
          },
          {
            prop: "company",
            label: "公司",
            minWidth: 100
          },
          {
            prop: "status",
            label: "状态",
            minWidth: 60,
            formatter: this.statusFormat
          },
          {
            prop: "gmtCreate",
            label: "创建时间",
            minWidth: 120,
            formatter: this.dateFormat
          }
        ];
      }

    },
    mounted() {
      this.initColumns()
    }
  }

</script>

<style scoped>

</style>
