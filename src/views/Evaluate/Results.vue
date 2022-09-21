<template>
<div>
  <div class="emission-left">

    <el-menu
      :default-active="minIndex"
      @open="handleOpen"
      @close="handleClose"
      style="width: 240px;">

      <el-submenu index="2">
        <template slot="title">
          <span>暴露场景</span>
        </template>

        <el-scrollbar
          wrapClass="scrollbar-wrap"
          :style="{height: scrollHeight}"
          ref="scrollbarContainer">
        <el-menu-item :index="(index +'')" v-for="(item,index) in this.results" :key="index" @click="showResults(item,index)"><span>{{item.lifeCycle}}：{{item.title}}</span>
        </el-menu-item>
        </el-scrollbar>

      </el-submenu>
    </el-menu>
  </div>

  <div class="result-content">

    <!--环境暴露-->
    <el-tag class="current-tag"><b>当前物质：</b>{{this.result.wzmc}}</el-tag>
    <div v-if="this.userName !== 'admin'">

      <el-form
        :model="result"
        label-width="480px"
        ref="result"
      >
        <el-tabs  style="height: 600px">

            <el-card class="box-card">
              <div style="padding-top: 0; margin-bottom: 20px;">
                <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                  <div style="display:inline-block; text-align: center; ">
                    <h3>环境暴露评估结果</h3>
                  </div>
                </div>
              </div>
            <el-form-item label="" prop="id" v-if="false">
              <el-input v-model="result.id" auto-complete="off"> </el-input>
            </el-form-item>

            <el-row>
              <el-col :span="16">
                <el-form-item label="STP(PECstp)" prop="pecstp" v-if="true">
                  <el-input v-model="result.pecstp"  auto-complete="off" readonly="readonly" ><template slot="append">mg/L</template> </el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="地表水(PEClocal.water)" prop="peclocalWater" v-if="true" >
                  <el-input v-model="result.peclocalWater " auto-complete="off" readonly="readonly"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>



            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="沉积物(PEClocal.sed)" prop="peclocalSed" v-if="true">
                  <el-input v-model="result.peclocalSed " auto-complete="off" readonly="readonly"><template slot="append">mg/kg</template></el-input>
                </el-form-item>
              </el-col>



            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="土壤(PEClocal.soil,30)" prop="peclocalSoil30" v-if="true">
                  <el-input v-model="result.peclocalSoil30 " auto-complete="off" readonly="readonly" ><template slot="append">mg/kg</template></el-input>
                </el-form-item>
              </el-col>


            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="地下水(PEClocal.grw)" prop="peclocalGrw" v-if="true">
                  <el-input v-model="result.peclocalGrw " auto-complete="off" readonly="readonly"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>



            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="水生捕食动物(PECaqu,predator)" prop="pecaquPredator" v-if="true">
                  <el-input v-model="result.pecaquPredator " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="陆生捕食动物(PECter,predator)" prop="pecterPredator" v-if="true">
                  <el-input v-model="result.pecterPredator " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>


            </el-row>
            </el-card>

        </el-tabs>
      </el-form>
    </div>

    <!--管理员-->

    <div v-if="this.userName === 'admin'">

      <el-form
        :model="result"
        label-width="280px"
        ref="result"
      >
        <el-tabs  style="height: 600px">

            <el-card class="box-card">
              <div style="padding-top: 0; margin-bottom: 20px;">
                <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                  <div style="display:block; text-align: center; ">
                    <div style="width:100%;">
                      <el-row>
                        <el-col :span="7" style="width: 50%; "> <h3>环境暴露评估结果</h3></el-col>
                        <el-col :span="7" style="width: 50%; " > <h3>环境风险表征(风险商)</h3></el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>

            <el-form-item label="" prop="id" v-if="false">
              <el-input v-model="result.id" auto-complete="off"> </el-input>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="STP(PECstp)" prop="pecstp" v-if="true">
                  <el-input v-model="result.pecstp "  auto-complete="off" readonly="readonly" ><template slot="append">mg/L</template> </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="STP" prop="pecstppnec" v-if="true">
                  <el-input v-model="result.pecstpRcr"  auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="地表水(PEClocal.water)" prop="peclocalWater" v-if="true" >
                  <el-input v-model="result.peclocalWater " auto-complete="off" readonly="readonly"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="地表水" prop="peclocalWaterpnec" v-if="true" >
                  <el-input v-model="result.peclocalWaterRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="沉积物(PEClocal.sed)" prop="peclocalSed" v-if="true">
                  <el-input v-model="result.peclocalSed " auto-complete="off" readonly="readonly"><template slot="append">mg/kg</template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="沉积物" prop="peclocalSedpnec" v-if="true">
                  <el-input v-model="result.peclocalSedRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="土壤(PEClocal.soil,30)" prop="peclocalSoil30" v-if="true">
                  <el-input v-model="result.peclocalSoil30 " auto-complete="off" readonly="readonly" ><template slot="append">mg/kg</template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="土壤" prop="peclocalSoil30pnec" v-if="true">
                  <el-input v-model="result.peclocalSoil30Rcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="地下水(PEClocal.grw)" prop="peclocalGrw" v-if="true">
                  <el-input v-model="result.peclocalGrw " auto-complete="off" readonly="readonly"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="地下水" prop="peclocalGrwpnec" v-if="true">
                  <el-input v-model="result.peclocalGrwRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="水生捕食动物(PECaqu,predator)" prop="pecaquPredator" v-if="true">
                  <el-input v-model="result.pecaquPredator " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="水生捕食动物" prop="pecaquPredatorpnec" v-if="true">
                  <el-input v-model="result.pecaquPredatorRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="陆生捕食动物(PECter,predator)" prop="pecterPredator" v-if="true">
                  <el-input v-model="result.pecaquPredator " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="陆生捕食动物" prop="pecterPredatorpnec" v-if="true">
                  <el-input v-model="result.pecterPredatorRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            </el-card>

        </el-tabs>
      </el-form>
    </div>



    <!--健康暴露-->

    <div v-if="this.userName !== 'admin'">

      <el-form
        :model="result"
        label-width="480px"
        ref="result"
      >
        <el-tabs tab-position="top" style="height: 600px" >

          <el-card class="box-card">
          <div style="padding-top: 0; margin-bottom: 20px;">
            <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
              <div style="display:inline-block; text-align: center; ">
                <h3>健康暴露评估结果</h3>
              </div>
            </div>
          </div>

            <el-row>
              <el-col :span="16">
                <el-form-item label="吸入(ADDinh)" prop="addinh" v-if="true">
                  <el-input v-model="result.addinh" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="饮水(ADDoral-water)" prop="addoralWater" v-if="true">
                  <el-input v-model="result.addoralWater " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="经口摄食(鱼)(ADDoral-food )" prop="addoralFood" v-if="true">
                  <el-input v-model="result.addoralFood " auto-complete="off" readonly="readonly" ><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                  <el-input v-model="result.addt " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>


            </el-row>
          </el-card>
        </el-tabs>
      </el-form>
    </div>

    <!--管理员-->

    <div v-if="this.userName === 'admin'">

      <el-form
        :model="result"
        label-width="280px"
        ref="result"
      >
        <el-tabs tab-position="top" style="height: 600px" >
          <el-card class="box-card">
            <div style="padding-top: 0; margin-bottom: 20px;">
              <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                <div style="display:block; text-align: center; ">
                  <div style="width:100%;">
                    <el-row>
                      <el-col :span="7" style="width: 50%; "> <h3>健康暴露评估结果</h3></el-col>
                      <el-col :span="7" style="width: 50%; " > <h3>健康风险表征(风险商)</h3></el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="吸入(ADDinh)" prop="addinh" v-if="true">
                  <el-input v-model="result.addinh" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="吸入" prop="addinh" v-if="true">
                  <el-input v-model="result.addinhRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="饮水(ADDoral-water)" prop="addoralWater" v-if="true">
                  <el-input v-model="result.addoralWater " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="饮水" prop="addoralWater" v-if="true">
                  <el-input v-model="result.addoralWaterRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经口摄食(鱼)(ADDoral-food )" prop="addoralFood" v-if="true">
                  <el-input v-model="result.addoralFood " auto-complete="off" readonly="readonly" ><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="经口摄食(鱼)" prop="addoralFood" v-if="true">
                  <el-input v-model="result.addoralFoodRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                  <el-input v-model="result.addt " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                  <el-input v-model="result.addtRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-tabs>
      </el-form>
    </div>



  </div>
  </div>
</template>

<script>
  export default {
    name: "AllResutls",

    data(){
      return{
        scrollHeight: '100%',
        minIndex: '',
        userName: '',
        results: [],
        result: {
          id: null,
          cas: null,
          wzmc: '',
          pecstp: null,
          peclocalWater: null,
          peclocalSed: null,
          peclocalSoil30: null,
          peclocalGrw: null,
          pecaquPredator: null,
          pecterPredator: null,
          addinh: null,
          addoralWater: null,
          addoralFood: null,
          addt: null,
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
        size: "small",
        dataFormRules: {
          label: [{ required: true, message: "请输入名称", trigger: "blur" }],
        },
      }
    },
    mounted(){
      this.userName = sessionStorage.getItem("user");
      this.scrollHeight = window.innerHeight* 0.835 + 'px';
    },
    created(){
      this.result.wzmc=this.$store.getters.getWzmc;
      this.result.cas = this.$store.getters.getCas;
      console.log("application:",this.result.cas);
      let cas = {cas:this.result.cas,};
      this.$api.output.findByCas(cas).then((res) => {
        if(res.data.length > 0){
          console.log("emissions:",res.data);
          this.results = res.data;
          if(this.$store.getters.getId !== ''){
            this.minIndex = this.$store.getters.getId + '';
            this.showResults(this.results[this.$store.getters.getId],this.$store.getters.getId);
          }
          else{
            this.minIndex = this.results.length-1 + '';
            this.showResults(this.results[this.results.length-1],this.results.length-1);
          }

        }
      });
    },
    computed: {
      flag() {
        return this.$store.getters.getFlag;
      },
      casWatch(){
        return this.$store.getters.getCas;
      },
      wzmcWatch(){
        return this.$store.getters.getWzmc;
      },
      idWatch(){
        return this.$store.getters.getId;
      },
    },
    watch:{
      idWatch: function(newVal, oldValue) {
        if(newVal !== ''){
          this.minIndex = newVal + '';
          this.showResults(this.results[newVal],newVal);
        }
      },
      wzmcWatch: function(newVal, oldVal){
        this.result.wzmc = newVal;
      },
      casWatch: function (newVal, oldVal){
         /* this.$store.commit('setId',0);*/
        this.result.cas = this.$store.getters.getCas;
        console.log("application:",this.result.cas);
        let cas = {cas:this.result.cas};
        this.$api.output.findByCas(cas).then((res) => {
          if(res.data.length > 0){
            console.log("emissions:",res.data);
            this.results = res.data;
            /*if(this.$store.getters.getId !== ''){
              this.minIndex = this.$store.getters.getId + '';
              this.showResults(this.results[this.$store.getters.getId],this.$store.getters.getId);
            }
            else{*/
              this.minIndex = this.results.length-1 + '';
              this.showResults(this.results[this.results.length-1],this.results.length-1);
           /* }*/
          }
          else if(res.data.length === 0){
            this.results = res.data;
          }
        });
      },
      flag: function (newVal, oldVal) {
        this.result.cas = this.$store.getters.getCas;
        console.log("application:",this.result.cas);
        let cas = {cas:this.result.cas};
        this.$api.output.findByCas(cas).then((res) => {
          if(res.data.length > 0){
            console.log("emissions:",res.data);
            this.results = res.data;
            if(this.$store.getters.getId !== ''){
              this.minIndex = this.$store.getters.getId + '';
              this.showResults(this.results[this.$store.getters.getId],this.$store.getters.getId);
            }
            else{
              this.minIndex = this.results.length-1 + '';
              this.showResults(this.results[this.results.length-1],this.results.length-1);
            }
          }
        });
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      NumberJudge(para){
        let n = 0;
        if(para != null) {
          if (para < 0.001 && para != 0) {
            for (; para < 1;) {
              para = para * 10;
              n++;
            }
            para = Number(para.toPrecision(3));
            return (para + 'E-' + n);
          } else if (para > 0.001 && para < 100) {
            return (Number(para.toPrecision(3)));
          } else if (para > 100) {
            return (Number(para.toFixed(0)));
          } else if (para === 0) {
            return 0;
          }
        }
        else{
          return '';
        }
      },
      showResults(item,sceneid){
        this.result.id = item.id;
       /* this.$store.commit('setId',sceneid);*/
        this.result.pecstp = this.NumberJudge(item.pecstp);
        this.result.peclocalWater = this.NumberJudge(item.peclocalWater);
        this.result.peclocalSed = this.NumberJudge(item.peclocalSed);
        this.result.peclocalSoil30 = this.NumberJudge(item.peclocalSoil30);
        this.result.peclocalGrw = this.NumberJudge(item.peclocalGrw);
        this.result.pecaquPredator = this.NumberJudge(item.pecaquPredator);
        this.result.pecterPredator = this.NumberJudge(item.pecterPredator);
        this.result.addoralWater = this.NumberJudge(item.addoralWater);
        this.result.addinh = this.NumberJudge(item.addinh);
        this.result.addoralFood = this.NumberJudge(item.addoralFood);
        this.result.addt = this.NumberJudge(item.addt);
        this.result.pecstpRcr = this.NumberJudge(item.pecstpRcr);
        this.result.peclocalWaterRcr = this.NumberJudge(item.peclocalWaterRcr);
        this.result.peclocalSedRcr = this.NumberJudge(item.peclocalSedRcr);
        this.result.peclocalSoil30Rcr = this.NumberJudge(item.peclocalSoil30Rcr);
        this.result.peclocalGrwRcr = this.NumberJudge(item.peclocalGrwRcr);
        this.result.pecaquPredatorRcr = this.NumberJudge(item.pecaquPredatorRcr);
        this.result.pecterPredatorRcr = this.NumberJudge(item.pecterPredatorRcr);
        this.result.addinhRcr = this.NumberJudge(item.addinhRcr);
        this.result.addoralWaterRcr = this.NumberJudge(item.addoralWaterRcr);
        this.result.addoralFoodRcr = this.NumberJudge(item.addoralFoodRcr);
        this.result.addtRcr = this.NumberJudge(item.addtRcr);
      },
    },
  }
</script>
<style scoped lang="scss">
  .emission-left{
    position: absolute;
    width: 13%;
    height: 10%;
    left:0;
  }

  .emission-content {
    position: absolute;
    right: 10%;
    left: 17%;
    top: 0%;
  }
    .result-content{
      position:absolute;
      right:10%;
      left:17%;
     top: 0;
    }
  .result-footer{
    position:absolute;
    right: 40%;
    top: 100%;
    bottom: 5%;
  }
  .box-card {
    width: 100%;

  }
  .el-scrollbar {
    height: 100%;

    .scrollbar-wrap {
      overflow-x: hidden;
    }
    .el-scrollbar__bar{

    }
  }
</style>
