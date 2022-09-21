<template>
  <el-container>
    <el-header>
      <div style="margin-top: 15px">
        <el-row>
          <el-col :span="4">
            <el-input v-model="filters.label" placeholder="名称/CAS查询" @input="findPage(null)">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button @click="handleAdd" type="success">添加物质</el-button>
          </el-col>
          <el-col :span="1">
            <el-button @click="evaluate()" type="primary">评估</el-button>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <!--表格内容栏-->
    <el-main>
      <kt-table :height="720" ref="eletable" permsEdit="sys:input:edit" permsSaveAs="sys:input:saveas" permsDelete="sys:input:delete"
        :data="pageResult" :columns="columns" @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete"
        :showSaveAs=true @handleCurrentChange="handleCurrentChange" @handleSaveAs="saveAs">
      </kt-table>
    </el-main>
    <!--新增编辑界面-->
    <el-dialog :title="operation ? '添加' : '编辑'" width="50%" :visible.sync="editDialogVisible"
      :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="280px" :rules="dataFormRules" ref="dataForm" :size="size">
        <el-tabs tab-position="left">

          <el-form-item label="" prop="id" v-if="false">
            <el-input v-model="dataForm.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="wzmc" v-if="true">
            <el-input v-model="dataForm.wzmc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="CAS号" prop="cas" v-if="this.operation">
            <el-input v-model="dataForm.cas" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="mark" v-if="true">
            <el-input v-model="dataForm.mark" auto-complete="off"></el-input>
          </el-form-item>

        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="editDialogVisible = false">{{
            $t("action.cancel")
            }}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">
          {{ $t("action.submit") }}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import KtTable from "@/views/Core/KtTable";
  import KtButton from "@/views/Core/KtButton";
  import store from '@/store'
  import {
    format
  } from "@/utils/datetime";
  import NavBar from "@/views/NavBar/NavBar"
  import {
    mapState
  } from "vuex";
  import HeadBar from "../HeadBar/HeadBar";
  export default {
    name: "aaaaaa",
    components: {
      KtTable,
      KtButton,
      NavBar,
      HeadBar,
    },
    computed: {
      ...mapState({
        themeColor: state => state.app.themeColor,
        collapse: state => state.app.collapse,
        navTree: state => state.menu.navTree
      })
    },
    data() {
      return {
        size: "small",
        filters: {
          label: "",
        },
        columns: [
          // {
          //   prop: "id",
          //   label: "ID"
          // },
          {
            prop: "wzmc",
            label: "物质名称"
          },
          {
            prop: "cas",
            label: "CAS号"
          },
          {
            prop: "mark",
            label: "备注",
          },

        ],
        pageRequest: {
          pageNum: 1,
          pageSize: 10000
        },
        pageResult: {},
        currentSelect: null,
        operation: false, // true:新增, false:编辑
        editDialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        dataFormRules: {
          wzmc: [{
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }],
          cas: [{
            required: true,
            message: "请输入CAS号码",
            trigger: "blur"
          }],

        },
        // 新增编辑界面数据
        dataForm: {
          id: null,
          wzmc: null,
          cas: null,
          mark: null,
        },
        density: null,
      };
    },
    methods: {
      // 另存
      saveAs: function (params) {
        this.editDialogVisible = true;
        this.operation = true;
        this.dataForm = Object.assign({}, params.row);
      },
      // 获取分页数据
      findPage: function (data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest;
        }
        this.pageRequest.columnFilters = {
          label: {
            name: "label",
            value: this.filters.label
          },
        };
        this.$api.input
          .findPage(this.pageRequest)
          .then((res) => {
            this.pageResult = res.data;
          })
          .then(data != null ? data.callback : "");
      },
      // 批量删除
      handleDelete: function (data) {
        this.$api.input
          .batchDelete(data.params)
          .then(data != null ? data.callback : "");
          this.$emit('getCurrentElement', null);


      },
      handleCurrentChange: function (data) {
        this.currentSelect = data.val

      },
      evaluate: function () {
        if (this.currentSelect == null) {
          this.$message({
            message: '请先选择物质',
            type: 'warning'
          });
        } else {
          console.log('currentSelect' + this.currentSelect)
          this.$emit('getCurrentElement', this.currentSelect);
          this.$api.density.findByCas({
            cas: this.currentSelect.cas
          }).then((res) => {
            store.commit('setDensity', res.data)
          })
          this.$api.parameter.findByCas({
            cas: this.currentSelect.cas
          }).then((res) => {
            store.commit('setParameter', res.data)
          })
          this.$store.commit("setCas", this.currentSelect.cas);
          this.$store.commit("setWzmc", this.currentSelect.wzmc);
        }
      },
      // 显示新增界面
      handleAdd: function () {
        this.editDialogVisible = true;
        this.operation = true;
        this.dataForm = {
          id: null,
          name: null,
          cas: null,
          mark: null,
        };
      },
      // 显示编辑界面
      handleEdit: function (params) {
        this.editDialogVisible = true;
        this.operation = false;
        this.dataForm = Object.assign({}, params.row);
      },
      // 编辑
      submitForm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.editLoading = true;
              let params = Object.assign({}, this.dataForm);
              this.$api.input.save(params).then((res) => {
                if (res.code == 200) {
                  this.$message({
                    message: "操作成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "操作失败, " + res.msg,
                    type: "error",
                  });
                }
                this.editLoading = false;
                // this.$refs["dataForm"].resetFields();
                this.editDialogVisible = false;
                this.findPage(null);
              });
            });
          }
        });
      },
      // 时间格式化
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property]);
      },
    },
    mounted() {

    },
    updated() {
    },
  };

</script>

<style scoped lang="scss">

</style>
