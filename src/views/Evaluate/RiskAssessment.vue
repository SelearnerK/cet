<template>
  <div id="app">
    <h1>风险评估</h1>

  <div class="content">

      <el-form
        ref="form"
        :model="form"
        label-width="280px"
      >
        <el-row>
        <el-col :span="6"> <h3>环境风险表征</h3></el-col></el-row>
        <br>
      <el-form-item
        style=" width: 100%;"
        label="STP风险表征值："
        prop="pecstpPnec">
        <el-col :span="6"><el-input v-model="form.pecstpPnec" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">STP风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.pecstpRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

    <el-form-item
      style="width: 100%;"
      label="地表水风险表征值："
      prop="peclocalWaterPnec">
      <el-col :span="6"><el-input v-model="form.peclocalWaterPnec" style="width: 60%;" auto-complete="off"></el-input></el-col>
      <el-col :span="3">地表水风险商：</el-col>
      <el-col :span="6"><el-input v-model="form.peclocalWaterRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
    </el-form-item>

      <el-form-item
        style="width: 100%;"
        label="沉积物风险表征值："
        prop="peclocalSedPnec">
        <el-col :span="6"> <el-input v-model="form.peclocalSedPnec" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">沉积物风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.peclocalSedRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

      <el-form-item
        style="width: 100%;"
        label="土壤风险表征值："
        prop="peclocalSoil30Pnec">
        <el-col :span="6"> <el-input v-model="form.peclocalSoil30Pnec" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">土壤风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.peclocalSoil30Rcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

      <el-form-item
        style="width: 100%;"
        label="地下水风险表征值："
        prop="peclocalGrwPnec">
        <el-col :span="6"><el-input v-model="form.peclocalGrwPnec" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">地下水风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.peclocalGrwRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

      <el-form-item
        style="width: 100%;"
        label="水生捕食动物风险表征值："
        prop="pecaquPredatorPnec">
        <el-col :span="6"><el-input v-model="form.pecaquPredatorPnec" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">水生捕食动物风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.pecaquPredatorRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

      <el-form-item
        style="width: 100%;"
        label="陆生捕食动物风险表征值："
        prop="pecterPredatorPnec">
        <el-col :span="6"><el-input v-model="form.pecterPredatorPnec" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">陆生捕食动物风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.pecterPredatorRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="6"> <h3>健康风险表征</h3></el-col></el-row>
      <el-form-item
        style="width: 100%;"
        label="吸入风险表征值："
        prop="addinhDnel">
        <el-col :span="6"><el-input v-model="form.addinhDnel" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">吸入风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.addinhRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

      <el-form-item
        style="width: 100%;"
        label="饮水风险表征值："
        prop="addoralWaterDnel">
        <el-col :span="6"> <el-input v-model="form.addoralWaterDnel" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">饮水风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.addoralWaterRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

      <el-form-item
        style="width: 100%;"
        label="经口摄食（鱼）风险表征值："
        prop="addoralFoodDnel">
        <el-col :span="6"> <el-input v-model="form.addoralFoodDnel" style="width: 60%;" auto-complete="off"></el-input></el-col>
        <el-col :span="3">经口摄食（鱼）风险商：</el-col>
        <el-col :span="6"><el-input v-model="form.addoralFoodRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

        <el-form-item
        style="width: 100%;"
        label="不同途径总暴露量风险表征值："
        prop="addtDnel">
          <el-col :span="6"><el-input v-model="form.addtDnel" style="width: 60%;" auto-complete="off"></el-input></el-col>
          <el-col :span="3">不同途径总暴露量风险商：</el-col>
          <el-col :span="6"><el-input v-model="form.addtRcr" style="width: 50%;" auto-complete="off" :disabled=true></el-input></el-col>
      </el-form-item>

    </el-form>
      <div slot="footer" class="dialog-footer">
<!--        //<el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>-->

      <el-button style="margin-top: 12px;" @click="last">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="complete" >评估</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
      label: "",
      size: "small",
      editDialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      result:{},
      form:{
        cas:"",
        pecstp:"",
        peclocalWater:"",
        peclocalSed:"",
        peclocalSoil30:"",
        peclocalGrw:"",
        pecaquPredator:"",
        pecterPredator:"",
        addinh:'',
        addoralWater:"",
        addoralFood:"",
        addt:"",
        pecstpPnec:"",
        pecstpRcr:"",
        peclocalWaterPnec:"",
        peclocalWaterRcr:"",
        peclocalSedPnec:"",
        peclocalSedRcr:"",
        peclocalSoil30Pnec:"",
        peclocalSoil30Rcr:"",
        peclocalGrwPnec:"",
        peclocalGrwRcr:"",
        pecaquPredatorPnec:"",
        pecaquPredatorRcr:"",
        pecterPredatorPnec:"",
        pecterPredatorRcr:"",
        addinhDnel:"",
        addinhRcr:"",
        addoralWaterDnel:"",
        addoralWaterRcr:"",
        addoralFoodDnel:"",
        addoralFoodRcr:"",
        addtDnel:"",
        addtRcr:"",
      },
    }
  },
  methods:{
    last() {
      this.$emit('goBack');
    },
    assessment(){
      this.$emit('assessment');
    },
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.columnFilters = {
        label: { name: "label", value: this.filters.label },
      };
      this.$api.input
        .findPage(this.pageRequest)
        .then((res) => {
          this.pageResult = res.data;
        })
        .then(data != null ? data.callback : "");
    },
    submitForm: function () {
      console.log("form:",this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.form);
            this.$api.output.save(params).then((res) => {
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
              this.editLoading = false;
              this.$refs["form"].resetFields();
              this.editDialogVisible = false;
              this.findPage(null);
            });
          });
        }
      });
    },
    select(){
      let cas = {cas:this.form.cas};
      this.$api.output.findByCas(cas).then((res) =>{
        if(res.data!=null){
          console.log("cas:",res.data)
          this.form.pecstp = res.data.pecstp;
          this.form.peclocalWater = res.data.peclocalWater;
          this.form.peclocalSed = res.data.peclocalSed;
          this.form.peclocalSoil30 = res.data.peclocalSoil30;
          this.form.peclocalGrw = res.data.peclocalGrw;
          this.form.pecaquPredator = res.data.pecaquPredator;
          this.form.pecterPredator = res.data.pecterPredator;
          this.form.addinh = res.data.addinh;
          this.form.addoralWater = res.data.addoralWater;
          this.form.addoralFood = res.data.addoralFood;
          this.form.addt = res.data.addt;
        }
        else{
          this.$message("您输入物质编号不存在");
        }
      });
    },
    complete(){
      this.result = this.$store.getters.getOutput;
      console.log("result:",this.result);
      this.form.pecstp = this.result.pecstp;
      this.form.peclocalWater = this.result.peclocalWater;
      this.form.peclocalSed = this.result.peclocalSed;
      this.form.peclocalSoil30 = this.result.peclocalSoil30;
      this.form.peclocalGrw = this.result.peclocalGrw;
      this.form.pecaquPredator = this.result.pecaquPredator;
      this.form.pecterPredator = this.result.pecterPredator;
      this.form.addinh = this.result.addinh;
      this.form.addoralWater = this.result.addoralWater;
      this.form.addoralFood = this.result.addoralFood;
      this.form.addt = this.result.addt;
      if(this.form.pecstpPnec!=""){
        this.form.pecstpRcr = parseFloat(this.form.pecstp) / parseFloat(this.form.pecstpPnec);
      }
      if(this.form.peclocalWaterPnec!=""){
        this.form.peclocalWaterRcr = parseFloat(this.form.peclocalWater) / parseFloat(this.form.peclocalWaterPnec);
      }
      if(this.form.peclocalSedPnec!=""){
        this.form.peclocalSedRcr = parseFloat(this.form.peclocalSed) / parseFloat(this.form.peclocalSedPnec);
      }
      if(this.form.peclocalSoil30Pnec!=""){
        this.form.peclocalSoil30Rcr = parseFloat(this.form.peclocalSoil30) / parseFloat(this.form.peclocalSoil30Pnec);
      }
      if(this.form.peclocalSoil30Pnec!=""){
        this.form.peclocalGrwRcr = parseFloat(this.form.peclocalGrw) / parseFloat(this.form.peclocalSoil30Pnec);
      }
      if(this.form.pecaquPredatorPnec!=""){
        this.form.pecaquPredatorRcr = parseFloat(this.form.pecaquPredator) / parseFloat(this.form.pecaquPredatorPnec);
      }
      if(this.form.pecterPredatorPnec!=""){
        this.form.pecterPredatorRcr = parseFloat(this.form.pecterPredator) / parseFloat(this.form.pecterPredatorPnec);
      }
      if(this.form.addinhDnel!=""){
        this.form.addinhRcr = parseFloat(this.form.addinh) / parseFloat(this.form.addinhDnel);
      }
      if(this.form.addoralWaterDnel!=""){
        this.form.addoralWaterRcr = parseFloat(this.form.addoralWater) / parseFloat(this.form.addoralWaterDnel);
      }
      if(this.form.addoralFoodDnel!=""){
        this.form.addoralFoodRcr = parseFloat(this.form.addoralFood) / parseFloat(this.form.addoralFoodDnel);
      }
      if(this.form.addtDnel!=""){
        this.form.addtRcr  = parseFloat(this.form.addt) / parseFloat(this.form.addtDnel);
      }
      if(this.form.pecstpRcr>1){
        this.$message("STP暴露有风险");
      }
      if(this.form.peclocalWaterRcr>1){
        this.$message("地表水暴露有风险");
      }
      if(this.form.peclocalSedRcr>1){
        this.$message("沉积物暴露有风险");
      }
      if(this.form.peclocalSoil30Rcr>1){
        this.$message("土壤暴露有风险");
      }
      if(this.form.peclocalGrwRcr>1){
        this.$message("地下水暴露有风险");
      }
      if(this.form.pecaquPredatorRcr>1){
        this.$message("水生捕食动物暴露有风险");
      }
      if(this.form.pecterPredatorRcr>1){
        this.$message("陆生捕食动物暴露有风险");
      }
      if(this.form.addinhRcr>1){
        this.$message("吸入暴露有风险");
      }
      if(this.form.addoralWaterRcr>1){
        this.$message("饮水暴露有风险");
      }
      if(this.form.addoralFoodRcr>1){
        this.$message("经口摄食（鱼）暴露有风险");
      }
      if(this.form.addtRcr>1){
        this.$message("不同途径总暴露量暴露有风险");
      }
     },
  },
};
</script>


<style scoped lang="scss">
  .content{
    position:absolute;
    top:100px;
    left:5%;
    right:5%;
  .font {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  }
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #484a4d;
  /* background:  #b6bbbb21; */
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
