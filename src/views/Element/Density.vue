<template>
  <div>
    <div class="content">
      <el-form :model="dataForm" label-width="320px" :rules="dataFormRules" ref="dataForm" :size="size">
        <el-tabs tab-position="top" style="height: 600px">
          <el-tab-pane label="基本性质">

            <el-row>
              <el-col :span="8">
                <el-form-item label="" prop="id" v-if="false">
                  <el-input v-model="dataForm.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分子量(MOLW)" prop="molw" v-if="true" style=" width: 100%; ">
                  <el-input v-model="dataForm.molw" auto-complete="off"><template slot="append">g·mol<sup>
                    -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="是否固体(solid)" prop="solid" v-if="true" style=" width: 100%; ">
                  <el-select v-model="dataForm.solid" placeholder="请选择" style="width: 100%;">
                    <el-option label="是" value="1">
                    </el-option>
                    <el-option label="否" value="0">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="8">
                <el-form-item label="蒸气压(Vp.temptest)" prop="vpTemptest" v-if="true">
                  <el-input v-model="dataForm.vpTemptest" auto-complete="off"><template slot="append">Pa</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="蒸气压试验温度(TEMP.Vptest)" prop="tempVptest" v-if="true">
                  <el-input v-model="dataForm.tempVptest" auto-complete="off"><template slot="append">℃</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="环境温度下的蒸气压(Vp)" prop="vp" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.vp" auto-complete="off" :disabled="this.editFlag.vp"><template
                        slot="append">Pa</template></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="vpTip" placement="top">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeVptip"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="水溶解度(Sol.TempTest)" prop="solTempTest" v-if="true">
                  <el-input v-model="dataForm.solTempTest" auto-complete="off"><template slot="append">mg·L<sup>
                    -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="水溶解度试验温度(TEMP.SolTest)" prop="tempSoltest" v-if="true">
                  <el-input v-model="dataForm.tempSoltest" auto-complete="off"><template slot="append">℃</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="环境温度下的水溶解度(Sol)" prop="sol" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.sol" auto-complete="off" :disabled="this.editFlag.sol"><template
                        slot="append">mg·L<sup> -1</sup></template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="solTip" placement="bottom">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeSoltip"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="有机碳-水分配系数(Koc)" prop="koc" v-if="true">
                  <el-input v-model="dataForm.koc" auto-complete="off"><template slot="append">L·kg<sup>
                    -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">

              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="正辛醇-水分配系数(Kow)" prop="kow" v-if="true">
                  <el-input v-model="dataForm.kow" auto-complete="off"><template slot="append">-</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">

              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="生物降解性(Biodeg)" prop="biodeg" v-if="true">
                  <el-select v-model="dataForm.biodeg" placeholder="请选择" style="width: 100%;">
                    <el-option label="快速生物降解" value="1">
                    </el-option>
                    <el-option label="快速生物降解试验28d通过但未通过10d观察期" value="0.3">
                    </el-option>
                    <el-option label="28d快速生物降解率≥20%或固有降解率≥70%" value="0.1">
                    </el-option>
                    <el-option label="固有生物降解率为20%~70%" value="0.03">
                    </el-option>
                    <el-option label="不可生物降解" value="0">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">

              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple"></div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="熔点(TEMPmelt)" prop="tempmelt" v-if="this.dataForm.solid=='1'">
                  <el-input v-model="dataForm.tempmelt" auto-complete="off"><template slot="append">℃</template>
                  </el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="过冷液体蒸气压(VPL)" prop="vpl" v-if="this.dataForm.solid=='1'" style=" width: 100%;">

                  <el-input v-model="dataForm.vpl" auto-complete="off" :disabled="this.editFlag.vpl"
                            style="width: 100%;"><template slot="append">Pa</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-tooltip class="item" effect="dark" :content="vplTip" placement="right">
                  <el-button type="primary" icon="el-icon-edit" circle @click="changeVpltip" v-if="this.dataForm.solid=='1'"></el-button>
                </el-tooltip>
              </el-col>
            </el-row>

          </el-tab-pane>

          <el-tab-pane label="降解">
            <!-- 非生物降解 -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="水解速率常数(khydr.water)" prop="khydrWater" v-if="true">
                  <el-input v-model="dataForm.khydrWater" auto-complete="off"><template slot="append">h<sup>
                    -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="大气中光解速率常数(kdeg.air)" prop="kdegAir" v-if="true">
                  <el-input v-model="dataForm.kdegAir" auto-complete="off"><template slot="append">d<sup>
                    -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="水中光解速率常数(kphoto.water)" prop="kphotoWater" v-if="true">
                  <el-input v-model="dataForm.kphotoWater" auto-complete="off"><template slot="append">d<sup>
                    -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 生物降解 -->

            <el-row>
              <el-col :span="8">
                <el-form-item label="活性污泥中生物降解速率常数(kbio.stp)" prop="kbioStp" v-if="true">
                  <el-input v-model="dataForm.kbioStp" auto-complete="off"><template slot="append">h<sup>
                    -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-form-item
            label="活性污泥中总降解速率常数(kdeg.stp)"
            prop="kdegStp"
            v-if="true"
          >
            <el-input
              v-model="dataForm.kdegStp"
              auto-complete="off"
              ><template slot="append">Pa</template></el-input>
          </el-form-item> -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="地表水生物降解速率常数(kbio.fresh)" prop="kbioFresh" v-if="true">
                  <el-input v-model="dataForm.kbioFresh" auto-complete="off" :disabled="this.editFlag.kbioFresh">
                    <template slot="append">d<sup> -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="1">
                <el-tooltip class="item" effect="dark" :content="kbioFreshTip" placement="right">
                  <el-button type="primary" icon="el-icon-edit" circle @click="changeKbioFresh">
                  </el-button>
                </el-tooltip>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="土壤降解速率常数(kbio.soil)" prop="kbioSoil" v-if="true">
                  <el-input v-model="dataForm.kbioSoil" auto-complete="off" :disabled="this.editFlag.kbioSoil">
                    <template slot="append">d<sup> -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="1">
                <el-tooltip class="item" effect="dark" :content="kbioSoilTip" placement="right">
                  <el-button type="primary" icon="el-icon-edit" circle @click="changekbioSoil">
                  </el-button>
                </el-tooltip>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="沉积物中的生物降解速率常数(kbio.sed)" prop="kbioSed" v-if="true">
                  <el-input v-model="dataForm.kbioSed" auto-complete="off"><template slot="append">d<sup>
                    -1</sup></template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>


          <el-tab-pane label="蓄积">
            <el-row>
              <el-col :span="5">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="9">
                <el-form-item label="鱼类生物蓄积系数(BCF.fish)" prop="bcfFish" v-if="true">
                  <el-row>
                    <el-col :span="18">

                      <el-input v-model="dataForm.bcfFish" auto-complete="off" :disabled="this.editFlag.bcfFish">
                        <template slot="append">L·kg<sub>wet</sub> <sup> -1</sup></template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="bcfFishTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changebcfFish">
                        </el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="蚯蚓生物富集系数(BCF.worm)" prop="bcfWorm" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.bcfWorm" auto-complete="off" :disabled="this.editFlag.bcfWorm">
                        <template slot="append">L·kg<sub>wwt</sub> <sup> -1</sup></template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="bcfWormTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changebcfWorm">
                        </el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="分配">
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="9">
                <el-form-item label="亨利常数(HENRY)" prop="henry" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.henry" auto-complete="off" :disabled="this.editFlag.henry"><template
                        slot="append">Pa·m<sup> 3</sup>·mol<sup> -1</sup></template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="henryTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changehenry"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="气-水分配系数(Kair-water)" prop="kairWater" v-if="true">
                  <el-row>
                    <el-col :span="18">

                      <el-input v-model="dataForm.kairWater" auto-complete="off" :disabled="this.editFlag.kairWater">
                        <template slot="append">m<sup>
                          3</sup>·m<sup> -3</sup></template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="kairWaterTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changekairWater"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="吸附于气溶胶颗粒的比例(Fass.aer)" prop="fassAer" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.fassAer" auto-complete="off" :disabled="this.editFlag.fassaer">
                        <template slot="append">-</template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="fassAerTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changefassAer"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="土壤固-水分配系数(Kp.soil)" prop="kpSoil" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.kpSoil" auto-complete="off" :disabled="this.editFlag.kpSoil"><template
                        slot="append">L·kg<sup> -1</sup>
                      </template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="kpSoilTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changekpSoil"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="悬浮物固-水分配系数(Kp.susp)" prop="kpSusp" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.kpSusp" auto-complete="off" :disabled="this.editFlag.kpsusp"><template
                        slot="append">L·kg<sup> -1</sup>
                      </template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="kpSuspTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changekpSusp"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="沉积物固-水分配系数(Kp.sed)" prop="kpSed" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.kpSed" auto-complete="off" :disabled="this.editFlag.kpsed"><template
                        slot="append">L·kg<sup> -1</sup>
                      </template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="kpSedTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changekpSed"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="土壤-水分配系数(Ksoil-water)" prop="ksoilWater" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.ksoilWater" auto-complete="off" :disabled="this.editFlag.ksoilWater">
                        <template slot="append">m<sup>
                          3</sup>·m<sup> -3</sup></template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="ksoilWaterTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeksoilWater"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="悬浮颗粒物-水分配系数(Ksusp-water)" prop="ksuspWater" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.ksuspWater" auto-complete="off" :disabled="this.editFlag.ksuspWater">
                        <template slot="append">m<sup>
                          3</sup>·m<sup> -3</sup></template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="ksuspWaterTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeksuspWater"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="沉积物-水分配(Ksed-water)" prop="ksedWater" v-if="true">
                  <el-row>
                    <el-col :span="18">
                      <el-input v-model="dataForm.ksedWater" auto-complete="off" :disabled="this.editFlag.ksedWater">
                        <template slot="append">m<sup>
                          3</sup>·m<sup> -3</sup></template>
                      </el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-tooltip class="item" effect="dark" :content="ksedWaterTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeksedWater"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>

        </el-tabs>
      </el-form>
      <el-button type='danger' @click="calcAll">计算</el-button>
      <el-button type='primary' @click="saveDensity">保存</el-button>
    </div>
  </div>
</template>



import { format } from "@/utils/datetime";
<script>
  export default {
    props: ['currentElement'],
    name: "Density",
    data() {
      return {
        vpTip: '修改',
        vplTip: '修改',
        solTip: '修改',
        kbioFreshTip: '修改',
        kbioSoilTip: '修改',
        bcfFishTip: '修改',
        bcfWormTip: '修改',
        henryTip: '修改',
        kairWaterTip: '修改',
        fassAerTip: '修改',
        kpSoilTip: '修改',
        kpSuspTip: '修改',
        kpSedTip: '修改',
        ksoilWaterTip: '修改',
        ksuspWaterTip: '修改',
        ksedWaterTip: '修改',
        size: "small",
        filters: {
          label: "",
        },

        dataFormRules: {
          molw: [{
            required: true,
            message: "分子量不能为空",
            trigger: "blur"
          }],
          vpTemptest: [{
            required: true,
            message: "蒸汽压不能为空",
            trigger: "blur"
          }],
          solTempTest: [{
            required: true,
            message: "输入水溶解度不能为空",
            trigger: "blur"
          }],
          koc: [{
            required: true,
            message: "有机碳-水分配系数不能为空",
            trigger: "blur"
          }],
          kow: [{
            required: true,
            message: "正辛醇/水分配系数(Kow)不能为空",
            trigger: "blur"
          }],
          biodeg: [{
            required: true,
            message: "生物降解性不能为空",
            trigger: "blur"
          }],
          // bcfFish: [{
          //   required: true,
          //   message: "鱼类生物富集性不能为空",
          //   trigger: "blur"
          // }],
          // sourceType:[{ required: true, message: "排放源类型不能为空", trigger: "blur" }],
          // temission:[{ required: true, message: "排放持续的时间不能为空", trigger: "blur" }],
          // elocalWater:[{ required: true, message: "日排放率(废水，进入STP)不能为空", trigger: "blur" }],
          // elocalAir:[{ required: true, message: "日排放率(大气)不能为空", trigger: "blur" }],
          // elocalDirectwater:[{ required: true, message: "日排放率(直排地表水)不能为空", trigger: "blur" }]
        },
        editFlag: {
          vp: true,
          sol: true,
          bigdeg: true,
          kbioFresh: true,
          vpl: true,
          kbioSoil: true,
          bcfFish: true,
          bcfWorm: true,
          henry: true,
          kairWater: true,
          fassaer: true,
          kpSoil: true,
          kpsusp: true,
          kpsed: true,
          ksoilWater: true,
          ksuspWater: true,
          ksedWater: true

        },
        // 新增编辑界面数据
        dataForm: {
          id: null,
          cas: null,
          solid: "1",
          qchemical: 3300,
          molw: 92,
          vpTemptest: 3089,
          tempVptest: 294.1,
          vp: null,
          solTempTest: 587,
          tempSoltest: 25,
          sol: null,
          koc: 205,
          kow: null,
          biodeg: null,
          tempmelt: -25.2,
          vpl: null,
          surfAer: null,
          henry: null,
          kairWater: null,
          fassAer: null,
          kpSoil: null,
          kpSusp: null,
          kpSed: null,
          ksoilWater: null,
          ksuspWater: null,
          ksedWater: null,
          bmf1: null,
          bmf2: null,
          bcfWorm: null,
          khydrWater: 0,
          kbioStp: 1,
          kdegStp: 1,
          kdegAir: 0,
          kphotoWater: 0,
          kbioFresh: null,
          kbioSoil: null,
          kbioSed: 0,
          bcfFish: null,
          sourceType: null,
          elocalWater: 9.99,
          elocalAir: 8.33,
          elocalDirectwater: null,
          temission: null,
          femisssionWater: null,
          femisssionAir: null,
          femisssionSoil: null,
          fmainsource: null,
          fabatementWater: null,
          fabatementAir: null,
          elocalSoil: null,
          fabatementSoil: null,
          fstpWater: null,
          fstpAir: null,
          fstpSludge: null,
          elocalstpWater: null,
          elocalstpAir: null,
          csludge: null,
          sludgerate: null,
          clocalWater: null,
          clocalDirectwater: null,
          deptptal: null,
          depstdAer: null,
          depstdGas: null,
          deptotalAnn: null,
          dair: null,
          cstdAir: null,
          peclocalAirAnn: null,
          kSoil: null,
          kvolat: null,
          kaslAir: null,
          kaslSoil: null,
          corrVolatS: null,
          kleach: null,
          finfSoil: null,
          veffS1r: null,
          deffS1r: null,
          dp: null,
          csoilTen0: null,
          csoilFive0: null,
          cdepSoilTen0: null,
          cdepSoilFive0: null,
          csludgeSoilOne0: null,
          csludgeSoilTen0: null,
          csludgeSoilFive0: null,
          facc: null,
          clocalSoil30: null,
          clocalSoil180: null,
          tavSoil: null,
          peclocalSoilPorew: null,
          cfish: null,
          pecaquPredator: null,
          pecaquToppredator: null,
          pecterPredator: null,
          pecregAir: null,
          pecregWater: null,
          pecregSoil: null,
          pecregSoilPorew: null,
          pecstp: null,
          peclocalWater: null,
          peclocalWaterAnn: null,
          peclocalSed: null,
          peclocalSoil30: null,
          peclocalSoil180: null,
          peclocalGrw: null,
          fPur: null,
          pecDrwl: null,
          addinh: null,
          addoralSoil: null,
          addoralFish: null,
          addoralWater: null,
          addt: null,

        },
        parameter: {}

      };
    },
    computed: {
      densityUpdate() {
        return this.$store.state.element.density
      },
      parameterUpdate() {
        return this.$store.state.element.parameter
      }
    },
    methods: {
      changeVptip() {
        this.editFlag.vp = !this.editFlag.vp;
        if (this.editFlag.vp) {
          this.vpTip = '修改';
        } else {
          this.vpTip = '使用计算值'
        }
      },
      changeVpltip() {
        this.editFlag.vpl = !this.editFlag.vpl;
        if (this.editFlag.vpl) {
          this.vplTip = '修改';
        } else {
          this.vplTip = '使用计算值'
        }
      },
      changeSoltip() {
        this.editFlag.sol = !this.editFlag.sol;
        if (this.editFlag.sol) {
          this.solTip = '修改';
        } else {
          this.solTip = '使用计算值'
        }
      },
      changeKbioFresh() {
        this.editFlag.KbioFresh = !this.editFlag.KbioFresh;
        if (this.editFlag.KbioFresh) {
          this.kbioFreshTip = '修改';
        } else {
          this.kbioFreshTip = '使用计算值';
        }
      },
      changekbioSoil() {
        this.editFlag.kbioSoil = !this.editFlag.kbioSoil;
        if (this.editFlag.kbioSoil) {
          this.kbioSoilTip = '修改';
        } else {
          this.kbioSoilTip = '使用计算值'
        }
      },
      changebcfFish() {
        this.editFlag.bcfFish = !this.editFlag.bcfFish;
        if (this.editFlag.bcfFish) {
          this.bcfFishTip = '修改';
          this.dataForm.bcfFish = 0

        } else {
          this.bcfFishTip = '使用计算值'
        }
      },
      changebcfWorm() {
        this.editFlag.bcfWorm = !this.editFlag.bcfWorm;
        if (this.editFlag.bcfWorm) {
          this.bcfWormTip = '修改';
        } else {
          this.bcfWormTip = '使用计算值'
        }
      },
      changehenry() {
        this.editFlag.henry = !this.editFlag.henry;
        if (this.editFlag.henry) {
          this.henryTip = '修改';
        } else {
          this.henryTip = '使用计算值'
        }
      },
      changekairWater() {
        this.editFlag.kairWater = !this.editFlag.kairWater;
        if (this.editFlag.kairWater) {
          this.kairWaterTip = '修改';
        } else {
          this.kairWaterTip = '使用计算值'
        }
      },
      changefassAer() {
        this.editFlag.fassaer = !this.editFlag.fassaer;
        if (this.editFlag.fassaer) {
          this.fassAerTip = '修改';
        } else {
          this.fassAerTip = '使用计算值'
        }
      },
      changekpSoil() {
        this.editFlag.kpSoil = !this.editFlag.kpSoil;
        if (this.editFlag.kpSoil) {
          this.kpSoilTip = '修改';
        } else {
          this.kpSoilTip = '使用计算值'
        }
      },
      changekpSusp() {
        this.editFlag.kpsusp = !this.editFlag.kpsusp;
        if (this.editFlag.kpsusp) {
          this.kpSuspTip = '修改';
        } else {
          this.kpSuspTip = '使用计算值'
        }
      },
      changekpSed() {
        this.editFlag.kpsed = !this.editFlag.kpsed;
        if (this.editFlag.kpsed) {
          this.kpSedTip = '修改';
        } else {
          this.kpSedTip = '使用计算值'
        }
      },
      changeksoilWater() {
        this.editFlag.ksoilWater = !this.editFlag.ksoilWater;
        if (this.editFlag.ksoilWater) {
          this.ksoilWaterTip = '修改';
        } else {
          this.ksoilWaterTip = '使用计算值'
        }
      },
      changeksuspWater() {
        this.editFlag.ksuspWater = !this.editFlag.ksuspWater;
        if (this.editFlag.ksuspWater) {
          this.ksuspWaterTip = '修改';
        } else {
          this.ksuspWaterTip = '使用计算值'
        }
      },
      changeksedWater() {
        this.editFlag.ksedWater = !this.editFlag.ksedWater;
        if (this.editFlag.ksedWater) {
          this.ksedWaterTip = '修改';
        } else {
          this.ksedWaterTip = '使用计算值'
        }
      },
      // 保存
      saveDensity: function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dataForm.cas = this.currentElement ? this.currentElement.cas : 1
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.dataForm.kdegStp = Number(this.dataForm.khydrWater) + Number(this.dataForm.kbioStp)
              this.dataForm.kdegStp2 = Number(this.dataForm.khydrWater)
              console.log('Density-kdegStp:' + this.dataForm.kdegStp)
              let params = Object.assign({}, this.dataForm);
              this.$api.density.save(params).then((res) => {
                if (res.code === 200) {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.$store.commit('setDensity', this.dataForm);
                  console.log("if中densityFlag:",this.$store.getters.getDensityflag);
                  if(this.$store.getters.getDensityflag){
                    this.$store.commit('setDensityflag',false);
                  }else{
                    this.$store.commit('setDensityflag',true);
                  }


                } else {
                  this.$message({
                    message: "保存失败, " + res.msg,
                    type: "error",
                  });
                }
              });
            });
          }
        })

      },
      NumberJudge(para) {
        let n = 0;
        if (para != null) {
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
        } else {
          return '';
        }
      },
      // 时间格式化
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property]);
      },
      calc_vp: function () {
        if(this.dataForm.vpTemptest == 0 ){
          this.dataForm.vpTemptest = Math.pow(10,-20)
        }
        let val = Number(this.dataForm.vpTemptest)

        let vptest = Number(this.dataForm.tempVptest) + 273
        let temp = 0
        if (this.parameter != null) {
          temp = Number(this.parameter.temp) + 273
        }
        this.dataForm.vp = val * Math.exp((50000 / 8.314) * (1 / vptest - 1 / temp));
        console.log('vpTemptest：'+val)
        console.log('tempVptest：'+vptest)
        console.log('temp：'+temp)
        // this.dataForm.vp = 0.0003207
      },
      calc_sol: function () {
        let soltemptest = Number(this.dataForm.solTempTest)
        let tempsoltest = Number(this.dataForm.tempSoltest)+ 273
        console.log('soltemptest：'+soltemptest)
        console.log('tempsoltest'+tempsoltest)
        let temp = 0
        if (this.parameter != null) {
          temp = Number(this.parameter.temp) + 273
        }
        console.log('temp:'+temp)
        this.dataForm.sol = soltemptest * Math.exp((10000 / 8.314) * (1 / tempsoltest - 1 / temp))
        // this.dataForm.sol = 0.121110327
      },
      calc_biodeg: function () {
        this.dataForm.kbioStp = this.dataForm.biodeg
      },
      calc_kbioFresh: function () {
        let biodeg = this.dataForm.biodeg
        let val = 0
        // if (1 == biodeg) {
        //   val = Math.LN2 / 15;
        // } else if (0.3 == biodeg) {
        //   val = Math.LN2 / 15;
        // } else if (0.1 == biodeg) {
        //   val = Math.LN2 / 50;
        // } else if (0.03 == biodeg) {
        //   val = Math.LN2 / 150;
        // } else if (0 == biodeg) {
        //   val = Math.LN2 / 150;
        // } else {
        //   val = Math.E - 20;
        // }
         if (1 == biodeg) {
          val = Math.LN2 / 15;
        } else if (0.3 == biodeg) {
          val = Math.LN2 / 50;
        } else if (0.1 == biodeg) {
          val = Math.LN2 / 150;
        } else if (0.03 == biodeg) {
          val = Math.LN2 / 150;
        } else {
          val = 0;
        }
        val = this.NumberJudge(val)
        this.dataForm.kbioFresh = val

      },
      calc_vpl: function () {
        let temp = 0
        if (this.parameter != null) {
          temp = Number(this.parameter.temp) + 273
        }
        //this.density.vpl=this.density.vp/Math.exp(6.79*(1-this.input.tempmelt/this.parameter.temp));
        this.dataForm.vpl = Number(this.dataForm.vp) / Math.exp(6.79 * (1 - (Number(this.dataForm.tempmelt) + 273) / temp));
        this.dataForm.vpl = this.NumberJudge(this.dataForm.vpl)
        console.log('this.dataForm.vp'+this.dataForm.vp)
        console.log('this.dataForm.tempmelt：'+this.dataForm.tempmelt)
        console.log('temp：'+temp)


      },
      calc_kbioSoil: function () {
        let biodeg = this.dataForm.biodeg
        let kpsoil = this.dataForm.kpSoil
        if (biodeg == 1) {
          if (kpsoil <= 100) {
            this.dataForm.kbioSoil = Math.LN2 / 30;
          } else if (kpsoil > 100 && kpsoil <= 1000) {
            this.dataForm.kbioSoil = Math.LN2 / 300;
          } else if (kpsoil > 1000 && kpsoil <= 10000) {
            this.dataForm.kbioSoil = Math.LN2 / 3000;
          } else {
            this.dataForm.kbioSoil = Math.LN2 / 30000;
          }
        } else if (biodeg == 0.3) {
          if (kpsoil <= 100) {
            this.dataForm.kbioSoil = Math.LN2 / 90;
          } else if (kpsoil > 100 && kpsoil <= 1000) {
            this.dataForm.kbioSoil = Math.LN2 / 900;
          } else if (kpsoil > 1000 && kpsoil <= 10000) {
            this.dataForm.kbioSoil = Math.LN2 / 9000;
          } else {
            this.dataForm.kbioSoil = Math.LN2 / 90000;
          }
        } else {
          if (biodeg == 0.1 || biodeg == 0.03) {
            if (kpsoil <= 100) {
              this.dataForm.kbioSoil = Math.LN2 / 300;
            } else if (kpsoil <= 1000) {
              this.dataForm.kbioSoil = Math.LN2 / 3000;
            } else if (kpsoil <= 10000) {
              this.dataForm.kbioSoil = Math.LN2 / 30000;
            } else {
              this.dataForm.kbioSoil = Math.LN2 / 300000;
            }
          } else {
            this.dataForm.kbioSoil = Math.LN2 / 1000000;
          }
        }
        this.dataForm.kbioSoil = this.NumberJudge(this.dataForm.kbioSoil)
      },
      calc_kbioSed: function () {
        this.dataForm.kbioSed = this.dataForm.kbioSoil/10;
      },

      calcBcfFish: function () {

        let k = this.dataForm.kow

        if (k == null) {
          k = 537.0317964
        }
        // var k = this.input.kow;
        var data;
        if (Math.log10(k) < 1) {
          data = 0.00141;
        } else if (Math.log10(k) > 10) {
          data = 0.479;
        } else if (Math.log10(k) <= 6) {
          var m = 0.85 * Math.log10(k) - 3.7;
          data = Math.pow(10, m);
        } else {
          var m = -0.2 * (Math.log10(k) * Math.log10(k)) + 2.74 * Math.log10(k) - 7.72;
          data = Math.pow(10, m);
        }
        data = 1000 * data;
        this.dataForm.bcfFish = data;
        this.dataForm.bcfFish = this.NumberJudge(this.dataForm.bcfFish)
      },
      calcBcfWorm: function () {
        if (this.parameter == null) {
          this.parameter.rhoWorm = 1;
        }
        this.dataForm.bcfWorm = (0.84 + 0.012 * Number(this.dataForm.kow)) / Number(this.parameter.rhoWorm);
        this.dataForm.bcfWorm = this.NumberJudge(this.dataForm.bcfWorm)

      },
      calcHenry: function () {
        console.log(this.dataForm.vp,'++++',this.dataForm.molw,'33333',this.dataForm.sol)
        console.log('22222222222222222222222222222222222222222222')
        this.dataForm.henry = Number(this.dataForm.vp) * Number(this.dataForm.molw) / Number(this.dataForm.sol);
        this.dataForm.henry = this.NumberJudge(this.dataForm.henry)
      },
      calcKairWater: function () {
        this.dataForm.kairWater = Number(this.dataForm.henry) / 8.314 / (Number(this.parameter.temp) + 273);
        this.dataForm.kairWater = this.NumberJudge(this.dataForm.kairWater)
      },
      calcFassaer: function () {

        if (this.dataForm.solid == '1') {
          this.dataForm.fassAer = 0.0001 / (Number(this.dataForm.vpl) + 0.0001);

        } else {
          this.dataForm.fassAer = 0.0001 / (Number(this.dataForm.vp) + 0.0001);
        }
        this.dataForm.fassAer = this.NumberJudge(this.dataForm.fassAer)
      },
      calcKpSoil: function () {
        let focSoil = 0.02
        if (this.parameter != null) {
          focSoil = this.parameter.focSoil
        }
        this.dataForm.kpSoil = focSoil * Number(this.dataForm.koc);
        this.dataForm.kpSoil = this.NumberJudge(this.dataForm.kpSoil)
      },
      calcKpsusp: function () {
        let focsusp = 0.1
        if (this.parameter != null) {
          focsusp = this.parameter.focSusp
        }
        this.dataForm.kpSusp = focsusp * Number(this.dataForm.koc);
        this.dataForm.kpSusp = this.NumberJudge(this.dataForm.kpSusp)
      },
      calcKpsed: function () {
        //Foc.sed*Koc
        let focSed = 0.05
        if (this.parameter.focSed != null) {
          focSed = Number(this.parameter.focSed)
        }
        this.dataForm.kpSed = focSed * Number(this.dataForm.koc);
        this.dataForm.kpSed = this.NumberJudge(this.dataForm.kpSed)

      },
      calcKsoilWater: function () {
        this.dataForm.ksoilWater = Number(this.parameter.fairSoil) * Number(this.dataForm.kairWater) + Number(this.parameter.fwaterSoil) +
          Number(this.parameter.fsolidSoil) * Number(this.dataForm.kpSoil) * Number(this.parameter.rhoSolid) / 1000;
        this.dataForm.ksoilWater = this.NumberJudge(this.dataForm.ksoilWater)
      },
      calcKsuspWater: function () {

        this.dataForm.ksuspWater = Number(this.parameter.fwaterSusp) + Number(this.parameter.fsoildSusp) * Number(this.dataForm.kpSusp) * Number(this
          .parameter.rhoSolid) / 1000;
        this.dataForm.ksuspWater = this.NumberJudge(this.dataForm.ksuspWater)

      },
      calcKsedWater: function () {
        //=Fwater.sed+Fsolid.sed*Kp.sed*RHOsolid/1000
        this.dataForm.ksedWater = Number(this.parameter.fwaterSed) + Number(this.parameter.fsoildSed) * Number(this.dataForm.kpSed) * Number(this
            .parameter.rhoSolid) /
          1000;
        this.dataForm.ksedWater = this.NumberJudge(this.dataForm.ksedWater)
      },


      calcAll: function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.editFlag.vp) {
              this.calc_vp()
            }
            if (this.editFlag.sol) {
              this.calc_sol()
            }
            if (this.editFlag.bigdeg) {
              this.calc_biodeg()
            }
            if (this.editFlag.kbioFresh) {
              this.calc_kbioFresh()
            }
            if (this.editFlag.vpl) {
              this.calc_vpl()
            }
            if (this.editFlag.kbioSoil) {
              this.calc_kbioSoil()
            }
            if (this.editFlag.bcfFish) {
              this.calcBcfFish()
            }
            if (this.editFlag.bcfWorm) {
              this.calcBcfWorm()
            }
            if (this.editFlag.henry) {
              this.calcHenry()
            }
            if (this.editFlag.kairWater) {
              this.calcKairWater()
            }
            if (this.editFlag.fassaer) {
              this.calcFassaer()
            }
            if (this.editFlag.kpSoil) {
              this.calcKpSoil()
            }
            if (this.editFlag.kpsusp) {
              this.calcKpsusp()
            }
            if (this.editFlag.kpsed) {
              this.calcKpsed()
            }
            if (this.editFlag.ksoilWater) {
              this.calcKsoilWater()
            }
            if (this.editFlag.ksuspWater) {
              this.calcKsuspWater()
            }
            if (this.editFlag.ksedWater) {
              this.calcKsedWater()
            }
            this.calc_kbioSed()
          }
        });

      }
    },
    updated() {},
    watch: {
      'dataForm.vpTemptest':function (newVal, oldValue) {
        if (parseFloat(newVal) === 0 ) {
          this.$message({
            message: "数值不能为0",
            type: 'warning'
          });
        }
      },
      currentElement: function (val, oldVal) {
        if (this.currentElement != null) {
          this.$api.density.findByCas({
            cas: this.currentElement.cas
          }).then((res) => {
            this.dataForm = res.data
          })
          this.$api.parameter.findByCas({
            cas: this.currentElement.cas
          }).then((res) => {
            this.parameter = res.data
          })
          // this.dataForm = this.currentElement

        }
      },
      densityUpdate: function (newVal, oldVal) {
        this.dataForm = newVal
      },
      parameterUpdate: function (newVal, oldVal) {
        this.parameter = newVal
      },



    }
  }

</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .shadow-box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

</style>
