<template>
  <div>
    <div class="content">
      <el-form :model="dataForm" label-width="380px" ref="dataForm" :size="size">
        <el-tabs tab-position="top" style="height: 600px">
          <el-tab-pane label="通用参数">
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" prop="id" v-if="false">
                  <el-input v-model="dataForm.id" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="固相的密度(RHOsolid)" prop="rhoSolid" v-if="true">
                  <el-input v-model="dataForm.rhoSolid" auto-complete="off"><template
                    slot="append">kg<sub>solid</sub>·m<sub>solid</sub><sup> -3</sup></template></el-input>
                </el-form-item>
                <el-form-item label="水的密度(RHOwater)" prop="rhoWater" v-if="true">
                  <el-input v-model="dataForm.rhoWater" auto-complete="off"><template
                    slot="append">kg<sub>water</sub>·m<sub>water</sub><sup> -3</sup></template></el-input>
                </el-form-item>

                <el-form-item label="空气密度(RHOair)" prop="rhoAir" v-if="true">
                  <el-input v-model="dataForm.rhoAir" auto-complete="off"><template
                    slot="append">kg<sub>air</sub>·m<sub>air</sub><sup>
                    -3</sup></template></el-input>
                </el-form-item>

                <el-form-item label="环境温度(TEMP)" prop="temp" v-if="true">
                  <el-input v-model="dataForm.temp" auto-complete="off"><template slot="append">℃</template></el-input>
                </el-form-item>
                <el-form-item label="环境风速(v.wind)" prop="wind" v-if="true">
                  <el-input v-model="dataForm.wind" auto-complete="off"><template slot="append">m.s<sup>
                    -1</sup></template></el-input>
                </el-form-item>
                <el-form-item label="湿沉降速率(RAINrate)" prop="rainRate" v-if="true">
                  <el-input v-model="dataForm.rainRate" auto-complete="off"><template slot="append">mm·y<sup>
                    -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="STP">
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="10">
                <!-- <el-form-item
              label="污水处理厂日处理量(EFFLUENTstp)"
              prop="effluentStp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.effluentStp"
                auto-complete="off"
              ><template slot="append">m<sup>3</sup>·d<sup> -1</sup></template></el-input>
            </el-form-item> -->
                <!-- <el-form-item label="污水处理厂服务人口(CAPACITYstp)" prop="capacityStp" v-if="true">
                  <el-input v-model="dataForm.capacityStp" auto-complete="off"><template slot="append">eq</template>
                  </el-input>
                </el-form-item> -->

                <el-form-item label="人均污水每日产生量(Sewage_flow)" prop="sewageFlow" v-if="true">
                  <el-input v-model="dataForm.sewageFlow" auto-complete="off"><template slot="append">m<sup>
                    3</sup>.eq<sup> -1</sup>.d<sup> -1</sup></template></el-input>
                </el-form-item>
                <el-form-item label="污水处理厂进水中悬浮物质浓度(SSRS)" prop="suspconcinf" v-if="true">
                  <el-input v-model="dataForm.suspconcinf" auto-complete="off"><template slot="append">g·L<sup>
                    -1</sup></template></el-input>
                </el-form-item>
                <!-- <el-form-item label="每人口当量的日剩余污泥量(SURPLUSsludge)" prop="surplusSludge" v-if="true">
                  <el-input v-model="dataForm.surplusSludge" auto-complete="off"><template slot="append">kg·d<sup>
                        -1</sup></template></el-input>
                </el-form-item> -->
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="地表水">
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="10">
                <!-- <el-form-item
              label="受纳河流流量(Clocal.FLOW)"
              prop="flow"
              v-if="true"
            >
              <el-input
                v-model="dataForm.flow"
                auto-complete="off"
              ><template slot="append">m<sup>3</sup>·d<sup> -1</sup></template></el-input>
            </el-form-item> -->
                <el-form-item label="水中悬浮物质的浓度(SUSPwater)" prop="suspWater" v-if="true">
                  <el-input v-model="dataForm.suspWater" auto-complete="off"><template
                    slot="append">mg<sub>solid</sub>·L<sub>water</sub><sup> -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="悬浮物">
            <el-row>
              <el-col :span="10">
                <el-form-item label="悬浮物中固体的体积分数(Fsolid.susp)" prop="fsoildSusp" v-if="true">
                  <el-input v-model="dataForm.fsoildSusp" auto-complete="off"><template slot="append">m<sup>
                    3</sup>·m<sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="悬浮物中水的体积分数(Fwater.susp)" prop="fwaterSusp" v-if="true">
                  <el-input v-model="dataForm.fwaterSusp" auto-complete="off"><template slot="append">m<sup>
                    3</sup>·m<sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="悬浮物有机碳含量(Foc.susp)" prop="focSusp" v-if="true">
                  <el-input v-model="dataForm.focSusp" auto-complete="off"><template slot="append">kg·kg<sup>
                    -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="水中悬浮物密度(ρsusp)" prop="rsusp" v-if="true">
                  <el-input v-model="dataForm.rhoSusp" auto-complete="off" :disabled="this.editFlag.rsusp">
                    <template slot="append">kg·m<sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
<!--              <el-col :span="1">-->
<!--                <el-button type="primary" icon="el-icon-edit" circle-->
<!--                           @click="()=>{this.editFlag.rsusp = !this.editFlag.rsusp}"></el-button>-->
<!--              </el-col>-->
            </el-row>

          </el-tab-pane>
          <el-tab-pane label="沉积物">
            <el-row>
              <el-col :span="10">
                <el-form-item label="沉积物中固体的体积分数(Fsolid.sed)" prop="fsoildSed" v-if="true">
                  <el-input v-model="dataForm.fsoildSed" auto-complete="off"><template
                    slot="append">m<sub>solid</sub>3·m<sub>sed</sub><sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="沉积物中水的体积分数(Fwater.sed)" prop="fwaterSed" v-if="true">
                  <el-input v-model="dataForm.fwaterSed" auto-complete="off"><template
                    slot="append">m<sub>water</sub>3·m<sub>sed</sub><sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="沉积物湿重密度(RHO.sed)" prop="rhoSed" v-if="true">
                  <el-input v-model="dataForm.rhoSed" auto-complete="off" :disabled="this.editFlag.rhoSed"><template
                    slot="append">kg<sub>wet</sub>·m<sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="el-icon-edit" circle
                           @click="()=>{this.editFlag.rhoSed = !this.editFlag.rhoSed}"></el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="沉积物固体中有机碳质量分数(Foc.sed)" prop="focSed" v-if="true">
                  <el-input v-model="dataForm.focSed" auto-complete="off"><template
                    slot="append">kg<sub>oc</sub>·kg<sub>solid</sub><sup> -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="沉积物密度(ρsed)" prop="rsed" v-if="true">
                  <el-input v-model="dataForm.rsed" auto-complete="off" :disabled="this.editFlag.rsed">
                    <template slot="append">kg·m<sup>-3</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="el-icon-edit" circle @click="()=>{this.editFlag.rsed = !this.editFlag.rsed}"></el-button>
              </el-col>
            </el-row>

<!--            <el-row>-->
<!--              <el-col :span="10">-->
<!--                <el-form-item label="沉积物湿重-干重转化系数(CONV.sed)" prop="convSed" v-if="true">-->
<!--                  <el-input v-model="dataForm.convSed" auto-complete="off" :disabled="this.editFlag.convSed">-->
<!--                    <template slot="append">kg<sub>dry</sub>·kg<sub>wet</sub><sup> -3</sup></template></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->

<!--              <el-col :span="1">-->
<!--                <el-button type="primary" icon="el-icon-edit" circle-->
<!--                           @click="()=>{this.editFlag.convSed = !this.editFlag.convSed}"></el-button>-->
<!--              </el-col>-->
<!--            </el-row>-->


          </el-tab-pane>
          <el-tab-pane label="土壤">

            <el-row>
              <el-col :span="10">
                <el-form-item label="土壤密度(ρsoil)" prop="rsoil" v-if="true">
                  <el-input v-model="dataForm.rsoil" auto-complete="off" :disabled="this.editFlag.rsoil"><template
                    slot="append">kg·m<sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="el-icon-edit" circle @click="()=>{this.editFlag.rsoil = !this.editFlag.rsoil}"></el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="土壤密度(RHOsoil)" prop="rhoSoil" v-if="true">
                  <el-input v-model="dataForm.rhoSoil" auto-complete="off" :disabled="this.editFlag.rhoSoil">
                    <template slot="append">kg· m<sup>
                      -3</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="el-icon-edit" circle
                           @click="()=>{this.editFlag.rhoSoil = !this.editFlag.rhoSoil}"></el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="土壤中固体的体积分数(Fsolid.soil)" prop="fsolidSoil" v-if="true">
                  <el-input v-model="dataForm.fsolidSoil" auto-complete="off"><template
                    slot="append">m<sub>solid</sub><sup>3</sup>·m<sub>soil</sub><sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="土壤中水的体积分数(Fwater.soil)" prop="fwaterSoil" v-if="true">
                  <el-input v-model="dataForm.fwaterSoil" auto-complete="off"><template
                    slot="append">m<sub>water</sub><sup>3</sup>·m<sub>soil</sub><sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="土壤中空气的体积分数(Fair.soil)" prop="fairSoil" v-if="true">
                  <el-input v-model="dataForm.fairSoil" auto-complete="off"><template
                    slot="append">m<sub>air</sub><sup>3</sup>·m<sub>soil</sub><sup> -3</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="土壤固体中有机碳的质量分数(Foc.soil)" prop="focSoil" v-if="true">
                  <el-input v-model="dataForm.focSoil" auto-complete="off"><template
                    slot="append">kg<sub>oc</sub>·kg<sub>solid</sub><sup> -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>

           <!-- <el-row>
              <el-col :span="10">
                <el-form-item label="土壤固体中有机碳的质量分数(Foc.soil)" prop="focSoil" v-if="true">
                  <el-input v-model="dataForm.focSoil" auto-complete="off"><template
                    slot="append">kg<sub>oc</sub>·kg<sub>solid</sub><sup> -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>-->

            <el-row>
              <el-col :span="10">
                <el-form-item label="土壤湿重-干重转化系数(CONV.soil)" prop="convSoil" v-if="true">
                  <el-input v-model="dataForm.convSoil" auto-complete="off" :disabled="this.editFlag.convSoil">
                    <template slot="append">kg<sub>wwt</sub>·kg<sub>dwt</sub><sup> -1</sup></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="el-icon-edit" circle
                           @click="()=>{this.editFlag.convSoil = !this.editFlag.convSoil}"></el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="表层土壤深度(DEPTHsoil)" prop="depthSoil" v-if="true">
                  <el-input v-model="dataForm.depthSoil" auto-complete="off"><template slot="append">m</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="干污泥的年施用率(APPLsludge)" prop="applSludge" v-if="true">
                  <el-input v-model="dataForm.applSludge" auto-complete="off"><template slot="append">kg·m<sup>-2</sup>·y<sup>
                    -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="蚯蚓">
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="10">
                <el-form-item label="蚯蚓密度(RHOworm)" prop="rhoWorm" v-if="true">
                  <el-input v-model="dataForm.rhoWorm" auto-complete="off"><template
                    slot="append">kg<sub>wwt</sub>.L<sup> -1</sup></template></el-input>
                </el-form-item>
                <el-form-item label="蚯蚓肠道干重占蚯蚓湿重的比例(Fgut.worm)" prop="fgutWorm" v-if="true">
                  <el-input v-model="dataForm.fgutWorm" auto-complete="off"><template
                    slot="append">kg<sub>dwt</sub>.kg<sub>wwt</sub><sup> -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="人体暴露参数(成人)">
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="10">
                <el-form-item label="呼吸速率(IRair)" prop="irAir" v-if="true">
                  <el-input v-model="dataForm.irAir" auto-complete="off"><template slot="append">m<sup>3</sup>·d<sup>
                    -1</sup></template></el-input>
                </el-form-item>
                <el-form-item label="室内外暴露时间(ET)" prop="et" v-if="true">
                  <el-input v-model="dataForm.et" auto-complete="off"><template slot="append">h·d<sup>
                    -1</sup></template></el-input>
                </el-form-item>
                <el-form-item label="暴露频率(EF)" prop="ef" v-if="true">
                  <el-input v-model="dataForm.ef" auto-complete="off"><template slot="append">d·y<sup>
                    -1</sup></template></el-input>
                </el-form-item>
                <el-form-item label="暴露持续时间(ED)" prop="ed" v-if="true">
                  <el-input v-model="dataForm.ed" auto-complete="off"><template slot="append">y</template></el-input>
                </el-form-item>
                <el-form-item label="体重(BW)" prop="bw" v-if="true">
                  <el-input v-model="dataForm.bw" auto-complete="off"><template slot="append">kg</template></el-input>
                </el-form-item>
                <el-form-item label="平均暴露时间(AT)" prop="at" v-if="true">
                  <el-input v-model="dataForm.at" auto-complete="off"><template slot="append">d</template></el-input>
                </el-form-item>
                <el-form-item label="鱼虾摄入率(IRfish)" prop="irFish" v-if="true">
                  <el-input v-model="dataForm.irFish" auto-complete="off"><template slot="append">g·d<sup>
                    -1</sup></template></el-input>
                </el-form-item>
                <el-form-item label="饮水摄入率(IRwater)" prop="irWater" v-if="true">
                  <el-input v-model="dataForm.irWater" auto-complete="off"><template slot="append">L·d<sup>
                    -1</sup></template></el-input>
                </el-form-item>
                <el-form-item label="土壤/尘摄入率(IRs)" prop="irS" v-if="true">
                  <el-input v-model="dataForm.irS" auto-complete="off"><template slot="append">mg·d<sup>
                    -1</sup></template></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="区域尺度">
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="10">
                <el-form-item label="区域面积(Areg)" prop="areg" v-if="true">
                  <el-input v-model="input_R.areg" auto-complete="off"><template slot="append">km<sup>2</sup></template></el-input>
                </el-form-item>
                <el-form-item label="空气面积比率(farea.air)" prop="fareaAir" v-if="true">
                  <el-input v-model="input_R.fareaAir" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="水面面积比率(farea.water)" prop="fareaWater" v-if="true">
                  <el-input v-model="input_R.fareaWater" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="沉积物面积比率(farea.sed)" prop="fareaSed" v-if="true">
                  <el-input v-model="input_R.fareaSed" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="土壤面积比率(farea.soil)" prop="fareaSoil" v-if="true">
                  <el-input v-model="input_R.fareaSoil" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="大气高度(hair)" prop="hair" v-if="true">
                  <el-input v-model="input_R.hair" auto-complete="off"><template slot="append">m</template> </el-input>
                </el-form-item>
                <el-form-item label="水深(hwater)" prop="hwater" v-if="true">
                  <el-input v-model="input_R.hwater" auto-complete="off"><template slot="append">m</template></el-input>
                </el-form-item>
                <el-form-item label="沉积物厚度(hsed)" prop="hsed" v-if="true">
                  <el-input v-model="input_R.hsed" auto-complete="off"><template slot="append">m</template></el-input>
                </el-form-item>
                <el-form-item label="土壤表层深度(hsoil)" prop="hsoil" v-if="true">
                  <el-input v-model="input_R.hsoil" auto-complete="off"><template slot="append">m</template></el-input>
                </el-form-item>

              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <el-button type='danger' @click="calcAll">计算</el-button>
      <el-button type='primary' @click="saveExposure">保存</el-button>
    </div>
  </div>
</template>
import { format } from "@/utils/datetime";
<script>
export default {
  props: ['currentElement'],
  name: "ExposureParams",
  data() {
    return {
      inputValue: null,
      size: "small",
      editFlag: {
        // rsusp: true,
        rhoSed: true,
        // convSed: true,
        rsed: true,
        rsoil: true,
        rhoSoil: true,
        convSoil: true
      },
      // 新增编辑界面数据
      dataForm: {
        id: null,
        cas: null,
        rhoSusp:null,
        rhoSolid: '',
        rhoWater: null,
        rhoAir: null,
        temp: null,
        wind: null,
        rainRate: null,
        effluentStp: null,
        capacityStp: null,
        sewageFlow: null,
        suspconcinf: null,
        surplusSludge: null,
        flow: null,
        suspWater: null,
        fsoildSusp: null,
        fwaterSusp: null,
        focSusp: null,
        rsusp: 1500,
        fsoildSed: null,
        fwaterSed: null,
        rhoSed: null,
        focSed: null,
        rsed: 2500,
        rsoil: 2500,
        rhoSoil: null,
        fsolidSoil: null,
        fwaterSoil: null,
        fairSoil: null,
        focSoil: null,
        convSoil: null,
        depthSoil: null,
        applSludge: null,
        rhoWorm: null,
        fgutWorm: null,
        irAir: null,
        et: null,
        ef: null,
        ed: null,
        bw: null,
        at: null,
        irFish: null,
        irWater: null,
        irS: null,
      },
      input_R: {
        areg: '',
        fareaAir: '',
        fareaWater: '',
        fareaSed: '',
        fareaSoil: '',
        hair: '',
        hwater: '',
        hsed: '',
        hsoil: '',
      }
    };
  },
//
//   created() {
//
//
//   //     if(this.currentElement.cas){
//   //       this.$api.inputR.findByCas({
//   //         cas: this.currentElement.cas
//   //       }).then((res) => {
//   //         if(res!=null){
//   //           this.input_R = res.data
//   //           // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
//   //           // this.dataForm.irFish = this.dataForm.irFish / 1000
//   //         }
//   //       })
//   //
//   // }
//     console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqq")
//     if (this.currentElement != null) {
//       this.$api.parameter.findByCas({
//         cas: this.currentElement.cas
//       }).then((res) => {
//         this.dataForm = res.data
//         this.dataForm.rsusp = 1500
//         this.dataForm.rsed = 2500
//         this.dataForm.rsoil = 1500
//         console.log("23232323411",this.dataForm)
//         // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
//         // this.dataForm.irFish = this.dataForm.irFish / 1000
//       }),
//         console.log("((((((((99999999999)))))))))))))")
//       console.log("((((((((99999999999)))))))))))))"+this.currentElement.cas)
//
//       this.$api.inputR.findByCas({
//         cas: this.currentElement.cas
//       }).then((res) => {
//         console.log("res:"+res.data)
//         if(res!=null){
//           this.input_R = res.data
//           console.log("resyyyyyyyyyyyyyy"+res.data)
//           // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
//           // this.dataForm.irFish = this.dataForm.irFish / 1000
//         }
//       })
//
//     }
// },




  methods: {
    // 保存
    saveExposure: function () {

      this.dataForm.cas = this.currentElement ? this.currentElement.cas : 1
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          //沉降速率单位转换
          // this.dataForm.rainRate = this.dataForm.rainRate * 1000 * 365
          // 鱼虾摄入率单位转换
          // this.dataForm.irFish = this.dataForm.irFish * 1000

          let params = Object.assign({}, this.dataForm);
          let paramsr = Object.assign({}, this.input_R);

          this.$api.parameter.save(params).then((res) => {
            if (res.code == 200) {
              // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
              // this.dataForm.irFish = this.dataForm.irFish / 1000
              this.$store.commit('setParameter', this.dataForm)
              this.$message({
                message: "保存成功",
                type: "success"
              });
              if(this.$store.getters.getParameterflag){
                this.$store.commit('setParameterflag', false);
              }else{
                this.$store.commit('setParameterflag', true);
              }

            } else {
              this.$message({
                message: "保存失败, " + res.msg,
                type: "error",
              });
            }
          });

          this.$api.inputR.save(paramsr).then((res) => {
            if (res.code == 200) {
              // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
              // this.dataForm.irFish = this.dataForm.irFish / 1000
              this.$message({
                message: "保存成功",
                type: "success"
              });

            } else {
              this.$message({
                message: "保存失败, " + res.msg,
                type: "error",
              });
            }
          });
        });
    },
    // 时间格式化
    dateFormat: function (row, column, cellValue, index) {
      return format(row[column.property]);
    },
    // calcRHOsusp: function () {
    //   this.dataForm.rhoSusp = (this.dataForm.fsoildSusp * this.dataForm.rhoSolid + this.dataForm.fwaterSusp * this
    //     .dataForm.rhoWater);
    // },
    calcRHOsed: function () {
      this.dataForm.rhoSed = (this.dataForm.fsoildSed * this.dataForm.rhoSolid + this.dataForm.fwaterSed * this
        .dataForm.rhoWater);
    },

    // calcConvsed: function () {
    //   this.dataForm.convSed = this.dataForm.rhoSed / (this.dataForm.fsoildSed * this.dataForm.rhoSolid);
    // },
    calcRhosoil: function () {
      this.dataForm.rhoSoil = (this.dataForm.fsolidSoil * this.dataForm.rsoil) + (this.dataForm.fwaterSoil * this
        .dataForm.rhoWater) + (this.dataForm.fairSoil * this.dataForm.rhoAir)
    },
    // calcRhosoil: function () {
    //   this.dataForm.rhoSoil = (this.dataForm.fsolidSoil * this.dataForm.rhoSolid) + (this.dataForm.fwaterSoil * this
    //     .dataForm.rhoWater) + (this.dataForm.fairSoil * this.dataForm.rhoAir)
    // },
    calcConvsoil: function () {
      this.dataForm.convSoil = (this.dataForm.rhoSoil / (this.dataForm.fsolidSoil * this.dataForm.rsoil))
        .toFixed(2);
    },
    calcAll: function () {

      // if (this.editFlag.rhoSusp) {
      //   this.calcRHOsusp()
      // }
      if (this.editFlag.rhoSed) {
        this.calcRHOsed()
      }
      // if (this.editFlag.convSed) {
      //   this.calcConvsed()
      // }
      if (this.editFlag.rhoSoil) {
        this.calcRhosoil()
      }
      if (this.editFlag.convSoil) {
        this.calcConvsoil()
      }

    }
  },
  updated: function () {},

  watch: {
    currentElement: function (val, oldVal) {

        this.$api.parameter.findByCas({
          cas: this.currentElement.cas
        }).then((res) => {

          this.dataForm = res.data
          console.log("rwwwwwwwwwwwwwwwwwy"+res.data)

          this.$api.inputR.findByCas({
            cas: this.currentElement.cas
          }).then((res) => {
            console.log("res:"+res.data)
            if(res!=null){
              this.input_R = res.data
              console.log("resyyyyyyyyyyyyyy"+res.data)
              // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
              // this.dataForm.irFish = this.dataForm.irFish / 1000
            }
          })
          // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
          // this.dataForm.irFish = this.dataForm.irFish / 1000
        }),
          console.log("((((((((99999999999)))))))))))))")
        console.log("((((((((99999999999)))))))))))))"+this.currentElement.cas)





    },



  }
}

</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
