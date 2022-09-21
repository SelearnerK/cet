<template>
  <div>
    <div class="title">
      <el-row>
        <el-col :span="18"> <h3>评估结果</h3></el-col>
        <el-col :span="6"> <h3>环境风险表征</h3></el-col>
      </el-row>
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
          <el-tab-pane label="局部人体健康暴露估计(日均暴露量)">
            <el-row>
              <el-col :span="12">
                <el-form-item label="吸入(ADDinh)" prop="addinh" v-if="true">
                  <el-input v-model="result_compute_ADDinh" auto-complete="off"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="吸入风险商" prop="addinh" v-if="true">
                  <el-input v-model="result_compute_ADDinh" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="饮水(ADDoral-water)" prop="addoralWater" v-if="true">
                  <el-input v-model="result_compute_ADDoralWater" auto-complete="off"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="饮水风险商" prop="addoralWater" v-if="true">
                  <el-input v-model="result_compute_ADDoralWater" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="经口摄食(鱼)(ADDoral-food )" prop="addoralFood" v-if="true">
                  <el-input v-model="result_compute_ADDoralFood" auto-complete="off"><template slot="append">mg/L</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经口摄食(鱼)风险商" prop="addoralFood" v-if="true">
                  <el-input v-model="result_compute_ADDoralFood" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>

              <el-col :span="12">
                <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                  <el-input v-model="result_compute_ADDT" auto-complete="off"><template slot="append"><img :src="imgUrl4"></template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="不同途径总暴露量(ADDT)风险商" prop="addt" v-if="true">
                  <el-input v-model="result_compute_ADDT" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
      </div>
      <el-button style="margin-top: 12px;" @click="last">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="compute">计算</el-button>
      <el-button style="margin-top: 12px;" @click="next" :disabled="this.buttonFlag">下一步</el-button>
    </div>
  </div>
</template>
import { format } from "@/utils/datetime";
<script>
    export default {
        name: "Result",
        data() {
            return {
                buttonFlag:true,
                //PEClocal_water:null,
                size: "small",
                filters: {
                    label: "",
                },
                imgUrl4:require("./pic/2.png"),
                columns: [
                    {prop:"id", label:"", minWidth:100},
                    {prop:"cas", label:"", minWidth:100},
                    {prop:"pecstp", label:"", minWidth:100},
                    {prop:"peclocalWater", label:"", minWidth:100},
                    {prop:"peclocalSed", label:"", minWidth:100},
                    {prop:"peclocalSoil30", label:"", minWidth:100},
                    {prop:"peclocalGrw", label:"", minWidth:100},
                    {prop:"pecaquPredator", label:"", minWidth:100},
                    {prop:"pecterPredator", label:"", minWidth:100},
                    {prop:"addinh", label:"", minWidth:100},
                    {prop:"addoralWater", label:"", minWidth:100},
                    {prop:"addoralFood", label:"", minWidth:100},
                    {prop:"addt", label:"", minWidth:100},
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
            };
        },
        props:{
            result_PECstp: {
                type:Number,
                default: 0
            },
            result_PEClocal_water:{
                type:Number,
                default: 0
            },
            result_PEClocal_sed:{
                type:Number,
                default:0
            },
            result_PEClocalsoil_30:{
                type:Number,
                default:0
            },
            result_compute_PEClocalgrw:{
                type:Number,
                default:0
            },
            result_PECaqu_predator:{
                type:Number,
                default:0
            },
            result_compute_PECterPredator:{
                type:Number,
                default:0
            },
            result_compute_ADDinh:{
                type:Number,
                default:0
            },
            result_compute_ADDoralWater:{
                type:Number,
                default:0
            },
            result_compute_ADDoralFood:{
                type:Number,
                default:0
            },
            result_compute_ADDT:{
                type:Number,
                default:0
            },
            result_compute_Rcr1:{
                type:Object,
                default:0
            },



        },
        methods: {
            last() {
                this.$emit('goBack');
            },
            next() {
                this.$emit('listenChild');
            },
            compute(){
                this.buttonFlag = false;
                this.$emit('ToCompute');


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
