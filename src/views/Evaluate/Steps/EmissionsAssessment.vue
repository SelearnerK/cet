<template>
<div>

  <div class="emission-left">
    <el-menu
      :default-active="0+''"
      @open="handleOpen"
      @close="handleClose"
      style="width: 200px;">
      <el-submenu index="0">
        <template slot="title">
          <span>暴露场景</span>
        </template>
        <el-menu-item :index="(index +'')" v-for="(item,index) in this.emissions" :key="index" @click="showEmissions(item)"><span>暴露场景{{index+1}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

  <div class="emission-content">
    <h2>排放源：{{useSource}}</h2>
  <div v-show="input_disabled">

    <el-form ref="form" :model="form" label-width="600px">

<div v-show="industrial_disabled">

      <el-form-item label="化学物质的年生产使用量：" style=" width: 100%;" prop="qchemical">
        <el-col :span="6">
          <el-input v-model="form.qchemical" style="width: 100%;" auto-complete="off" :disabled="qchemical_disabled">
            <template slot="append">kg/y</template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" circle @click="changeQchmical"></el-button>
        </el-col>

      </el-form-item>

      <el-form-item label="年排放时间：" style=" width: 100%;" prop="temission">
        <el-col :span="6">
          <el-input v-model="form.temission" style="width: 100%;" auto-complete="off" :disabled="temission_disabled">
            <template slot="append">d/y</template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" circle @click="changeTemission"></el-button>
        </el-col>
      </el-form-item>

  <el-form-item label="主要排放源占比：" style=" width: 100%;" prop="main">
    <el-col :span="6">
      <el-input v-model="form.main" style="width: 100%;" auto-complete="off" :disabled="main_disabled">
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" icon="el-icon-edit" circle @click="changeMain"></el-button>
    </el-col>
  </el-form-item>

      <el-form-item label="排放模式：" style=" width: 100%;" prop="emissionPattern">
        <el-col :span="6">
          <el-radio v-model="form.emissionPattern" label="1">间歇排放</el-radio>
          <el-radio v-model="form.emissionPattern" label="2">连续排放</el-radio>
        </el-col>
      </el-form-item>

      <el-form-item label="排放系数"  style="width: 100%;" >
        <el-col :span="20"></el-col>
      </el-form-item>

      <el-form-item label="排放系数-废水：" style=" width: 100%;" prop="water">
        <el-col :span="6">
          <el-input v-model="form.water" style="width: 100%;" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="排放系数-废气：" style=" width: 100%;" prop="air">
        <el-col :span="6">
          <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="排放系数-土壤：" style=" width: 100%;" prop="sludge">
        <el-col :span="6">
          <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="污染控制"  style="width: 100%;" >
        <el-col :span="20"></el-col>
      </el-form-item>

      <el-form-item label="企业内部减排效率-大气：" style=" width: 100%;" prop="abatementAir">
        <el-col :span="6">
          <el-input v-model="form.abatementAir" style="width: 100%;" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="企业内部减排效率-土壤：" style=" width: 100%;" prop="abatementSludge">
        <el-col :span="6">
          <el-input v-model="form.abatementSludge" style="width: 100%;" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="企业自有STP处理："  style=" width: 100%;" prop="stponsite">
        <el-col :span="6">
            <el-select style="width: 100%;" v-model="form.stponsite" placeholder="请选择" @change="stponsiteShow">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

      <el-row v-show="stponsite_disabled">
          <el-form-item label="STP地表水排放系数：" style=" width: 100%;" prop="stponsiteWater" ><el-col :span="6">
              <el-input v-model="form.stponsiteWater" style="width: 100%;" auto-complete="off" @change="setAbatementWater"></el-input>   </el-col>
          </el-form-item>


            <el-form-item label="STP大气排放系数：" style=" width: 100%;" prop="stponsiteAir">
              <el-col :span="6">
                <el-input v-model="form.stponsiteAir" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="STP污泥排放系数：" style=" width: 100%;" prop="stponsiteSludge">
              <el-col :span="6">
                <el-input v-model="form.stponsiteSludge" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

        <el-form-item label="降解去除：" style=" width: 100%;" prop="stponsiteDegrade">
          <el-col :span="6">
            <el-input v-model="form.stponsiteDegrade" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-row>

  <el-form-item label="企业内部减排效率-废水：" style=" width: 100%;" prop="abatementWater">
    <el-col :span="6">
      <el-input v-model="form.abatementWater" style="width: 100%;" auto-complete="off" :disabled="abatementWater_disabled"></el-input>
    </el-col>
  </el-form-item>

      <el-form-item label="废水去向"  style="width: 100%;" >
        <el-col :span="20"></el-col>
      </el-form-item>

      <el-form-item label="废水去向：" style=" width: 100%;" prop="waterTo">
        <el-col :span="8">
          <el-radio v-model="form.waterTo" label="1">直排地表水</el-radio>
          <el-radio v-model="form.waterTo" label="2">进入公共STP处理</el-radio>
        </el-col>
      </el-form-item>

      <el-form-item label="公共STP排放评估方法：" style=" width: 100%;" prop="publicStp" >
        <el-col :span="8">
          <el-radio v-model="form.publicStp" label="1" @change="stpShow">标准STP</el-radio>
          <el-radio v-model="form.publicStp" label="2" @change="stpShow">自行输入</el-radio>
        </el-col>
      </el-form-item>

      <el-row v-show="stp_disabled">
        <el-form-item label="STP地表水排放系数：" style=" width: 100%;" prop="stpWater"><el-col :span="6">
          <el-input v-model="form.stpWater" style="width: 100%;" auto-complete="off"></el-input>   </el-col>
        </el-form-item>

        <el-form-item label="STP大气排放系数：" style=" width: 100%;" prop="stpAir">
          <el-col :span="6">
            <el-input v-model="form.stpAir" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="STP污泥排放系数：" style=" width: 100%;" prop="stpSludge">
          <el-col :span="6">
            <el-input v-model="form.stpSludge" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="降解去除：" style=" width: 100%;" prop="stpDegrade">
          <el-col :span="6">
            <el-input v-model="form.stpDegrade" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-row>

      <el-form-item label="污泥是否农用：" style=" width: 100%;" prop="appLsludge" >
        <el-col :span="8">
          <el-radio v-model="form.appLsludge" label="1">是</el-radio>
          <el-radio v-model="form.appLsludge" label="2">否</el-radio>
        </el-col>
      </el-form-item>

      <el-form-item label="周边环境"  style="width: 100%;" >
        <el-col :span="20"></el-col>
      </el-form-item>

      <el-form-item label="废水流量：" style=" width: 100%;" prop="stpEffluent">
        <el-col :span="6">
          <el-input v-model="form.stpEffluent" style="width: 100%;" auto-complete="off">
            <template slot="append">m<sup>3</sup>/d</template>
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="受纳水体流量：" style=" width: 100%;" prop="flow">
        <el-col :span="6">
          <el-input v-model="form.flow" style="width: 100%;" auto-complete="off">
            <template slot="append">m<sup>3</sup>/d</template>
          </el-input>
        </el-col>
      </el-form-item>
</div>

      <div v-show="consume_disabled">

        <el-form-item label="化学物质的年生产使用量：" style=" width: 100%;" prop="qchemical">
          <el-col :span="6">
            <el-input v-model="form.qchemical" style="width: 100%;" auto-complete="off" :disabled="qchemical_disabled">
              <template slot="append">kg/y</template>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-edit" circle @click="changeQchmical"></el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="区域使用量占全国的比例：" style=" width: 100%;" prop="freg">
          <el-col :span="6">
            <el-input v-model="form.freg" style="width: 100%;" auto-complete="off" :disabled="freg_disabled">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-edit" circle @click="changeFreg"></el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="STP服务区域用量占区域用量的比例：" style=" width: 100%;" prop="flocal">
          <el-col :span="6">
            <el-input v-model="form.flocal" style="width: 100%;" auto-complete="off" >
            </el-input>
          </el-col>

        </el-form-item>

        <el-form-item label="空间和时间的变异系数：" style=" width: 100%;" prop="fvariability">
          <el-col :span="6">
            <el-input v-model="form.fvariability" style="width: 100%;" auto-complete="off" :disabled="fvariability_disabled">
            </el-input>
          </el-col>
          <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" circle @click="changeFvariability"></el-button>
        </el-col>
        </el-form-item>

        <el-form-item label="排放系数"  style="width: 100%;" >
          <el-col :span="20"></el-col>
        </el-form-item>

        <el-form-item label="排放系数-废水：" style=" width: 100%;" prop="water">
          <el-col :span="6">
            <el-input v-model="form.water" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="排放系数-废气：" style=" width: 100%;" prop="air">
          <el-col :span="6">
            <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="排放系数-土壤：" style=" width: 100%;" prop="sludge">
          <el-col :span="6">
            <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="年排放时间：" style=" width: 100%;" prop="temission">
          <el-col :span="6">
            <el-input v-model="form.temission" style="width: 100%;" auto-complete="off" :disabled="temission_disabled">
              <template slot="append">d/y</template>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-edit" circle @click="changeTemission"></el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="废水直排比例：" style=" width: 100%;" prop="fdirectwater">
          <el-col :span="6">
            <el-input v-model="form.fdirectwater" style="width: 100%;" auto-complete="off" :disabled="fdirectwater_disabled">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-edit" circle @click="changeFdirectwater"></el-button>
          </el-col>
        </el-form-item>

      </div>

      <div v-show="waste_disabled">

        <el-form-item label="化学物质的年生产使用量：" style=" width: 100%;" prop="qchemical">
          <el-col :span="6">
            <el-input v-model="form.qchemical" style="width: 100%;" auto-complete="off" :disabled="qchemical_disabled">
              <template slot="append">kg/y</template>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-edit" circle @click="changeQchmical"></el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="年排放时间：" style=" width: 100%;" prop="temission">
          <el-col :span="6">
            <el-input v-model="form.temission" style="width: 100%;" auto-complete="off" :disabled="temission_disabled">
              <template slot="append">d/y</template>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-edit" circle @click="changeTemission"></el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="进入固体废物的化学物质的比例：" style=" width: 100%;" prop="waste">
          <el-col :span="6">
            <el-input v-model="form.waste" style="width: 100%;" auto-complete="off">
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="分散因子：" style=" width: 100%;" prop="main">
          <el-col :span="6">
            <el-input v-model="form.main" style="width: 100%;" auto-complete="off">
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="排放模式：" style=" width: 100%;" prop="emissionPattern">
          <el-col :span="6">
            <el-radio v-model="form.emissionPattern" label="1">间歇排放</el-radio>
            <el-radio v-model="form.emissionPattern" label="2">连续排放</el-radio>
          </el-col>
        </el-form-item>

        <el-form-item label="排放系数"  style="width: 100%;" >
          <el-col :span="20"></el-col>
        </el-form-item>

        <el-form-item label="排放系数-废水：" style=" width: 100%;" prop="water">
          <el-col :span="6">
            <el-input v-model="form.water" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="排放系数-废气：" style=" width: 100%;" prop="air">
          <el-col :span="6">
            <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="排放系数-土壤：" style=" width: 100%;" prop="sludge">
          <el-col :span="6">
            <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="污染控制"  style="width: 100%;" >
          <el-col :span="20"></el-col>
        </el-form-item>

        <el-form-item label="企业内部减排效率-大气：" style=" width: 100%;" prop="abatementAir">
          <el-col :span="6">
            <el-input v-model="form.abatementAir" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="企业内部减排效率-土壤：" style=" width: 100%;" prop="abatementSludge">
          <el-col :span="6">
            <el-input v-model="form.abatementSludge" style="width: 100%;" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="企业自有STP处理："  style=" width: 100%;" prop="stponsite">
          <el-col :span="6">
            <el-select style="width: 100%;" v-model="form.stponsite" placeholder="请选择" @change="stponsiteShow">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-row v-show="stponsite_disabled">

          <el-form-item label="STP地表水排放系数：" style=" width: 100%;" prop="stponsiteWater" ><el-col :span="6">
            <el-input v-model="form.stponsiteWater" style="width: 100%;" auto-complete="off" @change="setAbatementWater"></el-input>   </el-col>
          </el-form-item>


          <el-form-item label="STP大气排放系数：" style=" width: 100%;" prop="stponsiteAir">
            <el-col :span="6">
              <el-input v-model="form.stponsiteAir" style="width: 100%;" auto-complete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="STP污泥排放系数：" style=" width: 100%;" prop="stponsiteSludge">
            <el-col :span="6">
              <el-input v-model="form.stponsiteSludge" style="width: 100%;" auto-complete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="降解去除：" style=" width: 100%;" prop="stponsiteDegrade">
            <el-col :span="6">
              <el-input v-model="form.stponsiteDegrade" style="width: 100%;" auto-complete="off"></el-input>
            </el-col>
          </el-form-item>
        </el-row>

        <el-form-item label="企业内部减排效率-废水：" style=" width: 100%;" prop="abatementWater" >
          <el-col :span="6">
            <el-input v-model="form.abatementWater" style="width: 100%;" auto-complete="off" :disabled="abatementWater_disabled"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="废水去向"  style="width: 100%;" >
          <el-col :span="20"></el-col>
        </el-form-item>

        <el-form-item label="废水去向：" style=" width: 100%;" prop="waterTo">
          <el-col :span="8">
            <el-radio v-model="form.waterTo" label="1">直排地表水</el-radio>
            <el-radio v-model="form.waterTo" label="2">进入公共STP处理</el-radio>
          </el-col>
        </el-form-item>

        <el-form-item label="公共STP排放评估方法：" style=" width: 100%;" prop="publicStp" >
          <el-col :span="8">
            <el-radio v-model="form.publicStp" label="1" @change="stpShow">标准STP</el-radio>
            <el-radio v-model="form.publicStp" label="2" @change="stpShow">自行输入</el-radio>
          </el-col>
        </el-form-item>

        <el-row v-show="stp_disabled">
          <el-form-item label="STP地表水排放系数：" style=" width: 100%;" prop="stpWater"><el-col :span="6">
            <el-input v-model="form.stpWater" style="width: 100%;" auto-complete="off"></el-input>   </el-col>
          </el-form-item>

          <el-form-item label="STP大气排放系数：" style=" width: 100%;" prop="stpAir">
            <el-col :span="6">
              <el-input v-model="form.stpAir" style="width: 100%;" auto-complete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="STP污泥排放系数：" style=" width: 100%;" prop="stpSludge">
            <el-col :span="6">
              <el-input v-model="form.stpSludge" style="width: 100%;" auto-complete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="降解去除：" style=" width: 100%;" prop="stpDegrade">
            <el-col :span="6">
              <el-input v-model="form.stpDegrade" style="width: 100%;" auto-complete="off"></el-input>
            </el-col>
          </el-form-item>
        </el-row>

        <el-form-item label="污泥是否农用：" style=" width: 100%;" prop="appLsludge" >
          <el-col :span="8">
            <el-radio v-model="form.appLsludge" label="1">是</el-radio>
            <el-radio v-model="form.appLsludge" label="2">否</el-radio>
          </el-col>
        </el-form-item>

        <el-form-item label="周边环境"  style="width: 100%;" >
          <el-col :span="20"></el-col>
        </el-form-item>

        <el-form-item label="废水流量：" style=" width: 100%;" prop="stpEffluent">
          <el-col :span="6">
            <el-input v-model="form.stpEffluent" style="width: 100%;" auto-complete="off">
              <template slot="append">m<sup>3</sup>/d</template>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="受纳水体流量：" style=" width: 100%;" prop="flow">
          <el-col :span="6">
            <el-input v-model="form.flow" style="width: 100%;" auto-complete="off">
              <template slot="append">m<sup>3</sup>/d</template>
            </el-input>
          </el-col>
        </el-form-item>
      </div>
    </el-form>

      <div class="emission-footer" >
        <el-button style="margin-top: 12px" @click="compute" >计算</el-button>
        <el-button style="margin-top: 12px" @click="save" >保存</el-button>
      </div>
  </div>
    <div v-show="compute_disabled">
      <all-resutls
        :results="this.results"
        @last="last"> </all-resutls>
    </div>
  </div>

</div>
</template>

<script>
  import AllResutls from "../../Error/Results";
    export default {
        name: "EmissionsAssessment",
      components:{
        AllResutls,
      },
      data() {

        return {
          qchemical_disabled: true,
          temission_disabled: true,
          freg_disabled: true,
          fvariability_disabled: true,
          main_disabled: true,
          fdirectwater_disabled: true,

          abatementWater_disabled: false,
          useSource: '',
          input_disabled: true,
          industrial_disabled: false,
          consume_disabled: false,
          waste_disabled: false,
          compute_disabled: false,
          stponsite_disabled: false,
          stp_disabled: false,
          emissions: [],
          // 新增编辑界面数据
          tableData: null,
          form:{
            id: '',
            cas: 'string',
            //工业使用
            qchemical: 0,
            temission: 0,
            main: 0,
            emissionPattern: '',
            water: 0,
            air: 0,
            sludge: 0,
            abatementWater: 0,
            abatementAir: 0,
            abatementSludge: 0,
            stponsite: '',
            stponsiteWater: 0,
            stponsiteAir: 0,
            stponsiteSludge: 0,
            stponsiteDegrade: 0,
            waterTo: '',
            publicStp: '',
            stpWater: 0,
            stpAir: 0,
            stpSludge: 0,
            stpDegrade: 0,
            appLsludge: '',
            stpEffluent: 0,
            flow: 0,
            //消费使用
            freg: '',
            flocal: '',
            fvariability: '',
            fdirectwater: '',

            //废物处置利用源使用
            waste: 0,
          },
          results:{
            id: 0,
            elocalWater: 0, //直排时为0
            elocalDirectwater: 0, //进入公共STP时为0
            elocalAir: 0,
            elocalstpAir: 0, //经过公共STP处理后大气排放，直排时为0
            elocalSoil: 0,
            elocalstpWater: 0, //经过公共STP处理后水排放，直排时为0
          },
          size: "small",
          options: [{
            value: '选项1',
            label: '标准STP'
          }, {
            value: '选项2',
            label: '自行输入'
          }, {
            value: '选项3',
            label: '无'
          },],
        };
      },
      created(){
          this.form.cas = this.$store.getters.getCas;
        let cas = {cas:this.form.cas};
        this.$api.output.findByCas(cas).then((res) => {
          if(res.code === 200){
            console.log("emissions:",res.data);
            this.emissions = res.data;
          }
          this.showEmissions(this.emissions[0]);
        });
      },

      methods: {
          save(){
            let emissionsResult = Object.assign({}, this.form);
            this.$api.output.save(emissionsResult).then((res) => {
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
              this.getEmissions((this.form.cas));
            })
          },
          last(){
            this.input_disabled = true;
            this.compute_disabled = false;
          },
        changeQchmical(){
          this.qchemical_disabled = false;
        },
        changeTemission(){
            this.temission_disabled = false;
        },
        changeFreg(){
          this.freg_disabled = false;
        },
        changeFvariability(){
          this.fvariability_disabled = false;
        },
        changeFdirectwater(){
          this.fdirectwater_disabled = false;
        },
        changeMain(){
          this.main_disabled = false;
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        setAbatementWater(){
          if(this.form.stponsite === '自行输入') {
            this.form.abatementWater = 1 - parseFloat(this.form.stponsiteWater);
            console.log("type:",typeof(this.form.abatementWater) )
            this.abatementWater_disabled = true;
          }
        },
        showEmissions(item){
          this.input_disabled = true;
          this.compute_disabled = false;
          if(item.lifeCycle === '消费使用'){
            this.industrial_disabled = false;
            this.consume_disabled = true;
            this.waste_disabled = false;
            this.useSource = '消费源';
          }
          else if(item.lifeCycle === '废物利用处置'){
            this.industrial_disabled = false;
            this.consume_disabled = false;
            this.waste_disabled = true;
              this.useSource = '废物处置利用源';
          }
              else{
                this.industrial_disabled = true;
            this.consume_disabled = false;
            this.waste_disabled = false;
                this.useSource = '工业源';
          }
              if(item.stponsite === '自行输入'){
                this.stponsite_disabled = true;
              }
              else{
                this.stponsite_disabled = false;
              }
              if(item.publicStp === '2'){
                this.stp_disabled = true;
              }
              else{
                this.stp_disabled = false;
              }
              this.results.id = item.id;
          this.form.id = item.id;
          this.form.qchemical = item.qchemical;
          this.form.temission = item.temission;
          this.form.main = item.main;
          this.form.emissionPattern = item.emissionPattern;
          this.form.waste = item.waste;
          this.form.water = item.water;
          this.form.air = item.air;
          this.form.sludge = item.sludge;
          this.form.abatementWater = item.abatementWater;
          this.form.abatementAir = item.abatementAir;
          this.form.abatementSludge = item.abatementSludge;
          this.form.stponsite = item.stponsite;
          this.form.stponsiteWater = item.stponsiteWater;
          this.form.stponsiteAir = item.stponsiteAir;
          this.form.stponsiteSludge = item.stponsiteSludge;
          this.form.stponsiteDegrade = item.stponsiteDegrade;
          this.form.waterTo = item.waterTo;
          this.form.publicStp = item.publicStp;
          this.form.stpWater = item.stpWater;
          this.form.stpAir = item.stpAir;
          this.form.stpSludge = item.stpSludge;
          this.form.stpDegrade = item.stpDegrade;
          this.form.appLsludge = item.appLsludge;
          this.form.stpEffluent = item.stpEffluent;
          this.form.flow = item.flow;

          this.form.freg = item.freg;
          this.form.flocal = item.flocal;
          this.form.fvariability = item.fvariability;
          this.form.fdirectwater = item.fdirectwater;

        },
        getEmissions(data){
          let cas = {cas:data,};
          this.$api.output.findByCas(cas).then((res) => {
            if(res.code === 200){
              console.log("emissions:",res.data);
              this.emissions = res.data;
            }
          });
        },
        stponsiteShow(){
          if(this.form.stponsite === '自行输入') {
            this.stponsite_disabled = true;
            this.form.stponsiteWater = '';
            this.form.stponsiteAir = '';
            this.form.stponsiteSludge = '';
            this.form.stponsiteDegrade = '';
          }
          else {
            this.stponsite_disabled = false;
            if(this.form.stponsite === '标准STP'){
              this.form.stponsiteWater = parseFloat('0.0611');
              this.form.stponsiteAir = parseFloat('0.2112');
              this.form.stponsiteSludge = parseFloat('0.0048');
              this.form.stponsiteDegrade = parseFloat('0.723');
            }
            else{
              this.form.abatementWater = '0';
              this.abatementWater_disabled = true;
            }
          }
        },
        stpShow(){
          if(this.form.publicStp === '2') {
            this.stp_disabled = true;
            this.form.stpWater = '';
            this.form.stpAir = '';
            this.form.stpSludge = '';
            this.form.stpDegrade = '';
          }
          else{
            this.stp_disabled = false;
            this.form.stpWater = parseFloat('0.0611');
            this.form.stpAir = parseFloat('0.2112');
            this.form.stpSludge = parseFloat('0.0048');
            this.form.stpDegrade = parseFloat('0.723');
          }
        },
        compute(){
          let emissionsResult = Object.assign({}, this.form);
          this.$api.output.save(emissionsResult).then((res) => {
            if (res.code == 200) {
              this.input_disabled = false;
              this.compute_disabled = true;
            }
            this.getEmissions((this.form.cas));
          })
            //工业源
            if(this.useSource === '工业源') {
              //公式计算
              if (this.form.waterTo === '1') {
                this.results.elocalWater = 0;
                this.results.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission) + parseFloat(this.results.elocalWater) * parseFloat(this.form.stponsiteAir);
                this.results.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
                this.results.elocalstpAir = 0;
                this.results.elocalstpWater = 0;
                this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
              } else {  //进入公共STP
                this.results.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
                this.results.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission) + parseFloat(this.results.elocalWater) * parseFloat(this.form.stponsiteAir);
                this.results.elocalstpAir = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpAir);
                this.results.elocalstpWater = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpWater);
                this.results.elocalDirectwater = 0;
                this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
              }
            }
            else if(this.useSource === '消费源'){
                this.results.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.water) * (1-parseFloat(this.form.fdirectwater)) / parseFloat(this.form.temission);
                this.results.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.air)  / parseFloat(this.form.temission);
                this.results.elocalstpAir = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpAir);
                this.results.elocalstpWater = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpWater);
                this.results.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.water) * parseFloat(this.form.fdirectwater) / parseFloat(this.form.temission);
                this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.sludge)  / parseFloat(this.form.temission);

            }
            else{
              if (this.form.waterTo === '1') {
                this.results.elocalWater = 0;
                this.results.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.main) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission) + parseFloat(this.results.elocalWater) * parseFloat(this.form.stponsiteAir);
                this.results.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
                this.results.elocalstpAir = 0;
                this.results.elocalstpWater = 0;
                this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
              } else {  //进入公共STP
                this.results.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
                this.results.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.main) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission) + parseFloat(this.results.elocalWater) * parseFloat(this.form.stponsiteAir);
                this.results.elocalstpAir = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpAir);
                this.results.elocalstpWater = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpWater);
                this.results.elocalDirectwater = 0;
                this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
              }
            }
          if(isNaN(this.results.elocalAir)){
            this.results.elocalAir = 0;
          }
          if(isNaN(this.results.elocalstpAir)){
            this.results.elocalstpAir = 0;
          }
          if(isNaN(this.results.elocalWater)){
            this.results.elocalWater = 0;
          }
          if(isNaN(this.results.elocalstpWater)){
            this.results.elocalstpWater = 0;
          }
          if(isNaN(this.results.elocalstpWater)){
            console.log("水-进入公共stp后：",this.results.elocalstpWater);
            this.results.elocalstpWater = 0;
          }
          if(isNaN(this.results.elocalSoil)){
            this.results.elocalSoil = 0;
          }
        },
      },

    }
</script>

<style scoped lang="scss">


  .emission-left{
    position: absolute;
    width: 10%;
    height: 10%;
    left:0;
  }

  .emission-content{
    position:absolute;
    right:10%;
    left:10%;
    top:10%;
  }

  .emission-footer{
    position:absolute;
    right: 40%;
    top: 100%;
    bottom: 5%;
  }

</style>
