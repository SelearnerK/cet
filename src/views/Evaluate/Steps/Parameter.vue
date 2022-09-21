<template>
  <div>
    <div class="title">
      <h2>暴露参数</h2>
    </div>
    <div class="content">
      <el-form
        :model="dataForm"
        label-width="280px"
        :rules="dataFormRules"
        ref="dataForm"
        :size="size"
      >
        <el-tabs tab-position="left" style="height: 600px">
          <el-tab-pane label="通用参数">
            <el-form-item label="" prop="id" v-if="false">
              <el-input v-model="dataForm.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="固相的密度(RHOsolid)" prop="rhoSolid" v-if="true">
              <el-input v-model="dataForm.rhoSolid" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="水的密度(RHOwater)"
              prop="rhoWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.rhoWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="空气密度(RHOair)" prop="rhoAir" v-if="true">
              <el-input v-model="dataForm.rhoAir" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="环境温度(TEMP)" prop="temp" v-if="true">
              <el-input v-model="dataForm.temp" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="环境风速(v.wind)" prop="vWind" v-if="true">
              <el-input v-model="dataForm.vWind" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="湿沉降速率(RAINrate)" prop="RAINrate" v-if="true">
              <el-input v-model="dataForm.RAINrate" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="STP">
            <el-form-item
              label="污水处理厂日处理量(EFFLUENTstp)"
              prop="effluentStp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.effluentStp"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="污水处理厂服务人口(CAPACITYstp)"
              prop="capacityStp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.capacityStp"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="人均污水每日产生量(Sewage_flow)"
              prop="sewageFlow"
              v-if="true"
            >
              <el-input
                v-model="dataForm.sewageFlow"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="污水处理厂进水中悬浮物质浓度(SUSPCONCinf)"
              prop="suspconcinf"
              v-if="true"
            >
              <el-input
                v-model="dataForm.suspconcinf"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="每人口当量的日剩余污泥量(SURPLUSsludge)"
              prop="surplusSludge"
              v-if="true"
            >
              <el-input
                v-model="dataForm.surplusSludge"
                auto-complete="off"
              ></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="地表水">
            <el-form-item
              label="受纳河流流量(Clocal.FLOW)"
              prop="flow"
              v-if="true"
            >
              <el-input
                v-model="dataForm.flow"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="水中悬浮物质的浓度(SUSPwater)"
              prop="suspWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.suspWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="悬浮物">
            <el-form-item
              label="悬浮物中固体的体积分数(Fsolid.susp)"
              prop="fsoildSusp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fsoildSusp"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="悬浮物中水的体积分数(Fwater.susp)"
              prop="depstdAer"
              v-if="true"
            >
              <el-input
                v-model="dataForm.depstdAer"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="悬浮物有机碳含量(Foc.susp)"
              prop="focSusp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.focSusp"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="水中悬浮物密度(以湿重计)(RHOsusp)"
              prop="rhoSusp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.rhoSusp"
                auto-complete="off"
              ></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="沉积物">
            <el-form-item
              label="沉积物中固体的比例(Fsolid.sed)"
              prop="fsoildSed"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fsoildSed"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="沉积物中水的体积分数(Fwater.sed)"
              prop="fwaterSed"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fwaterSed"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="水中悬浮物容重(RHO.sed)"
              prop="rhoSed"
              v-if="true"
            >
              <el-input
                v-model="dataForm.rhoSed"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="沉积物有机碳(Foc.sed)"
              prop="focSed"
              v-if="true"
            >
              <el-input
                v-model="dataForm.focSed"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="沉积物湿重-干重转化系数(CONV.sed)"
              prop="convSed"
              v-if="true"
            >
              <el-input
                v-model="dataForm.convSed"
                auto-complete="off"
              ></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="土壤">
            <el-form-item
              label="土壤容重(RHOsoil)"
              prop="rhoSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.rhoSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤中固体的体积分数(Fsolid.soil)"
              prop="fsolidSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fsolidSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤中水的体积分数(Fwater.soil)"
              prop="fwaterSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fwaterSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤中空气的体积分数(Fair.soil)"
              prop="fairSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fairSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="土壤固体中有机碳的重量分数(Foc.soil)"
              prop="focSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.focSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤湿重-干重转化系数(CONV.soil)"
              prop="convSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm. convSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤的混合深度(DEPTHsoil)"
              prop="depthSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.depthSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="干污泥的年施用率(APPLsludge)"
              prop="applSludge"
              v-if="true"
            >
              <el-input
                v-model="dataForm.applSludge"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="蚯蚓" >

            <el-form-item
              label="蚯蚓密度(RHOworm)"
              prop="applSludge"
              v-if="true"
            >
              <el-input
                v-model="dataForm.applSludge"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="蚯蚓肠道干重占蚯蚓湿重的比例(Fgut.worm)"
              prop="fgutWorm"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fgutWorm"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="人体暴露参数(成人)" >
            <el-form-item label="呼吸速率(IRair)" prop="irAir" v-if="true">
              <el-input
                v-model="dataForm.irAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="室内外暴露时间(ET)"
              prop="et"
              v-if="true"
            >
              <el-input
                v-model="dataForm.et"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="暴露频率(EF)"
              prop="ef"
              v-if="true"
            >
              <el-input
                v-model="dataForm.ef"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="暴露持续时间(ED)"
              prop="ed"
              v-if="true"
            >
              <el-input
                v-model="dataForm.ed"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="体重(BW)"
              prop="bw"
              v-if="true"
            >
              <el-input
                v-model="dataForm.bw"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="平均暴露时间(AT)"
              prop="at"
              v-if="true"
            >
              <el-input
                v-model="dataForm.at"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="鱼虾摄入率(IRfish)"
              prop="irFish"
              v-if="true"
            >
              <el-input
                v-model="dataForm.irFish"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="饮水摄入率(IRwater)"
              prop="irWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.irWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤/尘摄入率(IRs)"
              prop="irS"
              v-if="true"
            >
              <el-input
                v-model="dataForm.irS"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>-->
<!--        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>-->
<!--      </div>-->
      <el-button style="margin-top: 12px;" @click="last">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
  </div>
</template>
import { format } from "@/utils/datetime";
<script>
    export default {
        name: "Parameter",
        data() {
            return {
                size: "small",
                filters: {
                    label: "",
                },
                columns: [
                    {prop:"id", label:"", minWidth:100},
                    {prop:"rhoSolid", label:"", minWidth:100},
                    {prop:"rhoWater", label:"", minWidth:100},
                    {prop:"rhoAir", label:"", minWidth:100},
                    {prop:"temp", label:"", minWidth:100},
                    {prop:"vWind", label:"", minWidth:100},
                    {prop:"rainRate", label:"", minWidth:100},
                    {prop:"effluentStp", label:"", minWidth:100},
                    {prop:"capacityStp", label:"", minWidth:100},
                    {prop:"sewageFlow", label:"", minWidth:100},
                    {prop:"suspconcinf", label:"", minWidth:100},
                    {prop:"surplusSludge", label:"", minWidth:100},
                    {prop:"flow", label:"", minWidth:100},
                    {prop:"suspWater", label:"", minWidth:100},
                    {prop:"fsoildSusp", label:"", minWidth:100},
                    {prop:"fwaterSusp", label:"", minWidth:100},
                    {prop:"focSusp", label:"", minWidth:100},
                    {prop:"rhoSusp", label:"", minWidth:100},
                    {prop:"fsoildSed", label:"", minWidth:100},
                    {prop:"fwaterSed", label:"", minWidth:100},
                    {prop:"rhoSed", label:"", minWidth:100},
                    {prop:"focSed", label:"", minWidth:100},
                    {prop:"convSed", label:"", minWidth:100},
                    {prop:"rhoSoil", label:"", minWidth:100},
                    {prop:"fsolidSoil", label:"", minWidth:100},
                    {prop:"fwaterSoil", label:"", minWidth:100},
                    {prop:"fairSoil", label:"", minWidth:100},
                    {prop:"focSoil", label:"", minWidth:100},
                    {prop:"convSoil", label:"", minWidth:100},
                    {prop:"depthSoil", label:"", minWidth:100},
                    {prop:"applSludge", label:"", minWidth:100},
                    {prop:"rhoWorm", label:"", minWidth:100},
                    {prop:"fgutWorm", label:"", minWidth:100},
                    {prop:"irAir", label:"", minWidth:100},
                    {prop:"et", label:"", minWidth:100},
                    {prop:"ef", label:"", minWidth:100},
                    {prop:"ed", label:"", minWidth:100},
                    {prop:"bw", label:"", minWidth:100},
                    {prop:"at", label:"", minWidth:100},
                    {prop:"irFish", label:"", minWidth:100},
                    {prop:"irWater", label:"", minWidth:100},
                    {prop:"irS", label:"", minWidth:100},
                ],
                pageRequest: { pageNum: 1, pageSize: 10 },
                pageResult: {},

                operation: false, // true:新增, false:编辑
                editDialogVisible: false, // 新增编辑界面是否显示
                editLoading: false,
                dataFormRules: {
                    label: [{ required: true, message: "请输入名称", trigger: "blur" }],
                },
                // 新增编辑界面数据
                dataForm: {
                    id: null,
                    rhoSolid: null,
                    rhoWater: null,
                    rhoAir: null,
                    temp: null,
                    vWind: null,
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
                    rhoSusp: null,
                    fsoildSed: null,
                    fwaterSed: null,
                    rhoSed: null,
                    focSed: null,
                    convSed: null,
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
            };
        },
        methods: {
            last() {
                this.$emit('goBack');
            },
            next() {
                this.$emit('ParameterValue',this.dataForm)
                this.$emit('listenChild');
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


            // 编辑
            submitForm: function () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm("确认提交吗？", "提示", {}).then(() => {
                            this.editLoading = true;
                            let params = Object.assign({}, this.dataForm);
                            this.$api.parameter.save(params).then((res) => {
                                if (res.code == 200) {
                                    this.$message({ message: "操作成功", type: "success" });
                                } else {
                                    this.$message({
                                        message: "操作失败, " + res.msg,
                                        type: "error",
                                    });
                                }
                                this.editLoading = false;
                                this.$refs["dataForm"].resetFields();
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
    }
</script>

<style scoped>

</style>
