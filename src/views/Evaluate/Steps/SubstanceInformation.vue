<template>
  <div>
    <el-container>
      <el-main>
        <el-form
          :model="dataForm"
          label-width="280px"
          :rules="dataFormRules"
          ref="dataForm"
        >
          <el-tabs tab-position="left" style="height: 600px">
            <el-tab-pane label="物质信息">
              <el-form-item label="" prop="id" v-if="false">
                <el-input v-model="dataForm.id" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="分子量(MOLW)" prop="molw" v-if="true" >
                <el-input
                  v-model="dataForm.molw"
                  auto-complete="off"
                 
                ></el-input>
              </el-form-item>
              <el-form-item
                label="蒸气压(Vp.temptest)"
                prop="vpTemptest"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.vpTemptest"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="水溶解度(Sol.TempTest)"
                prop="solTemptest"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.solTemptest"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="有机碳-水分配系数(Koc)"
                prop="koc"
                v-if="true"
              >
                <el-input v-model="dataForm.koc" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="正辛醇/水分配系数(Kow)"
                prop="kow"
                v-if="true"
              >
                <el-input v-model="dataForm.kow" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item
                label="鱼类生物富集性(BCF.fish)"
                prop="bcfFish"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.bcfFish"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="水解速率常数(khydr.water)"
                prop="khydrWater"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.khydrWater"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="熔点(TEMPmelt)" prop="tempmelt" v-if="true">
                <el-input
                  v-model="dataForm.tempmelt"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="是否固体(Solid)" prop="solid" v-if="true">
                <!-- <el-input
                  v-model="dataForm.solid"
                  auto-complete="off"
                ></el-input> -->
                <el-select v-model="dataForm.solid" placeholder="请选择">
                  <el-option label="是" value="是"> </el-option>
                  <el-option label="否" value="否"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="生物降解性(Biodeg)"
                prop="biodeg"
                v-if="true"
              >
                <!-- <el-input
                v-model="dataForm.biodeg"
                auto-complete="off"
              ></el-input> -->
                <el-select
                  v-model="dataForm.biodeg"
                  placeholder="请选择"
                  style="width:350px;"
                >
                  <el-option label="快速生物降解" value="快速生物降解">
                  </el-option>
                  <el-option
                    label="快速生物降解试验28d通过但未通过10d观察期"
                    value="快速生物降解试验28d通过但未通过10d观察期"
                  >
                  </el-option>
                  <el-option
                    label="28d快速生物降解率≥20%或固有降解率≥70%"
                    value="28d快速生物降解率≥20%或固有降解率≥70%"
                  >
                  </el-option>
                  <el-option
                    label="固有生物降解率为20%~70%"
                    value="固有生物降解率为20%~70%"
                  >
                  </el-option>
                  <el-option label="不可生物降解" value="不可生物降解">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="排放信息">
              <el-form-item
                label="排放源类型(Source.type)"
                prop="sourceType"
                v-if="true"
              >
                <!-- <el-input
                  v-model="dataForm.sourceType"
                  auto-complete="off"
                ></el-input> -->
                <el-select v-model="dataForm.sourceType" placeholder="请选择">
                  <el-option label="工业源" value="工业源"> </el-option>
                  <el-option label="广泛分散使用源" value="广泛分散使用源">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="排放持续时间(Temission)"
                prop="temission"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.temission"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="废水排放率(Elocal.water)"
                prop="elocalWater"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.elocalWater"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="大气排放率(Elocal.air)"
                prop="elocalAir"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.elocalAir"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="直排废水排放率(Elocal.directwater)"
                prop="elocalDirectwater"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.elocalDirectwater"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="区域浓度">
              <el-form-item
                label="大气(PECreg.air)"
                prop="pecreaAir"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.pecreaAir"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="水体(PECreg.water)"
                prop="pecregWater"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.pecregWater"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="土壤(PECreg.soil)"
                prop="pecregSoil"
                v-if="true"
              >
                <el-input
                  v-model="dataForm.pecregSoil"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-main>

      <el-footer>
        <div class="content" :active="active">
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SubstanceInformation",
  data() {
    return {
      active: 0,
      dataFormRules: {
        label: [{ required: true, message: "请输入名称", trigger: "blur" }],
        molw:[{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      // 新增编辑界面数据
      dataForm: {
        id: null,
        molw: null,
        vpTemptest: null,
        solTemptest: null,
        koc: null,
        kow: null,
        biodeg: null,
        bcfFish: null,
        khydrWater: null,
        solid: null,
        tempmelt: null,
        sourceType: null,
        temission: null,
        elocalWater: null,
        elocalAir: null,
        elocalDirectwater: null,
        pecreaAir: null,
        pecregWater: null,
        pecregSoil: null
      }
    };
  },
  mounted() {},
  methods: {
    last() {
      this.active--;
    },
    next() {
      this.$emit("inputValue", this.dataForm);
      this.$emit("listenChild");
    }
  }
};
</script>

<style scoped></style>
