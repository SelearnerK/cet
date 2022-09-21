<template>
  <div style="margin-top:10px" v-loading="loadFlag">
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <h3>连续排放</h3>
        <el-form :model="dataForm" label-width="280px" ref="dataForm">
          <el-form-item label="" prop="id" v-if="false">
            <el-input v-model="dataForm.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="STP地表水排放系数(Fstp.water)" prop="fstpWater" v-if="true">


            <el-input v-model="dataForm.fstpWater" auto-complete="off" :readonly="true"><template
                slot="append">-</template></el-input>


          </el-form-item>
          <el-form-item label="STP大气排放系数(Fstp.air)" prop=" fstpAir" v-if="true">


            <el-input v-model="dataForm.fstpAir" auto-complete="off" :readonly="true"><template
                slot="append">-</template></el-input>


          </el-form-item>
          <el-form-item label="STP污泥排放系数(Fstp.sludge)" prop="fstpSludge" v-if="true">

            <el-input v-model="dataForm.fstpSludge" auto-complete="off" :readonly="true">
              <template slot="append">-</template></el-input>

          </el-form-item>

          <el-form-item label="降解去除(Fstp.degrade)" prop="fstpDegrade" v-if="true">


            <el-input v-model="dataForm.fstpDegrade" auto-complete="off" :readonly="true">
              <template slot="append">-</template></el-input>


          </el-form-item>
          <el-form-item label="总计" prop="fstpTotal" v-if="true">
            <el-input v-model="dataForm.fstpTotal" auto-complete="off" :readonly="true"><template
                slot="append">-</template></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form :model="dataForm" label-width="280px" ref="dataForm">
          <h3>间歇排放</h3>
          <el-form-item label="STP地表水排放系数(Fstp.water)" prop="fstpWater" v-if="true">


            <el-input v-model="dataForm.fstpWater2" auto-complete="off" :readonly="true"><template
                slot="append">-</template></el-input>


          </el-form-item>
          <el-form-item label="STP大气排放系数(Fstp.air)" prop=" fstpAir" v-if="true">


            <el-input v-model="dataForm.fstpAir2" auto-complete="off" :readonly="true"><template
                slot="append">-</template></el-input>


          </el-form-item>
          <el-form-item label="STP污泥排放系数(Fstp.sludge)" prop="fstpSludge" v-if="true">

            <el-input v-model="dataForm.fstpSludge2" auto-complete="off" :readonly="true">
              <template slot="append">-</template></el-input>

          </el-form-item>

          <el-form-item label="降解去除(Fstp.degrade)" prop="fstpDegrade" v-if="true">


            <el-input v-model="dataForm.fstpDegrade2" auto-complete="off" :readonly="true">
              <template slot="append">-</template></el-input>


          </el-form-item>
          <el-form-item label="总计" prop="fstpTotal" v-if="true">
            <el-input v-model="dataForm.fstpTotal2" auto-complete="off" :readonly="true"><template
                slot="append">-</template></el-input>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
    <el-button type='danger' @click="saveStp">计算并保存</el-button>
  </div>
</template>

<script>
  export default {
    props: ['currentElement'],
    name: "StandardStp",
    data() {
      return {
        dataForm: {
          id: null,
          fstpWater: 0,
          fstpAir: 0,
          fstpSludge: 0,
          fstpDegrade: 0,
          fstpTotal: 0,
          fstpWater2: 0,
          fstpAir2: 0,
          fstpSludge2: 0,
          fstpDegrade2: 0,
          fstpTotal2: 0,
        },
        parameter: null,
        loadFlag:false

      }
    },

    methods: {
      // 保存
      saveStp: function () {
        this.calcAll()
        this.dataForm.cas = this.currentElement ? this.currentElement.cas : 1
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          let params = Object.assign({}, this.dataForm);
          this.$api.density.save(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.$store.commit('setStp', !this.$store.getters.getStp);
            } else {
              this.$message({
                message: "保存失败, " + res.msg,
                type: "error",
              });
            }
          });
        });
      },
      calcAll: function () {
        this.loadFlag=true
        this.$api.density.findByCas({
          cas: this.currentElement.cas
        }).then((res) => {
          this.dataForm = res.data
          this.$api.parameter.findByCas({
            cas: this.currentElement.cas
          }).then((res) => {
            this.parameter = res.data
            this.calcSTP()
            this.calcSTP2()
            this.loadFlag=false
          })
        })


      },
      multiply: function (a, b) {
        let m = a.length;
        let p = a[0].length;
        let n = b[0].length;
        // 初始化 m*n 全 0 二维数组
        let c = new Array(m).fill(0).map(arr => new Array(n).fill(0));
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
            for (let k = 0; k < p; k++) {
              c[i][j] += a[i][k] * b[k][j];
            }
          }
        }
        return c;
      },
      transpose: function (matrix) {
        let result = new Array(matrix.length).fill(0).map(arr => new Array(matrix[0].length).fill(0));
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[0].length; j++) {
            result[i][j] = matrix[j][i];
          }
        }
        return result;
      },
      det: function (square) {

        // 方阵阶数
        let n = square.length;

        let result = 0;
        if (n > 3) {
          // n 阶
          for (let column = 0; column < n; column++) {
            // 去掉第 0 行第 column 列的矩阵
            let matrix = new Array(n - 1).fill(0).map(arr => new Array(n - 1).fill(0));
            for (let i = 0; i < n - 1; i++) {
              for (let j = 0; j < n - 1; j++) {
                if (j < column) {
                  matrix[i][j] = square[i + 1][j];
                } else {
                  matrix[i][j] = square[i + 1][j + 1];
                }
              }
            }
            result += square[0][column] * Math.pow(-1, 0 + column) * this.det(matrix);
          }
        } else if (n === 3) {
          // 3 阶
          result = square[0][0] * square[1][1] * square[2][2] +
            square[0][1] * square[1][2] * square[2][0] +
            square[0][2] * square[1][0] * square[2][1] -
            square[0][2] * square[1][1] * square[2][0] -
            square[0][1] * square[1][0] * square[2][2] -
            square[0][0] * square[1][2] * square[2][1];
        } else if (n === 2) {
          // 2 阶
          result = square[0][0] * square[1][1] - square[0][1] * square[1][0];
        } else if (n === 1) {
          // 1 阶
          result = square[0][0];
        }
        return result;
      },
      adjoint: function (square) {
        // 方阵约束

        let n = square.length;

        let result = new Array(n).fill(0).map(arr => new Array(n).fill(0));
        for (let row = 0; row < n; row++) {
          for (let column = 0; column < n; column++) {
            // 去掉第 row 行第 column 列的矩阵
            let matrix = [];
            for (let i = 0; i < square.length; i++) {
              if (i !== row) {
                let arr = [];
                for (let j = 0; j < square.length; j++) {
                  if (j !== column) {
                    arr.push(square[i][j]);
                  }
                }
                matrix.push(arr);
              }
            }
            result[row][column] = Math.pow(-1, row + column) * this.det(matrix);
          }
        }
        return this.transpose(result);
      },
      inv: function (square) {

        let detValue = this.det(square);
        let result = this.adjoint(square);

        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result.length; j++) {
            result[i][j] /= detValue;
          }
        }
        console.log("***************8")
        console.log(result)
        return result;
      },
      calcSTP: function () {
        //input
        let Depth_PS = 4
        let HRT_PS = 2
        let EFFLUENT_stp = 2000
        let Volume_PS = EFFLUENT_stp * HRT_PS / 24
        let HRT_O = 10
        let Area_PS = Volume_PS / Depth_PS
        let Volume_O = HRT_O / 24 * EFFLUENT_stp;
        let Depth_O = 3
        let Area_O = Volume_O / Depth_O
        let HRT_SLS = 6
        let Depth_SLS = 3;

        let Volume_SLS = EFFLUENT_stp * HRT_SLS / 24;
        let Area_SLS = Volume_SLS / Depth_SLS;
        let Area_STP = Area_PS + Area_O + Area_SLS;
        console.log('Area_STP:' + Area_STP)
        let H_air = 10;
        let Windspeed = 2; //CET 2
        if (this.parameter != null) {
          Windspeed = this.parameter.wind
        }
        console.log('wind' + Windspeed)
        let MLSS_RS = 0.2
        let RHO_RS = 1.6;
        let Sewage_flow = 0.145;
        let MLSS_O = 3;
        let RHO_O = 1.6;
        let NI = EFFLUENT_stp / Sewage_flow;
        console.log('NI:' + NI)
        let MLSS_SLS = 0.02;
        let RHO_SLS = 1.6;
        let BOD_RS = 0.15
        let K_SLR_O = 0.15
        let F_BOD_remove_PS = 13 / 36
        console.log('F_BOD_remove_PS:' + F_BOD_remove_PS)
        let Oxygen_require_O = (BOD_RS) * (1 - F_BOD_remove_PS)
        console.log('Oxygen_require_O:' + Oxygen_require_O)
        let F_BOD_removal_O = 0.818 - 0.0422 * Math.log(K_SLR_O)
        let Y_sludge_O = 0.947 + 0.0739 * Math.log(K_SLR_O)
        console.log('Y_sludge_O:' + Y_sludge_O)
        let RHO_PS = 1.6;

        //ADV
        let ADV_0_1 = Math.sqrt(Area_STP) * H_air * Windspeed;
        let ADV_1_0 = Math.sqrt(Area_STP) * H_air * Windspeed;
        console.log('ADV_0_1:' + ADV_0_1)
        let ADV_0_2 = EFFLUENT_stp / 24 / 3600;
        let ADV_2_5 = EFFLUENT_stp / 24 / 3600;
        let ADV_0_3 = MLSS_RS * EFFLUENT_stp / (RHO_RS * 1000) / 24 / 3600;
        let ADV_3_4 = (2 / 3) * ADV_0_3;
        let ADV_3_6 = ADV_0_3 / 3;
        console.log('ADV_3_6:' + ADV_3_6)
        let ADV_4_0 = ADV_3_4;
        let ADV_5_7 = ADV_0_2;
        let ADV_6_8 = (Sewage_flow / 24 / 3600) * NI * MLSS_O / (RHO_O * 1000);
        let ADV_7_0 = ADV_5_7;
        let ADV_8_0 = (Sewage_flow / 24 / 3600) * NI * MLSS_SLS / (RHO_SLS * 1000);
        let ADV_8_9 = ADV_6_8 - ADV_8_0;

        let Surplus_sludge = EFFLUENT_stp * Oxygen_require_O * F_BOD_removal_O * Y_sludge_O + ADV_3_6 * RHO_PS *
          1000 * (3600 * 24) - ADV_8_0 * RHO_SLS * 1000 * (3600 * 24);
        console.log('Surplus_sludge:' + Surplus_sludge)
        let ADV_9_0 = Surplus_sludge / 24 / 3600 / (RHO_SLS * 1000);
        let ADV_9_6 = ADV_8_9 - ADV_9_0;

        console.log('ADV_9_0:' + ADV_9_0)
        let MLSS_PS = MLSS_RS / 3;
        let ERC = 300
        let C_in = 1000 * ERC / EFFLUENT_stp
        let Koc = this.dataForm.koc //CET 2000
        let Foc_RS = 0.18
        let Kp_RS = Foc_RS * Koc
        let C_0_2 = C_in / (1 + Kp_RS * MLSS_RS / 1000);
        console.log('C_0_2:' + C_0_2)
        let C_dissolved_RS = C_in / (1 + Kp_RS * MLSS_RS / 1000)
        let C_in_solids_RS = C_dissolved_RS * Kp_RS
        let C_0_3 = C_in_solids_RS * RHO_RS
        console.log('C_0_3:' + C_0_3)
        let R_ = 8.314
        let T_air = 283
        let H_ = this.dataForm.henry //CET Henry=510.9424354
        let Foc_PS = 0.18
        let Kp_PS = Foc_PS * Koc
        console.log('Kp_PS:' + Kp_PS)
        let Foc_O = 0.19
        let Kp_O = Foc_O * Koc
        let Foc_SLS = 0.19
        let Kp_SLS = Foc_SLS * Koc

        //V
        let V_1 = Area_STP * H_air
        let V_2 = Volume_PS
        let V_3 = V_2 * MLSS_PS / (RHO_PS * 1000)
        let V_4 = Area_PS * 0.1
        let V_5 = Volume_O
        let V_6 = MLSS_O * V_5 / (RHO_O * 1000)
        let V_7 = Volume_SLS
        let V_8 = MLSS_SLS * V_7 / (RHO_SLS * 1000)
        let V_9 = Area_SLS * 0.1

        //const
        let K_air = 0.00278
        let K_water = 0.0000278
        let Psi = 0.6
        let kGa_kLa = 40
        let Oxygen_concentration_O = 0.002
        let Deta_O2 = 0.009 - Oxygen_concentration_O
        let KH = H_ / (R_ * T_air)
        let GPC = kGa_kLa * KH / (kGa_kLa * KH + 1)
        let k_surf = Psi * Oxygen_require_O / (HRT_O * 3600 * Deta_O2) * GPC
        console.log('k_surf:' + k_surf)
        let F_Blackburn = 0.000504
        let F_Hsieh = 0.00089
        let Aeration_rate = 0.0000131 * NI
        let k_bubble1 = F_Blackburn * Aeration_rate / Volume_O * Math.pow(H_, 1.045)
        let k_bubble2 = F_Hsieh * Aeration_rate / Volume_O * Math.pow(H_, 1.04)
        let k_bubble = k_bubble2
        let Aerationmode_O = 's'
        let k_strip = k_bubble
        if (Aerationmode_O == 's') {
          k_strip = k_surf
        }

        let k_volatilization = Area_O * ((1 / (V_1 * Area_O / Area_STP) + KH / V_5) / (1 / K_air + KH / K_water))
        console.log('k_volatilization:' + k_volatilization)
        let k_aerator = k_strip + k_volatilization
        let t1_2_PS = 3600
        let t1_2_O = 360
        let t1_2_SLS = 3600
        //Z
        let Z_1 = 1 / (R_ * T_air)
        let Z_2 = 1 / H_
        let Z_3 = RHO_PS * Kp_PS / H_
        let Z_4 = RHO_PS * Kp_PS / H_
        let Z_5 = 1 / H_
        let Z_6 = RHO_O * Kp_O / H_
        let Z_7 = 1 / H_
        let Z_8 = RHO_SLS * Kp_SLS / H_
        let Z_9 = RHO_SLS * Kp_SLS / H_

        // D
        let D_1_2 = Area_PS / (1 / (K_air * Z_1) + 1 / (K_water * Z_2))
        console.log('D_1_2:' + D_1_2)
        let D_1_7 = Area_SLS / (1 / (K_air * Z_1) + 1 / (K_water * Z_7))
        let D_1_5 = k_aerator / (1 / (V_1 * Area_O / Area_STP * Z_1) + 1 / (V_5 * Z_5))
        console.log('D_1_5:' + D_1_5)
        let D_2_3 = (Math.log(2) / t1_2_PS) / (1 / (V_2 * Z_2) + 1 / (V_3 * Z_3))
        console.log('D_2_3:' + D_2_3)
        let D_5_6 = (Math.log(2) / t1_2_O) / (1 / (V_5 * Z_5) + 1 / (V_6 * Z_6))
        console.log('D_5_6:' + D_5_6)
        let D_7_8 = (Math.log(2) / t1_2_SLS) / (1 / (V_7 * Z_7) + 1 / (V_8 * Z_8))
        console.log('D_7_8:' + D_7_8)
        let k__5 = this.dataForm.kdegStp / 3600 //CET@'kdeg.stp'CET中默认为1不可更改
        console.log('kdegStp：' + this.dataForm.kdegStp)
        console.log('k__5：' + k__5)
        let k__6 = 0
        // XCH
        let XCH_1_2 = D_1_2 / Z_1
        let XCH_2_1 = D_1_2 / Z_2
        let XCH_1_5 = D_1_5 / Z_1
        let XCH_5_1 = D_1_5 / Z_5
        let XCH_1_7 = D_1_7 / Z_1
        let XCH_7_1 = D_1_7 / Z_7
        let XCH_2_3 = D_2_3 / Z_2
        let XCH_3_2 = D_2_3 / Z_3
        let XCH_5_6 = D_5_6 / Z_5
        let XCH_6_5 = D_5_6 / Z_6
        let XCH_7_8 = D_7_8 / Z_7
        let XCH_8_7 = D_7_8 / Z_8
        let c_1_1 = ADV_1_0 + XCH_1_2 + XCH_1_5 + XCH_1_7
        let c_1_2 = -XCH_2_1
        let c_1_5 = -XCH_5_1
        let c_1_7 = -XCH_7_1
        let c_2_1 = -XCH_1_2
        let c_2_2 = ADV_2_5 + XCH_2_1 + XCH_2_3
        let c_2_3 = -XCH_3_2
        let c_3_2 = -XCH_2_3
        let c_3_3 = XCH_3_2 + ADV_3_6 + ADV_3_4
        let c_4_3 = -ADV_3_4
        let c_4_4 = ADV_4_0
        let c_5_1 = -XCH_1_5
        let c_5_2 = -ADV_2_5
        let c_5_5 = XCH_5_1 + XCH_5_6 + ADV_5_7 + k__5 * V_5
        let c_5_6 = -XCH_6_5
        let c_6_3 = -ADV_3_6
        let c_6_5 = -XCH_5_6
        let c_6_6 = XCH_6_5 + ADV_6_8 + k__6 * V_6
        let c_6_9 = -ADV_9_6
        let c_7_1 = -XCH_1_7
        let c_7_5 = -ADV_5_7
        let c_7_7 = XCH_7_1 + XCH_7_8 + ADV_7_0
        let c_7_8 = -XCH_8_7
        let c_8_6 = -ADV_6_8
        let c_8_7 = -XCH_7_8
        let c_8_8 = XCH_8_7 + ADV_8_9 + ADV_8_0
        let c_9_8 = -ADV_8_9
        let c_9_9 = ADV_9_6 + ADV_9_0
        let coefarray = [
          [c_1_1, c_1_2, 0, 0, c_1_5, 0, c_1_7, 0, 0],
          [c_2_1, c_2_2, c_2_3, 0, 0, 0, 0, 0, 0],
          [0, c_3_2, c_3_3, 0, 0, 0, 0, 0, 0],
          [0, 0, c_4_3, c_4_4, 0, 0, 0, 0, 0],
          [c_5_1, c_5_2, 0, 0, c_5_5, c_5_6, 0, 0, 0],
          [0, 0, c_6_3, 0, c_6_5, c_6_6, 0, 0, c_6_9],
          [c_7_1, 0, 0, 0, c_7_5, 0, c_7_7, c_7_8, 0],
          [0, 0, 0, 0, 0, c_8_6, c_8_7, c_8_8, 0],
          [0, 0, 0, 0, 0, 0, 0, c_9_8, c_9_9]
        ]
        let constr = [
          [0],
          [ADV_0_2 * C_0_2],
          [ADV_0_3 * C_0_3],
          [0],
          [0],
          [0],
          [0],
          [0],
          [0]
        ]
        let result = this.inv(coefarray)
        let C_M = this.multiply(result, constr)
        let N_in = ADV_0_2 * C_0_2 + ADV_0_3 * C_0_3
        let N_out = ADV_1_0 * C_M[0] + ADV_7_0 * C_M[6] + ADV_8_0 * C_M[7] + ADV_9_0 * C_M[8] + ADV_4_0 * C_M[3]
        let D = N_in - N_out
        console.log('N_in:' + N_in)
        console.log('N_out:' + N_out)
        console.log('D:' + D)
        this.dataForm.fstpWater = Number((ADV_7_0 * C_M[6] + C_M[7] * ADV_8_0) / N_in).toPrecision(3)
        this.dataForm.fstpWater = this.dataForm.fstpWater
        console.log('fstpWater:' + this.dataForm.fstpWater)
        this.dataForm.fstpAir = Number(ADV_0_1 * C_M[0] / N_in).toPrecision(3)
        console.log('fstpAir:' + this.dataForm.fstpAir)
        this.dataForm.fstpSludge = Number((ADV_4_0 * C_M[3] / N_in) + (ADV_9_0 * C_M[8] / N_in)).toPrecision(3)
        console.log('fstpSludge:' + this.dataForm.fstpSludge)
        this.dataForm.fstpDegrade = Number((k__5 * V_5 * C_M[4] + k__6 * V_6 * C_M[5]) / N_in).toPrecision(3)
        console.log('fstpDegrade:' + this.dataForm.fstpDegrade)
        this.dataForm.fstpTotal = Number(Number(this.dataForm.fstpWater) + Number(this.dataForm.fstpAir) +
          Number(this
            .dataForm.fstpSludge) + Number(this.dataForm.fstpDegrade)).toPrecision(3)
        console.log('fstpTotal:' + this.dataForm.fstpTotal)
        if (this.dataForm.fstpTotal > 0.999) this.dataForm.fstpTotal = 1 //大于0.999强制转换成1
      },
      calcSTP2: function () {
        debugger
        //input
        let Depth_PS = 4
        let HRT_PS = 2
        let EFFLUENT_stp = 2000
        let Volume_PS = EFFLUENT_stp * HRT_PS / 24
        let HRT_O = 10
        let Area_PS = Volume_PS / Depth_PS
        let Volume_O = HRT_O / 24 * EFFLUENT_stp;
        let Depth_O = 3
        let Area_O = Volume_O / Depth_O
        let HRT_SLS = 6
        let Depth_SLS = 3;

        let Volume_SLS = EFFLUENT_stp * HRT_SLS / 24;
        let Area_SLS = Volume_SLS / Depth_SLS;
        let Area_STP = Area_PS + Area_O + Area_SLS;
        console.log('Area_STP:' + Area_STP)
        let H_air = 10;
        let Windspeed = 2; //CET 2
        if (this.parameter != null) {
          Windspeed = this.parameter.wind
        }
        console.log('wind' + Windspeed)
        let MLSS_RS = 0.2
        let RHO_RS = 1.6;
        let Sewage_flow = 0.145;
        let MLSS_O = 3;
        let RHO_O = 1.6;
        let NI = EFFLUENT_stp / Sewage_flow;
        console.log('NI:' + NI)
        let MLSS_SLS = 0.02;
        let RHO_SLS = 1.6;
        let BOD_RS = 0.15
        let K_SLR_O = 0.15
        let F_BOD_remove_PS = 13 / 36
        console.log('F_BOD_remove_PS:' + F_BOD_remove_PS)
        let Oxygen_require_O = (BOD_RS) * (1 - F_BOD_remove_PS)
        console.log('Oxygen_require_O:' + Oxygen_require_O)
        let F_BOD_removal_O = 0.818 - 0.0422 * Math.log(K_SLR_O)
        let Y_sludge_O = 0.947 + 0.0739 * Math.log(K_SLR_O)
        console.log('Y_sludge_O:' + Y_sludge_O)
        let RHO_PS = 1.6;

        //ADV
        let ADV_0_1 = Math.sqrt(Area_STP) * H_air * Windspeed;
        let ADV_1_0 = Math.sqrt(Area_STP) * H_air * Windspeed;
        console.log('ADV_0_1:' + ADV_0_1)
        let ADV_0_2 = EFFLUENT_stp / 24 / 3600;
        let ADV_2_5 = EFFLUENT_stp / 24 / 3600;
        let ADV_0_3 = MLSS_RS * EFFLUENT_stp / (RHO_RS * 1000) / 24 / 3600;
        let ADV_3_4 = (2 / 3) * ADV_0_3;
        let ADV_3_6 = ADV_0_3 / 3;
        console.log('ADV_3_6:' + ADV_3_6)
        let ADV_4_0 = ADV_3_4;
        let ADV_5_7 = ADV_0_2;
        let ADV_6_8 = (Sewage_flow / 24 / 3600) * NI * MLSS_O / (RHO_O * 1000);
        let ADV_7_0 = ADV_5_7;
        let ADV_8_0 = (Sewage_flow / 24 / 3600) * NI * MLSS_SLS / (RHO_SLS * 1000);
        let ADV_8_9 = ADV_6_8 - ADV_8_0;

        let Surplus_sludge = EFFLUENT_stp * Oxygen_require_O * F_BOD_removal_O * Y_sludge_O + ADV_3_6 * RHO_PS *
          1000 * (3600 * 24) - ADV_8_0 * RHO_SLS * 1000 * (3600 * 24);
        console.log('Surplus_sludge:' + Surplus_sludge)
        let ADV_9_0 = Surplus_sludge / 24 / 3600 / (RHO_SLS * 1000);
        let ADV_9_6 = ADV_8_9 - ADV_9_0;

        console.log('ADV_9_0:' + ADV_9_0)
        let MLSS_PS = MLSS_RS / 3;
        let ERC = 300
        let C_in = 1000 * ERC / EFFLUENT_stp
        let Koc = this.dataForm.koc //CET 2000
        let Foc_RS = 0.18
        let Kp_RS = Foc_RS * Koc
        let C_0_2 = C_in / (1 + Kp_RS * MLSS_RS / 1000);
        console.log('C_0_2:' + C_0_2)
        let C_dissolved_RS = C_in / (1 + Kp_RS * MLSS_RS / 1000)
        let C_in_solids_RS = C_dissolved_RS * Kp_RS
        let C_0_3 = C_in_solids_RS * RHO_RS
        console.log('C_0_3:' + C_0_3)
        let R_ = 8.314
        let T_air = 283
        let H_ = this.dataForm.henry //CET Henry=510.9424354
        let Foc_PS = 0.18
        let Kp_PS = Foc_PS * Koc
        console.log('Kp_PS:' + Kp_PS)
        let Foc_O = 0.19
        let Kp_O = Foc_O * Koc
        let Foc_SLS = 0.19
        let Kp_SLS = Foc_SLS * Koc

        //V
        let V_1 = Area_STP * H_air
        let V_2 = Volume_PS
        let V_3 = V_2 * MLSS_PS / (RHO_PS * 1000)
        let V_4 = Area_PS * 0.1
        let V_5 = Volume_O
        let V_6 = MLSS_O * V_5 / (RHO_O * 1000)
        let V_7 = Volume_SLS
        let V_8 = MLSS_SLS * V_7 / (RHO_SLS * 1000)
        let V_9 = Area_SLS * 0.1

        //const
        let K_air = 0.00278
        let K_water = 0.0000278
        let Psi = 0.6
        let kGa_kLa = 40
        let Oxygen_concentration_O = 0.002
        let Deta_O2 = 0.009 - Oxygen_concentration_O
        let KH = H_ / (R_ * T_air)
        let GPC = kGa_kLa * KH / (kGa_kLa * KH + 1)
        let k_surf = Psi * Oxygen_require_O / (HRT_O * 3600 * Deta_O2) * GPC
        console.log('k_surf:' + k_surf)
        let F_Blackburn = 0.000504
        let F_Hsieh = 0.00089
        let Aeration_rate = 0.0000131 * NI
        let k_bubble1 = F_Blackburn * Aeration_rate / Volume_O * Math.pow(H_, 1.045)
        let k_bubble2 = F_Hsieh * Aeration_rate / Volume_O * Math.pow(H_, 1.04)
        let k_bubble = k_bubble2
        let Aerationmode_O = 's'
        let k_strip = k_bubble
        if (Aerationmode_O == 's') {
          k_strip = k_surf
        }

        let k_volatilization = Area_O * ((1 / (V_1 * Area_O / Area_STP) + KH / V_5) / (1 / K_air + KH / K_water))
        console.log('k_volatilization:' + k_volatilization)
        let k_aerator = k_strip + k_volatilization
        let t1_2_PS = 3600
        let t1_2_O = 360
        let t1_2_SLS = 3600
        //Z
        let Z_1 = 1 / (R_ * T_air)
        let Z_2 = 1 / H_
        let Z_3 = RHO_PS * Kp_PS / H_
        let Z_4 = RHO_PS * Kp_PS / H_
        let Z_5 = 1 / H_
        let Z_6 = RHO_O * Kp_O / H_
        let Z_7 = 1 / H_
        let Z_8 = RHO_SLS * Kp_SLS / H_
        let Z_9 = RHO_SLS * Kp_SLS / H_

        // D
        let D_1_2 = Area_PS / (1 / (K_air * Z_1) + 1 / (K_water * Z_2))
        console.log('D_1_2:' + D_1_2)
        let D_1_7 = Area_SLS / (1 / (K_air * Z_1) + 1 / (K_water * Z_7))
        let D_1_5 = k_aerator / (1 / (V_1 * Area_O / Area_STP * Z_1) + 1 / (V_5 * Z_5))
        console.log('D_1_5:' + D_1_5)
        let D_2_3 = (Math.log(2) / t1_2_PS) / (1 / (V_2 * Z_2) + 1 / (V_3 * Z_3))
        console.log('D_2_3:' + D_2_3)
        let D_5_6 = (Math.log(2) / t1_2_O) / (1 / (V_5 * Z_5) + 1 / (V_6 * Z_6))
        console.log('D_5_6:' + D_5_6)
        let D_7_8 = (Math.log(2) / t1_2_SLS) / (1 / (V_7 * Z_7) + 1 / (V_8 * Z_8))
        console.log('D_7_8:' + D_7_8)
        let k__5 = this.dataForm.kdegStp2 / 3600 //CET@'kdeg.stp'CET中默认为1不可更改
        console.log('kdegStp2：' + this.dataForm.kdegStp2)
        console.log('k__5：' + k__5)
        let k__6 = 0
        // XCH
        let XCH_1_2 = D_1_2 / Z_1
        let XCH_2_1 = D_1_2 / Z_2
        let XCH_1_5 = D_1_5 / Z_1
        let XCH_5_1 = D_1_5 / Z_5
        let XCH_1_7 = D_1_7 / Z_1
        let XCH_7_1 = D_1_7 / Z_7
        let XCH_2_3 = D_2_3 / Z_2
        let XCH_3_2 = D_2_3 / Z_3
        let XCH_5_6 = D_5_6 / Z_5
        let XCH_6_5 = D_5_6 / Z_6
        let XCH_7_8 = D_7_8 / Z_7
        let XCH_8_7 = D_7_8 / Z_8
        let c_1_1 = ADV_1_0 + XCH_1_2 + XCH_1_5 + XCH_1_7
        let c_1_2 = -XCH_2_1
        let c_1_5 = -XCH_5_1
        let c_1_7 = -XCH_7_1
        let c_2_1 = -XCH_1_2
        let c_2_2 = ADV_2_5 + XCH_2_1 + XCH_2_3
        let c_2_3 = -XCH_3_2
        let c_3_2 = -XCH_2_3
        let c_3_3 = XCH_3_2 + ADV_3_6 + ADV_3_4
        let c_4_3 = -ADV_3_4
        let c_4_4 = ADV_4_0
        let c_5_1 = -XCH_1_5
        let c_5_2 = -ADV_2_5
        let c_5_5 = XCH_5_1 + XCH_5_6 + ADV_5_7 + k__5 * V_5
        let c_5_6 = -XCH_6_5
        let c_6_3 = -ADV_3_6
        let c_6_5 = -XCH_5_6
        let c_6_6 = XCH_6_5 + ADV_6_8 + k__6 * V_6
        let c_6_9 = -ADV_9_6
        let c_7_1 = -XCH_1_7
        let c_7_5 = -ADV_5_7
        let c_7_7 = XCH_7_1 + XCH_7_8 + ADV_7_0
        let c_7_8 = -XCH_8_7
        let c_8_6 = -ADV_6_8
        let c_8_7 = -XCH_7_8
        let c_8_8 = XCH_8_7 + ADV_8_9 + ADV_8_0
        let c_9_8 = -ADV_8_9
        let c_9_9 = ADV_9_6 + ADV_9_0
        let coefarray = [
          [c_1_1, c_1_2, 0, 0, c_1_5, 0, c_1_7, 0, 0],
          [c_2_1, c_2_2, c_2_3, 0, 0, 0, 0, 0, 0],
          [0, c_3_2, c_3_3, 0, 0, 0, 0, 0, 0],
          [0, 0, c_4_3, c_4_4, 0, 0, 0, 0, 0],
          [c_5_1, c_5_2, 0, 0, c_5_5, c_5_6, 0, 0, 0],
          [0, 0, c_6_3, 0, c_6_5, c_6_6, 0, 0, c_6_9],
          [c_7_1, 0, 0, 0, c_7_5, 0, c_7_7, c_7_8, 0],
          [0, 0, 0, 0, 0, c_8_6, c_8_7, c_8_8, 0],
          [0, 0, 0, 0, 0, 0, 0, c_9_8, c_9_9]
        ]
        let constr = [
          [0],
          [ADV_0_2 * C_0_2],
          [ADV_0_3 * C_0_3],
          [0],
          [0],
          [0],
          [0],
          [0],
          [0]
        ]
        let result = this.inv(coefarray)
        let C_M = this.multiply(result, constr)
        let N_in = ADV_0_2 * C_0_2 + ADV_0_3 * C_0_3
        let N_out = ADV_1_0 * C_M[0] + ADV_7_0 * C_M[6] + ADV_8_0 * C_M[7] + ADV_9_0 * C_M[8] + ADV_4_0 * C_M[3]
        let D = N_in - N_out
        console.log('N_in:' + N_in)
        console.log('N_out:' + N_out)
        console.log('D:' + D)
        this.dataForm.fstpWater2 = Number((ADV_7_0 * C_M[6] + C_M[7] * ADV_8_0) / N_in).toPrecision(3)
        this.dataForm.fstpWater2 = this.dataForm.fstpWater2
        console.log('fstpWater2:' + this.dataForm.fstpWater2)
        this.dataForm.fstpAir2 = Number(ADV_0_1 * C_M[0] / N_in).toPrecision(3)
        console.log('fstpAir2:' + this.dataForm.fstpAir2)
        this.dataForm.fstpSludge2 = Number((ADV_4_0 * C_M[3] / N_in) + (ADV_9_0 * C_M[8] / N_in)).toPrecision(3)
        console.log('fstpSludge2:' + this.dataForm.fstpSludge2)
        this.dataForm.fstpDegrade2 = Number((k__5 * V_5 * C_M[4] + k__6 * V_6 * C_M[5]) / N_in).toPrecision(3)
        console.log('fstpDegrade2:' + this.dataForm.fstpDegrade2)
        this.dataForm.fstpTotal2 = Number(Number(this.dataForm.fstpWater2) + Number(this.dataForm.fstpAir2) +
          Number(this
            .dataForm.fstpSludge2) + Number(this.dataForm.fstpDegrade2)).toPrecision(3)
        console.log('fstpTotal2:' + this.dataForm.fstpTotal2)
        if (this.dataForm.fstpTotal2 > 0.999) this.dataForm.fstpTotal2 = 1 //大于0.999强制转换成1
      }

    },
    computed: {
      densityUpdate() {
        return this.$store.state.element.density
      },
      parameterUpdate() {
        return this.$store.state.element.parameter
      }
    },

    watch: {
      currentElement: function (val, oldVal) {
        if (this.currentElement == null) {
          console.log('没有选择物质')
        } else {
          // this.$api.density.findByCas({
          //   cas: this.currentElement.cas
          // }).then((res) => {
          //   this.dataForm = res.data
          // })
          // this.$api.parameter.findByCas({
          //   cas: this.currentElement.cas
          // }).then((res) => {
          //   this.parameter = res.data
          // })
        }

      },
      densityUpdate: function (newVal, oldVal) {
        this.dataForm = newVal
      },
      parameterUpdate: function (newVal, oldVal) {
        this.parameter = newVal
      }


    }
  }

</script>

<style scoped>
  .divwidth {
    width: 600px;
    align-content: center;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>
