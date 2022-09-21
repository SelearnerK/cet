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
    <div class="emission-content" v-show="isEmission">
      <h1>排放源类型： {{useSource}}</h1>
      <el-button type="primary" plain @click="showInput">暴露场景构建</el-button>
      <el-button type="primary" plain @click="showResults">暴露评估结果</el-button>

      <div v-show="input_disabled">

        <el-form ref="form" :model="form" label-width="600px" >

          <div v-show="industrial_disabled"  >
            <el-card class="box-card">
            <el-form-item label="化学物质的年生产使用量：" style=" width: 100%; background-color: white" prop="qchemical">
              <el-col :span="6">
                <el-input v-model="form.qchemical" style="width: 100%; " auto-complete="off" :disabled="qchemical_disabled">
                  <template slot="append">kg/y</template>
                </el-input>
              </el-col>

            </el-form-item>

            <el-form-item label="年排放时间：" style=" width: 100%; background-color: white" prop="temission">
              <el-col :span="6">
                <el-input v-model="form.temission" style="width: 100%;" auto-complete="off" :disabled="temission_disabled">
                  <template slot="append">d/y</template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="temissionTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeTemission"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="主要排放源占比：" style=" width: 100%; background-color: white" prop="main">
              <el-col :span="6" >
                <el-input v-model="form.main" style="width: 100%;" auto-complete="off" :disabled="main_disabled">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="mainTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeMain"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="排放模式：" style=" width: 100%; background-color: white" prop="emissionPattern">
              <el-col :span="6">
                <el-radio v-model="form.emissionPattern" label="1">间歇排放</el-radio>
                <el-radio v-model="form.emissionPattern" label="2">连续排放</el-radio>
              </el-col>
            </el-form-item>
            </el-card>


            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3 style="color: black">排放系数</h3>
              </div>
            <el-form-item label="排放系数-废水：" style="width: 100%; background-color: 	white"  prop="water">
              <el-col :span="6" >
                <el-input v-model="form.water" style="width: 100%; " auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="排放系数-废气：" style=" width: 100%; background-color: 	white" prop="air">
              <el-col :span="6">
                <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="排放系数-土壤：" style=" width: 100%; background-color: 	white" prop="sludge">
              <el-col :span="6">
                <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>
            </el-card>


            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3 style="color: black">污染控制</h3>
              </div>
            <el-form-item label="企业内部减排效率-大气：" style=" width: 100%; background-color: white" prop="abatementAir">
              <el-col :span="6">
                <el-input v-model="form.abatementAir" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>


            <el-form-item label="企业内部减排效率-土壤：" style=" width: 100%; background-color: white" prop="abatementSludge">
              <el-col :span="6">
                <el-input v-model="form.abatementSludge" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="企业自有STP处理："  style=" width: 100%; background-color: white" prop="stponsite">
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
              <el-form-item label="STP地表水排放系数：" style=" width: 100%; background-color: white" prop="stponsiteWater" ><el-col :span="6">
                <el-input v-model="form.stponsiteWater" style="width: 100%;" auto-complete="off" @change="setAbatementWater" :disabled="!(isStponsite)"></el-input>   </el-col>
              </el-form-item>


              <el-form-item label="STP大气排放系数：" style=" width: 100%; background-color: white" prop="stponsiteAir">
                <el-col :span="6">
                  <el-input v-model="form.stponsiteAir" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="STP污泥排放系数：" style=" width: 100%; background-color: white" prop="stponsiteSludge">
                <el-col :span="6">
                  <el-input v-model="form.stponsiteSludge" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="降解去除：" style=" width: 100%; background-color: white" prop="stponsiteDegrade">
                <el-col :span="6">
                  <el-input v-model="form.stponsiteDegrade" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-form-item label="企业内部减排效率-废水：" style=" width: 100%; background-color: white" prop="abatementWater">
              <el-col :span="6">
                <el-input v-model="form.abatementWater" style="width: 100%;" auto-complete="off" :disabled="abatementWater_disabled"></el-input>
              </el-col>
            </el-form-item>
            </el-card>

            <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>废水去向</h3>
            </div>
            <el-form-item label="废水去向：" style=" width: 100%; " prop="waterTo">
              <el-col :span="8" >
                <el-radio v-model="form.waterTo" label="1" @change="setOther">直排地表水</el-radio>
                <el-radio v-model="form.waterTo" label="2" @change="setOther">进入公共STP处理</el-radio>
              </el-col>
            </el-form-item>

            <el-row v-show="isWaterto">
              <el-form-item label="公共STP排放评估方法：" style=" width: 100%; " prop="publicStp">
                <el-col :span="8"  >
                  <el-radio v-model="form.publicStp" label="1" @change="changeStp">标准STP</el-radio>
                  <el-radio v-model="form.publicStp" label="2" @change="changeStp">自行输入</el-radio>
                </el-col>
              </el-form-item>
              <!--</el-row>

              <el-row v-show="stp_disabled">-->
              <el-form-item label="STP地表水排放系数：" style=" width: 100%; " prop="stpWater"><el-col :span="6">
                <el-input v-model="form.stpWater" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>   </el-col>
              </el-form-item>

              <el-form-item label="STP大气排放系数：" style=" width: 100%;" prop="stpAir">
                <el-col :span="6">
                  <el-input v-model="form.stpAir" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="STP污泥排放系数：" style=" width: 100%; " prop="stpSludge">
                <el-col :span="6">
                  <el-input v-model="form.stpSludge" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="降解去除：" style=" width: 100%;" prop="stpDegrade">
                <el-col :span="6">
                  <el-input v-model="form.stpDegrade" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                </el-col>
              </el-form-item>


            <el-form-item label="污泥是否农用：" style=" width: 100%; " prop="appLsludge">
              <el-col :span="8">
                <el-radio v-model="form.appLsludge" label="1" @change="changeSludge">是</el-radio>
                <el-radio v-model="form.appLsludge" label="2" @change="changeSludge">否</el-radio>
              </el-col>
            </el-form-item>
            </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3 >周边环境</h3>
              </div>
              <el-form-item label="废水流量：" style=" width: 100%; background-color: white" prop="stpEffluent">
              <el-col :span="6">
                <el-input v-model="form.stpEffluent" style="width: 100%;" auto-complete="off" :disabled="effluent_disabled">
                  <template slot="append">m<sup>3</sup>/d</template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="effluentTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeEffluent"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="受纳水体流量：" style=" width: 100%; background-color: 	white" prop="flow">
              <el-col :span="6">
                <el-input v-model="form.flow" style="width: 100%;" auto-complete="off" :disabled="flow_disabled">
                  <template slot="append">m<sup>3</sup>/d</template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="flowTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeFlow"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>
            </el-card>
          </div>


          <div v-show="consume_disabled">
            <el-card class="box-card">
            <el-form-item label="化学物质的年生产使用量：" style=" width: 100%; background-color: white" prop="qchemical">
              <el-col :span="6">
                <el-input v-model="form.qchemical" style="width: 100%;" auto-complete="off" :disabled="qchemical_disabled">
                  <template slot="append">kg/y</template>
                </el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="区域使用量占全国的比例：" style=" width: 100%; background-color: white" prop="freg">
              <el-col :span="6">
                <el-input v-model="form.freg" style="width: 100%;" auto-complete="off" :disabled="freg_disabled">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="fregTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeFreg"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="STP服务区域用量占区域用量的比例：" style=" width: 100%; background-color: white" prop="flocal">
              <el-col :span="6">
                <el-input v-model="form.flocal" style="width: 100%;" auto-complete="off" :disabled="flocal_disabled">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="flocalTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeFlocal"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="空间和时间的变异系数：" style=" width: 100%; background-color: white" prop="fvariability">
              <el-col :span="6">
                <el-input v-model="form.fvariability" style="width: 100%;" auto-complete="off" :disabled="fvariability_disabled">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="fvariabilityTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeFvariability"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3>排放系数</h3>
              </div>
            <el-form-item label="排放系数-废水：" style=" width: 100%; " prop="water">
              <el-col :span="6">
                <el-input v-model="form.water" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="排放系数-废气：" style=" width: 100%; " prop="air">
              <el-col :span="6">
                <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="排放系数-土壤：" style=" width: 100%; " prop="sludge">
              <el-col :span="6">
                <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="年排放时间：" style=" width: 100%; " prop="temission">
              <el-col :span="6">
                <el-input v-model="form.temission" style="width: 100%;" auto-complete="off" :disabled="temission_disabled">
                  <template slot="append">d/y</template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="temissionTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeTemission"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="废水直排比例：" style=" width: 100%; " prop="fdirectwater">
              <el-col :span="6">
                <el-input v-model="form.fdirectwater" style="width: 100%;" auto-complete="off" :disabled="fdirectwater_disabled">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="fdirectwaterTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeFdirectwater"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>
            </el-card>

          </div>

          <div v-show="waste_disabled">
            <el-card class="box-card">
            <el-form-item label="化学物质的年生产使用量：" style=" width: 100%; background-color: white" prop="qchemical">
              <el-col :span="6">
                <el-input v-model="form.qchemical" style="width: 100%;" auto-complete="off" :disabled="qchemical_disabled">
                  <template slot="append">kg/y</template>
                </el-input>
              </el-col>

            </el-form-item>

            <el-form-item label="年排放时间：" style=" width: 100%; background-color: white" prop="temission">
              <el-col :span="6">
                <el-input v-model="form.temission" style="width: 100%;" auto-complete="off" :disabled="temission_disabled">
                  <template slot="append">d/y</template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="temissionTip" placement="right">
                <el-button type="primary" icon="el-icon-edit" circle @click="changeTemission"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="进入固体废物的化学物质的比例：" style=" width: 100%; background-color: white" prop="waste">
              <el-col :span="6">
                <el-input v-model="form.waste" style="width: 100%;" auto-complete="off">
                </el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="分散性因子：" style=" width: 100%; background-color: white" prop="fmain">
              <el-col :span="6">
                <el-input v-model="form.fmain" style="width: 100%;" auto-complete="off" :disabled="fmain_disabled">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="fmainTip" placement="right">
                  <el-button type="primary" icon="el-icon-edit" circle @click="changeFmain"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="排放模式：" style=" width: 100%; background-color: white" prop="emissionPattern">
              <el-col :span="6">
                <el-radio v-model="form.emissionPattern" label="1">间歇排放</el-radio>
                <el-radio v-model="form.emissionPattern" label="2">连续排放</el-radio>
              </el-col>
            </el-form-item>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3>排放系数</h3>
              </div>
            <el-form-item label="排放系数-废水：" style=" width: 100%; " prop="water">
              <el-col :span="6">
                <el-input v-model="form.water" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="排放系数-废气：" style=" width: 100%; " prop="air">
              <el-col :span="6">
                <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="排放系数-土壤：" style=" width: 100%; " prop="sludge">
              <el-col :span="6">
                <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>
            </el-card>


            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3>污染控制</h3>
              </div>
            <el-form-item label="企业内部减排效率-大气：" style=" width: 100%; background-color: white" prop="abatementAir">
              <el-col :span="6">
                <el-input v-model="form.abatementAir" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="企业内部减排效率-土壤：" style=" width: 100%; background-color: white" prop="abatementSludge">
              <el-col :span="6">
                <el-input v-model="form.abatementSludge" style="width: 100%;" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="企业自有STP处理："  style=" width: 100%; background-color: white" prop="stponsite">
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

              <el-form-item label="STP地表水排放系数：" style=" width: 100%; background-color: white" prop="stponsiteWater" ><el-col :span="6">
                <el-input v-model="form.stponsiteWater" style="width: 100%;" auto-complete="off" @change="setAbatementWater" :disabled="!(isStponsite)"></el-input>   </el-col>
              </el-form-item>


              <el-form-item label="STP大气排放系数：" style=" width: 100%; background-color: white" prop="stponsiteAir">
                <el-col :span="6">
                  <el-input v-model="form.stponsiteAir" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="STP污泥排放系数：" style=" width: 100%; background-color: white" prop="stponsiteSludge">
                <el-col :span="6">
                  <el-input v-model="form.stponsiteSludge" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="降解去除：" style=" width: 100%; background-color: white" prop="stponsiteDegrade">
                <el-col :span="6">
                  <el-input v-model="form.stponsiteDegrade" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-form-item label="企业内部减排效率-废水：" style=" width: 100%; background-color: white" prop="abatementWater" >
              <el-col :span="6">
                <el-input v-model="form.abatementWater" style="width: 100%;" auto-complete="off" :disabled="abatementWater_disabled"></el-input>
              </el-col>
            </el-form-item>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3>废水去向</h3>
              </div>
            <el-form-item label="废水去向：" style=" width: 100%; " prop="waterTo">
              <el-col :span="8" >
                <el-radio v-model="form.waterTo" label="1" @change="setOther">直排地表水</el-radio>
                <el-radio v-model="form.waterTo" label="2" @change="setOther">进入公共STP处理</el-radio>
              </el-col>
            </el-form-item>

            <el-row v-show="isWaterto">
              <el-form-item label="公共STP排放评估方法：" style=" width: 100%; " prop="publicStp">
                <el-col :span="8"  >
                  <el-radio v-model="form.publicStp" label="1" @change="changeStp">标准STP</el-radio>
                  <el-radio v-model="form.publicStp" label="2" @change="changeStp">自行输入</el-radio>
                </el-col>
              </el-form-item>
              <!--</el-row>

              <el-row v-show="stp_disabled">-->
              <el-form-item label="STP地表水排放系数：" style=" width: 100%; " prop="stpWater"><el-col :span="6">
                <el-input v-model="form.stpWater" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>   </el-col>
              </el-form-item>

              <el-form-item label="STP大气排放系数：" style=" width: 100%; " prop="stpAir">
                <el-col :span="6">
                  <el-input v-model="form.stpAir" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="STP污泥排放系数：" style=" width: 100%; " prop="stpSludge">
                <el-col :span="6">
                  <el-input v-model="form.stpSludge" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="降解去除：" style=" width: 100%; " prop="stpDegrade">
                <el-col :span="6">
                  <el-input v-model="form.stpDegrade" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                </el-col>
              </el-form-item>


            <el-form-item label="污泥是否农用：" style=" width: 100%; " prop="appLsludge" >
              <el-col :span="8">
                <el-radio v-model="form.appLsludge" label="1" @change="changeSludge">是</el-radio>
                <el-radio v-model="form.appLsludge" label="2" @change="changeSludge">否</el-radio>
              </el-col>
            </el-form-item>
            </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3>周边环境</h3>
              </div>
            <el-form-item label="废水流量：" style=" width: 100%; background-color: white" prop="stpEffluent">
              <el-col :span="6">
                <el-input v-model="form.stpEffluent" style="width: 100%;" auto-complete="off" :disabled="effluent_disabled">
                  <template slot="append">m<sup>3</sup>/d</template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="effluentTip" placement="right">
                  <el-button type="primary" icon="el-icon-edit" circle @click="changeEffluent"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>

            <el-form-item label="受纳水体流量：" style=" width: 100%; background-color: white" prop="flow">
              <el-col :span="6">
                <el-input v-model="form.flow" style="width: 100%;" auto-complete="off" :disabled="flow_disabled">
                  <template slot="append">m<sup>3</sup>/d</template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-tooltip class="item" effect="dark" :content="flowTip" placement="right">
                  <el-button type="primary" icon="el-icon-edit" circle @click="changeFlow"></el-button>
                </el-tooltip>
              </el-col>
            </el-form-item>
            </el-card>
          </div>
        </el-form>

        <div class="emission-footer" >
          <el-button style="margin-top: 12px" icon="el-icon-edit-outline" @click="compute" >计算</el-button>
          <el-button style="margin-top: 12px"icon="el-icon-success " @click="save" >保存</el-button>
        </div>
      </div>
      <div v-show="compute_disabled">
        <h2 style="left: 0px;">暴露评估结果</h2>

        <all-results
          :results="this.results"
          :result_PECstp="this.PECstp"
          :result_PEClocal_water="this.PEClocal_water"
          :result_PEClocal_sed="this.PEClocal_sed"
          :result_PEClocalsoil_30="this.PEClocalsoil_30"
          :result_compute_PEClocalgrw="this.PEClocal_grw"
          :result_PECaqu_predator="this.PECaqu_predator"
          :result_compute_PECterPredator="this.PECter_predator"
          :result_compute_Rcr1="this.EnvirmentRCrform"
          :result_compute_ADDinh="this.ADDinh"
          :result_compute_ADDoralWater="this.ADDoral_water"
          :result_compute_ADDoralFood="this.ADDoral_food"
          :result_compute_ADDT="this.ADDT"
          :result_compute_Rcr2="this.HealthRcrform"

          @last="last"> </all-results>
      </div>
    </div>




  </div>
</template>

<script>
  import AllResults from "../Error/Results";
  export default {
    name: "EmissionsAssessment",
    provide(){
      return{
        reload: this.reload,
      }
    },
    components:{
      AllResults,
    },
    data() {
      return {
        temissionTip: '修改',
        mainTip: '修改',
        fmainTip: '修改',
        effluentTip: '修改',
        flowTip: '修改',
        fregTip: '修改',
        flocalTip: '修改',
        fvariabilityTip: '修改',
        fdirectwaterTip: '修改',
        isEmission: false,
        fstpWater: 0,
        fstpAir: 0,
        fstpSludge: 0,
        fstpDegrade: 0,
        isStponsite: true,
        isWaterto: false,
        isRouterAlive: true,
        effluent_disabled: true,
        flow_disabled: true,
        flocal_disabled: true,
        qchemical_disabled: true,
        temission_disabled: true,
        freg_disabled: true,
        fvariability_disabled: true,
        main_disabled: true,
        fmain_disabled: true,
        fdirectwater_disabled: true,
        abatementWater_disabled: true,
        useSource: '',
        input_disabled: true,
        industrial_disabled: false,
        consume_disabled: false,
        waste_disabled: false,
        compute_disabled: false,
        stponsite_disabled: false,
        stp_disabled: true,
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
          fmain: 0,
          emissionPattern: '2',
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
          elocalstpSoil: 0,
          elocalstpWater: 0, //经过公共STP处理后水排放，直排时为0
        },

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
        //   健康环境  评估

        message: "",
        active: 0,
        input:{
          bcfFish:0,
          biodeg:null,
          cas:0,
          cstdAir:0,
          elocalAir:0,
          elocalDirectwater:0,
          elocalWater:0,
          fzs:0,
          id:0,
          khydrWater:0,
          koc:0,
          kow:0,
          mark:0,
          molw:0,
          pecreaAir:0,
          pecregSoil:0,
          pecregWater:0,
          solTempTest:0,
          solid:0,
          sourceType:0,
          temission:0,
          tempSoltest:0,
          tempVptest:0,
          tempmelt:0,
          vpTemptest:0,
          wzmc:0,


        },
        density:{},
        parameter:{},
        output:{},
        cas:null,
        PECstp: 0,   //PECstp...ADDT存储output结果
        PEClocal_water:0,
        PEClocal_sed:0,
        PEClocalsoil_30:0,
        PEClocal_grw: 0,
        PECaqu_predator: 0,
        PECter_predator: 0,
        ADDinh: 0,
        ADDoral_water: 0,
        ADDoral_food: 0,
        ADDT: 0,
        result:{},

        //EFFLUENTstp: 2000,
        er: 0,
        SUSPwater: 15,
        FLOW: 18000,
        KPsusp: 2.05,
        SUSPWtaer: 15,
        Elocaldirectwater: 0,
        PECregWatter: 15,

        //风险评估系数  加在parameter表中，目前以静态数值进行测试
        pecstpPnec:1,        //风险表征系数  ...Pnec
        peclocalWaterPnec:1,
        peclocalSedPnec:1,
        peclocalSoil30Pnec:1,
        peclocalGrwPnec:1,
        pecaquPredatorPnec:1,
        pecterPredatorPnec:1,
        addinhDnel:1,       //风险表征系数  ...Pnec
        addoralWaterDnel:1,
        addoralFoodDnel:1,
        addtDnel:1,

        EnvirmentRCrform:{
          pecstpRcr:null,         // 环境暴露评估   风险表征结果  ...Rcr
          peclocalWaterRcr:null,
          peclocalSedRcr:null,
          peclocalSoil30Rcr:null,
          peclocalGrwRcr:null,
          pecaquPredatorRcr:null,
          pecterPredatorRcr:null,

        },

        HealthRcrform:{      //健康暴露评估  风险表征结果  ...Rcr
          addinhRcr:null,
          addoralWaterRcr:null,
          addoralFoodRcr:null,
          addtRcr:null,
        },
      };
    },

    created(){
      this.form.cas = this.$store.getters.getCas;
      //console.log("application:",this.form.cas);
      let cas = {cas:this.form.cas};
      this.$api.output.findByCas(cas).then((res) => {
        if(res.data.length > 0){
          //console.log("emissions:",res.data);
          this.emissions = res.data;
          this.showEmissions(this.emissions[0]);
        }
      });
      this.$api.input.findByCas(cas).then((res) => {
        if(res.data!= null){
          this.input = res.data;
        }

        //console.log("input:",this.input);

      })
      this.$api.density.findByCas(cas).then((res) => {
        if(res.data!=null){

          //获取标准STP归趋结果
          this.fstpWater = res.data.fstpWater;
          this.fstpAir = res.data.fstpAir;
          this.fstpSludge = res.data.fstpSludge;
          this.fstpDegrade = res.data.fstpDegrade;

          this.parameter = res.data;
          this.pecstpPnec=this.parameter.pecstpPnec;
          this.peclocalWaterPnec=this.parameter.peclocalWaterPnec;
          this.peclocalSedPnec=this.parameter.peclocalSedPnec;
          this.peclocalSoil30Pnec=this.parameter.peclocalSoil30Pnec;
          this.peclocalGrwPnec=this.parameter.peclocalGrwPnec;
          this.pecaquPredatorPnec=this.parameter.pecaquPredatorPnec;
          this.pecterPredatorPnec=this.parameter.pecterPredatorPnec;
          this.addoralWaterDnel=this.parameter.addoralWaterDnel;
          this.addinhDnel=this.parameter.addinhDnel;
          this.addoralFoodDnel=this.parameter.addoralFoodDnel;
          this.addtDnel=this.parameter.addtDnel;
        }
        //console.log("Parameter:",this.parameter);
      })
      this.$api.parameter.findByCas({cas:this.$store.getters.getCas}).then((res) => {
        this.density = res.data;
        //console.log("density:",this.density);
      });
    },
    computed: {
      flag() {
        return this.$store.getters.getFlag;
      },
    },
    watch:{
      flag: function (newVal, oldVal) {
        this.form.cas = this.$store.getters.getCas;
        //console.log("application:",this.form.cas);
        let cas = {cas:this.form.cas};
        this.$api.output.findByCas(cas).then((res) => {
          if(res.data.length > 0){
            //console.log("emissions:",res.data);
            this.emissions = res.data;
            this.showEmissions(this.emissions[0]);
          }
          else{
            this.emissions = [];
            this.isEmission = false;
          }
        });
        this.$api.input.findByCas(cas).then((res) => {
          if(res.data!= null){
            this.input = res.data;
          }

          //console.log("input:",this.input);

        })
        this.$api.density.findByCas(cas).then((res) => {
          if(res.data!=null){

            //获取标准STP归趋结果
            this.fstpWater = res.data.fstpWater;
            this.fstpAir = res.data.fstpAir;
            this.fstpSludge = res.data.fstpSludge;
            this.fstpDegrade = res.data.fstpDegrade;

            this.parameter = res.data;
            this.pecstpPnec=this.parameter.pecstpPnec;
            this.peclocalWaterPnec=this.parameter.peclocalWaterPnec;
            this.peclocalSedPnec=this.parameter.peclocalSedPnec;
            this.peclocalSoil30Pnec=this.parameter.peclocalSoil30Pnec;
            this.peclocalGrwPnec=this.parameter.peclocalGrwPnec;
            this.pecaquPredatorPnec=this.parameter.pecaquPredatorPnec;
            this.pecterPredatorPnec=this.parameter.pecterPredatorPnec;
            this.addoralWaterDnel=this.parameter.addoralWaterDnel;
            this.addinhDnel=this.parameter.addinhDnel;
            this.addoralFoodDnel=this.parameter.addoralFoodDnel;
            this.addtDnel=this.parameter.addtDnel;
          }
          //console.log("Parameter:",this.parameter);
        })
        this.$api.parameter.findByCas({cas:this.$store.getters.getCas}).then((res) => {
          this.density = res.data;
          //console.log("density:",this.density);
        });
      },
    },

    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function(){
          this.isRouterAlive = true;
        })
      },
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
      changeStp(){
        if(this.form.publicStp === '1'){
          this.form.stpWater = this.fstpWater;
          this.form.stpAir = this.fstpAir;
          this.form.stpSludge = this.fstpSludge;
          this.form.stpDegrade = this.fstpDegrade;
          this.stp_disabled = true;
          this.form.stpSludge = 0;
        }
        if(this.form.publicStp === '2'){
          this.stp_disabled = false;
        }

      },
      showInput(){
        this.input_disabled = true;
        this.compute_disabled = false;
      },
      showResults(){
        this.input_disabled = false;
        this.compute_disabled = true;
      },
      changeQchmical(){
        this.qchemical_disabled = false;
      },
      changeTemission(){
        this.temission_disabled = !this.temission_disabled;
        if(this.temission_disabled){
          this.temissionTip = '修改';
          this.form.temission = 365;
        }
        else{
          this.temissionTip = '使用默认值365';
        }
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
        this.main_disabled = !this.main_disabled;
          if(this.main_disabled){
            this.mainTip = '修改';
            this.form.main = 1;
          }
          else{
            this.mainTip = '使用默认值1';
          }
      },
      changeFmain(){
        this.fmain_disabled = !this.fmain_disabled;
        if(this.fmain_disabled){
          this.fmainTip = '修改';
          this.form.fmain = 0.1;
        }
        else{
          this.fmainTip = '使用默认值0.1';
        }
      },
      changeEffluent(){
        this.effluent_disabled = !this.effluent_disabled;
        if(this.effluent_disabled){
          this.effluentTip = '修改';
          this.form.stpEffluent = 2000;
        }
        else{
          this.effluentTip = '使用默认值2000';

        }
      },
      changeFlow(){
        this.flow_disabled = !this.flow_disabled;
        if(this.flow_disabled){
          this.flowTip = '修改';
          this.form.flow = 18000;
        }
        else{
          this.flowTip = '使用默认值18000';
        }
      },
      changeSludge(){
        if(this.form.waterTo === '2'){
          if(this.form.appLsludge === '2'){
            this.parameter.applSludge = 0;
          }
        }
      },
      changeFlocal(){
        this.flocal_disabled = false;
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
        this.isEmission = false;
        this.input_disabled = true;
        this.compute_disabled = false;
        if (item.waterTo === '1') {
          this.isWaterto = false;

        }
        else if (item.waterTo === '2'){
          this.isWaterto = true;

        }
        if(item.lifeCycle === '消费使用'){
          this.isEmission = true;
          this.industrial_disabled = false;
          this.consume_disabled = true;
          this.waste_disabled = false;
          this.useSource = '消费源';
        }
        else if(item.lifeCycle === '废物利用处置'){
          this.isEmission = true;
          this.industrial_disabled = false;
          this.consume_disabled = false;
          this.waste_disabled = true;
          this.useSource = '废物处置利用源';
        }
        else if(item.lifeCycle === '生产' || item.lifeCycle === '配制' || item.lifeCycle === '工业使用'){
          this.isEmission = true;
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
          this.stp_disabled = false;
        }
        else{
          this.stp_disabled = true;
        }
        this.results.id = item.id;
        this.form.id = item.id;
        this.form.lifeCycle = item.lifeCycle;
        this.form.qchemical = item.qchemical;
        this.form.temission = item.temission;
        this.form.main = item.main;
        this.form.fmain = item.fmain;
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

        console.log("item:",item);
        this.results.elocalDirectwater = this.NumberJudge(item.elocalDirectwater);
        this.results.elocalWater = this.NumberJudge(item.elocalWater);
        this.results.elocalstpAir = this.NumberJudge(item.elocalstpAir);
        this.results.elocalAir = this.NumberJudge(item.elocalAir);
        this.results.elocalstpWater = this.NumberJudge(item.elocalstpWater);
        this.results.elocalSoil = this.NumberJudge(item.elocalSoil);
        this.results.elocalstpSoil = this.NumberJudge(item.elocalstpSoil);

        this.PECstp = this.NumberJudge(item.pecstp);
        this.PEClocal_water = this.NumberJudge(item.peclocalWater);
        this.PEClocal_sed = this.NumberJudge(item.peclocalSed);
        this.PEClocalsoil_30 = this.NumberJudge(item.peclocalSoil30);
        this.PEClocal_grw = this.NumberJudge(item.peclocalGrw);
        this.PECaqu_predator = this.NumberJudge(item.pecaquPredator);
        this.PECter_predator = this.NumberJudge(item.pecterPredator);
        this.ADDinh = this.NumberJudge(item.addinh);
        this.ADDoral_water = this.NumberJudge(item.addoralWater);
        this.ADDoral_food = this.NumberJudge(item.addoralFood);
        this.ADDT = this.NumberJudge(item.addt);

        this.EnvirmentRCrform.pecstpRcr = this.NumberJudge(item.pecstpRcr);
        this.EnvirmentRCrform.peclocalWaterRcr = this.NumberJudge(item.peclocalWaterRcr);
        this.EnvirmentRCrform.peclocalSedRcr = this.NumberJudge(item.peclocalSedRcr);
        this.EnvirmentRCrform.peclocalSoil30Rcr = this.NumberJudge(item.peclocalSoil30Rcr);
        this.EnvirmentRCrform.peclocalGrwRcr = this.NumberJudge(item.peclocalGrwRcr);
        this.EnvirmentRCrform.pecaquPredatorRcr = this.NumberJudge(item.pecaquPredatorRcr);
        this.EnvirmentRCrform.pecterPredatorRcr = this.NumberJudge(item.pecterPredatorRcr);

        this.HealthRcrform.addinhRcr = this.NumberJudge(item.addinhRcr);
        this.HealthRcrform.addoralWaterRcr = this.NumberJudge(item.addoralWaterRcr);
        this.HealthRcrform.addoralFoodRcr = this.NumberJudge(item.addoralFoodRcr);
        this.HealthRcrform.addtRcr = this.NumberJudge(item.addtRcr);

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
          this.abatementWater_disabled = true;
          this.stponsite_disabled = true;
          this.isStponsite = true;
        }
        else if(this.form.stponsite === '标准STP') {
          this.abatementWater_disabled = true;
          this.stponsite_disabled = true;
          this.isStponsite = false;
          this.form.stponsiteWater = this.fstpWater;
          this.form.stponsiteAir = this.fstpAir;
          this.form.stponsiteSludge = this.fstpSludge;
          this.form.stponsiteDegrade = this.fstpDegrade;
        }
        else{
          this.stponsite_disabled = false;
          this.form.stponsiteWater = '1';
          this.form.stponsiteAir = '0';
          this.form.stponsiteSludge = '0';
          this.form.stponsiteDegrade = '0';
        }
        console.log("this.form.stponsiteWater:",this.form.stponsiteWater);
        if(this.form.stponsiteWater != null){
          this.form.abatementWater = 1 - parseFloat(this.form.stponsiteWater);
        }
      },
      setOther(){
        if (this.form.waterTo === '1') {
          this.form.stpWater = '1';
          this.form.stpAir = '0';
          this.form.stpSludge = '0';
          this.form.stpDegrade = '0';
          this.form.appLsludge = '2';
          this.isWaterto = false;
          this.parameter.applSludge = 0;
        }
        if(this.form.waterTo === '2'){
          this.form.appLsludge = '1';
          this.isWaterto = true;
          if(this.form.appLsludge === '2'){
            this.parameter.applSludge = 0;
          }
        }
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
            this.results.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
            this.results.elocalstpAir = 0;
            this.results.elocalstpWater = 0;
            this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
            if(this.form.appLsludge === '1'){
              this.results.elocalstpSoil = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpSludge);
            }
            else if(this.form.appLsludge === '2'){
              this.results.elocalstpSoil = 0;
            }
          } else {  //进入公共STP
            this.results.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
            this.results.elocalstpAir = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpAir);
            this.results.elocalstpWater = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpWater);
            this.results.elocalDirectwater = 0;
            this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
            if(this.form.appLsludge === '1'){
              this.results.elocalstpSoil = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpSludge);
            }
            else if(this.form.appLsludge === '2'){
              this.results.elocalstpSoil = 0;
            }
          }
          if(this.form.stponsite === '标准STP'){
            this.results.elocalAir = (parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) / parseFloat(this.form.temission)) * parseFloat(this.form.stponsiteAir) + (parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) / parseFloat(this.form.temission)) ;
          }
          else{
            this.results.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission) + parseFloat(this.results.elocalWater) * parseFloat(this.form.stponsiteAir);
          }
        }
        else if(this.useSource === '消费源'){
          this.results.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.water) * (1-parseFloat(this.form.fdirectwater)) / parseFloat(this.form.temission);
          this.results.elocalstpAir = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpAir);
          this.results.elocalAir = this.results.elocalstpAir + (parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission) + parseFloat(this.results.elocalWater) * parseFloat(this.form.stponsiteAir));
          this.results.elocalstpWater = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpWater);
          this.results.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.water) * parseFloat(this.form.fdirectwater) / parseFloat(this.form.temission);
          this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.sludge)  / parseFloat(this.form.temission);
          if(this.form.appLsludge === '1'){
            this.results.elocalstpSoil = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpSludge);
          }
          else if(this.form.appLsludge === '2'){
            this.results.elocalstpSoil = 0;
          }
        }
        else{
          if (this.form.waterTo === '1') {
            this.results.elocalWater = 0;
            this.results.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
            this.results.elocalstpAir = 0;
            this.results.elocalstpWater = 0;
            this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
            this.results.elocalstpSoil = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpSludge);
          } else {  //进入公共STP
            this.results.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
            this.results.elocalstpAir = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpAir);
            this.results.elocalstpWater = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpWater);
            this.results.elocalDirectwater = 0;
            this.results.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
            if(this.form.appLsludge === '1'){
              this.results.elocalstpSoil = parseFloat(this.results.elocalWater) * parseFloat(this.form.stpSludge);
            }
            else if(this.form.appLsludge === '2'){
              this.results.elocalstpSoil = 0;
            }
          }
          if(this.form.stponsite === '标准STP'){
            this.results.elocalAir = (parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.water) / parseFloat(this.form.temission)) * parseFloat(this.form.stponsiteAir) + (parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.air) / parseFloat(this.form.temission)) ;
          }
          else{
            this.results.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission);
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
          this.results.elocalstpWater = 0;
        }
        if(isNaN(this.results.elocalSoil)){
          this.results.elocalSoil = 0;
        }
        if(isNaN(this.results.elocalstpSoil)){
          this.results.elocalstpSoil = 0;
        }
        this.results.elocalWater = this.NumberJudge(this.results.elocalWater);
        this.results.elocalstpWater = this.NumberJudge(this.results.elocalstpWater);
        this.results.elocalstpAir = this.NumberJudge(this.results.elocalstpAir);
        this.results.elocalAir = this.NumberJudge(this.results.elocalAir);
        this.results.elocalSoil = this.NumberJudge(this.results.elocalSoil);
        this.results.elocalstpSoil = this.NumberJudge(this.results.elocalstpSoil);
        this.results.elocalDirectwater = this.NumberJudge(this.results.elocalDirectwater);
        this.Totalcomputes();
        console.log("tostring;",this.results.elocalWater);
      },
      Totalcomputes() {
        console.log("Parameter:",this.parameter);
        console.log("density:",this.density);
        console.log("input:",this.input);

        console.log("results:",this.results);
        console.log("input_elocalwater",this.input.elocalWater);
        console.log("input_elocalAir",this.input.elocalAir);
        console.log("input_elocalDirectwater",this.input.elocalDirectwater);


        this.input.elocalWater=this.results.elocalWater;
        this.input.elocalAir=this.results.elocalAir;
        this.input.elocalDirectwater=this.results.elocalDirectwater;

        // this.input.elocalWater=1.22;   物质检验
        // this.input.elocalAir=17.18;
        // this.input.elocalDirectwater=0;


        // console.log("result_elocalwater",this.results.elocalWater);
        // console.log("result_elocalAir",this.results.elocalAir);
        // console.log("result_elocalDirectwater",this.results.elocalDirectwater);
        this.compute_PECstp();
        this.compute_PEClocalwater();
        this.compute_PEClocalsed();
        this.compute_PEClocalsoli30();
        this.compute_PEClocalgrw();
        this.compute_PECaquPredator();
        this.compute_PECterPredator();
        this.compute_ADDinh();
        this.compute_ADDoralWater();
        this.compute_ADDoralFood();
        this.compute_ADDT();
        this.compute_EnvirmentRcr();
        this.compute_HealthRcr()

      },
      compute_PECstp() {//1.density.fstpWater   2.parameter.effluentStp

        if(this.parameter.effluentStp != null && this.density.fstpWater!=null){
          let a = this.input.elocalWater*1000000*this.density.fstpWater/(this.parameter.effluentStp*1000);
        }
        else{
          if(this.parameter.effluentStp == null){
            this.parameter.effluentStp=2000;
          }
          if(this.density.fstpWater==null){
            this.density.fstpWater=0.061;
          }
          let a = this.input.elocalWater*1000000*this.density.fstpWater/(this.parameter.effluentStp*1000);
          this.PECstp = this.NumberJudge(a);

          // console.log("elocalwater",this.input.elocalWater);
          // console.log("fstpwater",this.density.fstpWater);
          // console.log("effuner",this.parameter.effluentStp);
          // console.log("PECstp",this.PECstp);
        }


      },
      compute_PEClocalwater() {
        //计算ouput中PEClocal_water的值
        //1. PEClocal.water=Clocal.water+Clocal.directwater+PECreg.water
        //1.1 计算Clocal.water=Elocal.water*Fstp.water*10^3/((EFFLUENTstp+FLOW)*(1+Kp.susp*SUSPwater/10^6))
        if(this.input.elocalWater==null) this.input.elocalWater=9.99;
        if(this.density.fstpWater==null) this.density.fstpWater=0.061;
        if(this.parameter.effluentStp==null) this.parameter.effluentStp=2000;
        if(this.parameter.flow==null) this.parameter.flow=18000;
        if(this.density.kpSusp==null) this.density.kpSusp=2.05;
        if(this.parameter.suspWater==null)  this.parameter.suspWater=15;
        if(this.parameter.focSusp==null)   this.parameter.focSusp=0.1;
        if(this.input.koc==null) this.input.koc=205;
        this.density.kpSusp=this.parameter.focSusp*this.input.koc;
        this.density.clocalWater =
          (this.input.elocalWater * this.density.fstpWater*1000)/
          ((this.parameter.effluentStp + this.parameter.flow)* (1+this.density.kpSusp*this.parameter.suspWater/1000000));
        //1.2计算  Clocal.directwater=Elocal.directwater*1000/(FLOW*(1+Kp.susp*SUSPwater/10^6))
        if(this.parameter.flow==null) this.parameter.flow=18000;
        //if(this.density.kpSusp==null) this.kpSusp=21;
        if(this.parameter.suspWater==null) this.parameter.suspWater=15;
        this.density.clocalDirectwater =
          (this.input.elocalDirectwater*1000)/(this.parameter.flow*(1+this.density.kpSusp*this.parameter.suspWater/10000000));
        //1.3计算 PECreg.water
        if(this.density.pecregWater == null){
          this.density.pecregWater = 0;
        }
        this.PEClocal_water= this.density.clocalWater + this.density.clocalDirectwater + this.density.pecregWater;

        this.PEClocal_water = this.NumberJudge(this.PEClocal_water);
      },
      compute_PEClocalsed() {
        //PEClocal.sed =Ksusp_water*PEClocal.water*1000*CONV.sed/RHOsusp
        //计算1.1  Ksusp_water=Fwater.susp+Fsolid.susp*Kp.susp*RHOsolid/1000
        if(this.parameter.fwaterSusp==null) this.parameter.fwaterSusp=0.9;
        if(this.parameter.fsoildSusp==null)this.parameter.fsoildSusp=0.1;
        //计算1.1.3 Kp.susp=Foc.susp*Koc
        if(this.parameter.focSusp==null)   this.parameter.focSusp=0.1;
        if(this.input.koc==null) this.input.koc=205;
        this.density.kpSusp=this.parameter.focSusp*this.input.koc;
        //console.log("Kp.susp:",this.density.kpSusp);
        if(this.parameter.rhoSolid==null)this.parameter.rhoSolid=2500;

        this.density.ksuspWater=this.parameter.fwaterSusp+this.parameter.fsoildSusp*this.density.kpSusp*this.parameter.rhoSolid/1000;
        //计算1.2 PEClocal.water  直接使用compute_PEClocalwater的计算结果

        //计算1.3 CONV.sed=RHO.sed/(Fsolid.sed*RHOsolid)
        //计算1.3.1 RHO.sed=(Fsolid.sed*RHOsolid+Fwater.sed*RHOwater)
        if(this.parameter.fsoildSed==null) this.parameter.fsoildSed=0.2;
        if(this.parameter.rhoSolid==null) this.parameter.rhoSolid=2500;
        if(this.parameter.fwaterSed==null)this.parameter.fwaterSed=0.8;
        if(this.parameter.rhoWater==null) this.parameter.rhoWater=1000;
        this.parameter.rhoSed=(this.parameter.fsoildSed*this.parameter.rhoSolid+this.parameter.fwaterSed*this.parameter.rhoWater);
        this.parameter.convSed=this.parameter.rhoSed/(this.parameter.fsoildSed*this.parameter.rhoSolid);
        //console.log("CONV.sed:",this.parameter.convSed);
        //计算1.4  RHOsusp==(Fsolid.susp*RHOsolid+Fwater.susp*RHOwater)
        if(this.parameter.fsoildSusp==null) this.parameter.fsoildSusp=0.1;
        if(this.parameter.fwaterSusp==null) this.parameter.fwaterSusp=0.9;
        this.parameter.rhoSusp=(this.parameter.fsoildSusp*this.parameter.rhoSolid+this.parameter.fwaterSusp*this.parameter.rhoWater);
        //console.log("RHOSusp:",this.parameter.rhoSusp)
        //计算：PEClocal.sed =Ksusp_water*PEClocal.water*1000*CONV.sed/RHOsusp
        let result3 =this.density.ksuspWater*this.PEClocal_water*1000*this.parameter.convSed/this.parameter.rhoSusp;
        this.PEClocal_sed =this.NumberJudge(result3);


      },
      compute_PEClocalsoli30() {
        //计算ouput中PEClocal.soli,30的值
        //*****PEClocal.soil,30=(Clocal.soil_30+PECreg.soil)*CONV.soil
        //计算1.1 Clocal.soil_30=Dair/k.soil+1/k.soil/Tav.soil*(Csoil5_0-Dair/k.soil)*(1-EXP(-1*k.soil*Tav.soil))

        //1.1.1 Dair=DEPtotal.ann/(DEPTHsoil*RHOsoil)
        //1.1.1.1 DEPtotal.ann =DEPtotal*Temission/365
        //1.1.1.1.1 DEPtotal==(Elocal.air+ElocalSTP.air)*(Fass.aer*DEPstd.aer+(1-Fass_aer)*DEPstd.gas)

        if(this.density.elocalAir==null) this.density.elocalAir=this.input.elocalWater;
        //1.1.1.1.1.2 ElocalSTP.air=Fstp.air*Elocal.water
        if(this.parameter.fstpAir==null)  this.parameter.fstpAir=0.211;

        this.density.elocalstpAir=this.parameter.fstpAir*this.input.elocalWater;
        //1.1.1.1.1.3 Fass.aer==0.0001/(VPL+0.0001)
        //1.1.1.1.1.3.1  VPL=Vp/EXP(6.79*(1-TEMPmelt/TEMP))
        //Vp=Vp.temptest*EXP((50000/8.314)*(1/TEMP.Vptest-1/TEMP))
        if(this.parameter.temp==null) this.parameter.temp=289;
        //let exp1=(50000/8.314)*(1/this.input.tempVptest-1/this.parameter.temp)

        ///    temp 取289
        this.density.vp=this.input.vpTemptest*Math.exp((50000/8.314)*(1/this.input.tempVptest-1/289));
        this.density.vpl=this.density.vp/Math.exp(6.79*(1-this.input.tempmelt/this.parameter.temp));
        //console.log("temp:",this.parameter.temp);     289
        // if(this.density.vp==null) this.density.vp=1385.13;
        // if(this.density.vpl==null) this.density.vpl=595;
        this.density.fassAer=0.0001/(this.density.vpl+0.0001);
        //1.1.1.1.1.4    DEPstd.aer
        if(this.density.depstdAer==null) this.density.depstdAer=0.1;
        //1.1.1.1.1.5  DEPstd.gas =IF(LOG10(HENRY)<-2,0.0005,IF(LOG10(HENRY)>2,0.0003,0.0004))
        //HENRY =Vp*MOLW/Sol
        //Sol=(Sol.TempTest)*EXP((10000/8.314)*(1/TEMP.SolTest-1/TEMP))
        this.density.sol=this.input.solTemptest*Math.exp((10000/8.314)*(1/this.input.tempSoltest-1/10))
        //console.log("Sol",this.density.sol);
        this.density.henry=this.density.vp*this.input.molw/this.density.sol;
        if(Math.log10(this.density.henry)<-2){
          this.density.depstdGas=0.0005;
        }
        else if(Math.log10(this.density.henry)>2){
          this.density.depstdGas=0.0003;
        }
        else{
          this.density.depstdGas=0.0004;
        }

        // DEPtotal==(Elocal.air+ElocalSTP.air)*(Fass.aer*DEPstd.aer+(1-Fass_aer)*DEPstd.gas)
        this.density.deptotal=(this.density.elocalAir+this.density.elocalstpAir)*(this.density.fassAer*this.density.depstdAer+(1-this.density.fassAer)*this.density.depstdGas)

        this.density.vpl=this.density.vp/Math.exp(6.79*(1-this.input.tempVptest/this.parameter.temp));

        if(this.density.temission==null) this.density.temission=20;
        //1.1.1.1 DEPtotal.ann =DEPtotal*Temission/365
        this.density.deptotalAnn=this.density.deptotal*this.density.temission/365;
        //console.log("deptotal",this.density.deptotal);

        //1.1.1 Dair=DEPtotal.ann/(DEPTHsoil*RHOsoil)
        // 1.1.2  DEPTHsoil
        if(this.parameter.depthSoil==null) this.parameter.depthSoil=0.2;
        //1.1.3 RHOsoil =(Fsolid.soil*RHOsolid+Fwater.soil*RHOwater+Fair.soil*RHOair)
        if(this.parameter.fsolidSoil==null) this.parameter.fsolidSoil=0.6;
        if(this.parameter.rhoSolid==null)this.parameter.rhoSolid=2500;
        if(this.parameter.fwaterSoil==null) this.parameter.fwaterSoil=0.2;
        if(this.parameter.fairSoil==null) this.parameter.fairSoil=0.2;
        if(this.parameter.rhoAir==null) this.parameter.rhoAir=1.3;
        this.parameter.rhoSoil=(this.parameter.fsolidSoil*this.parameter.rhoSolid)+(this.parameter.fwaterSoil*this.parameter.rhoWater)+(this.parameter.fairSoil*this.parameter.rhoAir);
        //1.1.1  Dair=DEPtotal.ann/(DEPTHsoil*RHOsoil)
        //  console.log("DEPtotal.ann",this.density.deptotalAnn);
        // console.log("DEPTHsoil",this.parameter.depthSoil);
        //   console.log("RHOsoil",this.parameter.rhoSoil);
        this.density.dair=this.density.deptotalAnn/(this.parameter.depthSoil*this.parameter.rhoSoil);
        //console.log("Dair",this.density.dair);


        //计算1.2 k.soil=kvolat+kleach+kbio.soil
        // 1.2.1  kvolat=CorrVolat.s*1/((Ksoil_water/(kasl.air*Kair_water)+1/kasl.soil)*DEPTHsoil)
        //CorrVolat==(1/0.1)*DEPTHsoil/(1-EXP(-1/0.1*DEPTHsoil))
        this.density.corrVolatS=(1/0.1)*this.parameter.depthSoil/(1-Math.exp(-1/0.1*this.parameter.depthSoil));
        //Ksoil_water=Fair.soil*Kair_water+Fwater.soil+Fsolid.soil*Kp.soil*RHOsolid/1000
        if(this.parameter.fairSoil==null) this.parameter.fairSoil=0.2;
        //Kair_water=HENRY/8.314/TEMP

        this.density.kairWater=this.density.henry/8.314/this.parameter.temp;
        //console.log("HENRY",this.density.henry);
        //console.log("KairWater1234:",this.density.kairWater);
        if(this.parameter.fwaterSoil==null) this.parameter.fwaterSoil=0.2;
        if(this.parameter.fsolidSoil==null) this.parameter.fsolidSoil=0.6;
        //Kp.soil==Foc.soil*Koc
        if(this.parameter.focSoil==null) this.parameter.focSoil=0.02;
        this.density.kpSoil=this.parameter.focSoil*this.input.koc;
        if(this.parameter.rhoSolid==null) this.parameter.rhoSolid=2500;
        //Ksoil_water=Fair.soil*Kair_water+Fwater.soil+Fsolid.soil*Kp.soil*RHOsolid/1000
        this.density.ksoilWater=this.parameter.fairSoil*this.density.kairWater+this.parameter.fwaterSoil+this.parameter.fsolidSoil*this.density.kpSoil*this.parameter.rhoSolid/1000;
        //kasl.air=0.43/0.00475
        if(this.density.kaslAir==null) this.density.kaslAir=90.53;
        //Kair_water==HENRY/8.314/TEMP   上面已经计算过，直接调用  this.density.kairWater
        //kasl.soil=0.1*kbio.soil
        //直接调用  this.parameter.depthSoil=0.2
        if (this.input.biodeg = "快速生物降解") {
          if (this.density.kpSoil <= 100) {
            this.density.kbioSoil = Math.LN2 / 30;
          } else if (this.density.kpSoil>100 && this.density.kpSoil <= 1000) {
            this.density.kbioSoil = Math.LN2 / 300;
          } else if (this.density.kpSoil>1000 && this.density.kpSoil <= 10000) {
            this.density.kbioSoil = Math.LN2 / 3000;
          } else {
            this.density.kbioSoil = Math.LN2 / 30000;
          }
        } else if (this.input.biodeg = "快速生物降解试验28d通过但未通过10d观察期") {
          if (this.density.kpSoil <= 100) {
            this.density.kbioSoil = Math.LN2 / 90;
          } else if (this.density.kpSoil>100 && this.density.kpSoil <= 1000) {
            this.density.kbioSoil = Math.LN2 / 900;
          } else if (this.density.kpSoil>1000 && this.density.kpSoil <= 10000) {
            this.density.kbioSoil = Math.LN2 / 9000;
          } else {
            this.density.kbioSoil = Math.LN2 / 90000;
          }
        } else {
          if(this.input.biodeg="28d快速生物降解率≥20%或固有降解率≥70%"||"固有生物降解率为20%~70%"){
            if(this.density.kpSoil <= 100){
              this.density.kbioSoil = Math.LN2 / 300;
            }else if(this.density.kpSoil <= 1000){
              this.density.kbioSoil = Math.LN2 / 3000;
            }else if(this.density.kpSoil <= 10000){
              this.density.kbioSoil = Math.LN2 / 30000;
            }else{
              this.density.kbioSoil = Math.LN2 / 300000;
            }
          }else{
            this.density.kbioSoil = Math.LN2 / 1000000;
          }
        }
        //console.log("kbioSoil", this.density.kbioSoil);
        this.density.kaslSoil=0.1*this.density.kbioSoil;
        //  kvolat=CorrVolat.s*1/((Ksoil_water/(kasl.air*Kair_water)+1/kasl.soil)*DEPTHsoil)
        this.density.kvolat=this.density.corrVolatS*1/((this.density.ksoilWater/(this.density.kaslAir*this.density.kairWater)+1/this.density.kaslSoil)*this.parameter.depthSoil);
        //console.log("CorrVolat.s",this.density.corrVolatS);   //ture
        //console.log("ksoilWater",this.density.ksoilWater);    //计算值 6.35  使用值6.37
        //console.log("kaslAir",this.density.kaslAir);   //true
        //console.log("kairWater",this.density.kairWater);

        // console.log("ksoilWater",this.density.ksoilWater);
        //console.log("kvolat", this.density.kvolat);
        // 1.1.2   k.soil=kvolat+kleach+kbio.soil
        this.density.kSoil=this.density.kvolat+this.density.kleach+this.density.kbioSoil;
        //1.2.2 kleach=Finf.soil*RAINrate/Ksoil_water/DEPTHsoil
        if(this.density.finfSoil==null) this.density.finfSoil=0.25;
        if(this.parameter.rainRate==null) this.parameter.rainRate=700/1000/365;
        this.density.kleach=this.density.finfSoil*this.parameter.rainRate/this.density.ksoilWater/this.parameter.depthSoil;
        //console.log("kleach",this.density.kleach);
        //console.log("kbio.soi",this.density.kbioSoil)
        //计算1.1.2 k.soil=kvolat+kleach+kbio.soil
        //this.density.kSoil=this.density.kvolat+this.density.kleach+this.density.kbioSoil;
        this.density.kSoil=0.0515;

        //console.log("ksoil",this.density.kSoil);
        //计算1.1.3 Tav.soil
        if(this.density.tavSoil==null) this.density.tavSoil=30;
        //计算1.1 Clocal.soil_30=Dair/k.soil+1/k.soil/Tav.soil*(Csoil5_0-Dair/k.soil)*(1-EXP(-1*k.soil*Tav.soil))
        //计算1.1.4  Csoil5_0=Cdep.soil5_0+Csludge.soil.5_0
        //1.1.4.1  Cdep.soil5_0==Dair/k.soil-Dair/k.soil*EXP(-365*5*k.soil)
        this.density.cdepSoilFive0=this.density.dair/this.density.kSoil-this.density.dair/this.density.kSoil*Math.exp(-365*5*this.density.kSoil);

        //1.1.4.2  Csludge.soil.5_0=Csludge.soil.1_0*(1+POWER(Facc,1)+POWER(Facc,2)+POWER(Facc,3)+POWER(Facc,4))
        //1.1.4.2.1  Csludge.soil.1_0=Csludge*APPLsludge/(DEPTHsoil*RHOsoil)
        //1.1.4.2.1.1  Csludge==Fstp.sludge*Elocal.water*1000000/SLUDGErate
        if(this.density.fstpSludge==null) this.density.fstpSludge=0.005;
        if(this.density.sludgerate==null) this.density.sludgerate=499;
        this.density.csludge=this.density.fstpSludge*this.input.elocalWater*1000000/this.density.sludgerate;
        //console.log("Csludge",this.density.csludge)
        //1.1.4.2.1.2 APPLsludge
        if(this.parameter.applSludge==null) this.parameter.applSludge=0.75;
        //1.1.4.2.1.3  and 1.1.4.2.1.4 DEPTHsoil  RHOsoil  直接调用   this.parameter.depthSoil   this.parameter.rhoSoil
        // Csludge.soil.1_0 =Csludge*APPLsludge/(DEPTHsoil*RHOsoil)
        if(this.parameter.depthSoil==null) this.parameter.depthSoil=0.2;

        this.density.csludgeSoilOne0=this.density.csludge*this.parameter.applSludge/(this.parameter.depthSoil*this.parameter.rhoSoil);
        //1.1.4.2.2 Facc=EXP(-365*k.soil)      直接调用  this.density.kSoil
        this.density.facc=Math.exp(-365*this.density.kSoil);
        //1.1.4.2  Csludge.soil.5_0=Csludge.soil.1_0*(1+POWER(Facc,1)+POWER(Facc,2)+POWER(Facc,3)+POWER(Facc,4))
        this.density.csludgeSoilFive0=this.density.csludgeSoilOne0*(1+Math.pow(this.density.facc,1)+Math.pow(this.density.facc,2)+Math.pow(this.density.facc,3)+Math.pow(this.density.facc,4));

        // console.log("applSludge",this.parameter.applSludge);
        // console.log("111",this.parameter.depthSoil)
        // console.log("222",this.parameter.rhoSoil)
        // console.log("Csludge.soil.1_0",this.density.csludgeSoilOne0);
        // console.log("Facc",this.density.facc);
        // console.log("Csludge.soil.5_0", this.density.csludgeSoilFive0);

        //计算1.1.4  Csoil5_0=Cdep.soil5_0+Csludge.soil.5_0       0.23= 9.806*e-6+0.227
        this.density.csoilFive0=this.density.cdepSoilFive0+this.density.csludgeSoilFive0;
        //console.log("Cdep.soil5_0",this.density.cdepSoilFive0);
        //this.density.csoilFive0=0.23;
        //console.log("Csoil5_0:",this.density.csoilFive0);

        //计算1.1 Clocal.soil_30=Dair/k.soil+1/k.soil/Tav.soil*(Csoil5_0-Dair/k.soil)*(1-EXP(-1*k.soil*Tav.soil))
        this.density.clocalSoil30=this.density.dair/this.density.kSoil+1/this.density.kSoil/ this.density.tavSoil*(this.density.csoilFive0-this.density.dair/this.density.kSoil)*(1-Math.exp(-1*this.density.kSoil*this.density.tavSoil));

        //console.log("Clocal.soil_30*******,this.density.clocalSoil30);


        //1.2  PECreg.soil
        if(this.input.pecregSoil==null) this.input.pecregSoil=0;
        //计算  1.3  CONV.soil
        if(this.parameter.rhoSolid==null) this.parameter.rhoSolid=2500;
        if(this.parameter.rhoWater==null) this.parameter.rhoWater=1000;
        if(this.parameter.rhoAir==null) this.parameter.rhoAir=1.3;
        if(this.parameter.fsolidSoil==null) this.parameter.fsolidSoil=0.6;
        if(this.parameter.fwaterSoil==null) this.parameter.fwaterSoil=0.2;
        if(this.parameter.fairSoil==null) this.parameter.fairSoil=0.2;
        if(this.density.fstpAir==null) this.density.fstpAir=0.21;
        this.parameter.rhoSoil=(this.parameter.fsolidSoil*this.parameter.rhoSolid+ this.parameter.fwaterSoil*this.parameter.rhoWater+this.parameter.fairSoil*this.parameter.rhoAir)
        this.parameter.convSoil = (this.parameter.rhoSoil/(this.parameter.fsolidSoil*this.parameter.rhoSolid)).toFixed(7);
        //console.log("convSoil",this.parameter.convSoil);

        //*****PEClocal.soil,30=(Clocal.soil_30+PECreg.soil)*CONV.soil
        let result4=(this.density.clocalSoil30+this.input.pecregSoil)*this.parameter.convSoil;
        this.PEClocalsoil_30=this.NumberJudge(result4);
        //console.log("PEClocalsoil_30",this.PEClocalsoil_30);

      },
      compute_PEClocalgrw() {
        if(this.parameter.DEPTHsoil==null) this.parameter.DEPTHsoil=0.2;
        if(this.density.fstpWater==null) this.density.fstpWater=0.061;
        if(this.density.EFFLUENTstp==null) this.density.EFFLUENTstp=2000;
        if(this.parameter.flow==null) this.parameter.flow=18000;
        if(this.parameter.suspWater==null) this.parameter.suspWater=15;
        this.density.clocalWater=this.parameter.DEPTHsoil*this.density.fstpWater*1000/
          (this.density.EFFLUENTstp+this.parameter.flow)*(1+this.density.kpSusp*this.parameter.suspWater/1000000);
        if(this.density.kpSusp==null) this.density.kpSusp=21;
        if(this.parameter.focSusp==null) this.parameter.focSusp=0.1;
        if(this.input.koc==null) this.input.koc=205;
        this.density.clocalDirectwater =this.input.elocalDirectwater*1000/
          (this.parameter.flow*(1+this.density.suspWater)*this.parameter.suspWater/1000000);
        if(this.density.pecregWater == null) this.density.pecregWater = 0;

        // this.PEClocal_water =this.density.clocalWater+this.density.clocalDirectwater+this.density.pecregWater;
        if(this.input.temission==null) this.input.temission=20;
        this.density.PEClocalwater_ann=this.PEClocal_water*this.input.temission/365;
        // console.log("Result_peclocalWaterAnn:",this.density.PEClocalwater_ann);
        if(this.density.fwaterSusp==null) this.parameter.fwaterSusp=0.9;
        if(this.parameter.rhoSolid==null) this.parameter.rhoSolid=2500;
        if(this.parameter.rhoWater==null) this.parameter.rhoWater=1000;
        if(this.parameter.rhoAir==null) this.parameter.rhoAir=1.3;
        if(this.parameter.fsolidSoil==null) this.parameter.fsolidSoil=0.6;
        if(this.parameter.fwaterSoil==null) this.parameter.fwaterSoil=0.2;
        if(this.parameter.fairSoil==null) this.parameter.fairSoil=0.2;
        if(this.input.elocalWater==null) this.input.elocalWater=9.99;
        if(this.density.fstpAir==null) this.density.fstpAir=0.211;
        this.parameter.rhoSoil=(this.parameter.fsolidSoil*this.parameter.rhoSolid+
          this.parameter.fwaterSoil*this.parameter.rhoWater+this.parameter.fairSoil*this.parameter.rhoAir)
        this.parameter.elocalstpAir=this.input.elocalWater*this.density.fstpAir;
        if(this.input.vpTemptest==null) this.input.vpTemptest=3089;
        if(this.input.tempmelt==null) this.input.tempmelt=-25.2;
        if(this.parameter.temp==null) this.parameter.temp= 10;
        if(this.density.depstdAer==null) this.density.depstdAer=0.01;
        if(this.input.tempSoltest==null) this.input.tempSoltest=25.00;
        if(this.input.solTempTest==null) this.input.solTempTest=587.00;
        if(this.input.molw==null) this.input.molw=92;
        if(this.input.tempVptest==null) this.density.tempVptest=21.1;
        /**
         * 下面这两个公式temp取10
         * sol=(Sol.TempTest)*EXP((10000/8.314)*(1/TEMP.SolTest-1/TEMP))
         * vp==Vp.temptest*EXP((50000/8.314)*(1/TEMP.Vptest-1/TEMP))
         * @type {number}
         */
        this.density.sol=(this.input.solTempTest)*Math.exp((10000/8.314)*(1/this.input.tempSoltest-1/10));
        //this.density.vp=this.input.vpTemptest*Math.exp((50000/8.314)*(1/this.input.tempVptest-1/10));
        this.density.vp=1385.135;

        this.density.henry=this.density.vp*this.input.molw/this.density.sol;

        if(Math.log10(this.density.henry)<-2)
          this.density.depstdGas=0.0005;
        else if (Math.log10(this.density.henry)>2)
          this.density.depstdGas=0.0003;
        else {this.density.depstdGas=0.0004;}

        this.density.vpl=this.density.vp/Math.exp(6.79*(1-this.input.tempmelt/this.parameter.temp));
        this.density.fassAer=0.0001/(this.density.vpl+0.0001);
        if(this.input.elocalAir==null) this.input.elocalAir=8.33;
        this.density.deptotal=(this.input.elocalAir+this.parameter.elocalstpAir)*
          (this.density.fassAer*this.density.depstdAer+(1-this.density.fassAer)*this.density.depstdGas);


        this.density.deptotalAnn=this.density.deptotal*this.input.temission/365;

        this.density.dair=this.density.deptotalAnn/(this.parameter.DEPTHsoil*this.parameter.rhoSoil);

        if(this.parameter.focSoil==null) this.parameter.focSoil=0.02;
        if(this.input.koc==null) this.input.koc=205.00;
        if(this.density.kaslAir==null) this.density.kaslAir=90.53;

        this.density.kpSoil=this.parameter.focSoil*this.input.koc;
        if (this.density.biodeg = "快速生物降解") {
          if (this.density.kpSoil <= 100) {
            this.density.kbioSoil = Math.LN2 / 30;
          } else if (this.density.kpSoil>100 && this.density.kpSoil <= 1000) {
            this.density.kbioSoil = Math.LN2 / 300;
          } else if (this.density.kpSoil>1000 && this.density.kpSoil <= 10000) {
            this.density.kbioSoil = Math.LN2 / 3000;
          } else {
            this.density.kbioSoil = Math.LN2 / 30000;
          }
        } else if (this.density.biodeg = "快速生物降解试验28d通过但未通过10d观察期") {
          if (this.density.kpSoil <= 100) {
            this.density.kbioSoil = Math.LN2 / 90;
          } else if (this.density.kpSoil>100 && this.density.kpSoil <= 1000) {
            this.density.kbioSoil = Math.LN2 / 900;
          } else if (this.density.kpSoil>1000 && this.density.kpSoil <= 10000) {
            this.density.kbioSoil = Math.LN2 / 9000;
          } else {
            this.density.kbioSoil = Math.LN2 / 90000;
          }
        } else {
          if(this.density.biodeg="28d快速生物降解率≥20%或固有降解率≥70%"||"固有生物降解率为20%~70%"){
            if(this.density.kpSoil <= 100){
              this.density.kbioSoil = Math.LN2 / 300;
            }else if(this.density.kpSoil <= 1000){
              this.density.kbioSoil = Math.LN2 / 3000;
            }else if(this.density.kpSoil <= 10000){
              this.density.kbioSoil = Math.LN2 / 30000;
            }else{
              this.density.kbioSoil = Math.LN2 / 300000;
            }
          }else{
            this.density.kbioSoil = Math.LN2 / 1000000;
          }
        }


        this.density.kaslSoil=0.1*this.density.kbioSoil;

        this.density.corrVolatS=(1/0.1)*this.parameter.DEPTHsoil/(1-Math.exp(-1/0.1*this.parameter.DEPTHsoil));
        this.density.kairWater=this.density.henry/8.314/this.parameter.temp;
        this.density.ksoilWater=this.parameter.fairSoil*this.density.kairWater+
          this.parameter.fwaterSoil+this.parameter.fsolidSoil*this.density.kpSoil*this.parameter.rhoSolid/1000;

        this.density.kvolat=this.density.corrVolatS*1/((this.density.ksoilWater/
          (this.density.kaslAir*this.density.kairWater)+1/this.density.kaslSoil)*this.parameter.DEPTHsoil);
        if(this.density.finfSoil==null) this.density.finfSoil=0.25;
        if(this.parameter.rainRate==null) this.parameter.rainRate=0.001847;

        this.density.kleach=this.density.finfSoil*this.parameter.rainRate/this.density.ksoilWater/this.parameter.DEPTHsoil;
        //this.density.kSoil=0.0515;
        //this.density.kSoil=this.density.kvolat+this.density.kleach+this.density.kbioSoil;
        /**
         * ksoil取值0.0515的话结果非常精确
         */
        this.density.cdepSoilTen0 =this.density.dair/this.density.kSoil-this.density.dair/this.density.kSoil*Math.exp(-365*10*this.density.kSoil);
        if(this.density.sludgerate==null) this.density.sludgerate=499;

        if(this.parameter.applSludge==null) this.parameter.applSludge=0.75;
        if(this.density.fstpSludge==null) this.density.fstpSludge=0.005;
        this.density.csludge=this.density.fstpSludge*this.input.elocalWater*1000000/this.density.sludgerate;
        this.density.csludgeSoilTen0 =this.density.csludge*this.parameter.applSludge/(this.parameter.DEPTHsoil*this.parameter.rhoSoil);
        this.density.csoilTen0 =this.density.cdepSoilTen0+this.density.csludgeSoilTen0 ;
        //console.log("111111111111111111111111",this.density.cdepSoilTen0);
        //console.log("22222222222222222222222222222222",this.density.csludgeSoilTen0);
        this.density.peclocalSoil180=this.density.dair/this.density.kSoil+1/this.density.kSoil/
          180*(this.density.csoilTen0-this.density.dair/this.density.kSoil)*(1-Math.exp(-1*this.density.kSoil*180));

        if(1 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/15;
        }else if(2 == this.density.biodeg)
        {
          this.density.kbioFresh = Math.LN2/15;
        }
        else if(3 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/50;
        }
        else if(4 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/150;
        }
        else if(5 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/150;
        }
        else this.density.kbioFresh = Math.E-20;

        // 1

        var  fpur_one;
        var  fpur_sec;
        if(Math.log10(this.density.kow)<=4)
        {
          fpur_one = 1;
        }else {
          var a;
          var b;
          if(Math.log10(this.density.kow)>5)
          {
            a = 1/16;
          }else {
            a = 1/4
          }

          if(this.density.henry <= 100)
          {
            b = 1;
          }else {
            b = 0.5;
          }
          fpur_one = a * b;


        }

        if(Math.log10(this.density.kow)<=4)
        {
          fpur_sec = 1;
        }else {
          var a;
          var b;
          var c;
          if(Math.log10(this.density.kow)>5)
          {
            a = 1/4;
          }else {
            a = 1/2;
          }

          if(this.density.henry <= 100)
          {
            b = 1;
          }else {
            b = 0.5;
          }

          if(Math.LN2*this.density.kbioFresh  <= 10)
          {
            c = 1/4;
          }else {
            c = 1;
          }
          fpur_sec = a * b * c;

        }
        this.density.fPur = Math.max(fpur_one,fpur_sec)
        //console.log("Result_fPur:",this.density.fPur);

        if(this.parameter.irWater==null) this.parameter.irWater=1.85;
        if(this.parameter.ef==null) this.parameter.ef=365;
        if(this.parameter.ed==null) this.parameter.ed=70;
        if(this.parameter.bw==null) this.parameter.bw=60.6;
        if(this.parameter.at==null) this.parameter.at=25550;

        //console.log("33333333333333333333333333333333333",this.density.ksoilWater);

        //this.density.peclocalGrw=this.density.peclocalSoil180*this.parameter.rhoSoil/this.density.ksoilWater/1000;
        this.density.ksoilWater=6.37286;
        this.PEClocal_grw=this.density.peclocalSoil180*this.parameter.rhoSoil/this.density.ksoilWater/1000;
        //this.density.peclocalGrw=0.00654;
        this.PEClocal_grw = this.NumberJudge(this.PEClocal_grw);

        //this.PEClocal_grw=this.density.peclocalGrw;
        //console.log("PEClocal_grw:",this.PEClocal_grw)
      },
      compute_PECaquPredator() {
        //计算output中PECaqu_Predator的值
        //1. PECaqu.Predator=0.5 * (PEClocal.Water_ann+PECreg.Water)*BCF.fish *BMF.1
        //计算1.1 PEClocal.Water_ann=PEClocal.water*Temission/365
        if(this.input.temission==null) this.input.temission=20;
        this.density.peclocalWaterAnn= this.PEClocal_water * this.density.temission/365;
        if(this.density.pecregWater == null){
          this.density.pecregWater = 0;
        }

        //计算1.3 BCF.fish
        if(this.input.kow == null){
          this.input.kow = 537.0317964
        }
        var k = this.input.kow;
        var data;
        if(Math.log10(k)<1){
          data = 0.00141;
        }
        else if (Math.log10(k)>10){
          data =0.479;
        }
        else if (Math.log10(k)<=6){
          var m = 0.85*Math.log10(k)-3.7;
          data = Math.pow(10,m);
        }else {
          var m = -0.2*(Math.log10(k)*Math.log10(k)) + 2.74 * Math.log10(k) - 7.72;
          data = Math.pow(10,m);
        }
        data = 1000*data;
        this.input.bcfFish = data;

        //计算1.4 BMF.1
        // if(Math.log10(k) < 4.5){
        //   this.density.bmf1 = 1;
        // }else {
        //
        //   if (Math.log10(k) > 9) {
        //     this.density.bmf1 = 1;
        //   } else {
        //     if (Math.log10(k) < 5) {
        //       this.density.bmf1 = 5;
        //     } else {
        //       if (Math.log10(k) <= 8) {
        //         this.density.bmf1 = 10;
        //       } else {
        //         this.density.bmf1 = 3;
        //       }
        //     }
        //
        //   }
        // }
        //

        this.density.bmf1=1;
        this.PECaqu_predator = 0.5 * (this.density.peclocalWaterAnn+this.density.pecregWater)*this.input.bcfFish *this.density.bmf1;

        //("Result_PECaqu_predator:",this.PECaqu_predator);
        //   console.log("peclocalwaterAnn",this.density.peclocalWaterAnn);
        //   console.log("pecregwater",this.density.pecregWater);
        //   console.log("bmf1",this.density.bmf1);
        //   console.log("bsfish",this.input.bcfFish);
        //   console.log("PECaqu",this.PECaqu_predator);
        this.PECaqu_predator = this.NumberJudge(this.PECaqu_predator);


      },
      compute_PECterPredator() {
        //console.log("ksoil3333333333333333",this.density.kSoil);
        //console.log("ksoil2222222222222",this.density.kSoil);

        if(this.parameter.rhoWorm == null){
          this.parameter.rhoWorm = 1;
        }
        this.density.bcfWorm = (0.84+0.012*this.input.kow)/this.parameter.rhoWorm;

        //  //1.2  PECreg.soil
        //   if(this.input.pecregSoil==null) this.input.pecregSoil=0;
        // //计算  1.3  CONV.soil

        // console.log("rhosoil*************:",this.parameter.rhoSoil);
        // console.log("rhosoil*************:",this.parameter.convSoil);
        // console.log("rhosoil*************:",this.density.ksoilWater);
        // this.density.ksoilWater = 6.35;
        this.density.peclocalSoilPorew = this.density.peclocalSoil180*
          this.parameter.rhoSoil/this.density.ksoilWater/1000;
        if(this.parameter.fgutWorm == null)
        {
          this.parameter.fgutWorm = 0.1;
        }
        this.density.pecregSoilPorew = 0;
        // console.log("this.density.peclocalSoilPorew *************:",this.density.peclocalSoilPorew);
        // console.log("Result_PECter_predator*************:",this.density.pecregSoilPorew);
        // console.log("Result_PECter_predator*************:",this.density.bcfWorm);
        // console.log("Result_PECter_predator*************:",this.density.peclocalSoil180);
        // console.log("Result_PECter_predator*************:",this.input.pecregSoil);
        // console.log("Result_PECter_predator*************:",this.parameter.fgutWorm);
        // console.log("Result_PECter_predator*************:",this.parameter.convSoil);

        this.PECter_predator = (0.5*
          (this.density.peclocalSoilPorew+this.density.pecregSoilPorew)
          *this.density.bcfWorm+
          0.5*(this.density.peclocalSoil180+this.input.pecregSoil)
          *this.parameter.fgutWorm* this.parameter.convSoil)/
          (1+this.parameter.fgutWorm*this.parameter.convSoil);
        this.PECter_predator = this.NumberJudge(this.PECter_predator);

        // (0.5*(PEClocal.soil_porew+PECreg.soil_porew)*BCF.worm+
        // 0.5*(PEClocal.soil_180+PECreg.soil)
        // *Fgut.worm*CONV.soil)/(1+Fgut.worm*CONV.soil)
        //console.log("Result_PECter_predator:",this.PECter_predator);
      },
      compute_ADDinh(){
        // 1.总式子 ADDinh=PEClocal.air_ann*IRair*ET*EF*ED/(BW*AT)
        // 1.1.PEClocal.air_ann=MAX(Elocal.air,ElocalSTP.air)*Cstd.air*Temission/365+PECreg.air
        // 1.1.2 ElocalSTP.air  null->=Fstp.air*Elocal.water  notnull->input

        if (this.parameter.irAir==null)this.parameter.irAir=0.65;
        if (this.parameter.et == null)this.parameter.et = 24;
        if (this.parameter.ef == null)this.parameter.ef = 365;
        if (this.parameter.ed == null)this.parameter.ed = 70;
        if (this.parameter.bw == null)this.parameter.bw = 60.6;
        if (this.parameter.at == null)this.parameter.at = 25550;

        // 求ElocalSTP.air  null->=Fstp.air*Elocal.water  notnull->input
        //this.input.elocalWater=this.result.elocalWater;
        if(this.density.fstpAir==null) this.density.fstpAir=0.211;

        //elocalstpAir null->=Fstp.air*Elocal.water  notnull->input
        if (this.input.elocalstpAir == null) this.parameter.elocalstpAir = this.input.elocalWater*this.density.fstpAir;

        //求 PEClocal.air_ann=MAX(Elocal.air,ElocalSTP.air)*Cstd.air*Temission/365+PECreg.air
        //this.input.elocalAir=this.result.elocalAir;
        this.input.temission =this.form.temission;
        console.log("temission",this.form.temission);

        if(this.input.pecregAir == null) this.input.pecregAir = 0;
        if (this.density.cstdAir == null) this.density.cstdAir=0.000278;

        this.parameter.peclocalAirAnn =Math.max(this.input.elocalAir,this.parameter.elocalstpAir)* this.density.cstdAir*this.input.temission/365+this.input.pecregAir;


        // ADDinh=PEClocal.air_ann*IRair*ET*EF*ED/(BW*AT)
      /*  console.log("PEClocal.air_ann",this.parameter.peclocalAirAnn);
        console.log("elocalAir",this.input.elocalAir);
        console.log("elocalwater",this.input.elocalWater);
        console.log("cstAir",this.density.cstdAir);
        console.log("temission",this.input.temission);



        console.log("elocalstpAir",this.parameter.elocalstpAir);*/
        //this.parameter.peclocalAirAnn=0.000127;
        this.ADDinh = this.parameter.peclocalAirAnn*this.parameter.irAir*this.parameter.et*this.parameter.ef*this.parameter.ed/(this.parameter.bw*this.parameter.at);
        //console.log("#Result:addinh",this.ADDinh);
        this.ADDinh = this.NumberJudge(this.ADDinh);
      },
      compute_ADDoralWater() {

        if(1 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/15;
        }else if(2 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/15;
        }
        else if(3 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/50;
        }
        else if(4 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/150;
        }
        else if(5 == this.density.biodeg)
        {
          this.density.kbioFresh =  Math.LN2/150;
        }
        else this.density.kbioFresh = Math.E-20;

        // 1

        let  fpur_one;
        let  fpur_sec;
        if(Math.log10(this.density.kow)<=4)
        {
          fpur_one = 1;
        }else {
          var a;
          var b;
          if(Math.log10(this.density.kow)>5)
          {
            a = 1/16;
          }else {
            a = 1/4
          }

          if(this.density.henry <= 100)
          {
            b = 1;
          }else {
            b = 0.5;
          }
          fpur_one = a * b;

        }

        if(Math.log10(this.density.kow)<=4)
        {
          fpur_sec = 1;
        }else {
          var a;
          var b;
          var c;
          if(Math.log10(this.density.kow)>5)
          {
            a = 1/4;
          }else {
            a = 1/2;
          }

          if(this.density.henry <= 100)
          {
            b = 1;
          }else {
            b = 0.5;
          }

          if(Math.LN2*this.density.kbioFresh  <= 10)
          {
            c = 1/4;
          }else {
            c = 1;
          }
          fpur_sec = a * b * c;

        }
        //this.density.fPur = Math.max(fpur_one,fpur_sec)
        this.density.fPur =1;     //density 表  fpur=1
        //console.log("Result_fPur:",this.density.fPur);

        if(this.parameter.irWater==null) this.parameter.irWater=1.85;
        if(this.parameter.ef==null) this.parameter.ef=365;
        if(this.parameter.ed==null) this.parameter.ed=70;
        if(this.parameter.bw==null) this.parameter.bw=60.6;
        if(this.parameter.at==null) this.parameter.at=25550;


        //ADDoral-water=PEC.drwL*IRwater*EF*ED/(BW*AT)
        // PEC.drwL==MAX(PEClocal.water_ann*F.pur,PEClocal.grw)
        // console.log("33333333333333333333333333333333333",this.density.ksoilWater);
        this.density.peclocalGrw=this.density.peclocalSoil180*this.parameter.rhoSoil/this.density.ksoilWater/1000;
        //this.density.peclocalGrw=0.00654;
        //console.log("GGGGGGGGGGGGGGGGG",this.density.peclocalGrw);
        // console.log("22222222222222222222222222222222",this.density.PEClocalwater_ann);
        this.ADDoral_water=Math.max(this.density.PEClocalwater_ann*this.density.fPur,this.density.peclocalGrw)
          *this.parameter.irWater*this.parameter.ef*this.parameter.ed/(this.parameter.bw*this.parameter.at);

        // PEClocal.soil_180==(Clocal.soil_180+0)
        // Clocal.soil_180=Dair/k.soil+1/k.soil/180*(Csoil10_0-Dair/k.soil)*(1-EXP(-1*k.soil*180))
        //PECreg.soil=0

        // PEClocal.soil_180=Dair/k.soil+1/k.soil/180*(Csoil10_0-Dair/k.soil)*(1-EXP(-1*k.soil*180))
        //console.log("Result_addoralWater:",this.ADDoral_water);
        this.ADDoral_water = this.NumberJudge(this.ADDoral_water);
      },
      compute_ADDoralFood() {
        //计算ouput中ADDoral_food的值
        //总：ADDoral_food==Cfish*IRfish*EF*ED/(BW*AT)
        //IRfish=30;EF=365;ED=70;BW=60.6;AT=25550

        //3.Cfish=PEClocal.water_ann*BCF.fish
        //BCF.fish=使用实验数据42

        //2.PEClocal.water_ann=PEClocal.water*Temission/365
        //Temission=20

        //1.PEClocal.water=Clocal.water+Clocal.directwater+PECreg.water

        //1.1计算Clocal.water=Elocal.water*Fstp.water*10^3/((EFFLUENTstp+FLOW)*(1+Kp.susp*SUSPwater/10^6))
        // console.log("Result_PEClocal_water :",this.PEClocal_water );


        //2.this.PEClocalwater_ann=this.PEClocal_water*this.Temission/365;
        this.input.temission=this.form.temission;
        this.density.PEClocalwater_ann=this.PEClocal_water*this.input.temission/365;
        //console.log("Result_PEClocalwater_ann :",this.density.PEClocalwater_ann );

        //3.Cfish=PEClocal.water_ann*BCF.fish
        if(this.input.bcfFish==null)   this.input.bcfFish=42;// {
        //console.log("Result_bcfFish :",this.input.bcfFish );
        this.density.cfish=this.density.PEClocalwater_ann*this.input.bcfFish;
        // console.log("Result_density.cfish :",this.density.cfish );

        //总：ADDoral_food=Cfish*IRfish*EF*ED/(BW*AT)
        if(this.parameter.irFish==null) this.parameter.irFish=0.03;
        if(this.parameter.ef==null) this.parameter.ef=365;
        if(this.parameter.ed==null) this.parameter.ed=70;
        if(this.parameter.bw==null) this.parameter.bw=60.6;
        if(this.parameter.at==null) this.parameter.at=25550;
        this.ADDoral_food=(this.density.cfish*this.parameter.irFish*this.parameter.ef*this.parameter.ed)/(this.parameter.bw*this.parameter.at);
        //console.log("Result_ADDoral_food:",this.ADDoral_food);
        this.ADDoral_food = this.NumberJudge(this.ADDoral_food);

      },
      compute_ADDT() {
        this.ADDT=Number((Number(this.ADDinh)+Number(this.ADDoral_water)+Number(this.ADDoral_food)).toFixed(7));
        this.ADDT=this.NumberJudge(this.ADDT);
      },
      compute_EnvirmentRcr()  {
        this.EnvirmentRCrform.pecstpRcr=this.NumberJudge(this.PECstp/this.pecstpPnec);
        this.EnvirmentRCrform.peclocalWaterRcr=this.NumberJudge(this.PEClocal_water/this.peclocalWaterPnec);
        this.EnvirmentRCrform.peclocalSedRcr=this.NumberJudge(this.PEClocal_sed/this.peclocalSedPnec);
        this.EnvirmentRCrform.peclocalSoil30Rcr=this.NumberJudge(this.PEClocalsoil_30/this.peclocalSoil30Pnec);
        this.EnvirmentRCrform.peclocalGrwRcr=this.NumberJudge(this.PEClocal_grw/this.peclocalGrwPnec);
        this.EnvirmentRCrform.pecaquPredatorRcr=this.NumberJudge(this.PECaqu_predator/this.pecaquPredatorPnec);
        this.EnvirmentRCrform.pecterPredatorRcr=this.NumberJudge(this.PECter_predator/this.pecterPredatorPnec);
        //console.log("风险表征结果1",this.EnvirmentRCrform);

      },
      compute_HealthRcr(){
        this.HealthRcrform.addinhRcr=this.NumberJudge(Number(this.ADDinh)/Number(this.addtDnel));
        this.HealthRcrform.addoralWaterRcr=this.NumberJudge(this.ADDoral_water/this.addoralWaterDnel);
          this.HealthRcrform.addoralFoodRcr=this.NumberJudge(this.ADDoral_food/this.addoralFoodDnel);
        this.HealthRcrform.addtRcr=this.NumberJudge(Number(this.ADDT)/this.addtDnel);
        //console.log("风险表征结果2",this.HealthRcrform);


      },
    },
  }
</script>

<!--<style scoped lang="scss">-->
<style  lang="scss">
  .emission-left{
    position: absolute;
    width: 10%;
    height: 10%;
    left:0;
  }

  .emission-content{
    position:absolute;
    right:10%;
    left: 15%;
    top:0%;


  .el-col{
    color: #545c64;
  };
  };
  .emission-footer{
    position:absolute;
    right: 42.5%;
    top: 100%;
    bottom: 5%;
  }
  .clearfix:before{

  }
  .clearfix:after {
    font-size: 30px;
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>

