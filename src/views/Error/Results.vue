<template>

  <div class="result-content">

    <h3>排放率</h3>
    <div >
      <el-form ref="results" :model="results" :rules="resultRules" label-width="500px">

        <el-form-item label="水-直排：" style=" width: 100%;" prop="elocalDirectwater">
          <el-col :span="8">
            <el-input v-model="results.elocalDirectwater" style="width: 100%;" auto-complete="off" :disabled="elocalDirectwater_disabled">
              <template slot="append">kg/d</template>
            </el-input>
          </el-col>
          <el-col :span="2">
            <!--            <el-tooltip class="item" effect="dark" :content="elocalDirectwaterTip" placement="right">-->
            <el-button type="primary" icon="el-icon-edit" circle @click="changeElocaldirectwater"></el-button>
            <!--            </el-tooltip>-->
          </el-col>
        </el-form-item>

        <el-form-item label="水-排入集中式STP：" style=" width: 100%;" prop="elocalWater">
          <el-col :span="8">
            <el-input v-model="results.elocalWater" style="width: 100%;" auto-complete="off" :disabled="elocalWater_disabled">
              <template slot="append">kg/d</template>
            </el-input>
          </el-col>
          <el-col :span="2">
<!--            <el-tooltip class="item" effect="dark" :content="elocalWaterTip" placement="right">-->
            <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalwater"></el-button>
<!--            </el-tooltip>-->
          </el-col>
        </el-form-item>

        <el-form-item label="水-集中式STP间接排放：" style=" width: 100%;" prop="elocalstpWater">
          <el-col :span="8">
            <el-input v-model="results.elocalstpWater" style="width: 100%;" auto-complete="off" :disabled="elocalstpWater_disabeld">
              <template slot="append">kg/d</template>
            </el-input>
          </el-col>
          <el-col :span="2">
<!--            <el-tooltip class="item" effect="dark" :content="elocalstpWaterTip" placement="right">-->
            <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpwater"></el-button>
<!--            </el-tooltip>-->
          </el-col>
        </el-form-item>


        <el-form-item label="大气-直排：" style=" width: 100%;" prop="elocalAir">
          <el-col :span="8">
            <el-input v-model="results.elocalAir" style="width: 100%;" auto-complete="off" :disabled="elocalAir_disabled">
              <template slot="append">kg/d</template>
            </el-input>
          </el-col>
          <el-col :span="2">
<!--            <el-tooltip class="item" effect="dark" :content="elocalAirTip" placement="right">-->
            <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalair"></el-button>
<!--            </el-tooltip>-->
          </el-col>
        </el-form-item>

        <el-form-item label="大气-集中式STP间接排放：" style=" width: 100%;" prop="elocalstpAir">
          <el-col :span="8">
            <el-input v-model="results.elocalstpAir" style="width: 100%;" auto-complete="off" :disabled="elocalstpAir_disabled">
              <template slot="append">kg/d</template>
            </el-input>
          </el-col>
          <el-col :span="2">
<!--            <el-tooltip class="item" effect="dark" :content="elocalstpAirTip" placement="right">-->
            <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpair"></el-button>
<!--            </el-tooltip>-->
          </el-col>
        </el-form-item>

        <el-form-item label="土壤-直排：" style=" width: 100%;" prop="elocalSoil">
          <el-col :span="8">
            <el-input v-model="results.elocalSoil" style="width: 100%;" auto-complete="off" :disabled="elocalSoil_disabled">
              <template slot="append">kg/d</template>
            </el-input>
          </el-col>
          <el-col :span="2">
<!--            <el-tooltip class="item" effect="dark" :content="elocalSoilTip" placement="right">-->
            <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalsoil"></el-button>
<!--            </el-tooltip>-->
          </el-col>
        </el-form-item>

        <el-form-item label="土壤-集中式STP间接排放：" style=" width: 100%;" prop="elocalstpSoil">
          <el-col :span="8">
            <el-input v-model="results.elocalstpSoil" style="width: 100%;" auto-complete="off" :disabled="elocalstpSoil_disabled">
              <template slot="append">kg/d</template>
            </el-input>
          </el-col>
          <el-col :span="2">
            <!--            <el-tooltip class="item" effect="dark" :content="elocalSoilTip" placement="right">-->
            <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpsoil"></el-button>
            <!--            </el-tooltip>-->
          </el-col>
        </el-form-item>
        <br><br><br><br><br><br>

      </el-form>
    </div>


    <!--环境暴露-->

    <div v-if="this.userName !== 'admin'">
      <div class="title">
        <el-row>
          <el-col :span="24"> <h3>环境暴露评估结果</h3></el-col>
        </el-row>
      </div>
      <el-form
        :model="dataForm"
        label-width="460px"
        ref="dataForm"
      >
        <el-tabs  style="height: 600px">
          <el-tab-pane >
            <el-form-item label="" prop="id" v-if="false">
              <el-input v-model="dataForm.id" auto-complete="off"> </el-input>
            </el-form-item>

            <el-row>
              <el-col :span="16">
                <el-form-item label="STP(PECstp)" prop="pecstp" v-if="true">
                  <el-input v-model="result_PECstp"  auto-complete="off" readonly="readonly" ><template slot="append">mg/L</template> </el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="地表水(PEClocal.water)" prop="peclocalWater" v-if="true" >
                  <el-input v-model="result_PEClocal_water" auto-complete="off" readonly="readonly"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>



            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="沉积物(PEClocal.sed)" prop="peclocalSed" v-if="true">
                  <el-input v-model="result_PEClocal_sed" auto-complete="off" readonly="readonly"><template slot="append">mg/kg</template></el-input>
                </el-form-item>
              </el-col>



            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="土壤(PEClocal.soil,30)" prop="peclocalSoil30" v-if="true">
                  <el-input v-model="result_PEClocalsoil_30" auto-complete="off" readonly="readonly" ><template slot="append">mg/kg</template></el-input>
                </el-form-item>
              </el-col>


            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="地下水(PEClocal.grw)" prop="peclocalGrw" v-if="true">
                  <el-input v-model="result_compute_PEClocalgrw" auto-complete="off" readonly="readonly"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>



            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="水生捕食动物(PECaqu,predator)" prop="pecaquPredator" v-if="true">
                  <el-input v-model="result_PECaqu_predator" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="陆生捕食动物(PECter,predator)" prop="pecterPredator" v-if="true">
                  <el-input v-model="result_compute_PECterPredator" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>


            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>

    <!--管理员-->

    <div v-if="this.userName === 'admin'">
      <div class="title">
        <el-row>
          <el-col :span="18"> <h3>环境暴露评估结果</h3></el-col>
          <el-col :span="6" > <h3>环境风险表征(风险商)</h3></el-col>
        </el-row>
      </div>
      <el-form
        :model="dataForm"
        label-width="280px"
        ref="dataForm"
      >
        <el-tabs  style="height: 600px">
          <el-tab-pane >
            <el-form-item label="" prop="id" v-if="false">
              <el-input v-model="dataForm.id" auto-complete="off"> </el-input>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="STP(PECstp)" prop="pecstp" v-if="true">
                  <el-input v-model="result_PECstp"  auto-complete="off" readonly="readonly" ><template slot="append">mg/L</template> </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="STP" prop="pecstppnec" v-if="true">
                  <el-input v-model="result_compute_Rcr1.pecstpRcr"  auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="地表水(PEClocal.water)" prop="peclocalWater" v-if="true" >
                  <el-input v-model="result_PEClocal_water" auto-complete="off" readonly="readonly"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="地表水" prop="peclocalWaterpnec" v-if="true" >
                  <el-input v-model="result_compute_Rcr1.peclocalWaterRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="沉积物(PEClocal.sed)" prop="peclocalSed" v-if="true">
                  <el-input v-model="result_PEClocal_sed" auto-complete="off" readonly="readonly"><template slot="append">mg/kg</template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="沉积物" prop="peclocalSedpnec" v-if="true">
                  <el-input v-model="result_compute_Rcr1.peclocalSedRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="土壤(PEClocal.soil,30)" prop="peclocalSoil30" v-if="true">
                  <el-input v-model="result_PEClocalsoil_30" auto-complete="off" readonly="readonly" ><template slot="append">mg/kg</template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="土壤" prop="peclocalSoil30pnec" v-if="true">
                  <el-input v-model="result_compute_Rcr1.peclocalSoil30Rcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="地下水(PEClocal.grw)" prop="peclocalGrw" v-if="true">
                  <el-input v-model="result_compute_PEClocalgrw" auto-complete="off" readonly="readonly"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="地下水" prop="peclocalGrwpnec" v-if="true">
                  <el-input v-model="result_compute_Rcr1.peclocalGrwRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="水生捕食动物(PECaqu,predator)" prop="pecaquPredator" v-if="true">
                  <el-input v-model="result_PECaqu_predator" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="水生捕食动物" prop="pecaquPredatorpnec" v-if="true">
                  <el-input v-model="result_compute_Rcr1.pecaquPredatorRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="陆生捕食动物(PECter,predator)" prop="pecterPredator" v-if="true">
                  <el-input v-model="result_compute_PECterPredator" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="陆生捕食动物" prop="pecterPredatorpnec" v-if="true">
                  <el-input v-model="result_compute_Rcr1.pecterPredatorRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>



    <!--健康暴露-->

    <div v-if="this.userName !== 'admin'">
      <div class="title">
        <el-row>
          <el-col :span="24" > <h3>健康暴露评估结果</h3></el-col>

        </el-row>
      </div>
      <div>

      </div>
      <el-form
        :model="dataForm"
        label-width="460px"
        ref="dataForm"
      >
        <el-tabs tab-position="top" style="height: 600px" >
          <el-tab-pane>
            <el-row>
              <el-col :span="16">
                <el-form-item label="吸入(ADDinh)" prop="addinh" v-if="true">
                  <el-input v-model="result_compute_ADDinh" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="饮水(ADDoral-water)" prop="addoralWater" v-if="true">
                  <el-input v-model="result_compute_ADDoralWater" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="经口摄食(鱼)(ADDoral-food )" prop="addoralFood" v-if="true">
                  <el-input v-model="result_compute_ADDoralFood" auto-complete="off" readonly="readonly" ><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                  <el-input v-model="result_compute_ADDT" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>


            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>

    <!--管理员-->

    <div v-if="this.userName === 'admin'">
      <div class="title">
        <el-row>
          <el-col :span="18" > <h3>健康暴露评估结果</h3></el-col>
          <el-col :span="6" > <h3>健康风险表征(风险商)</h3></el-col>
        </el-row>
      </div>
      <div>

      </div>
      <el-form
        :model="dataForm"
        label-width="280px"
        ref="dataForm"
      >
        <el-tabs tab-position="top" style="height: 600px" >
          <el-tab-pane>
            <el-row>
              <el-col :span="12">
                <el-form-item label="吸入(ADDinh)" prop="addinh" v-if="true">
                  <el-input v-model="result_compute_ADDinh" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="吸入" prop="addinh" v-if="true">
                  <el-input v-model="result_compute_Rcr2.addinhRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="饮水(ADDoral-water)" prop="addoralWater" v-if="true">
                  <el-input v-model="result_compute_ADDoralWater" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="饮水" prop="addoralWater" v-if="true">
                  <el-input v-model="result_compute_Rcr2.addoralWaterRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经口摄食(鱼)(ADDoral-food )" prop="addoralFood" v-if="true">
                  <el-input v-model="result_compute_ADDoralFood" auto-complete="off" readonly="readonly" ><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="经口摄食(鱼)" prop="addoralFood" v-if="true">
                  <el-input v-model="result_compute_Rcr2.addoralFoodRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                  <el-input v-model="result_compute_ADDT" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" >
                <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                  <el-input v-model="result_compute_Rcr2.addtRcr" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>

      <div class="result-footer">
        <el-button style="margin-top: 12px" @click="last" icon="el-icon-caret-left">输入页面</el-button>
        <el-button style="margin-top: 12px" @click="save" icon="el-icon-success" >保存</el-button>
      </div>

  </div>
</template>

<script>
    export default {
        name: "AllResutls",

      data(){
        const checkResult = (rule, value, cb) => {
          console.log("校验");
          if(isNaN(value)){
            return ('结果不正确！');
          }
          return 0;
        };
          return{
            elocalWaterTip: '修改',
            elocalstpWaterTip: '修改',
            elocalDirectwaterTip: '修改',
            elocalAirTip: '修改',
            elocalstpAirTip: '修改',
            elocalSoilTip: '修改',
            userName: '',
            elocalWater_disabled: true,
            elocalstpWater_disabeld: true,
            elocalDirectwater_disabled: true,
            elocalAir_disabled: true,
            elocalstpAir_disabled: true,
            elocalSoil_disabled: true,
            elocalstpSoil_disabled: true,

            dataForm: {
                  id: null,
                  cas: null,
                  pecstp: null,
                  peclocalWater: null,
                  peclocalSed: null,
                  peclocalSoil30: null,
                  peclocalGrw: null,
                  pecaquPredator: null,
                  pecterPredator: null,
                  addinh: null,
                  addoralWater: null,
                  ddoralFood: null,
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
            form:{
              //计算结果
              elocalWater: 0, //直排时为0
              elocalDirectwater: 0, //进入公共STP时为0
              elocalAir: 0,
              elocalstpAir: 0, //经过公共STP处理后大气排放，直排时为0
              elocalSoil: 0,
              elocalstpWater: 0, //经过公共STP处理后水排放，直排时为0
              elocalstpSoil: 0,
            },
            resultRules: {
              elocalWater: [{
                validator: checkResult,
                trigger: 'blur' }],
              elocalDirectwater: [{
                validator: checkResult,
                trigger: 'blur' }],
              elocalAir: [{
                validator: checkResult,
                trigger: 'blur' }],
              elocalstpAir: [{
                validator: checkResult,
                trigger: 'blur' }],
              elocalSoil: [{
                validator: checkResult,
                trigger: 'blur' }],
              elocalstpWater: [{
                validator: checkResult,
                trigger: 'blur' }],
            },
          }
      },
      mounted(){
        this.$api.user.getCurrentUser().then((res)=>{
        this.userName = res.msg
      })
      },
      props:{
          results:{
            type: Object,
            default: () => {},
          },
          result_PECstp: {
              type:String,
              default:null,
          },
          result_PEClocal_water:{
              type:String,
              default: null
          },
          result_PEClocal_sed:{
              type:String,
              default:null
          },
          result_PEClocalsoil_30:{
              type:String,
              default:null
          },
          result_compute_PEClocalgrw:{
              type:String,
              default:null
          },
          result_PECaqu_predator:{
              type:String,
              default:null
          },
          result_compute_PECterPredator:{
              type:String,
              default:null
          },
          result_compute_ADDinh:{
              type:String,
              default:null
          },
          result_compute_ADDoralWater:{
              type:String,
              default:null
          },
          result_compute_ADDoralFood:{
              type:String,
              default:null
          },
          result_compute_ADDT:{
              type:String,
              default:null
          },

          result_compute_Rcr1:{
              type:Object,
              default: () => {},
              // default() {
              //     return {
              //         pecstpRcr:null,         // 环境暴露评估   风险表征结果  ...Rcr
              //         peclocalWaterRcr:null,
              //         peclocalSedRcr:null,
              //         peclocalSoil30Rcr:null,
              //         peclocalGrwRcr:null,
              //         pecaquPredatorRcr:null,
              //         pecterPredatorRcr:null,
              //     }
              // }
          },
          result_compute_Rcr2:{
              type:Object,
              default() {
                  return {
                      addinhRcr:1,
                      addoralWaterRcr:1,
                      addoralFoodRcr:1,
                      addtRcr:1,
                  }
              }
          },
      },
      computed: {
        flag() {
          return this.$store.getters.getFlag;
        },
      },
      watch: {
        flag: function (newVal, oldVal) {

        }
      },
      methods:{
        changeElocalwater(){
          this.elocalWater_disabled = !this.elocalWater_disabled;
          // if(this.elocalWater_disabled){
          //   this.elocalWaterTip = '修改';
          // }
          // else{
          //   this.elocalWaterTip='使用计算值'
          // }
        },
        changeElocalstpwater(){
          this.elocalstpWater_disabeld = !this.elocalstpWater_disabeld;
          // if(this.elocalstpWater_disabeld){
          //   this.elocalstpWaterTip = '修改';
          // }
          // else{
          //   this.elocalstpWaterTip='使用计算值'
          // }
        },
        changeElocaldirectwater(){
          this.elocalDirectwater_disabled = !this.elocalDirectwater_disabled;
          // if(this.elocalDirectwater_disabled){
          //   this.elocalDirectwaterTip = '修改';
          // }
          // else{
          //   this.elocalDirectwaterTip='使用计算值'
          // }
        },
        changeElocalair(){
          this.elocalAir_disabled = !this.elocalAir_disabled;
          // if(this.elocalAir_disabled){
          //   this.elocalAirTip = '修改';
          // }
          // else{
          //   this.elocalAirTip='使用计算值'
          // }
        },
        changeElocalstpair(){
          this.elocalstpAir_disabled = !this.elocalstpAir_disabled;
          // if(this.elocalstpAir_disabled){
          //   this.elocalstpAirTip = '修改';
          // }
          // else{
          //   this.elocalstpAirTip='使用计算值'
          // }
        },
          changeElocalsoil(){
            this.elocalSoil_disabled = !this.elocalSoil_disabled;
            // if(this.elocalSoil_disabled){
            //   this.elocalSoilTip = '修改';
            // }
            // else{
            //   this.elocalSoilTip='使用计算值'
            // }
          },
        changeElocalstpsoil(){
          this.elocalstpSoil_disabled = !this.elocalstpSoil_disabled;
        },
        save(){
          let emissionsResult = Object.assign(this.results,this.result_compute_Rcr1);
          let  temp= Object.assign(emissionsResult,this.result_compute_Rcr2);
          temp.pecstp=this.result_PECstp;
          temp.peclocalWater=this.result_PEClocal_water;
          temp.peclocalSed=this.result_PEClocal_sed;
          temp.peclocalSoil30=this.result_PEClocalsoil_30;
          temp.peclocalGrw=this.result_PEClocal_sed;
          temp.pecaquPredator=this.result_PECaqu_predator;
          temp.pecterPredator=this.result_compute_PECterPredator;
          temp.addinh=this.result_compute_ADDinh;
          temp.addoralWater=this.result_compute_ADDoralWater;
          temp.addoralFood=this.result_compute_ADDoralFood;
          temp.addt=this.result_compute_ADDT;
          console.log("temp",temp);
          this.$api.output.save(temp).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
            }
            else{
              this.$message({
                message: "操作失败",
                type: "error",
              });
            }
          })
        },
        last(){
          this.$emit("last");
        },
      },
    }
</script>
<style scoped lang="scss">
  .result-content{
    position:absolute;
    right:10%;
    left:10%;
    top: 0%;
  }

  .result-footer{
    position:absolute;
    right: 40%;
    top: 100%;
    bottom: 5%;
  }
</style>
