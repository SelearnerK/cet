<template>
  <el-container>
    <el-main>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        height="600px"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="cas" label="CAS编号" width="120">
        </el-table-column>
        <el-table-column property="wzmc" label="物质名称" width="120">
        </el-table-column>
        <el-table-column property="fzs" label="分子式"> </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <div class="content" :active="active">
        <el-button style="margin-top: 12px" @click="next">下一步</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "SubstanceInformation",
  data() {
    return {
      active: 0,

      // 新增编辑界面数据
      tableData: null,
    };
  },
  mounted() {
    this.getInputList();
  },
  methods: {
    last() {
      this.active--;
    },
    next() {
        this.$emit("inputValue", val);
      this.$emit("listenChild");
    },
    getInputList() {
      this.$api.input.findAllInput().then((res) => {
       // console.log(res);
        this.tableData = res.data;
      });
    },
    handleCurrentChange(val) {
      this.$emit("inputValue", val);
      console.log(val);
    },
  },
};
</script>

<style scoped></style>
