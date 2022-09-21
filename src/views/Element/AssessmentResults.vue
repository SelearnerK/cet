<template>
  <div style="margin-top:10px;">
    <div id="divwidth">
      <el-form :model="dataForm" label-width="380px" ref="dataForm">
        <el-row>
          <el-col :span="10">
            <h2>环境PNEC</h2>
            <el-form-item label="" prop="id" v-if="false">
              <el-input v-model="dataForm.id" auto-complete="off"><template slot="append">Pa</template></el-input>
            </el-form-item>
            <el-form-item label="STP" prop="pecstpPnec" v-if="true">
              <el-input v-model="dataForm.pecstpPnec" auto-complete="off"><template slot="append">mg·L<sup>
                    -1</sup></template></el-input>
            </el-form-item>
            <el-form-item label="地表水" prop="peclocalWaterPnec" v-if="true">
              <el-input v-model="dataForm.peclocalWaterPnec" auto-complete="off"><template slot="append">mg·L<sup>
                    -1</sup></template></el-input>
            </el-form-item>
            <el-form-item label="沉积物" prop="peclocalSedPnec" v-if="true">
              <el-input v-model="dataForm.peclocalSedPnec" auto-complete="off"><template slot="append">mg·kg<sup>
                    -1</sup></template></el-input>
            </el-form-item>
            <el-form-item label="土壤" prop="peclocalSoil30Pnec" v-if="true">
              <el-input v-model="dataForm.peclocalSoil30Pnec" auto-complete="off"><template slot="append">mg·kg<sup>
                    -1</sup></template></el-input>
            </el-form-item>
            <el-form-item label="地下水" prop="peclocalGrwPnec" v-if="true">
              <el-input v-model="dataForm.peclocalGrwPnec" auto-complete="off"><template slot="append">mg·L<sup>
                    -1</sup></template></el-input>
            </el-form-item>
            <el-form-item label="水生捕食动物" prop="pecaquPredatorPnec" v-if="true">
              <el-input v-model="dataForm.pecaquPredatorPnec" auto-complete="off"><template
                  slot="append">mg·kg<sub>wwt</sub><sup> -1</sup></template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <h2>健康TDI/VSD</h2>
            <el-form-item label="吸入" prop=" addinhDnel" v-if="true">
              <el-input v-model="dataForm.addinhDnel" auto-complete="off"><template
                  slot="append">mg·kg<sup>-1</sup>··d<sup> -1</sup></template></el-input>
            </el-form-item>
            <el-form-item label="饮水" prop="addoralWaterDnel" v-if="true">
              <el-input v-model="dataForm.addoralWaterDnel" auto-complete="off"><template
                  slot="append">mg·kg<sup>-1</sup>··d<sup> -1</sup></template></el-input>
            </el-form-item>

            <el-form-item label="经口摄食(鱼)" prop="addoralFoodDnel" v-if="true">
              <el-input v-model="dataForm.addoralFoodDnel" auto-complete="off"><template
                  slot="append">mg·kg<sup>-1</sup>··d<sup> -1</sup></template></el-input>
            </el-form-item>
            <el-form-item label="不同途径总暴露量" prop="addtDnel" v-if="true">
              <el-input v-model="dataForm.addtDnel" auto-complete="off"><template
                  slot="append">mg·kg<sup>-1</sup>··d<sup> -1</sup></template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-button type='primary' @click="saveResult">保存</el-button>
  </div>
</template>

<script>
  export default {
    props: ['currentElement'],
    name: "AssessmentResults",
    data() {
      return {
        dataForm: {
          id: null,
          cas: null,
          pecstpPnec: null,
          peclocalWaterPnec: null,
          peclocalSedPnec: null,
          peclocalSoil30Pnec: null,
          peclocalGrwPnec: null,
          pecaquPredatorPnec: null,
          addinhDnel: null,
          addoralWaterDnel: null,
          addoralFoodDnel: null,
          addtDnel: null,

        },

      }
    },
    methods: {
      // 保存
      saveResult: function () {
        this.dataForm.cas = this.currentElement ? this.currentElement.cas : 1
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          let params = Object.assign({}, this.dataForm);
          this.$api.density.save(params).then((res) => {
            if (res.code == 200) {
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
    },
    watch: {
      currentElement: function (val, oldVal) {
        if (this.currentElement == null) {
          console.log('没有选择物质')
        } else {

          this.$api.density.findByCas({
            cas: this.currentElement.cas
          }).then((res) => {
            this.dataForm = res.data
          })

        }

      },


    }
  }

</script>

<style scoped>
  .divwidth {
    width: 600px;
  }

</style>
