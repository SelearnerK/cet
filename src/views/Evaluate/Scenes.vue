<template>
  <div>

    <div class="scenes-left">
      <el-row v-show="button_show">
        <el-button icon="el-icon-circle-plus" type="primary" size="small" @click="handleAdd">添加场景</el-button>
        <el-button icon="el-icon-delete" @click="deleteScenes" size="small" >删除场景</el-button>
      </el-row>

      <el-menu
          :default-active="maxIndex"
          @open="handleOpen"
          @close="handleClose"
          style="width: 240px;"
      >

        <el-menu-item v-show="regionalEvaluate_show" @click="showRegion" index="10">
          <span slot="title"><b>区域评估</b></span>
        </el-menu-item>

        <el-submenu index="0">
          <template slot="title">
            <span>局部评估</span>
          </template>

          <el-scrollbar
              wrapClass="scrollbar-wrap"
              :style="{height: scrollHeight}"
              ref="scrollbarContainer">
            <el-menu-item :index="(index +'')" v-for="(item,index) in this.scenes" :key="index" @click="showScenes(item,index)"><span>{{item.lifeCycle}}：{{item.title}}</span>
            </el-menu-item>
          </el-scrollbar>

        </el-submenu>
      </el-menu>

    </div>

    <!--新增-->
    <div class="emission-content" >

      <el-tag class="current-tag"><b>当前物质：</b>{{this.form.wzmc}}</el-tag>

      <div v-show="scene_show">

        <el-form ref="form" :model="form"  label-width="540px">
          <br>
          <el-card class="">
            <el-form-item label="如需添加场景，请先点击添加场景，再填写信息后点击“保存”。"  style="width: 100%; " >
            </el-form-item>
          </el-card>
        </el-form>

        <div v-show="input_show">
          <el-form ref="form" :model="form" label-width="540px" >

            <div v-show="industrial_disabled"  >
              <el-card class="box-card">

                <el-form-item label="暴露场景短标题：" style=" width: 100%;" prop="title">
                  <el-col :span="8">
                    <el-input v-model="form.title" style="width: 100%;" auto-complete="off" :disabled="title_disabled" ></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" icon="el-icon-edit" circle @click="()=>{title_disabled = !title_disabled}"></el-button>
                  </el-col>
                </el-form-item>

                <el-form-item label="化学物质的年生产使用量：" style=" width: 100%; background-color: white" prop="qchemical">
                  <el-col :span="8">
                    <el-input v-model="form.qchemical" style="width: 100%; " auto-complete="off" >
                      <template slot="append">kg/y</template>
                    </el-input>
                  </el-col>

                </el-form-item>

                <el-form-item label="年排放时间：" style=" width: 100%; background-color: white" prop="temission">
                  <el-col :span="8">
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
                  <el-col :span="8" >
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
                  <el-col :span="8">
                    <el-radio v-model="form.emissionPattern" label="1" @change="changeStandardstp">连续排放</el-radio>
                    <el-radio v-model="form.emissionPattern" label="2" @change="changeStandardstp">间歇排放</el-radio>
                  </el-col>
                </el-form-item>
              </el-card>

              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>排放系数</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="排放系数-废水：" style="width: 100%; background-color: 	white"  prop="water">
                  <el-col :span="8" >
                    <el-input v-model="form.water" style="width: 100%; " auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="排放系数-废气：" style=" width: 100%; background-color: 	white" prop="air">
                  <el-col :span="8">
                    <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="排放系数-土壤：" style=" width: 100%; background-color: 	white" prop="sludge">
                  <el-col :span="8">
                    <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>
              </el-card>


              <el-card class="box-card">

                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3 style="color: black">污染控制</h3>
                    </div>
                  </div>

                </div>
                <el-form-item label="企业内部减排效率-大气：" style=" width: 100%; background-color: white" prop="abatementAir">
                  <el-col :span="8">
                    <el-input v-model="form.abatementAir" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>


                <el-form-item label="企业内部减排效率-土壤：" style=" width: 100%; background-color: white" prop="abatementSludge">
                  <el-col :span="8">
                    <el-input v-model="form.abatementSludge" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="企业自有STP处理："  style=" width: 100%; background-color: white" prop="stponsite">
                  <el-col :span="8">
                    <el-select style="width: 100%;" v-model="form.stponsite" placeholder="请选择" @change="stponsiteShow">
                      <el-option
                          v-for="item in options2"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>

                <el-row v-show="stponsite_disabled">
                  <el-form-item label="STP地表水排放系数：" style=" width: 100%; background-color: white" prop="stponsiteWater" ><el-col :span="8">
                    <el-input v-model="form.stponsiteWater" style="width: 100%;" auto-complete="off" @change="setAbatementWater" :disabled="!(isStponsite)"></el-input>   </el-col>
                  </el-form-item>


                  <el-form-item label="STP大气排放系数：" style=" width: 100%; background-color: white" prop="stponsiteAir">
                    <el-col :span="8">
                      <el-input v-model="form.stponsiteAir" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="STP污泥排放系数：" style=" width: 100%; background-color: white" prop="stponsiteSludge">
                    <el-col :span="8">
                      <el-input v-model="form.stponsiteSludge" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="降解去除：" style=" width: 100%; background-color: white" prop="stponsiteDegrade">
                    <el-col :span="8">
                      <el-input v-model="form.stponsiteDegrade" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-form-item label="企业内部减排效率-废水：" style=" width: 100%; background-color: white" prop="abatementWater">
                  <el-col :span="8">
                    <el-input v-model="form.abatementWater" style="width: 100%;" auto-complete="off" :disabled="abatementWater_disabled"></el-input>
                  </el-col>
                </el-form-item>
              </el-card>

              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>废水去向</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="废水去向：" style=" width: 100%; " prop="waterTo">
                  <el-col :span="8" >
                    <el-radio v-model="form.waterTo" label="1" @change="setOther">直排地表水</el-radio>
                    <el-radio v-model="form.waterTo" label="2" @change="setOther">进入集中式STP处理</el-radio>
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
                  <el-form-item label="STP地表水排放系数：" style=" width: 100%; " prop="stpWater"><el-col :span="8">
                    <el-input v-model="form.stpWater" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>   </el-col>
                  </el-form-item>

                  <el-form-item label="STP大气排放系数：" style=" width: 100%;" prop="stpAir">
                    <el-col :span="8">
                      <el-input v-model="form.stpAir" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="STP污泥排放系数：" style=" width: 100%; " prop="stpSludge">
                    <el-col :span="8">
                      <el-input v-model="form.stpSludge" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="降解去除：" style=" width: 100%;" prop="stpDegrade">
                    <el-col :span="8">
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
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>周边环境</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="废水流量：" style=" width: 100%; background-color: white" prop="stpEffluent">
                  <el-col :span="8">
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
                  <el-col :span="8">
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
                <el-form-item label="暴露场景短标题：" style=" width: 100%;" prop="title">
                  <el-col :span="8">
                    <el-input v-model="form.title" style="width: 100%;" auto-complete="off" :disabled="title_disabled" ></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" icon="el-icon-edit" circle @click="()=>{title_disabled = !title_disabled}"></el-button>
                  </el-col>
                </el-form-item>

                <el-form-item label="化学物质的年生产使用量：" style=" width: 100%; background-color: white" prop="qchemical">
                  <el-col :span="8">
                    <el-input v-model="form.qchemical" style="width: 100%; " auto-complete="off" >
                      <template slot="append">kg/y</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="年排放时间：" style=" width: 100%; " prop="temission">
                  <el-col :span="8">
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
                  <el-col :span="8">
                    <el-input v-model="form.fdirectwater" style="width: 100%;" auto-complete="off" :disabled="fdirectwater_disabled">
                    </el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-tooltip class="item" effect="dark" :content="fdirectwaterTip" placement="right">
                      <el-button type="primary" icon="el-icon-edit" circle @click="changeFdirectwater"></el-button>
                    </el-tooltip>
                  </el-col>
                </el-form-item>

                <el-form-item label="区域使用量占全国的比例：" style=" width: 100%; background-color: white" prop="freg">
                  <el-col :span="8">
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
                  <el-col :span="8">
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
                  <el-col :span="8">
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
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>排放系数</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="排放系数-废水：" style=" width: 100%; " prop="water">
                  <el-col :span="8">
                    <el-input v-model="form.water" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="排放系数-废气：" style=" width: 100%; " prop="air">
                  <el-col :span="8">
                    <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="排放系数-土壤：" style=" width: 100%; " prop="sludge">
                  <el-col :span="8">
                    <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>
              </el-card>

            </div>

            <div v-show="waste_disabled">
              <el-card class="box-card">
                <el-form-item label="暴露场景短标题：" style=" width: 100%;" prop="title">
                  <el-col :span="8">
                    <el-input v-model="form.title" style="width: 100%;" auto-complete="off" :disabled="title_disabled" ></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" icon="el-icon-edit" circle @click="()=>{title_disabled = !title_disabled}"></el-button>
                  </el-col>
                </el-form-item>

                <el-form-item label="化学物质的年生产使用量：" style=" width: 100%; background-color: white" prop="qchemical">
                  <el-col :span="8">
                    <el-input v-model="form.qchemical" style="width: 100%; " auto-complete="off" >
                      <template slot="append">kg/y</template>
                    </el-input>
                  </el-col>

                </el-form-item>

                <el-form-item label="年排放时间：" style=" width: 100%; background-color: white" prop="temission">
                  <el-col :span="8">
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
                  <el-col :span="8">
                    <el-input v-model="form.waste" style="width: 100%;" auto-complete="off">
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="分散性因子：" style=" width: 100%; background-color: white" prop="fmain">
                  <el-col :span="8">
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
                  <el-col :span="8">
                    <el-radio v-model="form.emissionPattern" label="1" @change="changeStandardstp">连续排放</el-radio>
                    <el-radio v-model="form.emissionPattern" label="2" @change="changeStandardstp">间歇排放</el-radio>
                  </el-col>
                </el-form-item>
              </el-card>

              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>排放系数</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="排放系数-废水：" style=" width: 100%; " prop="water">
                  <el-col :span="8">
                    <el-input v-model="form.water" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="排放系数-废气：" style=" width: 100%; " prop="air">
                  <el-col :span="8">
                    <el-input v-model="form.air" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="排放系数-土壤：" style=" width: 100%; " prop="sludge">
                  <el-col :span="8">
                    <el-input v-model="form.sludge" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>
              </el-card>


              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>污染控制</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="企业内部减排效率-大气：" style=" width: 100%; background-color: white" prop="abatementAir">
                  <el-col :span="8">
                    <el-input v-model="form.abatementAir" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="企业内部减排效率-土壤：" style=" width: 100%; background-color: white" prop="abatementSludge">
                  <el-col :span="8">
                    <el-input v-model="form.abatementSludge" style="width: 100%;" auto-complete="off"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="企业自有STP处理："  style=" width: 100%; background-color: white" prop="stponsite">
                  <el-col :span="8">
                    <el-select style="width: 100%;" v-model="form.stponsite" placeholder="请选择" @change="stponsiteShow">
                      <el-option
                          v-for="item in options2"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>

                <el-row v-show="stponsite_disabled">

                  <el-form-item label="企业自有STP废水排放系数：" style=" width: 100%; background-color: white" prop="stponsiteWater" ><el-col :span="8">
                    <el-input v-model="form.stponsiteWater" style="width: 100%;" auto-complete="off" @change="setAbatementWater" :disabled="!(isStponsite)"></el-input>   </el-col>
                  </el-form-item>


                  <el-form-item label="企业自有STP废气排放系数：" style=" width: 100%; background-color: white" prop="stponsiteAir">
                    <el-col :span="8">
                      <el-input v-model="form.stponsiteAir" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="企业自有STP固废排放系数：" style=" width: 100%; background-color: white" prop="stponsiteSludge">
                    <el-col :span="8">
                      <el-input v-model="form.stponsiteSludge" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="降解去除：" style=" width: 100%; background-color: white" prop="stponsiteDegrade">
                    <el-col :span="8">
                      <el-input v-model="form.stponsiteDegrade" style="width: 100%;" auto-complete="off" :disabled="!(isStponsite)"></el-input>
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-form-item label="企业内部减排效率-废水：" style=" width: 100%; background-color: white" prop="abatementWater" >
                  <el-col :span="8">
                    <el-input v-model="form.abatementWater" style="width: 100%;" auto-complete="off" :disabled="abatementWater_disabled"></el-input>
                  </el-col>
                </el-form-item>
              </el-card>

              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>废水去向</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="废水去向：" style=" width: 100%; " prop="waterTo">
                  <el-col :span="8" >
                    <el-radio v-model="form.waterTo" label="1" @change="setOther">直排地表水</el-radio>
                    <el-radio v-model="form.waterTo" label="2" @change="setOther">进入集中式STP处理</el-radio>
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
                  <el-form-item label="企业自有STP废水排放系数：" style=" width: 100%; " prop="stpWater"><el-col :span="8">
                    <el-input v-model="form.stpWater" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>   </el-col>
                  </el-form-item>

                  <el-form-item label="企业自有STP废气排放系数：" style=" width: 100%; " prop="stpAir">
                    <el-col :span="8">
                      <el-input v-model="form.stpAir" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="企业自有STP固废排放系数：" style=" width: 100%; " prop="stpSludge">
                    <el-col :span="8">
                      <el-input v-model="form.stpSludge" style="width: 100%;" auto-complete="off" :disabled="stp_disabled"></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="降解去除：" style=" width: 100%; " prop="stpDegrade">
                    <el-col :span="8">
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
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3 style="color: black">周边环境</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="废水流量：" style=" width: 100%; background-color: white" prop="stpEffluent">
                  <el-col :span="8">
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
                  <el-col :span="8">
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
          <br>
          <div v-show="isEmission" >
            <el-button type="danger" icon="el-icon-edit-outline" @click="compute" >计算</el-button>
            <el-button type="primary" icon="el-icon-success" @click="updateScenes" >保存并计算区域排放量</el-button>
          </div>
          <br>
          <el-card class="box-card">
            <div style="padding-top: 0; margin-bottom: 5px;">
              <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                <div style="display:inline-block; text-align: center; ">
                  <h3>排放率</h3>
                </div>
              </div>
            </div>
            <div style="padding-top: 0; margin-bottom: 30px;">
              <div class="clearfix" style="height: 50px; background-color: white;" >
                <div style="display:block; text-align: center; ">
                  <div style="width:100%;">
                    <el-row>
                      <el-col :span="12" style="width: 50%; "> <h3>局部环境排放率</h3></el-col>
                      <el-col :span="12" style="width: 50%; " > <h3>本场景区域环境排放率</h3></el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
            <div >
              <el-form ref="form" :model="form" label-width="320px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="水-直排（Edirectwater.L）：" style=" width: 100%;" prop="elocalDirectwater">
                      <el-row>
                        <el-col :span="18">
                          <el-input v-model="form.elocalDirectwater" style="width: 100%;" auto-complete="off" :disabled="elocalDirectwater_disabled">
                            <template slot="append">kg/d</template>
                          </el-input>
                        </el-col>
                        <el-col :span="6">
                          <!--            <el-tooltip class="item" effect="dark" :content="elocalDirectwaterTip" placement="right">-->
                          <el-button type="primary" icon="el-icon-edit" circle @click="changeElocaldirectwater"></el-button>
                          <!--            </el-tooltip>-->
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="水-直排（Ei.directwater.R）：" style=" width: 100%;" prop="elocalDirectwaterR">
                      <el-row>
                        <el-col :span="18">
                          <el-input v-model="form.elocalDirectwaterR" style="width: 100%;" auto-complete="off" :disabled="elocalDirectwaterR_disabled">
                            <template slot="append">kg/d</template>
                          </el-input>
                        </el-col>
                        <el-col :span="6">
                          <!--            <el-tooltip class="item" effect="dark" :content="elocalDirectwaterTip" placement="right">-->
                          <el-button type="primary" icon="el-icon-edit" circle @click="changeElocaldirectwaterR"></el-button>
                          <!--            </el-tooltip>-->
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="水-排入集中式STP（Ewater.L）：" style=" width: 100%;" prop="elocalWater">
                      <el-col :span="18">
                        <el-input v-model="form.elocalWater" style="width: 100%;" auto-complete="off" :disabled="elocalWater_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalWaterTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalwater"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <!--                  <el-col :span="12">-->
                  <!--                    <el-form-item label="水-排入集中式STP（Ewater.L）：" style=" width: 100%;" prop="elocalWater">-->
                  <!--                      <el-col :span="18">-->
                  <!--                        <el-input v-model="form.elocalWater" style="width: 100%;" auto-complete="off" :disabled="elocalWater_disabled">-->
                  <!--                          <template slot="append">kg/d</template>-->
                  <!--                        </el-input>-->
                  <!--                      </el-col>-->
                  <!--                      <el-col :span="6">-->
                  <!--                        &lt;!&ndash;            <el-tooltip class="item" effect="dark" :content="elocalWaterTip" placement="right">&ndash;&gt;-->
                  <!--                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalwater"></el-button>-->
                  <!--                        &lt;!&ndash;            </el-tooltip>&ndash;&gt;-->
                  <!--                      </el-col>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="水-集中式STP间接排放（Estp.water.L）：" style=" width: 100%;" prop="elocalstpWater">
                      <el-col :span="18">
                        <el-input v-model="form.elocalstpWater" style="width: 100%;" auto-complete="off" :disabled="elocalstpWater_disabeld">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalstpWaterTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpwater"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="水-集中式STP间接排放（Estp.i.water.R):" style=" width: 100%;" prop="elocalstpWaterR">
                      <el-col :span="18">
                        <el-input v-model="form.elocalstpWaterR" style="width: 100%;" auto-complete="off" :disabled="elocalstpWaterR_disabeld">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalstpWaterTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpwaterR"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="大气-直排（Eair.L）：" style=" width: 100%;" prop="elocalAir">
                      <el-col :span="18">
                        <el-input v-model="form.elocalAir" style="width: 100%;" auto-complete="off" :disabled="elocalAir_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalAirTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalair"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="大气-直排（Ei.air.R）：" style=" width: 100%;" prop="elocalAirR">
                      <el-col :span="18">
                        <el-input v-model="form.elocalAirR" style="width: 100%;" auto-complete="off" :disabled="elocalAirR_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalAirTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalairR"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="大气-集中式STP间接排放（Estp.air.L）：" style=" width: 100%;" prop="elocalstpAir">
                      <el-col :span="18">
                        <el-input v-model="form.elocalstpAir" style="width: 100%;" auto-complete="off" :disabled="elocalstpAir_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalstpAirTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpair"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="大气-集中式STP间接排放（Estp.i.air.R）：" style=" width: 100%;" prop="elocalstpAirR">
                      <el-col :span="18">
                        <el-input v-model="form.elocalstpAirR" style="width: 100%;" auto-complete="off" :disabled="elocalstpAirR_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalstpAirTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpairR"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="土壤-直排（Esoil.L）：" style=" width: 100%;" prop="elocalSoil">
                      <el-col :span="18">
                        <el-input v-model="form.elocalSoil" style="width: 100%;" auto-complete="off" :disabled="elocalSoil_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalSoilTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalsoil"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="土壤-直排（Ei.soil.R）：" style=" width: 100%;" prop="elocalSoilR">
                      <el-col :span="18">
                        <el-input v-model="form.elocalSoilR" style="width: 100%;" auto-complete="off" :disabled="elocalSoilR_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalSoilTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalsoilR"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="土壤-集中式STP间接排放（Estp.soil.L）：" style=" width: 100%;" prop="elocalstpSoil">
                      <el-col :span="18">
                        <el-input v-model="form.elocalstpSoil" style="width: 100%;" auto-complete="off" :disabled="elocalstpSoil_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalSoilTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpsoil"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="土壤-集中式STP间接排放（Estp.i.soil.R):" style=" width: 100%;" prop="elocalstpSoilR" >
                      <el-col :span="20">
                        <el-input v-model="form.elocalstpSoilR" style="width: 100%;" auto-complete="off" :disabled="elocalstpSoilR_disabled">
                          <template slot="append">kg/d</template>
                        </el-input>
                      </el-col>
                      <el-col :span="4">
                        <!--            <el-tooltip class="item" effect="dark" :content="elocalSoilTip" placement="right">-->
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpsoilR"></el-button>
                        <!--            </el-tooltip>-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <!--                  <br>-->
                  <!--                  <div v-show="isEmission" >-->
                  <!--                    <el-button type="danger" icon="el-icon-edit-outline" @click="computes_R" >计算</el-button>-->
                  <!--                    <el-button type="primary" icon="el-icon-success" @click="updateScens_R" >保存</el-button>-->
                  <!--                  </div>-->
                  <!--                  <br>-->
                </el-row>



                <!--                <el-form-item label="水-直排（Edirectwater.L）：" style=" width: 100%;" prop="elocalDirectwater">-->

                <!--                  <el-col :span="8">-->
                <!--                    <el-input v-model="form.elocalDirectwater" style="width: 100%;" auto-complete="off" :disabled="elocalDirectwater_disabled">-->
                <!--                      <template slot="append">kg/d</template>-->
                <!--                    </el-input>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="2">-->
                <!--                    &lt;!&ndash;            <el-tooltip class="item" effect="dark" :content="elocalDirectwaterTip" placement="right">&ndash;&gt;-->
                <!--                    <el-button type="primary" icon="el-icon-edit" circle @click="changeElocaldirectwater"></el-button>-->
                <!--                    &lt;!&ndash;            </el-tooltip>&ndash;&gt;-->
                <!--                  </el-col>-->
                <!--                </el-form-item>-->

                <!--                <el-form-item label="水-排入集中式STP（Ewater.L）：" style=" width: 100%;" prop="elocalWater">-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-input v-model="form.elocalWater" style="width: 100%;" auto-complete="off" :disabled="elocalWater_disabled">-->
                <!--                      <template slot="append">kg/d</template>-->
                <!--                    </el-input>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="2">-->
                <!--                    &lt;!&ndash;            <el-tooltip class="item" effect="dark" :content="elocalWaterTip" placement="right">&ndash;&gt;-->
                <!--                    <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalwater"></el-button>-->
                <!--                    &lt;!&ndash;            </el-tooltip>&ndash;&gt;-->
                <!--                  </el-col>-->
                <!--                </el-form-item>-->

                <!--                <el-form-item label="水-集中式STP间接排放（Estp.water.L）：" style=" width: 100%;" prop="elocalstpWater">-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-input v-model="form.elocalstpWater" style="width: 100%;" auto-complete="off" :disabled="elocalstpWater_disabeld">-->
                <!--                      <template slot="append">kg/d</template>-->
                <!--                    </el-input>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="2">-->
                <!--                    &lt;!&ndash;            <el-tooltip class="item" effect="dark" :content="elocalstpWaterTip" placement="right">&ndash;&gt;-->
                <!--                    <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpwater"></el-button>-->
                <!--                    &lt;!&ndash;            </el-tooltip>&ndash;&gt;-->
                <!--                  </el-col>-->
                <!--                </el-form-item>-->


                <!--                <el-form-item label="大气-直排（Eair.L）：" style=" width: 100%;" prop="elocalAir">-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-input v-model="form.elocalAir" style="width: 100%;" auto-complete="off" :disabled="elocalAir_disabled">-->
                <!--                      <template slot="append">kg/d</template>-->
                <!--                    </el-input>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="2">-->
                <!--                    &lt;!&ndash;            <el-tooltip class="item" effect="dark" :content="elocalAirTip" placement="right">&ndash;&gt;-->
                <!--                    <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalair"></el-button>-->
                <!--                    &lt;!&ndash;            </el-tooltip>&ndash;&gt;-->
                <!--                  </el-col>-->
                <!--                </el-form-item>-->

                <!--                <el-form-item label="大气-集中式STP间接排放（Estp.air.L）：" style=" width: 100%;" prop="elocalstpAir">-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-input v-model="form.elocalstpAir" style="width: 100%;" auto-complete="off" :disabled="elocalstpAir_disabled">-->
                <!--                      <template slot="append">kg/d</template>-->
                <!--                    </el-input>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="2">-->
                <!--                    &lt;!&ndash;            <el-tooltip class="item" effect="dark" :content="elocalstpAirTip" placement="right">&ndash;&gt;-->
                <!--                    <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpair"></el-button>-->
                <!--                    &lt;!&ndash;            </el-tooltip>&ndash;&gt;-->
                <!--                  </el-col>-->
                <!--                </el-form-item>-->

                <!--                <el-form-item label="土壤-直排（Esoil.L）：" style=" width: 100%;" prop="elocalSoil">-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-input v-model="form.elocalSoil" style="width: 100%;" auto-complete="off" :disabled="elocalSoil_disabled">-->
                <!--                      <template slot="append">kg/d</template>-->
                <!--                    </el-input>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="2">-->
                <!--                    &lt;!&ndash;            <el-tooltip class="item" effect="dark" :content="elocalSoilTip" placement="right">&ndash;&gt;-->
                <!--                    <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalsoil"></el-button>-->
                <!--                    &lt;!&ndash;            </el-tooltip>&ndash;&gt;-->
                <!--                  </el-col>-->
                <!--                </el-form-item>-->

                <!--                <el-form-item label="土壤-集中式STP间接排放（Estp.soil.L）：" style=" width: 100%;" prop="elocalstpSoil">-->
                <!--                  <el-col :span="8">-->
                <!--                    <el-input v-model="form.elocalstpSoil" style="width: 100%;" auto-complete="off" :disabled="elocalstpSoil_disabled">-->
                <!--                      <template slot="append">kg/d</template>-->
                <!--                    </el-input>-->
                <!--                  </el-col>-->
                <!--                  <el-col :span="2">-->
                <!--                    &lt;!&ndash;            <el-tooltip class="item" effect="dark" :content="elocalSoilTip" placement="right">&ndash;&gt;-->
                <!--                    <el-button type="primary" icon="el-icon-edit" circle @click="changeElocalstpsoil"></el-button>-->
                <!--                    &lt;!&ndash;            </el-tooltip>&ndash;&gt;-->
                <!--                  </el-col>-->
                <!--                </el-form-item>-->
                <br><br><br><br><br><br>

              </el-form>
            </div>
          </el-card>

        </div>
      </div>

      <div v-show="results_show">

        <div v-if="this.userName !== 'admin'">

          <el-form
              :model="form"
              label-width="480px"
              ref="form"
          >
            <el-tabs  style="height: 600px">

              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>环境暴露评估结果</h3>
                    </div>
                  </div>
                </div>
                <el-form-item label="" prop="id" v-if="false">
                  <el-input v-model="form.id" auto-complete="off"> </el-input>
                </el-form-item>

                <el-row>
                  <el-col :span="16">
                    <el-form-item label="STP微生物环境(PECstp)" prop="pecstp">
                      <el-tooltip class="item" effect="dark" :content="pecstpTip" placement="right">
                        <el-input v-model="form.pecstp"  auto-complete="off" readonly="readonly" >
                          <template slot="append">mg.L<sup>-1</sup></template> </el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row>
                  <el-col :span="16">
                    <el-form-item label="地表水(PEClocal.water)" prop="peclocalWater">
                      <el-input v-model="form.peclocalWater " auto-complete="off" readonly="readonly">
                        <template slot="append">mg.L<sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row>
                  <el-col :span="16">
                    <el-form-item label="沉积物(PEClocal.sed)" prop="peclocalSed" >
                      <el-input v-model="form.peclocalSed " auto-complete="off" readonly="readonly"><template slot="append">mg.kg<sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>


                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="土壤(PEClocal.soil.30)" prop="peclocalSoil30">
                      <el-input v-model="form.peclocalSoil30 " auto-complete="off" readonly="readonly" ><template slot="append">mg.kg<sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row>
                  <el-col :span="16">
                    <el-form-item label="地下水(PEClocal.grw)" prop="peclocalGrw" >
                      <el-input v-model="form.peclocalGrw " auto-complete="off" readonly="readonly"><template slot="append">mg.L<sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row>
                  <el-col :span="16">
                    <el-form-item label="水生动物捕食者(PECaqu.predator)" prop="pecaquPredator" >
                      <el-input v-model="form.pecaquPredator " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="陆生动物捕食者(PECter.predator)" prop="pecterPredator" v-if="true">
                      <el-input v-model="form.pecterPredator " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>


                </el-row>
              </el-card>

            </el-tabs>
          </el-form>
        </div>

        <!--管理员-->

        <div v-if="this.userName === 'admin'">

          <el-form
              :model="form"
              label-width="280px"
              ref="form"
          >
            <el-tabs  style="height: 600px">

              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:block; text-align: center; ">
                      <div style="width:100%;">
                        <el-row>
                          <el-col :span="7" style="width: 50%; "> <h3>环境暴露评估结果</h3></el-col>
                          <el-col :span="7" style="width: 50%; " > <h3>环境风险表征(风险商)</h3></el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </div>

                <el-form-item label="" prop="id" v-if="false">
                  <el-input v-model="form.id" auto-complete="off"> </el-input>
                </el-form-item>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="STP微生物环境(PECstp)" prop="pecstp" v-if="true">
                      <el-tooltip class="item" effect="dark" :content="pecstpTip" placement="right">
                        <el-input v-model="form.pecstp "  auto-complete="off" readonly="readonly" >
                          <template slot="append">mg.L<sup>-1</sup></template> </el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" >
                    <el-form-item label="STP" prop="pecstppnec" v-if="true">
                      <el-input v-model="form.pecstpRcr"  auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="地表水(PEClocal.water)" prop="peclocalWater" v-if="true" >
                      <el-input v-model="form.peclocalWater " auto-complete="off" readonly="readonly"><template slot="append">mg.L<sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" >
                    <el-form-item label="地表水" prop="peclocalWaterpnec" v-if="true" >
                      <el-input v-model="form.peclocalWaterRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="沉积物(PEClocal.sed)" prop="peclocalSed" v-if="true">
                      <el-input v-model="form.peclocalSed " auto-complete="off" readonly="readonly"><template slot="append">mg.kg<sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" >
                    <el-form-item label="沉积物" prop="peclocalSedpnec" v-if="true">
                      <el-input v-model="form.peclocalSedRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="土壤(PEClocal.soil.30)" prop="peclocalSoil30" v-if="true">
                      <el-input v-model="form.peclocalSoil30 " auto-complete="off" readonly="readonly" ><template slot="append">mg.kg<sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" >
                    <el-form-item label="土壤" prop="peclocalSoil30pnec" v-if="true">
                      <el-input v-model="form.peclocalSoil30Rcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="地下水(PEClocal.grw)" prop="peclocalGrw" v-if="true">
                      <el-input v-model="form.peclocalGrw " auto-complete="off" readonly="readonly"><template slot="append">mg.L<sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" >
                    <el-form-item label="地下水" prop="peclocalGrwpnec" v-if="true">
                      <el-input v-model="form.peclocalGrwRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="水生动物捕食者(PECaqu.predator)" prop="pecaquPredator" v-if="true">
                      <el-input v-model="form.pecaquPredator " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                    <el-form-item label="水生捕食动物" prop="pecaquPredatorpnec" v-if="true">
                      <el-input v-model="form.pecaquPredatorRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="陆生动物捕食者(PECter.predator)" prop="pecterPredator" v-if="true">
                      <el-input v-model="form.pecterPredator " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" >
                    <el-form-item label="陆生捕食动物" prop="pecterPredatorpnec" v-if="true">
                      <el-input v-model="form.pecterPredatorRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-card>

            </el-tabs>
          </el-form>
        </div>



        <!--健康暴露-->

        <div v-if="this.userName !== 'admin'">

          <el-form
              :model="form"
              label-width="480px"
              ref="form"
          >
            <el-tabs tab-position="top" style="height: 600px" >

              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:inline-block; text-align: center; ">
                      <h3>健康暴露估算结果</h3>
                    </div>
                  </div>
                </div>

                <el-row>
                  <el-col :span="16">
                    <el-form-item label="吸入(ADDinh)" prop="addinh" v-if="true">
                      <el-input v-model="form.addinh" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="饮水(ADDoral.water)" prop="addoralWater" v-if="true">
                      <el-input v-model="form.addoralWater " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="经口摄食(鱼)(ADDoral.food )" prop="addoralFood" v-if="true">
                      <el-input v-model="form.addoralFood " auto-complete="off" readonly="readonly" ><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                      <el-input v-model="form.addt " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>


                </el-row>
              </el-card>
            </el-tabs>
          </el-form>
        </div>

        <!--管理员-->

        <div v-if="this.userName === 'admin'">

          <el-form
              :model="form"
              label-width="280px"
              ref="form"
          >
            <el-tabs tab-position="top" style="height: 600px" >
              <el-card class="box-card">
                <div style="padding-top: 0; margin-bottom: 20px;">
                  <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                    <div style="display:block; text-align: center; ">
                      <div style="width:100%;">
                        <el-row>
                          <el-col :span="7" style="width: 50%; "> <h3>健康暴露估算结果</h3></el-col>
                          <el-col :span="7" style="width: 50%; " > <h3>健康风险表征(风险商)</h3></el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </div>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="吸入(ADDinh)" prop="addinh" v-if="true">
                      <el-input v-model="form.addinh" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                    <el-form-item label="吸入" prop="addinh" v-if="true">
                      <el-input v-model="form.addinhRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="饮水(ADDoral.water)" prop="addoralWater" v-if="true">
                      <el-input v-model="form.addoralWater " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                    <el-form-item label="饮水" prop="addoralWater" v-if="true">
                      <el-input v-model="form.addoralWaterRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="经口摄食(鱼)(ADDoral.food )" prop="addoralFood" v-if="true">
                      <el-input v-model="form.addoralFood " auto-complete="off" readonly="readonly" ><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" >
                    <el-form-item label="经口摄食(鱼)" prop="addoralFood" v-if="true">
                      <el-input v-model="form.addoralFoodRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                      <el-input v-model="form.addt " auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sub>wwt</sub><sup>-1</sup></template></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" >
                    <el-form-item label="不同途径总暴露量(ADDT)" prop="addt" v-if="true">
                      <el-input v-model="form.addtRcr" auto-complete="off" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-tabs>
          </el-form>
        </div>
      </div>

      <div v-show="region_show">
        <div class="result-content">
          <div>
            <el-form
                :model="result_R"
                label-width="480px"
                ref="result_R"
            >
              <el-tabs  style="height: 390px">

                <el-card class="box-card">
                  <div style="padding-top: 0; margin-bottom: 20px;">
                    <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                      <div style="display:inline-block; text-align: center; ">
                        <h3>所有场景区域总环境排放率</h3>
                      </div>
                    </div>
                  </div>

                  <el-form-item label="" prop="id" v-if="false">
                    <el-input v-model="form.id" auto-complete="off"> </el-input>
                  </el-form-item>

                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="大气排放率(Eair.R)" prop="eairRegional" v-if="true">
                        <el-input v-model="result_R.eairRegional"  auto-complete="off" :disabled="this.editFlag.eairRegional"><template slot="append">kg·d<sup>-1</sup></template></el-input>
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="1">
                      <el-tooltip class="item" effect="dark" :content="eairRegionalTip" placement="right">
                        <el-button type="primary" icon="el-icon-edit" circle @click="changeEairRegionaltip" ></el-button>
                      </el-tooltip>
                    </el-col>-->
                    <el-col :span="1">
                      <el-button type="primary" icon="el-icon-edit" circle @click="()=>{this.editFlag.eairRegional = !this.editFlag.eairRegional}"></el-button>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="地表水排放率(Ewater.R)" prop="ewaterRegional" v-if="true" >
                        <el-input v-model="result_R.ewaterRegional" auto-complete="off" :disabled="this.editFlag.ewaterRegional"><template slot="append">kg·d<sup>-1</sup></template></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-button type="primary" icon="el-icon-edit" circle @click="()=>{this.editFlag.ewaterRegional = !this.editFlag.ewaterRegional}"></el-button>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="土壤排放率(Esoil.R)" prop="esoilRegional" v-if="true">
                        <el-input v-model="result_R.esoilRegional" auto-complete="off" :disabled="this.editFlag.esoilRegional"><template slot="append">kg·d<sup>-1</sup></template></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-button type="primary" icon="el-icon-edit" circle @click="()=>{this.editFlag.esoilRegional = !this.editFlag.esoilRegional}"></el-button>
                    </el-col>
                  </el-row>

                  <div>
                    <el-button type='danger' @click="dataall">计算</el-button>
                    <el-button type='primary' @click="saveall">保存</el-button>
                  </div>

                  <!--                  <el-row>-->
                  <!--                    <el-col :span="16">-->
                  <!--                      <el-form-item label="集中式STP污泥农用排放率(Estp.soil.R)" prop="estpSoilRegional" v-if="true">-->
                  <!--                        <el-input v-model="result_R.estpSoilRegional" auto-complete="off" readonly="readonly"><template slot="append">kg·d<sup>-1</sup></template></el-input>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                  </el-row>-->

                </el-card>
              </el-tabs>
            </el-form>
          </div>

          <div>
            <el-form
                :model="result_R"
                label-width="480px"
                ref="result_R"
            >
              <el-tabs tab-position="top" style="height: 600px" >

                <el-card class="box-card">
                  <div style="padding-top: 0; margin-bottom: 20px;">
                    <div class="clearfix" style="height: 60px; background-color: #8cc5ff;" >
                      <div style="display:inline-block; text-align: center; ">
                        <h3>区域环境暴露估算结果</h3>
                      </div>
                    </div>
                  </div>
                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="大气区域PEC(PECair.R)" prop="pecairR" v-if="true">
                        <el-input v-model="result_R.pecairR" auto-complete="off" readonly="readonly" ><template slot="append">mg·L<sup>-3</sup></template></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="地表水区域PEC(PECwater.R)" prop="pecwaterR" v-if="true">
                        <el-input v-model="result_R.pecwaterR" auto-complete="off" readonly="readonly"><template slot="append">mg·L<sup>-1</sup></template></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="土壤区域PEC(PECsoil.R)" prop="pecsoilR" v-if="true">
                        <el-input v-model="result_R.pecsoilR" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sup>-1</sup></template></el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="沉积物区域PEC(PECsed.R)" prop="pecsedR" v-if="true">
                        <el-input v-model="result_R.pecsedR" auto-complete="off" readonly="readonly"><template slot="append">mg·kg<sup>-1</sup></template></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="16">
                      <el-form-item label="地下水区域PEC(PECground.R)" prop="pecgroundR" v-if="true">
                        <el-input v-model="result_R.pecgroundR" auto-complete="off" readonly="readonly"><template slot="append">mg·L<sup>-1</sup></template></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>

              </el-tabs>
            </el-form>
          </div>
        </div>
      </div>

    </div>

    <el-dialog :title="operation ? '添加' : '编辑'" width="50%" :visible.sync="editDialogVisible"
               :close-on-click-modal="false">
      <el-form :model="form" label-width="280px" :rules="formRules" ref="form" :size="size">
        <el-tabs tab-position="left">

          <el-form-item label="" prop="id" v-if="false">
            <el-input v-model="form.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="生命周期阶段" prop="lifeCycle" v-if="true">
            <el-select style="width: 100%;" v-model="form.lifeCycle" placeholder="请选择" @change="changeEmission">
              <el-option
                  v-for="item in options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="暴露场景短标题" prop="title" v-if="this.operation" >
            <el-input v-model="form.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark" v-if="true">
            <el-input v-model="form.remark" auto-complete="off"></el-input>
          </el-form-item>

        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="editDialogVisible = false">{{
            $t("action.cancel")
          }}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">
          {{ $t("action.submit") }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Scenes",
  data(){
    return{
      keys:'',
      userName: '',
      scene_show: true,
      results_show: false,
      button_show: true,
      region_show: false,
      regionalEvaluate_show: false,
      scrollHeight: '100%',
      operation: false, // true:新增, false:编辑
      editDialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      pecstpTip: '',
      // eairRegionalTip: '修改',
      elocalWaterTip: '修改',
      elocalstpWaterTip: '修改',
      elocalDirectwaterTip: '修改',
      elocalAirTip: '修改',
      elocalstpAirTip: '修改',
      elocalSoilTip: '修改',
      temissionTip: '修改',
      mainTip: '修改',
      fmainTip: '修改',
      effluentTip: '修改',
      flowTip: '修改',
      fregTip: '修改',
      flocalTip: '修改',
      fvariabilityTip: '修改',
      fdirectwaterTip: '修改',
      isLife: false,
      isEmission: false,
      fstpWater: 0,
      fstpWater2: 0,
      fstpAir: 0,
      fstpAir2: 0,
      fstpSludge: 0,
      fstpSludge2: 0,
      fstpDegrade: 0,
      fstpDegrade2: 0,
      elocalWater_disabled: true,
      elocalstpWater_disabeld: true,
      elocalDirectwater_disabled: true,
      elocalAir_disabled: true,
      elocalstpAir_disabled: true,
      elocalSoil_disabled: true,
      elocalstpSoil_disabled: true,

      elocalDirectwaterR_disabled: true,
      elocalstpWaterR_disabeld: true,
      elocalAirR_disabled: true,
      elocalstpAirR_disabled: true,
      elocalSoilR_disabled: true,
      elocalstpSoilR_disabled: true,

      isCompute: true,
      isStponsite: true,
      isWaterto: false,
      isRouterAlive: true,
      effluent_disabled: true,
      flow_disabled: true,
      flocal_disabled: true,
      qchemical_disabled: true,
      title_disabled: true,
      temission_disabled: true,
      freg_disabled: true,
      fvariability_disabled: true,
      main_disabled: true,
      fmain_disabled: true,
      fdirectwater_disabled: true,
      abatementWater_disabled: true,
      useSource: '',
      input_show: false,
      industrial_disabled: false,
      consume_disabled: false,
      waste_disabled: false,
      compute_disabled: false,
      stponsite_disabled: false,
      stp_disabled: true,
      // 新增编辑界面数据
      tableData: null,
      scenes: [],
      square: [],
      inv_square:[],
      m_square:[],
      f_square:[],
      maxIndex: '',
      formRules: {
        lifeCycle: [{
          required: true,
          message: '请选择生命周期阶段',
          trigger: 'blur'
        }],
        qchemical: [{
          required: true,
          message: '年生产、使用或废物利用处理量不能为空',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: '暴露场景短标题不能为空',
          trigger: 'blur'
        }],
      },
      form:{
        id: '',
        cas: 'string',
        wzmc: '',
        lifeCycle: '',//生命周期阶段
        title: '',
        qchemical: '',
        remark: '',
        temission: 365,
        freg: 0.1,
        main: 1,
        fmain: 0.1,
        emissionPattern: '2',
        fvariability: 4,
        fdirectwater: 0.5,
        stpEffluent: 2000,
        flow: 18000,
        flocal: 0.0005,
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

        //废物处置利用源使用
        waste: 0,

        elocalWater: 0, //直排时为0
        elocalDirectwater: 0, //进入公共STP时为0
        elocalAir: 0,
        elocalstpAir: 0, //经过公共STP处理后大气排放，直排时为0
        elocalSoil: 0,
        elocalstpSoil: 0,
        elocalstpWater: 0, //经过公共STP处理后水排放，直排时为



        elocalDirectwaterR: null,
        elocalstpWaterR: null,
        elocalAirR: null,
        elocalstpAirR: null,
        elocalSoilR: null,
        elocalstpSoilR: null,


        pecstp: null,
        peclocalWater: null,
        peclocalSed: null,
        peclocalSoil30: null,
        peclocalGrw: null,
        pecaquPredator: null,
        pecterPredator: null,
        addinh: null,
        addoralWater: null,
        addoralFood: null,
        addt: null,

        pecstpRcr:'',
        peclocalWaterRcr:'',
        peclocalSedRcr:'',
        peclocalSoil30Rcr:'',
        peclocalGrwRcr:'',
        pecaquPredatorRcr:'',
        pecterPredatorRcr:'',
        addinhRcr:'',
        addoralWaterRcr:'',
        addoralFoodRcr:'',
        addtRcr:'',


      },

      size: "small",
      options: [{
        value: '选项1',
        label: '生产'
      }, {
        value: '选项2',
        label: '配制'
      }, {
        value: '选项3',
        label: '工业使用'
      }, {
        value: '选项4',
        label: '消费使用'
      }, {
        value: '选项5',
        label: '废物利用处置'
      }],

      options2: [{
        value: '选项1',
        label: '标准STP'
      }, {
        value: '选项2',
        label: '自行输入'
      }, {
        value: '选项3',
        label: '无'
      },],

      message: '',
      active: 0,
      blowdown:{
        elocalDirectwaterR: 0,
        elocalstpWaterR: 0,
        elocalAirR: 0,
        elocalstpAirR: 0,
        elocalSoilR: 0,
        elocalstpSoilR: 0,
      },
      density:{},
      /*parameter:{},*/
      output:{},
      cas:null,
      PECstp: null,   //PECstp...ADDT存储output结果
      PEClocal_water:null,
      PEClocal_sed:null,
      PEClocalsoil_30:null,
      PEClocal_grw: null,
      PECaqu_predator: null,
      PECter_predator: null,
      ADDinh: null,
      ADDoral_water: null,
      ADDoral_food: null,
      ADDT: null,
      /* result:{},*/

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

      input_R:{

        mw: null,
        vp: null,
        sol: null,
        h: null,
        kow: null,
        koc: null,
        kdegAir: null,
        kdegWater: null,
        kdegSoil: null,
        kdegSed: null,
        kdegAer: 1.0E-20,
        kdegSusp: 1.0E-20,
        koa: null,
        r: null,
        fareaAir: 1,
        fareaWater: 0.03,
        fareaSoil: 0.97,
        fareaSed: 0.03,
        hair: 1000,
        hwater: 10,
        hsoil: 0.2,
        hsed: null,
        vair: null,
        vwater: null,
        vsoil: null,
        vsed: null,
        areg: null,
        aair: null,
        awater: null,
        asoil: null,
        ased: null,
        eairR: null,
        cinAir: 0,
        ewaterR: 0,
        cinWater: 0,
        esoilR: 0,
        esedR: 0,
        eaerR: 0,
        esuspR: 0,
        estpSoilR: 0,
        eair: null,
        ewater: null,
        esoil: null,
        esed: null,
        eaer: null,
        esusp: null,

      },
      parameter_R:{
        id:null,
        cas:null,
        vwind: null,
        fsolidSoil: null,
        fwaterSoil: null,
        fairSoil: null,
        rsolid: null,
        rair: null,
        raer: 2000,
        rwater: null,
        rsusp: 1500,
        rsoil: 2500,
        rsed: 2500,
        fomAer: 0.2,
        focSusp: null,
        focSoil: null,
        tsp: 100,
        suspWater: null,
        daer: 0.0000001,
        aaer: null,
        vaer: null,
        dsusp: 0.0000001,
        asusp: null,
        vsusp: null,
        kpsoil: null,
        kpsusp: null,
        kpsed: null,
        kpaerAir: null,
        koa: null,
        kaerAir: null,
        ksoil_water: null,                      /* Ksoil-water*/
        kairWater: null,
        kairWaterAir: 3.77,
        kairWaterWater: 0.03,
        vrain: null,
        qscaAer: 200000,
        faerAir: null,
        vdepAer: 10.8,
        kairSoilAir: 3.77,
        vrunoff: null,
        verosion: null,
        kwaterSedWater: 0.0001,
        vnetsed: null,
        vresusp: null,
        kairAerAir: null,
        diffAirAerAir: 0.018,
        ldiffAirAerAir: 0.00475,
        corrAer: null,
        kwaterSuspWater: null,
        diffWaterSuspWater: 0.000004,
        ldiffWaterSuspWater: 0.00475,     /*默认0.00475*/
        corrSusp: 5,
        tresid: null,
        qwater: null,
        frunoff: 0.25,
        fleach: 0.25,
        qair: null,
        qaer: null,
        qsusp: null,
        qleach: null,
        ksoilWater: 0.00001,
        ksoilAir: 0.02,
      },
      zd_R:{
        zair: null,
        zwater: null,
        zsoil: null,
        zsed: null,
        zaer: null,
        zsusp: null,
        ddAirWater: null,
        dwetdepGasWater: null,
        dairWater: null,
        dwaterAir: null,
        ddAirSoil: null,
        dwetdepGasSoil: null,
        dairSoil: null,
        dsoilAir: null,
        dwetdepAerSusp: null,
        ddrydepAerSusp: null,
        daerSusp: null,
        dwetdepAerSoil: null,
        ddrydepAerSoil: null,
        daerSoil: null,
        dairAer: null,
        daerAir: null,
        drunoff: null,
        dsoilWater: null,
        derosion: null,
        dsoilSusp: null,
        ddWaterSusp: null,
        dwaterSusp: null,
        dsuspWater: null,
        ddWaterSed: null,
        dwaterSed: null,
        dsedWater: null,
        dresusp: null,
        dnetsed: null,
        dsedSusp: null,
        dsuspSed: null,
        ddegAir: null,
        ddegWater: null,
        ddegSoil: null,
        ddegSed: null,
        ddegAer: null,
        ddegSusp: null,
        dadvAir: null,
        dadvWaer: null,
        dadvAer: null,
        dadvSusp: null,

        dleach: null,
        dt1: null,
        dt2: null,
        dt3: null,
        dt4: null,
        dt5: null,
        dt6: null,
      },
      compute_R:{
        fair: null,
        fwater: null,
        fsoil: null,
        fsed: null,
        faer: null,
        fsusp: null,
        cairR: null,
        caerR: null,
        cwaterR: null,
        csuspR: null,
        csoilR: null,
        csedR: null,
        nair: null,
        naer: null,
        nwater: null,
        nsusp: null,
        nsoil: null,
        nsed: null,
        ntotal: null,
        air: null,
        aerosol: null,
        water: null,
        suspend: null,
        soil: null,
        sediment: null,
      },
      result_R:{
        id:'' ,
        cas:'',
        pecairR: null,
        pecwaterR: null,
        pecsoilR: null,
        pecsedR: null,
        pecgroundR: null,
        eairRegional: 0,
        ewaterRegional: 0,
        esoilRegional: 0,
        esedRegional: 0,
        eaerRegional: null,
        esuspRegional: null,
        estpSoilRegional: null,
      },
      add_NAN:{

      },
      editFlag: {
        eairRegional: true,
        esoilRegional: true,
        ewaterRegional: true,
      },

    }
  },
  mounted(){
    this.userName = sessionStorage.getItem("user");
    this.scrollHeight = window.innerHeight* 0.8 + 'px';
  },
  created(){
    this.keys = true
    this.form.cas = this.$store.getters.getCas;
    this.form.wzmc = this.$store.getters.getWzmc;
    if(this.$store.getters.getResultflag){
      this.scene_show = false;
      this.results_show = true;
      this.region_show = false;
      this.regionalEvaluate_show = true;
      this.button_show = false;

      // this.scene_show = false;
      // this.results_show = false;
      // this.region_show = true;
      // this.regionalEvaluate_show = true;
      // this.button_show = false;
    }
    else{
      this.scene_show = true;
      this.results_show = false;
      this.region_show = false;
      this.regionalEvaluate_show = false;
      this.button_show = true;
    }
    //console.log("created_cas:",this.form.cas);
    let cas = {cas:this.form.cas,};
    this.$api.output.findByCas(cas).then((res) => {
      if(res.data.length > 0){
        this.isLife = false;
        console.log("created_scenes:",res.data);
        this.scenes = res.data;
        this.maxIndex = this.scenes.length-1 + '';
        this.showScenes(this.scenes[this.scenes.length-1],this.scenes.length-1);
      }
      else{
        this.isLife = true;
      }
    });
    // this.$api.input.findByCas(cas).then((res) => {
    //   if(res.data!= null){
    //     this.input = res.data;
    //   }
    //   console.log("input123:",this.input);
    //
    // })
    this.$api.inputR.findByCas({cas:this.$store.getters.getCas}).then((res) => {
      this.input_R = res.data;
      console.log("created_inputR 对象:",this.input_R);
    });

    this.$api.density.findByCas(cas).then((res) => {
      if(res.data!=null){

        //获取标准STP归趋结果
        this.fstpWater = res.data.fstpWater;
        this.fstpWater2 = res.data.fstpWater2;
        this.fstpAir = res.data.fstpAir;
        this.fstpAir2 = res.data.fstpAir2;
        this.fstpSludge = res.data.fstpSludge;
        this.fstpSludge2 = res.data.fstpSludge2;
        this.fstpDegrade = res.data.fstpDegrade;
        this.fstpDegrade2 = res.data.fstpDegrade2;


        // if(this.form.stponsite === '标准STP'){
        //   if(this.form.emissionPattern === '1'){
        //     this.form.stponsiteWater = res.data.fstpWater;
        //     this.form.stponsiteAir = res.data.fstpAir;
        //     this.form.stponsiteSludge = res.data.fstpSludge;
        //     this.form.stponsiteDegrade = res.data.fstpDegrade;
        //   }
        //   if(this.form.emissionPattern === '2'){
        //     this.form.stponsiteWater = res.data.fstpWater2;
        //     this.form.stponsiteAir = res.data.fstpAir2;
        //     this.form.stponsiteSludge = res.data.fstpSludge2;
        //     this.form.stponsiteDegrade = res.data.fstpDegrade2;
        //   }
        // }
        // if(this.form.publicStp === '1') {
        //   if(this.form.emissionPattern === '1'){
        //     this.form.stpWater = res.data.fstpWater;
        //     this.form.stpAir = res.data.fstpAir;
        //     this.form.stpSludge = res.data.fstpSludge;
        //     this.form.stpDegrade = res.data.fstpDegrade;
        //   }
        //   if(this.form.emissionPattern === '2'){
        //     this.form.stpWater = res.data.fstpWater2;
        //     this.form.stpAir = res.data.fstpAir2;
        //     this.form.stpSludge = res.data.fstpSludge2;
        //     this.form.stpDegrade = res.data.fstpDegrade2;
        //   }
        // }

        //从数据中获取Density值
        this.density = res.data;
        console.log(res.data)

        console.log('*************************')
        this.pecstpPnec=this.density.pecstpPnec;
        this.peclocalWaterPnec=this.density.peclocalWaterPnec;
        this.peclocalSedPnec=this.density.peclocalSedPnec;
        this.peclocalSoil30Pnec=this.density.peclocalSoil30Pnec;
        this.peclocalGrwPnec=this.density.peclocalGrwPnec;
        this.pecaquPredatorPnec=this.density.pecaquPredatorPnec;
        this.pecterPredatorPnec=this.density.pecterPredatorPnec;
        this.addoralWaterDnel=this.density.addoralWaterDnel;
        this.addinhDnel=this.density.addinhDnel;
        this.addoralFoodDnel=this.density.addoralFoodDnel;
        this.addtDnel=this.density.addtDnel;
        this.input_R.mw = this.density.molw;
        this.input_R.vp = this.density.vp;
        this.input_R.sol = this.density.sol;
        this.input_R.h = this.density.henry;
        this.input_R.kow = this.density.kow;
        this.input_R.koc = this.density.koc;

        // console.log("*****测试 inputR 赋值   "+this.input_R.tenv)
        console.log("*****测试 inputR 赋值   "+this.input_R.mw)
        console.log("*****测试 inputR 赋值   "+this.input_R.vp)
        console.log("*****测试 inputR 赋值   "+this.input_R.sol)
        console.log("*****测试 inputR 赋值   "+this.input_R.h)
        console.log("*****测试 inputR 赋值   "+this.input_R.kow)
        console.log("*****测试 inputR 赋值   "+this.input_R.koc)





      }
      console.log("created_Density对象:",this.density);
    });

    //获取Parameter值
    this.$api.parameter.findByCas({cas:this.$store.getters.getCas}).then((res) => {
      this.parameter = res.data;
      this.input_R.tenv = res.data.temp+273;
      console.log("created_parameter对象:",this.parameter);
    });

    this.$api.resultR.findByCas({cas:this.$store.getters.getCas}).then((res) => {
      if(res.data!=null){
        this.result_R = res.data;
        console.log("created_parameterRRRRRRR对象: ==== null",this.result_R);
        // console.log("created_parameterRRRRRRR对象:",this.res.data);
        // console.log("created_parameterRRRRRRR对象:",this.$store.getters.getCas);
      }else {
        console.log("created_parameterRRRRRRR对象: ==== null");
      }

    });

    this.$store.commit('setFlag', !this.$store.getters.getFlag);
  },
  computed: {
    stp() {
      return this.$store.getters.getStp;
    },
    densityWatch() {
      return this.$store.getters.getDensityflag;
    },
    parameterWatch() {
      return this.$store.getters.getParameterflag;
    },
    casWatch(){
      return this.$store.getters.getCas;
    },
    idWatch(){
      return this.$store.getters.getId;
    },
    wzmcWatch(){
      return this.$store.getters.getWzmc;
    },
    resultWatch(){
      return this.$store.getters.getResultflag;
    },
  },
  watch:{
    resultWatch: function(newVal, oldVal){
      if(newVal){
        this.scene_show = false;
        this.results_show = true;
        this.region_show = false;
        this.regionalEvaluate_show = true;
        this.button_show = false;
        // this.scene_show = false;
        // this.results_show = false;
        // this.region_show = true;
        // this.regionalEvaluate_show = true;
        // this.button_show = false;
      }
      else{
        this.scene_show = true;
        this.results_show = false;
        this.region_show = false;
        this.regionalEvaluate_show = false;
        this.button_show = true;
      }
    },
    idWatch: function(newVal, oldValue) {
      if(newVal !== ''){
        this.maxIndex = newVal + '';
        this.showScenes(this.scenes[newVal],newVal);
      }
    },
    'form.water': function(newVal, oldValue) {
      if (parseFloat(newVal) < 0 || parseFloat(newVal) > 1) {
        this.form.airPfxs = ''
        this.$message({
          message: '数值只能在0-1之间',
          type: 'warning'
        })
      }
    },
    'form.air': function(newVal, oldValue) {
      if (parseFloat(newVal) < 0 || parseFloat(newVal) > 1) {
        this.form.airPfxs = ''
        this.$message({
          message: '数值只能在0-1之间',
          type: 'warning'
        })
      }
    },
    'form.sludge': function(newVal, oldValue) {
      if (parseFloat(newVal) < 0 || parseFloat(newVal) > 1) {
        this.form.airPfxs = ''
        this.$message({
          message: '数值只能在0-1之间',
          type: 'warning'
        })
      }
    },
    'form.abatementWater': function(newVal, oldValue) {
      if (parseFloat(newVal) < 0 || parseFloat(newVal) > 1) {
        this.form.airPfxs = ''
        this.$message({
          message: '数值只能在0-1之间',
          type: 'warning'
        })
      }
    },
    'form.abatementAir': function(newVal, oldValue) {
      if (parseFloat(newVal) < 0 || parseFloat(newVal) > 1) {
        this.form.airPfxs = ''
        this.$message({
          message: '数值只能在0-1之间',
          type: 'warning'
        })
      }
    },
    'form.abatementSludge': function(newVal, oldValue) {
      if (parseFloat(newVal) < 0 || parseFloat(newVal) > 1) {
        this.form.airPfxs = ''
        this.$message({
          message: '数值只能在0-1之间',
          type: 'warning'
        })
      }
    },
    wzmcWatch: function(newVal, oldVal){
      this.form.wzmc = newVal;
    },
    casWatch: function (newVal, oldVal) {
      /* this.$store.commit('setId',0);*/
      //console.log("cas_newVal:",newVal);
      this.form.cas = newVal;
      let cas = {cas:this.form.cas,};
      this.$api.output.findByCas(cas).then((res) => {
        if(res.data.length > 0){
          this.isLife = false;
          this.input_show = true;
          this.isEmission = true;
          this.scenes = res.data;
          this.maxIndex = this.scenes.length-1 + '';
          this.showScenes(this.scenes[this.scenes.length-1],this.scenes.length-1);
        }
        else if(res.data.length === 0){
          this.form.lifeCycle = '',
              this.isEmission = false;
          this.input_show = false;
          this.isLife = true;
          this.scenes = res.data;
        }
        else{
          this.form.lifeCycle = '',
              this.input_show = false;
          this.isEmission = false;
          this.isLife = true;
        }
      });
      this.$api.density.findByCas(cas).then((res) => {
        if(res.data !=null){

          //获取标准STP归趋结果
          this.fstpWater = res.data.fstpWater;
          this.fstpWater2 = res.data.fstpWater;
          this.fstpAir = res.data.fstpAir;
          this.fstpAir2 = res.data.fstpAir2;
          this.fstpSludge = res.data.fstpSludge;
          this.fstpSludge2 = res.data.fstpSludge2;
          this.fstpDegrade = res.data.fstpDegrade;
          this.fstpDegrade2 = res.data.fstpDegrade2;

          if(this.form.stponsite === '标准STP'){
            if(this.form.emissionPattern === '1'){
              this.form.stponsiteWater = res.data.fstpWater;
              this.form.stponsiteAir = res.data.fstpAir;
              this.form.stponsiteSludge = res.data.fstpSludge;
              this.form.stponsiteDegrade = res.data.fstpDegrade;
            }
            if(this.form.emissionPattern === '2'){
              this.form.stponsiteWater = res.data.fstpWater2;
              this.form.stponsiteAir = res.data.fstpAir2;
              this.form.stponsiteSludge = res.data.fstpSludge2;
              this.form.stponsiteDegrade = res.data.fstpDegrade2;
            }
          }
          if(this.form.publicStp === '1') {
            if(this.form.emissionPattern === '1'){
              this.form.stpWater = res.data.fstpWater;
              this.form.stpAir = res.data.fstpAir;
              this.form.stpSludge = res.data.fstpSludge;
              this.form.stpDegrade = res.data.fstpDegrade;
            }
            if(this.form.emissionPattern === '2'){
              this.form.stpWater = res.data.fstpWater2;
              this.form.stpAir = res.data.fstpAir2;
              this.form.stpSludge = res.data.fstpSludge2;
              this.form.stpDegrade = res.data.fstpDegrade2;
            }
          }

          this.density = res.data;
          this.pecstpPnec=this.density.pecstpPnec;
          this.peclocalWaterPnec=this.density.peclocalWaterPnec;
          this.peclocalSedPnec=this.density.peclocalSedPnec;
          this.peclocalSoil30Pnec=this.density.peclocalSoil30Pnec;
          this.peclocalGrwPnec=this.density.peclocalGrwPnec;
          this.pecaquPredatorPnec=this.density.pecaquPredatorPnec;
          this.pecterPredatorPnec=this.density.pecterPredatorPnec;
          this.addoralWaterDnel=this.density.addoralWaterDnel;
          this.addinhDnel=this.density.addinhDnel;
          this.addoralFoodDnel=this.density.addoralFoodDnel;
          this.addtDnel=this.density.addtDnel;
        }
        console.log("caswatch_density:",this.density);
      })
      this.$api.parameter.findByCas({cas:this.$store.getters.getCas}).then((res) => {
        this.parameter = res.data;
        console.log("caswatch_parameter:",this.parameter);
      });
    },
    stp: function (newVal, oldVal) {
      this.form.cas = this.$store.getters.getCas;
      // console.log("stp_cas:",this.form.cas);
      let cas = {cas:this.form.cas,};

      this.$api.density.findByCas(cas).then((res) => {
        if(res.data!=null){

          this.density = res.data;

          //获取标准STP归趋结果
          this.fstpWater = res.data.fstpWater;
          this.fstpWater2 = res.data.fstpWater2;
          this.fstpAir = res.data.fstpAir;
          this.fstpAir2 = res.data.fstpAir2;
          this.fstpSludge = res.data.fstpSludge;
          this.fstpSludge2 = res.data.fstpSludge2;
          this.fstpDegrade = res.data.fstpDegrade;
          this.fstpDegrade2 = res.data.fstpDegrade2;

          if(this.form.stponsite === '标准STP'){
            if(this.form.emissionPattern === '1'){
              this.form.stponsiteWater = res.data.fstpWater;
              this.form.stponsiteAir = res.data.fstpAir;
              this.form.stponsiteSludge = res.data.fstpSludge;
              this.form.stponsiteDegrade = res.data.fstpDegrade;
            }
            if(this.form.emissionPattern === '2'){
              this.form.stponsiteWater = res.data.fstpWater2;
              this.form.stponsiteAir = res.data.fstpAir2;
              this.form.stponsiteSludge = res.data.fstpSludge2;
              this.form.stponsiteDegrade = res.data.fstpDegrade2;
            }
          }
          if(this.form.publicStp === '1') {
            if(this.form.emissionPattern === '1'){
              this.form.stpWater = res.data.fstpWater;
              this.form.stpAir = res.data.fstpAir;
              this.form.stpSludge = res.data.fstpSludge;
              this.form.stpDegrade = res.data.fstpDegrade;
            }
            if(this.form.emissionPattern === '2'){
              this.form.stpWater = res.data.fstpWater2;
              this.form.stpAir = res.data.fstpAir2;
              this.form.stpSludge = res.data.fstpSludge2;
              this.form.stpDegrade = res.data.fstpDegrade2;
            }
          }


          this.pecstpPnec=this.density.pecstpPnec;
          this.peclocalWaterPnec=this.density.peclocalWaterPnec;
          this.peclocalSedPnec=this.density.peclocalSedPnec;
          this.peclocalSoil30Pnec=this.density.peclocalSoil30Pnec;
          this.peclocalGrwPnec=this.density.peclocalGrwPnec;
          this.pecaquPredatorPnec=this.density.pecaquPredatorPnec;
          this.pecterPredatorPnec=this.density.pecterPredatorPnec;
          this.addoralWaterDnel=this.density.addoralWaterDnel;
          this.addinhDnel=this.density.addinhDnel;
          this.addoralFoodDnel=this.density.addoralFoodDnel;
          this.addtDnel=this.density.addtDnel;
        }
        //console.log("Parameter:",this.parameter);
      })

    },
    densityWatch: function (newVal, oldVal) {
      this.form.cas = this.$store.getters.getCas;
      //console.log("stp_cas:",this.form.cas);
      let cas = {cas:this.form.cas,};
      //console.log("densityWatch成功！！！");
      this.$api.density.findByCas(cas).then((res) => {
        if(res.data!=null){
          this.density = res.data;
          //获取标准STP归趋结果
          this.fstpWater = res.data.fstpWater;
          this.fstpWater2 = res.data.fstpWater2;
          this.fstpAir = res.data.fstpAir;
          this.fstpAir2 = res.data.fstpAir2;
          this.fstpSludge = res.data.fstpSludge;
          this.fstpSludge2 = res.data.fstpSludge2;
          this.fstpDegrade = res.data.fstpDegrade;
          this.fstpDegrade2 = res.data.fstpDegrade2;
          if(this.form.stponsite === '标准STP'){
            if(this.form.emissionPattern === '1'){
              this.form.stponsiteWater = res.data.fstpWater;
              this.form.stponsiteAir = res.data.fstpAir;
              this.form.stponsiteSludge = res.data.fstpSludge;
              this.form.stponsiteDegrade = res.data.fstpDegrade;
            }
            if(this.form.emissionPattern === '2'){
              this.form.stponsiteWater = res.data.fstpWater2;
              this.form.stponsiteAir = res.data.fstpAir2;
              this.form.stponsiteSludge = res.data.fstpSludge2;
              this.form.stponsiteDegrade = res.data.fstpDegrade2;
            }
          }
          if(this.form.publicStp === '1') {
            if(this.form.emissionPattern === '1'){
              this.form.stpWater = res.data.fstpWater;
              this.form.stpAir = res.data.fstpAir;
              this.form.stpSludge = res.data.fstpSludge;
              this.form.stpDegrade = res.data.fstpDegrade;
            }
            if(this.form.emissionPattern === '2'){
              this.form.stpWater = res.data.fstpWater2;
              this.form.stpAir = res.data.fstpAir2;
              this.form.stpSludge = res.data.fstpSludge2;
              this.form.stpDegrade = res.data.fstpDegrade2;
            }
          }

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
    },
    parameterWatch: function (newVal, oldVal) {
      this.form.cas = this.$store.getters.getCas;
      //console.log("stp_cas:",this.form.cas);
      let cas = {cas:this.form.cas,};
      //console.log("parameterWatch成功！！！");
      this.$api.parameter.findByCas({cas:this.$store.getters.getCas}).then((res) => {
        this.parameter = res.data;
        //console.log("density:",this.density);
      });
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    getScenes(data){
      let cas = {cas:data,};
      this.$api.output.findByCas(cas).then((res) => {
        if(res.data.length > 0){
          this.isLife = false;
          this.scenes = res.data;
          this.maxIndex = this.scenes.length-1 + '';
          this.showScenes(this.scenes[this.scenes.length-1],this.scenes.length-1);
        }
        else{
          this.isLife = true;
        }
      });
    },
    /* changeEairRegionaltip() {
         this.editFlag.eairRegional = !this.editFlag.eairRegional;
         if (this.editFlag.eairRegional) {
           this.eairRegionalTip = '修改';
         } else {
           this.eairRegionalTip = '使用计算值'
         }
       },*/
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


    changeElocaldirectwaterR(){
      this.elocalDirectwaterR_disabled = !this.elocalDirectwaterR_disabled;
    },
    changeElocalstpwaterR(){
      this.elocalstpWaterR_disabeld = !this.elocalstpWaterR_disabeld;
    },
    changeElocalairR(){
      this.elocalAirR_disabled = !this.elocalAirR_disabled;
    },
    changeElocalstpairR(){
      this.elocalstpAirR_disabled = !this.elocalstpAirR_disabled;
    },
    changeElocalsoilR(){
      this.elocalSoilR_disabled = !this.elocalSoilR_disabled;
    },
    changeElocalstpsoilR(){
      this.elocalstpSoilR_disabled = !this.elocalstpSoilR_disabled;
    },

    showScenes(item,sceneid){
      console.log("showscenes的item：",item);
      this.isEmission = false;
      this.input_show = false;
      this.industrial_disabled = false;
      this.consume_disabled = false;
      this.waste_disabled = false;
      this.compute_disabled = false;
      if (item.waterTo === '1') {
        this.isWaterto = false;
      }
      else if (item.waterTo === '2'){
        this.isWaterto = true;
      }
      if(item.lifeCycle === '生产' || item.lifeCycle === '配制' || item.lifeCycle === '工业使用' || item.lifeCycle === '废物利用处置'){
        if(item.waterTo === '1'){
          this.pecstpTip = '企业自有STP PEC';
        }
        if(item.waterTo === '2'){
          this.pecstpTip = '集中式STP PEC';
        }
      }
      if(item.lifeCycle === '消费使用'){
        this.pecstpTip = '集中式STP PEC';
      }

      if(item.lifeCycle === '消费使用'){
        this.isEmission = true;
        this.input_show = true;
        this.industrial_disabled = false;
        this.consume_disabled = true;
        this.waste_disabled = false;
        this.useSource = '消费源';
      }
      else if(item.lifeCycle === '废物利用处置'){
        this.isEmission = true;
        this.input_show = true;
        this.industrial_disabled = false;
        this.consume_disabled = false;
        this.waste_disabled = true;
        this.useSource = '废物处置利用源';
      }
      else if(item.lifeCycle === '生产' || item.lifeCycle === '配制' || item.lifeCycle === '工业使用'){
        this.isEmission = true;
        this.input_show = true;
        this.industrial_disabled = true;
        this.consume_disabled = false;
        this.waste_disabled = false;
        this.useSource = '工业源';
      }
      if(item.stponsite === '自行输入' || item.stponsite === '标准STP'){
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
      this.form.id = item.id;
      this.form.title = item.title;
      this.form.remark = item.remark;
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
      console.log("2022 3, 13   废水  赋值) ",this.form.stpEffluent);
      this.form.flow = item.flow;
      this.form.freg = item.freg;
      this.form.flocal = item.flocal;
      this.form.fvariability = item.fvariability;
      this.form.fdirectwater = item.fdirectwater;

      debugger
      this.form.elocalDirectwaterR = this.NumberJudge(item.elocalDirectwaterR);
      this.form.elocalstpWaterR = this.NumberJudge(item.elocalstpWaterR);
      this.form.elocalAirR = this.NumberJudge(item.elocalAirR);
      this.form.elocalstpAirR = this.NumberJudge(item.elocalstpAirR);
      this.form.elocalSoilR = this.NumberJudge(item.elocalSoilR);
      this.form.elocalstpSoilR = this.NumberJudge(item.elocalstpSoilR);

      this.form.pecstp = this.NumberJudge(item.pecstp);
      this.form.peclocalWater = this.NumberJudge(item.peclocalWater);
      this.form.peclocalSed = this.NumberJudge(item.peclocalSed);
      this.form.peclocalSoil30 = this.NumberJudge(item.peclocalSoil30);
      this.form.peclocalGrw = this.NumberJudge(item.peclocalGrw);
      this.form.pecaquPredator = this.NumberJudge(item.pecaquPredator);
      this.form.pecterPredator = this.NumberJudge(item.pecterPredator);
      this.form.addinh = this.NumberJudge(item.addinh);
      this.form.addoralWater = this.NumberJudge(item.addoralWater);
      this.form.addoralFood = this.NumberJudge(item.addoralFood);
      this.form.addt = this.NumberJudge(item.addt);
      // this.form.pecstp = this.NumberJudge(item.pecstp);
      // this.form.peclocalWater = this.NumberJudge(item.peclocalWater);
      // this.form.peclocalSed = this.NumberJudge(item.peclocalSed);
      // this.form.peclocalSoil30 = this.NumberJudge(item.peclocalSoil30);
      // this.form.peclocalGrw = this.NumberJudge(item.peclocalGrw);
      // this.form.pecaquPredator = this.NumberJudge(item.pecaquPredator);
      // this.form.pecterPredator = this.NumberJudge(item.pecterPredator);
      // this.form.addinh = thi
      // s.NumberJudge(item.addinh);
      // this.form.addoralWater = this.NumberJudge(item.addoralWater);
      // this.form.addoralFood = this.NumberJudge(item.addoralFood);
      // this.form.addt = this.NumberJudge(item.addt);

      this.form.pecstpRcr = this.NumberJudge(item.pecstpRcr);
      this.form.peclocalWaterRcr = this.NumberJudge(item.peclocalWaterRcr);
      this.form.peclocalSedRcr = this.NumberJudge(item.peclocalSedRcr);
      this.form.peclocalSoil30Rcr = this.NumberJudge(item.peclocalSoil30Rcr);
      this.form.peclocalGrwRcr = this.NumberJudge(item.peclocalGrwRcr);
      this.form.pecaquPredatorRcr = this.NumberJudge(item.pecaquPredatorRcr);
      this.form.pecterPredatorRcr = this.NumberJudge(item.pecterPredatorRcr);
      this.form.addinhRcr = this.NumberJudge(item.addinhRcr);
      this.form.addoralWaterRcr = this.NumberJudge(item.addoralWaterRcr);
      this.form.addoralFoodRcr = this.NumberJudge(item.addoralFoodRcr);
      this.form.addtRcr = this.NumberJudge(item.addtRcr);

      this.temission_disabled = true;
      this.main_disabled = true;
      this.effluent_disabled = true;
      this.flow_disabled = true;
      this.fvariability_disabled = true;
      this.flocal_disabled = true;
      this.freg_disabled = true;
      this.fmain_disabled = true;
      this.fdirectwater_disabled = true;
      if(this.form.main !== 1){
        this.main_disabled = false;
      }
      if(this.form.fmain !== 0.1){
        this.fmain_disabled = false;
      }
      if(this.form.stpEffluent !== 2000){
        console.log("2022 3, 13   废水  判断",this.form.stpEffluent);
        this.effluent_disabled = false;
      }
      if(this.form.flow !== 18000){
        this.flow_disabled = false;
      }
      if(this.form.fvariability !== 4){
        this.fvariability_disabled = false;
      }
      if(this.form.flocal !== 0.0005){
        this.flocal_disabled = false;
      }
      if(this.form.freg !== 0.1){
        this.freg_disabled = false;
      }
      if(this.form.fdirectwater !== 0.5){
        this.fdirectwater_disabled = false;
      }
      this.form.elocalDirectwater = this.NumberJudge(item.elocalDirectwater);
      this.form.elocalWater = this.NumberJudge(item.elocalWater);
      this.form.elocalstpAir = this.NumberJudge(item.elocalstpAir);
      this.form.elocalAir = this.NumberJudge(item.elocalAir);
      this.form.elocalstpWater = this.NumberJudge(item.elocalstpWater);
      this.form.elocalSoil = this.NumberJudge(item.elocalSoil);
      this.form.elocalstpSoil = this.NumberJudge(item.elocalstpSoil);

      if(this.$store.getters.getResultflag){
        this.results_show = true;
        this.region_show = false;
      }else{
        this.results_show = false;
        this.region_show = false;
      }



    },
    // 显示新增界面
    handleAdd: function () {
      this.editDialogVisible = true;
      this.operation = true;
      this.form.id = '';
      this.form.lifeCycle = '';
      this.form.title = '';
      this.form.remark = '';
    },
    dataall(){
      this.compute2()
      if(this.input_R.id&& this.input_R.cas != null)
      {
        this.result_R.cas = this.input_R.cas
      }

      let input_R = Object.assign({}, this.input_R);
      let res_R = Object.assign({}, this.result_R);
      let scenes = Object.assign({}, this.form);
      this.Add_Blowdown2();
    },
    saveall(){
      console.log('2333333333333')
      if(this.form.lifeCycle !== '') {
        if (this.form.qchemical !== '') {
          if(this.input_R.id&& this.input_R.cas != null)
          {
            this.result_R.cas = this.input_R.cas
          }

          let input_R = Object.assign({}, this.input_R);
          let res_R = Object.assign({}, this.result_R);
          let scenes = Object.assign({}, this.form);
          this.$confirm("确认修改吗？", "提示", {}).then(() => {

            this.$api.output.save(scenes).then((res) => {
              if (res.code === 200) {
                this.$message({message: "修改成功", type: "success"});
                this.Add_Blowdown();
                let cas = {cas: this.form.cas}
                this.$api.output.findByCas(cas).then((res) => {
                  if(res.data.length > 0){
                    this.isLife = false;
                    this.scenes = res.data;
                    console.log("this.maxIndex::::::",this.maxIndex)
                  }
                  else{
                    this.isLife = true;
                  }
                })

                this.$store.commit('setFlag', !this.$store.getters.getFlag);
                this.$api.inputR.save(input_R).then((res) => {
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
                this.$api.resultR.save(res_R).then((res) => {
                  if (res.code == 200) {
                    // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
                    // this.dataForm.irFish = this.dataForm.irFish / 1000
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });

                    // this.timer = setTimeout(()=>{   //设置延迟执行
                    //   this.R_computesend();
                    // },1000);

                  } else {
                    this.$message({
                      message: "保存失败, " + res.msg,
                      type: "error",
                    });
                  }
                });

              } else {
                this.$message({
                  message: "修改失败, " + res.msg,
                  type: "error",
                });
              }
              // this.reload();
            });
          });
        }else{
          this.$message({message: "年生产、使用或废物利用处理量不能为空", type: "error"});
        }
      }else{
        this.$message({message: "请选择生命周期阶段", type: "error"});
      }
    },
    submitForm() {
      if (this.form.lifeCycle !== '') {
        if (this.form.title !== '') {
          let scenes = Object.assign({
            cas: this.form.cas,
            lifeCycle: this.form.lifeCycle,
            title: this.form.title,
            remark: this.form.remark,
            temission: this.form.temission,
            waterTo: '0',
            /* emissionPattern: '2',
          main: 1,
          fmain: 0.1,
          freg: 0.1,
          fvariability: 4,
          fdirectwater: 0.5,
          stpEffluent: 2000,
          flow: 18000,
          flocal: 0.0005,*/
            stpWater: this.fstpWater,
            stpAir: this.fstpAir,
            stpSludge: this.fstpSludge,
            stpDegrade: this.fstpDegrade,
            stponsiteWater: this.fstpWater,
            stponsiteAir: this.fstpAir,
            stponsiteSludge: this.fstpSludge,
            stponsiteDegrade: this.fstpDegrade,
          });
          this.$confirm("确认添加新场景吗？", "提示", {}).then(() => {
            this.$api.output.save(scenes).then((res) => {
              if (res.code === 200) {
                this.editDialogVisible = false;
                this.$message({message: "添加成功", type: "success"});
                this.$refs["form"].resetFields();
                this.temission_disabled = true;
                this.main_disabled = true;
                this.effluent_disabled = true;
                this.flow_disabled = true;
                this.fvariability_disabled = true;
                this.flocal_disabled = true;
                this.freg_disabled = true;
                this.fmain_disabled = true;
                this.fdirectwater_disabled = true;
                this.useSource = '';
                this.getScenes(this.form.cas);
                this.$store.commit('setFlag', !this.$store.getters.getFlag);
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
              // this.reload();
            });
          });
        }
        else {
          this.$message({message: "暴露场景短标题不能为空", type: "error"});
        }
      }else{
        this.$message({message: "请选择生命周期阶段", type: "error"});
      }
    },
    updateScenes(){


      // this.$api.parametersR.save(input_R).then((res) => {
      //   if (res.code == 200) {
      //     // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
      //     // this.dataForm.irFish = this.dataForm.irFish / 1000
      //     this.$message({
      //       message: "保存成功",
      //       type: "success"
      //     });
      //
      //   } else {
      //     this.$message({
      //       message: "保存失败, " + res.msg,
      //       type: "error",
      //     });
      //   }
      // });
      console.log('2333333333333')
      if(this.form.lifeCycle !== '') {
        if (this.form.qchemical !== '') {
          if(this.input_R.id&& this.input_R.cas != null)
          {
            this.result_R.cas = this.input_R.cas
          }

          let input_R = Object.assign({}, this.input_R);
          let res_R = Object.assign({}, this.result_R);
          let scenes = Object.assign({}, this.form);
          this.$confirm("确认修改吗？", "提示", {}).then(() => {

            this.$api.output.save(scenes).then((res) => {
              if (res.code === 200) {
                this.$message({message: "修改成功", type: "success"});
                this.Add_Blowdown();
                let cas = {cas: this.form.cas}
                this.$api.output.findByCas(cas).then((res) => {
                  if(res.data.length > 0){
                    this.isLife = false;
                    this.scenes = res.data;
                    console.log("this.maxIndex::::::",this.maxIndex)
                  }
                  else{
                    this.isLife = true;
                  }
                })

                this.$store.commit('setFlag', !this.$store.getters.getFlag);
                this.$api.inputR.save(input_R).then((res) => {
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
                this.$api.resultR.save(res_R).then((res) => {
                  if (res.code == 200) {
                    // this.dataForm.rainRate = this.dataForm.rainRate / 1000 / 365
                    // this.dataForm.irFish = this.dataForm.irFish / 1000
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });

                    // this.timer = setTimeout(()=>{   //设置延迟执行
                    //   this.R_computesend();
                    // },1000);

                  } else {
                    this.$message({
                      message: "保存失败, " + res.msg,
                      type: "error",
                    });
                  }
                });

              } else {
                this.$message({
                  message: "修改失败, " + res.msg,
                  type: "error",
                });
              }
              // this.reload();
            });
          });
        }else{
          this.$message({message: "年生产、使用或废物利用处理量不能为空", type: "error"});
        }
      }else{
        this.$message({message: "请选择生命周期阶段", type: "error"});
      }

    },
    deleteScenes(){
      let scenes = Object.assign({}, this.form);
      this.$confirm("确认删除吗？", "提示", {}).then(() => {
        this.$api.output.dele(scenes).then((res) => {
          if (res.code === 200) {
            this.$message({message: "删除成功", type: "success"});
            this.$refs["form"].resetFields();
            let cas = {cas:this.form.cas,};
            this.$api.output.findByCas(cas).then((res) => {
              if(res.data.length > 0){
                this.isLife = false;
                this.input_show = true;
                this.isEmission = true;
                this.scenes = res.data;
                this.maxIndex = this.scenes.length-1 + '';
                this.showScenes(this.scenes[this.scenes.length-1],this.scenes.length-1)
              }
              else if(res.data.length === 0){
                this.form.lifeCycle = '',
                    this.isEmission = false;
                this.input_show = false;
                this.isLife = true;
                this.scenes = res.data;
              }
              else{
                this.form.lifeCycle = '',
                    this.input_show = false;
                this.isEmission = false;
                this.isLife = true;
              }
            });
            this.$store.commit('setFlag', !this.$store.getters.getFlag);
          } else {
            this.$message({
              message: "删除失败, " + res.msg,
              type: "error",
            });
          }

          // this.reload();
        });
      });
    },
    changeStandardstp(){
      if(this.form.emissionPattern === '1'){
        if(this.form.publicStp === '1'){
          this.form.stpWater = this.fstpWater;
          this.form.stpAir = this.fstpAir;
          this.form.stpSludge = this.fstpSludge;
          this.form.stpDegrade = this.fstpDegrade;
        }
        if(this.form.stponsite === '标准STP') {
          this.form.stponsiteWater = this.fstpWater;
          this.form.stponsiteAir = this.fstpAir;
          this.form.stponsiteSludge = this.fstpSludge;
          this.form.stponsiteDegrade = this.fstpDegrade;
        }
      }
      if(this.form.emissionPattern === '2') {
        if(this.form.publicStp === '1'){
          this.form.stpWater = this.fstpWater2;
          this.form.stpAir = this.fstpAir2;
          this.form.stpSludge = this.fstpSludge2;
          this.form.stpDegrade = this.fstpDegrade2;
        }
        if(this.form.stponsite === '标准STP') {
          console.log("2---------标准----------:")
          this.form.stponsiteWater = this.fstpWater2;
          this.form.stponsiteAir = this.fstpAir2;
          this.form.stponsiteSludge = this.fstpSludge2;
          this.form.stponsiteDegrade = this.fstpDegrade2;
        }
      }

    },
    changeStp(){
      if(this.form.publicStp === '1'){
        if(this.form.emissionPattern === '1'){
          this.form.stpWater = this.fstpWater;
          this.form.stpAir = this.fstpAir;
          this.form.stpSludge = this.fstpSludge;
          this.form.stpDegrade = this.fstpDegrade;
        }
        if(this.form.emissionPattern === '2'){
          this.form.stpWater = this.fstpWater2;
          this.form.stpAir = this.fstpAir2;
          this.form.stpSludge = this.fstpSludge2;
          this.form.stpDegrade = this.fstpDegrade2;
        }
        this.stp_disabled = true;
      }
      if(this.form.publicStp === '2'){
        this.stp_disabled = false;
      }

    },
    showInput(){
      this.input_show = true;
      this.compute_disabled = false;
    },
    showResults(){
      this.input_show = false;
      this.compute_disabled = true;
    },
    changeQchmical(){
      this.qchemical_disabled = false;
    },
    changeTemission(){
      this.temission_disabled = !this.temission_disabled;
      if(this.temission_disabled){
        this.temissionTip = '修改';
        if(this.form.lifeCycle === '消费使用') {
          this.form.temission = 365;
        }
        else{
          this.form.temission = 20;
        }
      }
      else{
        if(this.form.lifeCycle === '消费使用'){
          this.temissionTip = '使用默认值365';
        }
        else{
          this.temissionTip = '使用默认值20';
        }
      }
    },
    changeFreg(){
      this.freg_disabled = !this.freg_disabled;
      if(this.freg_disabled){
        this.fregTip = '修改';
        this.form.freg = 0.1;
      }
      else{
        this.fregTip = '使用默认值0.1';
      }
    },
    changeFvariability(){

      this.fvariability_disabled = !this.fvariability_disabled;
      if(this.fvariability_disabled){
        this.fvariabilityTip = '修改';
        this.form.fvariability = 4;
      }
      else{
        this.fvariabilityTip = '使用默认值4';
      }
    },
    changeFdirectwater(){

      this.fdirectwater_disabled = !this.fdirectwater_disabled;
      if(this.fdirectwater_disabled){
        this.fdirectwaterTip = '修改';
        this.form.fdirectwater = 0.5;
      }
      else{
        this.fdirectwaterTip = '使用默认值0.5';
      }
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
        console.log("2022 3, 13   废水  if(this.effluent_disabled) ",this.form.stpEffluent);
      }
      else{
        this.effluentTip = '使用默认值2000';
        console.log("2022 3, 13   废水 else ,this.form.stpEffluent",this.form.stpEffluent);

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
        if (this.form.appLsludge === '1') {
          this.parameter.applSludge = 0.75;
        }
      }
    },
    changeFlocal(){
      this.flocal_disabled = !this.flocal_disabled;
      if(this.flocal_disabled){
        this.flocalTip = '修改';
        this.form.flocal = 0.0005;
      }
      else{
        this.flocalTip = '使用默认值0.0005';
      }
    },
    setAbatementWater(){
      if(this.form.stponsite === '自行输入') {
        this.form.abatementWater = 1 - parseFloat(this.form.stponsiteWater);
        this.abatementWater_disabled = true;
      }
    },
    changeEmission(){
      if(this.form.lifeCycle === '消费使用'){
        this.form.temission = 365;
        this.isEmission = true;
        this.input_show = true;
        this.industrial_disabled = false;
        this.consume_disabled = true;
        this.waste_disabled = false;
        this.useSource = '消费源';

        this.form.stpWater = this.fstpWater;
        this.form.stpAir = this.fstpAir;
        this.form.stpSludge = this.fstpSludge;
        this.form.stpDegrade = this.fstpDegrade;

        this.form.stponsiteWater = this.fstpWater;
        this.form.stponsiteAir = this.fstpAir;
        this.form.stponsiteSludge = this.fstpSludge;
        this.form.stponsiteDegrade = this.fstpDegrade;

      }
      else if(this.form.lifeCycle === '废物利用处置'){
        this.form.temission = 20;
        this.isEmission = true;
        this.input_show = true;
        this.industrial_disabled = false;
        this.consume_disabled = false;
        this.waste_disabled = true;
        this.useSource = '废物处置利用源';
      }
      else if(this.form.lifeCycle === '生产' || this.form.lifeCycle === '配制' || this.form.lifeCycle === '工业使用'){
        this.form.temission = 20;
        this.isEmission = true;
        this.input_show = true;
        this.industrial_disabled = true;
        this.consume_disabled = false;
        this.waste_disabled = false;
        this.useSource = '工业源';
      }
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
        if(this.form.emissionPattern === '1'){
          this.form.stponsiteWater = this.fstpWater;
          this.form.stponsiteAir = this.fstpAir;
          this.form.stponsiteSludge = this.fstpSludge;
          this.form.stponsiteDegrade = this.fstpDegrade;
        }
        if(this.form.emissionPattern === '2') {
          this.form.stponsiteWater = this.fstpWater2;
          this.form.stponsiteAir = this.fstpAir2;
          this.form.stponsiteSludge = this.fstpSludge2;
          this.form.stponsiteDegrade = this.fstpDegrade2;
        }
      }
      else if(this.form.stponsite === '无'){
        this.stponsite_disabled = false;
        this.form.stponsiteWater = '1';
        this.form.stponsiteAir = '0';
        this.form.stponsiteSludge = '0';
        this.form.stponsiteDegrade = '0';
      }
      // console.log("this.form.stponsiteWater:",this.form.stponsiteWater);
      if(this.form.stponsiteWater !== ''){
        this.form.abatementWater = 1 - parseFloat(this.form.stponsiteWater);
      }
    },
    setOther(){
      if (this.form.waterTo === '1') {
        this.form.stpWater = '1';
        this.form.stpAir = '0';
        this.form.stpSludge = '0';
        this.form.stpDegrade = '0';
        // 污泥是否农用 2为否
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
        if (this.form.appLsludge === '1') {
          this.form.stpWater = this.fstpWater;
          this.form.stpAir = this.fstpAir;
          this.form.stpSludge = this.fstpSludge;
          this.form.stpDegrade = this.fstpDegrade;
          this.parameter.applSludge = 0.75;
        }
      }
    },
    NumberJudge(para){
      //debugger
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
      //工业源
      if(this.useSource === '工业源') {
        //公式计算
        if (this.form.waterTo === '1') {
          this.form.elocalWater = 0;
          this.form.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
          this.form.elocalstpAir = 0;
          this.form.elocalstpWater = 0;
          this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
          if(this.form.appLsludge === '1'){
            this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
          }
          else if(this.form.appLsludge === '2'){
            this.form.elocalstpSoil = 0;
          }
        } else {  //进入公共STP
          this.form.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
          this.form.elocalstpAir = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpAir);
          this.form.elocalstpWater = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpWater);
          this.form.elocalDirectwater = 0;
          this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
          if(this.form.appLsludge === '1'){
            this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
          }
          else if(this.form.appLsludge === '2'){
            this.form.elocalstpSoil = 0;
          }
        }
        if(this.form.stponsite === '标准STP'){
          this.form.elocalAir = (parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) / parseFloat(this.form.temission)) * parseFloat(this.form.stponsiteAir) + (parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) / parseFloat(this.form.temission)) ;
        }
        else{
          this.form.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission) + parseFloat(this.form.elocalWater) * parseFloat(this.form.stponsiteAir);
        }
      }
      else if(this.useSource === '消费源'){
        this.form.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.water) * (1-parseFloat(this.form.fdirectwater)) / parseFloat(this.form.temission);
        this.form.elocalstpAir = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpAir);
        this.form.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.air) / parseFloat(this.form.temission);
        this.form.elocalstpWater = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpWater);
        this.form.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.water) * parseFloat(this.form.fdirectwater) / parseFloat(this.form.temission);
        this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.sludge)  / parseFloat(this.form.temission);
        this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
      }
      else{
        if (this.form.waterTo === '1') {
          this.form.elocalWater = 0;
          this.form.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
          this.form.elocalstpAir = 0;
          this.form.elocalstpWater = 0;
          this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
          this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
        } else {  //进入公共STP
          this.form.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
          this.form.elocalstpAir = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpAir);
          this.form.elocalstpWater = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpWater);
          this.form.elocalDirectwater = 0;
          this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
          if(this.form.appLsludge === '1'){
            this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
          }
          else if(this.form.appLsludge === '2'){
            this.form.elocalstpSoil = 0;
          }
        }
        if(this.form.stponsite === '标准STP'){
          this.form.elocalAir = (parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.water) / parseFloat(this.form.temission)) * parseFloat(this.form.stponsiteAir) + (parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.air) / parseFloat(this.form.temission)) ;
        }
        else{
          this.form.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission);
        }
      }
      if(isNaN(this.form.elocalAir)){
        this.form.elocalAir = 0;
      }
      if(isNaN(this.form.elocalstpAir)){
        this.form.elocalstpAir = 0;
      }
      if(isNaN(this.form.elocalWater)){
        this.form.elocalWater = 0;
      }
      if(isNaN(this.form.elocalstpWater)){
        this.form.elocalstpWater = 0;
      }
      if(isNaN(this.form.elocalstpWater)){
        this.form.elocalstpWater = 0;
      }
      if(isNaN(this.form.elocalSoil)){
        this.form.elocalSoil = 0;
      }
      if(isNaN(this.form.elocalstpSoil)){
        this.form.elocalstpSoil = 0;
      }

      this.Totalcomputes();


    },
    compute2(){
      //工业源
      if(this.useSource === '工业源') {
        //公式计算
        if (this.form.waterTo === '1') {
          this.form.elocalWater = 0;
          this.form.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
          this.form.elocalstpAir = 0;
          this.form.elocalstpWater = 0;
          this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
          if(this.form.appLsludge === '1'){
            this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
          }
          else if(this.form.appLsludge === '2'){
            this.form.elocalstpSoil = 0;
          }
        } else {  //进入公共STP
          this.form.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
          this.form.elocalstpAir = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpAir);
          this.form.elocalstpWater = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpWater);
          this.form.elocalDirectwater = 0;
          this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
          if(this.form.appLsludge === '1'){
            this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
          }
          else if(this.form.appLsludge === '2'){
            this.form.elocalstpSoil = 0;
          }
        }
        if(this.form.stponsite === '标准STP'){
          this.form.elocalAir = (parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.water) / parseFloat(this.form.temission)) * parseFloat(this.form.stponsiteAir) + (parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) / parseFloat(this.form.temission)) ;
        }
        else{
          this.form.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.main) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission) + parseFloat(this.form.elocalWater) * parseFloat(this.form.stponsiteAir);
        }
      }
      else if(this.useSource === '消费源'){
        this.form.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.water) * (1-parseFloat(this.form.fdirectwater)) / parseFloat(this.form.temission);
        this.form.elocalstpAir = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpAir);
        this.form.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.air) / parseFloat(this.form.temission);
        this.form.elocalstpWater = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpWater);
        this.form.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.water) * parseFloat(this.form.fdirectwater) / parseFloat(this.form.temission);
        this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.freg) * parseFloat(this.form.flocal) * parseFloat(this.form.fvariability) * parseFloat(this.form.sludge)  / parseFloat(this.form.temission);
        this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
      }
      else{
        if (this.form.waterTo === '1') {
          this.form.elocalWater = 0;
          this.form.elocalDirectwater = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
          this.form.elocalstpAir = 0;
          this.form.elocalstpWater = 0;
          this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
          this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
        } else {  //进入公共STP
          this.form.elocalWater = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.water) * (1 - parseFloat(this.form.abatementWater)) / parseFloat(this.form.temission);
          this.form.elocalstpAir = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpAir);
          this.form.elocalstpWater = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpWater);
          this.form.elocalDirectwater = 0;
          this.form.elocalSoil = parseFloat(this.form.qchemical) * parseFloat(this.form.waste) * parseFloat(this.form.fmain) * parseFloat(this.form.sludge) * (1 - parseFloat(this.form.abatementSludge)) / parseFloat(this.form.temission);
          if(this.form.appLsludge === '1'){
            this.form.elocalstpSoil = parseFloat(this.form.elocalWater) * parseFloat(this.form.stpSludge);
          }
          else if(this.form.appLsludge === '2'){
            this.form.elocalstpSoil = 0;
          }
        }
        if(this.form.stponsite === '标准STP'){
          this.form.elocalAir = (parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.water) / parseFloat(this.form.temission)) * parseFloat(this.form.stponsiteAir) + (parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.air) / parseFloat(this.form.temission)) ;
        }
        else{
          this.form.elocalAir = parseFloat(this.form.qchemical) * parseFloat(this.form.fmain) * parseFloat(this.form.air) * (1 - parseFloat(this.form.abatementAir)) / parseFloat(this.form.temission);
        }
      }
      if(isNaN(this.form.elocalAir)){
        this.form.elocalAir = 0;
      }
      if(isNaN(this.form.elocalstpAir)){
        this.form.elocalstpAir = 0;
      }
      if(isNaN(this.form.elocalWater)){
        this.form.elocalWater = 0;
      }
      if(isNaN(this.form.elocalstpWater)){
        this.form.elocalstpWater = 0;
      }
      if(isNaN(this.form.elocalstpWater)){
        this.form.elocalstpWater = 0;
      }
      if(isNaN(this.form.elocalSoil)){
        this.form.elocalSoil = 0;
      }
      if(isNaN(this.form.elocalstpSoil)){
        this.form.elocalstpSoil = 0;
      }

      this.Totalcomputes();


    },
    Totalcomputes() {

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
      this.compute_HealthRcr();

      // this.R_Totalcomputes();
      this.computesblowdown();
      this.R_Totalcomputes();

      this.form.elocalWater = this.NumberJudge(this.form.elocalWater);
      this.form.elocalstpWater = this.NumberJudge(this.form.elocalstpWater);
      this.form.elocalstpAir = this.NumberJudge(this.form.elocalstpAir);
      this.form.elocalAir = this.NumberJudge(this.form.elocalAir);
      this.form.elocalSoil = this.NumberJudge(this.form.elocalSoil);
      this.form.elocalstpSoil = this.NumberJudge(this.form.elocalstpSoil);
      this.form.elocalDirectwater = this.NumberJudge(this.form.elocalDirectwater);
    },
    compute_PECstp() {
      debugger
      this.parameter.effluentStp = this.form.stpEffluent;
      this.parameter.flow=this.form.flow;
      console.log("2022 3 13 this.parameter.effluentStp",this.parameter.effluentStp)
      if(this.form.lifeCycle === '生产' || this.form.lifeCycle === '配制' || this.form.lifeCycle === '工业使用' || this.form.lifeCycle === '废物利用处置'){
        if(this.form.waterTo === '1'){
          this.form.pecstp = this.form.elocalDirectwater * 1000 / this.parameter.effluentStp;
          this.pecstpTip = '企业自有STP PEC';
        }
        if(this.form.waterTo === '2'){
          this.form.pecstp = this.form.elocalWater*1000000*this.density.fstpWater/(this.parameter.effluentStp*1000);
          this.pecstpTip = '集中式STP PEC';
        }
      }
      if(this.form.lifeCycle === '消费使用'){
        this.form.pecstp = this.form.elocalWater*1000000*this.density.fstpWater/(this.parameter.effluentStp*1000);
        this.pecstpTip = '集中式STP PEC'
      }
      // console.log("pecstpppppppppppppppppp")
      // console.log(this.form.elocalWater);
      // console.log(this.density.fstpWater);
      // console.log(this.parameter.effluentStp);

      this.form.pecstp = this.NumberJudge(this.form.pecstp);


    },
    compute_PEClocalwater() {
      debugger
      this.parameter.effluentStp = this.form.stpEffluent;
      this.parameter.flow=this.form.flow;
      console.log("2022 3 13 this.parameter.effluentStp",this.parameter.effluentStp)
//开始改
//         if(this.form.elocalWater==null) this.form.elocalWater=9.99;
//         if(this.density.fstpWater==null) this.density.fstpWater=0.061;
//         if(this.parameter.effluentStp==null) this.parameter.effluentStp=2000;
//         if(this.form.flow==null) this.form.flow=18000;
//         if(this.density.kpSusp==null) this.density.kpSusp=2.05;
//         if(this.parameter.suspWater==null)  this.parameter.suspWater=15;
//         if(this.parameter.focSusp==null)   this.parameter.focSusp=0.1;
//         if(this.density.koc==null) this.density.koc=205;
//         this.density.kpSusp=this.parameter.focSusp*this.density.koc;
//         console.log("检测flow     ",this.form.flow)
//         this.density.clocalWater =
//           (this.form.elocalWater * this.density.fstpWater*1000)/
//           ((this.parameter.effluentStp + this.form.flow)* (1+this.density.kpSusp*this.parameter.suspWater/1000000));
//         //1.2计算  Clocal.directwater=Elocal.directwater*1000/(FLOW*(1+Kp.susp*SUSPwater/10^6))
//         // if(this.parameter.flow==null) this.parameter.flow=18000;
//         //if(this.density.kpSusp==null) this.kpSusp=21;
//         if(this.parameter.suspWater==null) this.parameter.suspWater=15;
//         this.density.clocalDirectwater =
//           (this.form.elocalDirectwater*1000)/(this.form.flow*(1+this.density.kpSusp*this.parameter.suspWater/10000000));
//         //1.3计算 PECreg.water
//         if(this.density.pecregWater == null){
//           this.density.pecregWater = 0;
//         }
//         this.form.peclocalWater= this.density.clocalWater + this.density.clocalDirectwater + this.density.pecregWater;
//         console.log("2021.12 this.form.peclocalWater",this.form.peclocalWater)
      if(this.form.elocalWater==null) this.form.elocalWater=9.99;
      if(this.density.fstpWater==null) this.density.fstpWater=0.061;
      if(this.parameter.effluentStp==null) this.parameter.effluentStp=2000;
      if(this.parameter.flow==null) this.parameter.flow=18000;
      if(this.density.kpSusp==null) this.density.kpSusp=2.05;
      if(this.parameter.suspWater==null)  this.parameter.suspWater=15;
      if(this.parameter.focSusp==null)   this.parameter.focSusp=0.1;
      if(this.density.koc==null) this.density.koc=205;
      this.density.kpSusp=this.parameter.focSusp*this.density.koc;
      this.density.clocalWater =
          (this.form.elocalWater * this.density.fstpWater*1000)/
          ((parseInt(this.parameter.effluentStp) + parseInt(this.parameter.flow))* (1+this.density.kpSusp*this.parameter.suspWater/1000000));
      //1.2计算  Clocal.directwater=Elocal.directwater*1000/(FLOW*(1+Kp.susp*SUSPwater/10^6))
      if(this.parameter.flow==null) this.parameter.flow=18000;
      //if(this.density.kpSusp==null) this.kpSusp=21;
      if(this.parameter.suspWater==null) this.parameter.suspWater=15;
      this.density.clocalDirectwater =
          (this.form.elocalDirectwater*1000)/(parseInt(this.parameter.flow)*(1+this.density.kpSusp*this.parameter.suspWater/10000000));
      //1.3计算 PECreg.water
      if(this.density.pecregWater == null){
        this.density.pecregWater = 0;
      }
      this.form.peclocalWater= this.density.clocalWater + this.density.clocalDirectwater + this.density.pecregWater;
      this.form.peclocalWater = this.NumberJudge(this.form.peclocalWater);

    },
    compute_PEClocalsed() {

      if(this.parameter.fwaterSusp==null) this.parameter.fwaterSusp=0.9;
      if(this.parameter.fsoildSusp==null)this.parameter.fsoildSusp=0.1;
      if(this.parameter.focSusp==null)   this.parameter.focSusp=0.1;
      if(this.density.koc==null) this.density.koc=205;
      this.density.kpSusp=this.parameter.focSusp*this.density.koc;
      if(this.parameter.rhoSolid==null)this.parameter.rhoSolid=2500;
      this.density.ksuspWater=this.parameter.fwaterSusp+this.parameter.fsoildSusp*this.density.kpSusp*this.parameter.rhoSolid/1000;
      if(this.parameter.fsoildSed==null) this.parameter.fsoildSed=0.2;
      if(this.parameter.rhoSolid==null) this.parameter.rhoSolid=2500;
      if(this.parameter.fwaterSed==null)this.parameter.fwaterSed=0.8;
      if(this.parameter.rhoWater==null) this.parameter.rhoWater=1000;
      // 参数修改2.0
      this.parameter.rsed = 2500
      this.parameter.rhoSed=(this.parameter.fsoildSed*this.parameter.rsed+this.parameter.fwaterSed*this.parameter.rhoWater);
      //参数修改2.0
      this.parameter.rsusp =1500

      this.parameter.convSed=this.parameter.rhoSed/(this.parameter.fsoildSed*this.parameter.rhoSolid);
      if(this.parameter.fsoildSusp==null) this.parameter.fsoildSusp=0.1;
      if(this.parameter.fwaterSusp==null) this.parameter.fwaterSusp=0.9;
      this.parameter.rhoSusp=(this.parameter.fsoildSusp*this.parameter.rhoSolid+this.parameter.fwaterSusp*this.parameter.rhoWater);
      // let result3 =this.density.ksuspWater*this.form.peclocalWater*1000*this.parameter.convSed/this.parameter.rhoSusp;
      let result3 =this.density.ksuspWater*this.form.peclocalWater*1000*4.6/this.parameter.rhoSusp;
      this.form.peclocalSed =this.NumberJudge(result3);


    },
    compute_PEClocalsoli30() {

      if(this.density.fstpAir==null)  this.density.fstpAir=0.211;
      if(this.parameter.temp==null) this.parameter.temp=289;
      // this.density.vp=this.density.vpTemptest*Math.exp((50000/8.314)*(1/this.density.tempVptest-1/289));
      //this.density.vpl=this.density.vp/Math.exp(6.79*(1-this.density.tempmelt/this.parameter.temp));

      if(this.density.depstdAer==null) this.density.depstdAer=0.01;
      // this.density.sol=this.density.solTemptest*Math.exp((10000/8.314)*(1/this.density.tempSoltest-1/10));
      // this.density.henry=this.density.vp*this.density.molw/this.density.sol;


      if(Math.log10(this.density.henry)<-2){
        this.density.depstdGas=0.0005;
      }
      else if(Math.log10(this.density.henry)>2){
        this.density.depstdGas=0.0003;
      }
      else{
        this.density.depstdGas=0.0004;
      }

      // deptotal =(Elocal.air+ElocalSTP.air)*(Fass.aer*DEPstd.aer+(1-Fass_aer)*DEPstd.gas)
      this.density.deptotal=(Number(this.form.elocalAir)+Number(this.form.elocalstpAir))*(Number(this.density.fassAer)*Number(this.density.depstdAer)+(1-Number(this.density.fassAer))*Number(this.density.depstdGas));
      // console.log("this.density.fassAer",this.density.fassAer);

      // console.log("this.density.elocalAir",this.form.elocalAir);
      // console.log("this.density.elocalstpAir",this.form.elocalstpAir);
      // console.log("this.density.depstdAer",this.density.depstdAer);
      // console.log("this.density.depstdGas",this.density.depstdGas);

      //console.log("@@@@@@@@@@@@deptotal",this.density.deptotal);

      // this.density.vpl=this.density.vp/Math.exp(6.79*(1-this.density.tempVptest/this.parameter.temp));


      //this.density.temission=this.form.temission;
      this.density.deptotalAnn=this.density.deptotal*this.form.temission/365;

      console.log("temission",this.form.temission);
      //this.density.deptotalAnn=this.density.deptotal*this.form.elocalstpAir/365;

      if(this.parameter.DEPTHsoil==null) this.parameter.DEPTHsoil=0.2;

      if(this.parameter.fsolidSoil==null) this.parameter.fsolidSoil=0.6;
      if(this.parameter.rhoSolid==null)this.parameter.rhoSolid=2500;
      if(this.parameter.fwaterSoil==null) this.parameter.fwaterSoil=0.2;
      if(this.parameter.fairSoil==null) this.parameter.fairSoil=0.2;
      if(this.parameter.rhoAir==null) this.parameter.rhoAir=1.3;
      //参数修改2.0
      this.parameter.rsoil = 2500
      this.parameter.rhoSoil=(this.parameter.fsolidSoil*this.parameter.rsoil)+(this.parameter.fwaterSoil*this.parameter.rhoWater)+(this.parameter.fairSoil*this.parameter.rhoAir);
      this.density.dair=this.density.deptotalAnn/(this.parameter.DEPTHsoil*this.parameter.rhoSoil);

      console.log("参数修改2.0参数修改2.0参数修改2.0")
      console.log(this.parameter.rhoSoil)
      this.density.dair=this.density.deptotalAnn/(this.parameter.DEPTHsoil*this.parameter.rhoSoil);

      this.density.corrVolatS=(1/0.1)*this.parameter.DEPTHsoil/(1-Math.exp(-1/0.1*this.parameter.DEPTHsoil));
      if(this.parameter.fairSoil==null) this.parameter.fairSoil=0.2;
      //this.density.kairWater=Number(this.density.henry)/8.314/Number(this.parameter.temp);
      if(this.parameter.fwaterSoil==null) this.parameter.fwaterSoil=0.2;
      if(this.parameter.fsolidSoil==null) this.parameter.fsolidSoil=0.6;
      if(this.parameter.focSoil==null) this.parameter.focSoil=0.02;
      this.density.kpSoil=this.parameter.focSoil*this.density.koc;
      // console.log("this.density.kpSoil", this.density.kpSoil);

      if(this.parameter.rhoSolid==null) this.parameter.rhoSolid=2500;
      this.density.ksoilWater=this.parameter.fairSoil*this.density.kairWater+this.parameter.fwaterSoil+this.parameter.fsolidSoil*this.density.kpSoil*this.parameter.rhoSolid/1000;
      if(this.density.kaslAir==null) this.density.kaslAir=90.53;

      // if (this.density.biodeg === "1") {
      //     if (this.density.kpSoil <= 100) {
      //         this.density.kbioSoil = Math.LN2 / 30;
      //     } else if (this.density.kpSoil>100 && this.density.kpSoil <= 1000) {
      //         this.density.kbioSoil = Math.LN2 / 300;
      //     } else if (this.density.kpSoil>1000 && this.density.kpSoil <= 10000) {
      //         this.density.kbioSoil = Math.LN2 / 3000;
      //     } else {
      //         this.density.kbioSoil = Math.LN2 / 30000;
      //     }
      // } else if (this.density.biodeg === "0.3") {
      //     if (this.density.kpSoil <= 100) {
      //         this.density.kbioSoil = Math.LN2 / 90;
      //     } else if (this.density.kpSoil>100 && this.density.kpSoil <= 1000) {
      //         this.density.kbioSoil = Math.LN2 / 900;
      //     } else if (this.density.kpSoil>1000 && this.density.kpSoil <= 10000) {
      //         this.density.kbioSoil = Math.LN2 / 9000;
      //     } else {
      //         this.density.kbioSoil = Math.LN2 / 90000;
      //     }
      // } else {
      //     if(this.density.biodeg==="0.1"||this.density.biodeg==="0.03 "){
      //         if(this.density.kpSoil <= 100){
      //             this.density.kbioSoil = Math.LN2 / 300;
      //         }else if(this.density.kpSoil <= 1000){
      //             this.density.kbioSoil = Math.LN2 / 3000;
      //         }else if(this.density.kpSoil <= 10000){
      //             this.density.kbioSoil = Math.LN2 / 30000;
      //         }else{
      //             this.density.kbioSoil = Math.LN2 / 300000;
      //         }
      //     }else{
      //         this.density.kbioSoil = Math.LN2 / 1000000;
      //     }
      // }

      this.density.kaslSoil=0.1*this.density.kbioSoil;
      //kvolat=CorrVolat.s*1/((Ksoil_water/(kasl.air*Kair_water)+1/kasl.soil)*DEPTHsoil)
      this.density.kvolat=this.density.corrVolatS*1/((this.density.ksoilWater/(this.density.kaslAir*this.density.kairWater)+1/this.density.kaslSoil)*this.parameter.DEPTHsoil);

      if(this.density.finfSoil==null) this.density.finfSoil=0.25;
      if(this.parameter.rainRate==null) this.parameter.rainRate=700/1000/365;
      this.density.kleach=this.density.finfSoil*(this.parameter.rainRate/1000/365)/this.density.ksoilWater/this.parameter.DEPTHsoil;

      // console.log("finfSoil",this.density.finfSoil);
      // console.log("rainRate",this.parameter.rainRate);
      // console.log("ksoilWater",this.density.ksoilWater);
      // console.log("DEPTHsoil",this.parameter.DEPTHsoil);
      //ksoil==kvolat+kleach+kbio.soil

      this.density.kSoil=this.density.kvolat+this.density.kleach+this.density.kbioSoil;
      console.log("kvolat",this.density.kvolat);
      console.log("kleach",this.density.kleach);
      console.log("kbioSoil",this.density.kbioSoil);

      // this.density.kSoil=0.0303;
      if(this.density.tavSoil==null) this.density.tavSoil=30;
      this.density.cdepSoilFive0=this.density.dair/this.density.kSoil-this.density.dair/this.density.kSoil*Math.exp(-365*5*this.density.kSoil);
      if(this.density.fstpSludge==null) this.density.fstpSludge=0.005;
      if(this.density.sludgerate==null) this.density.sludgerate=499;
      this.density.csludge=this.density.fstpSludge*this.form.elocalWater*1000000/this.density.sludgerate;
      if(this.parameter.applSludge==null) this.parameter.applSludge=0.75;
      if(this.parameter.DEPTHsoil==null) this.parameter.DEPTHsoil=0.2;
      this.density.csludgeSoilOne0=this.density.csludge*this.parameter.applSludge/(this.parameter.DEPTHsoil*this.parameter.rhoSoil);
      this.density.facc=Math.exp(-365*this.density.kSoil);
      this.density.csludgeSoilFive0=this.density.csludgeSoilOne0*(1+Math.pow(this.density.facc,1)+Math.pow(this.density.facc,2)+Math.pow(this.density.facc,3)+Math.pow(this.density.facc,4));
      this.density.csoilFive0=this.density.cdepSoilFive0+this.density.csludgeSoilFive0;

      //Clocal.soil(30)=Dair/k.soil+1/k.soil/Tav.soil*(Csoil5_0-Dair/k.soil)*(1-EXP(-1*k.soil*Tav.soil))
      this.density.clocalSoil30=this.density.dair/this.density.kSoil+1/this.density.kSoil/ this.density.tavSoil*(this.density.csoilFive0-this.density.dair/this.density.kSoil)*(1-Math.exp(-1*this.density.kSoil*this.density.tavSoil));
      console.log("******dair",this.density.dair);
      console.log("******kSoil",this.density.kSoil);
      console.log("******tavSoil",this.density.tavSoil);
      console.log("******csoilFive0",this.density.csoilFive0);

      if(this.density.pecregSoil==null) this.density.pecregSoil=0;
      if(this.parameter.rhoSolid==null) this.parameter.rhoSolid=2500;
      if(this.parameter.rhoWater==null) this.parameter.rhoWater=1000;
      if(this.parameter.rhoAir==null) this.parameter.rhoAir=1.3;
      if(this.parameter.fsolidSoil==null) this.parameter.fsolidSoil=0.6;
      if(this.parameter.fwaterSoil==null) this.parameter.fwaterSoil=0.2;
      if(this.parameter.fairSoil==null) this.parameter.fairSoil=0.2;
      if(this.density.fstpAir==null) this.density.fstpAir=0.21;
      this.parameter.rhoSoil=(this.parameter.fsolidSoil*this.parameter.rhoSolid+ this.parameter.fwaterSoil*this.parameter.rhoWater+this.parameter.fairSoil*this.parameter.rhoAir)
      //参数修改 2.0
      this.parameter.convSoil = (this.parameter.rhoSoil/(this.parameter.fsolidSoil*this.parameter.rsoil)).toFixed(7);
      console.log("参数修改2.0参数修改2.0参数修改2.0")
      console.log(this.parameter.convSoil)

      if(this.density.pecregSoil!=null){

      }else {

      }
      this.form.peclocalSoil30= (parseFloat(this.density.clocalSoil30)+parseFloat(this.density.pecregSoil))*parseFloat(this.parameter.convSoil);
      console.log("clocalSoil30",this.density.clocalSoil30);
      console.log("pecregSoil",this.density.pecregSoil);
      console.log("convSoil",this.parameter.convSoil);

      this.form.peclocalSoil30=this.NumberJudge(this.form.peclocalSoil30);

    },
    compute_PEClocalgrw() {
      //2022.8.23
      this.parameter.effluentStp = this.form.stpEffluent;
      console.log("2022 3 13 this.parameter.effluentStp",this.parameter.effluentStp)
      if(this.parameter.DEPTHsoil==null) this.parameter.DEPTHsoil=0.2;
      if(this.density.fstpWater==null) this.density.fstpWater=0.061;
      if(this.parameter.effluentStp==null) this.parameter.effluentStp=2000;
      if(this.form.flow==null) this.form.flow=18000;
      if(this.parameter.suspWater==null) this.parameter.suspWater=15;

      this.density.clocalWater=this.parameter.DEPTHsoil*this.density.fstpWater*1000/
          ((parseInt(this.parameter.effluentStp)+parseInt(this.form.flow))*(1+this.density.kpSusp*this.parameter.suspWater/1000000));
      debugger
      if(this.density.kpSusp==null) this.density.kpSusp=21;
      if(this.parameter.focSusp==null) this.parameter.focSusp=0.1;
      if(this.density.koc==null) this.density.koc=205;
      console.log("2020    12.  5this.form.elocalDirectwater",this.form.elocalDirectwater)
      this.density.clocalDirectwater =
          this.form.elocalDirectwater*1000/
          (this.form.flow*(1+this.parameter.suspWater)*
              this.parameter.suspWater/1000000);

      console.log("2020    12.6  this.density.clocalDirectwater",this.density.clocalDirectwater)
      console.log("2020    12.6  this.form.flow",this.form.flow)
      console.log("2020    12.6  this.density.suspWater",this.parameter.suspWater)
      if(this.density.pecregWater == null) this.density.pecregWater = 0;

      this.density.PEClocalwater_ann=this.form.peclocalWater*this.form.temission/365;

      if(this.density.fwaterSusp==null) this.parameter.fwaterSusp=0.9;
      if(this.parameter.rhoSolid==null) this.parameter.rhoSolid=2500;
      if(this.parameter.rhoWater==null) this.parameter.rhoWater=1000;
      if(this.parameter.rhoAir==null) this.parameter.rhoAir=1.3;
      if(this.parameter.fsolidSoil==null) this.parameter.fsolidSoil=0.6;
      if(this.parameter.fwaterSoil==null) this.parameter.fwaterSoil=0.2;
      if(this.parameter.fairSoil==null) this.parameter.fairSoil=0.2;

      if(this.density.fstpAir==null) this.density.fstpAir=0.211;
      this.parameter.rhoSoil=(this.parameter.fsolidSoil*this.parameter.rhoSolid+
          this.parameter.fwaterSoil*this.parameter.rhoWater+this.parameter.fairSoil*this.parameter.rhoAir)
      if(this.density.vpTemptest==null) this.density.vpTemptest=3089;
      if(this.density.tempmelt==null) this.density.tempmelt=-25.2;
      if(this.parameter.temp==null) this.parameter.temp= 10;
      if(this.density.depstdAer==null) this.density.depstdAer=0.01;
      if(this.density.tempSoltest==null) this.density.tempSoltest=25.00;
      if(this.density.solTempTest==null) this.density.solTempTest=587.00;
      if(this.density.molw==null) this.density.molw=92;
      if(this.density.tempVptest==null) this.density.tempVptest=21.1;
      /**
       * 下面这两个公式temp取10
       * sol=(Sol.TempTest)*EXP((10000/8.314)*(1/TEMP.SolTest-1/TEMP))
       * vp==Vp.temptest*EXP((50000/8.314)*(1/TEMP.Vptest-1/TEMP))
       * @type {number}
       */
      // this.density.sol=(this.density.solTempTest)*Math.exp((10000/8.314)*(1/this.density.tempSoltest-1/10));
      // this.density.vp=this.density.vpTemptest*Math.exp((50000/8.314)*(1/this.density.tempVptest-1/10));

      if(Math.log10(this.density.henry)<-2)
        this.density.depstdGas=0.0005;
      else if (Math.log10(this.density.henry)>2)
        this.density.depstdGas=0.0003;
      else {this.density.depstdGas=0.0004;}

      // this.density.vpl=this.density.vp/Math.exp(6.79*(1-this.density.tempmelt/this.parameter.temp));
      // this.density.fassAer=0.0001/(this.density.vpl+0.0001);

      // this.density.deptotal=(this.form.elocalAir+this.form.elocalstpAir)*
      //     (this.density.fassAer*this.density.depstdAer+(1-this.density.fassAer)*this.density.depstdGas);

      // console.log("deptotal",this.density.deptotal);    *******

      if(this.parameter.focSoil==null) this.parameter.focSoil=0.02;
      if(this.density.koc==null) this.density.koc=205.00;
      if(this.density.kaslAir==null) this.density.kaslAir=90.53;


      this.density.kaslSoil=0.1*this.density.kbioSoil;

      // console.log("##########ksoil", this.density.csludge);

      // this.density.kvolat=this.density.corrVolatS*1/((this.density.ksoilWater/
      //     (this.density.kaslAir*this.density.kairWater)+1/this.density.kaslSoil)*this.parameter.DEPTHsoil);
      if(this.density.finfSoil==null) this.density.finfSoil=0.25;
      if(this.parameter.rainRate==null) this.parameter.rainRate=0.001847;

      // this.density.kleach=this.density.finfSoil*this.parameter.rainRate/this.density.ksoilWater/this.parameter.DEPTHsoil;
      //   console.log("##########kleach",  this.density.kleach);


      this.density.cdepSoilTen0 =this.density.dair/this.density.kSoil-this.density.dair/this.density.kSoil*Math.exp(-365*10*this.density.kSoil);

      if(this.density.sludgerate==null) this.density.sludgerate=499;

      if(this.parameter.applSludge==null) this.parameter.applSludge=0.75;
      if(this.density.fstpSludge==null) this.density.fstpSludge=0.005;
      this.density.csludge=this.density.fstpSludge*this.form.elocalWater*1000000/this.density.sludgerate;
      this.density.csludgeSoilTen0 =this.density.csludge*this.parameter.applSludge/(this.parameter.DEPTHsoil*this.parameter.rhoSoil);
      //this.density.csoilTen0 =this.density.cdepSoilTen0+this.density.csludgeSoilTen0 ;
      //原公式             Clocal.soil_180=Dair/k.soil+1/k.soil/180*(Csoil10_0-Dair/k.soil)*(1-EXP(-1*k.soil*180))
      //   this.density.peclocalSoil180= this.density.dair/this.density.kSoil+1/this.density.kSoil/
      //       180*(this.density.csoilTen0-this.density.dair/this.density.kSoil)*(1-Math.exp(-1*this.density.kSoil*180));


      //2021.1.10  公式更新Clocal.soil_180=Dair/k.soil+1/k.soil/180*(Csoil5_0-Dair/k.soil)*(1-EXP(-1*k.soil*180))
      //this.density.dair=0.000097;
      this.density.csoilFive0=this.density.cdepSoilFive0+this.density.csludgeSoilFive0 ;
      if( this.density.pecregSoil!=null){
        this.density.peclocalSoil180= this.density.dair/this.density.kSoil+1/this.density.kSoil/
            180*(this.density.csoilFive0-this.density.dair/this.density.kSoil)*(1-Math.exp(-1*this.density.kSoil*180)) +this.density.pecregSoil;
      }else {
        this.density.peclocalSoil180= this.density.dair/this.density.kSoil+1/this.density.kSoil/
            180*(this.density.csoilFive0-this.density.dair/this.density.kSoil)*(1-Math.exp(-1*this.density.kSoil*180));
      }



      console.log("##########deptotalAnn",this.density.deptotalAnn);


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
      this.density.fPur = Math.max(fpur_one,fpur_sec);

      if(this.parameter.irWater==null) this.parameter.irWater=1.85;
      if(this.parameter.ef==null) this.parameter.ef=365;
      if(this.parameter.ed==null) this.parameter.ed=70;
      if(this.parameter.bw==null) this.parameter.bw=60.6;
      if(this.parameter.at==null) this.parameter.at=25550;
      //this.density.peclocalSoil180=0.00194;

      this.form.peclocalGrw=this.density.peclocalSoil180*this.parameter.rhoSoil/this.density.ksoilWater/1000;

      // console.log("peclocalSoil180%%%%%%%",this.density.peclocalSoil180);    重点核验！！

      console.log("2022 3 13 this.parameter.effluentStp",this.parameter.effluentStp)
      console.log("2022 3 13 this.form.effluentStp",this.form.flow)

      this.form.peclocalGrw = this.NumberJudge(this.form.peclocalGrw);

    },


    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]); return null;
    },
    compute_PECaquPredator() {
      //=0.5*(PEClocal.water_ann+PECreg.water)*BCF.fish*BMF.1


      this.density.peclocalWaterAnn=
          this.form.peclocalWater *
          this.form.temission/365;

      if(this.density.pecregWater == null){
        this.density.pecregWater = 0;
      }
      var k = this.density.kow;
      // //计算1.3 BCF.fish
      // if(this.density.kow == null){
      //   this.density.kow = 537.0317964
      // }
      // var data;
      // if(Math.log10(k)<1){
      //   data = 0.00141;
      // }
      // else if (Math.log10(k)>10){
      //   data =0.479;
      // }
      // else if (Math.log10(k)<=6){
      //   var m = 0.85*Math.log10(k)-3.7;
      //   data = Math.pow(10,m);
      // }else {
      //   var m = -0.2*(Math.log10(k)*Math.log10(k)) + 2.74 * Math.log10(k) - 7.72;
      //   data = Math.pow(10,m);
      // }
      // data = 1000*data;
      // this.density.bcfFish = data;

      //计算1.4 BMF.1
      if(Math.log10(k) < 4.5){
        this.density.bmf1 = 1;
      }else {

        if (Math.log10(k) > 9) {
          this.density.bmf1 = 1;
        } else {
          if (Math.log10(k) < 5) {
            this.density.bmf1 = 5;
          } else {
            if (Math.log10(k) <= 8) {
              this.density.bmf1 = 10;
            } else {
              this.density.bmf1 = 3;
            }
          }

        }
      }

      console.log("peclocalWaterAnn 2021。12", this.density.peclocalWaterAnn);
      console.log("this.form.temission 2021。12", this.form.temission);
      console.log(" this.form.peclocalWater 2021。12",  this.form.peclocalWater);
      console.log("pecregWater2021.12", this.density.pecregWater);
      this.form.pecaquPredator = 0.5 * (this.density.peclocalWaterAnn+this.density.pecregWater)*this.density.bcfFish *this.density.bmf1;

      this.form.pecaquPredator = this.NumberJudge(this.form.pecaquPredator);
    },
    compute_PECterPredator() {
//测试

//

      if(this.parameter.rhoWorm == null){
        this.parameter.rhoWorm = 1;
      }
      // this.density.bcfWorm = (0.84+0.012*this.density.kow)/this.parameter.rhoWorm;
      // this.density.peclocalSoilPorew =
      //         this.density.peclocalSoil180*
      //   this.parameter.rhoSoil
      //         // this.density.ksoilWater/1000;
      // console.log("2021,12 peclocalSoil180",this.density.peclocalSoil180)
      // console.log("2021,12 this.density.ksoilWater",this.density.ksoilWater)
      // console.log("2021,12 this.parameter.rhoSoil",this.parameter.rhoSoil)
      // console.log("2021,12 this.density.peclocalSoilPorew",this.density.peclocalSoilPorew)
      // if(this.parameter.fgutWorm == null)
      // {
      //   this.parameter.fgutWorm = 0.1;
      // }
      // if(this.density.pecregSoilPorew == null){
      //
      // }
      // if(this.density.pecregSoil == null){
      //   this.density.pecregSoil = 0;
      // }
      // if(this.density.pecregSoilPorew!=null){
      //   this.form.pecterPredator = (0.5*
      //           (this.density.peclocalSoilPorew+this.density.pecregSoilPorew)
      //           *this.density.bcfWorm+
      //           0.5*(this.density.peclocalSoil180+this.density.pecregSoil)
      //           *this.parameter.fgutWorm* this.parameter.convSoil)/
      //           (1+this.parameter.fgutWorm*this.parameter.convSoil);
      // }else {
      //   this.density.pecregSoilPorew=null
      //   this.form.pecterPredator = (0.5*
      //           (this.density.peclocalSoilPorew+this.density.pecregSoilPorew)
      //           *this.density.bcfWorm+
      //           0.5*(this.density.peclocalSoil180+this.density.pecregSoil)
      //           *this.parameter.fgutWorm* this.parameter.convSoil)/
      //           (1+this.parameter.fgutWorm*this.parameter.convSoil);
      // }
      //
      //
      // console.log("2021,12",this.form.pecterPredator)
      // console.log("2021,12",this.density.peclocalSoilPorew)
      // console.log("2021,12 peclocalSoil180",this.density.peclocalSoil180)
      // console.log("2021,12 this.density.ksoilWater",this.density.ksoilWater)
      // console.log("2021,12 this.parameter.rhoSoil",this.parameter.rhoSoil)
      // console.log("2021,12",this.density.pecregSoilPorew)
      // console.log("2021,12",this.density.bcfWorm)
      // console.log("2021,12",this.density.pecregSoil)
      // console.log("2021,12",this.parameter.fgutWorm)
      // console.log("2021,12",this.density.peclocalSoil180)
      // console.log("2021,12",this.parameter.convSoil)
      // this.form.pecterPredator = this.NumberJudge(this.form.pecterPredator);
      this.density.bcfWorm = (0.84+0.012*this.density.kow)/this.parameter.rhoWorm;
      this.density.peclocalSoilPorew = this.density.peclocalSoil180*
          this.parameter.rhoSoil/this.density.ksoilWater/1000;
      if(this.parameter.fgutWorm == null)
      {
        this.parameter.fgutWorm = 0.1;
      }

      this.form.pecterPredator = (0.5*
              (this.density.peclocalSoilPorew+this.density.pecregSoilPorew)
              *this.density.bcfWorm+
              0.5*(this.density.peclocalSoil180+this.density.pecregSoil)
              *this.parameter.fgutWorm* this.parameter.convSoil)/
          (1+this.parameter.fgutWorm*this.parameter.convSoil);
      this.form.pecterPredator = this.NumberJudge(this.form.pecterPredator);
    },
    compute_ADDinh(){
      //ADDinh=PEClocal.air_ann*IRair*ET*EF*ED/(BW*AT)
      if (this.density.cstdAir == null) this.density.cstdAir=0.000278;      //常数

      // if(this.density.fstpAir==null) this.density.fstpAir=0.211;
      // if(this.density.pecregAir == null) this.density.pecregAir = 0;
      //peclocalAirAnn=MAX(Elocal.air,ElocalSTP.air)*Cstd.air*Temission/365+PECreg.air
      this.density.peclocalAirAnn =
          Math.max(Number(this.form.elocalAir),Number(this.form.elocalstpAir))* this.density.cstdAir*this.form.temission/365+this.density.pecregAir;

      this.form.addinh = this.density.peclocalAirAnn*this.parameter.irAir*this.parameter.et*this.parameter.ef*this.parameter.ed/(this.parameter.bw*this.parameter.at);

      this.form.addinh = this.NumberJudge(this.form.addinh);
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

      this.form.addoralWater=Math.max(this.density.PEClocalwater_ann*this.density.fPur,this.form.peclocalGrw)
          *this.parameter.irWater*this.parameter.ef*this.parameter.ed/(this.parameter.bw*this.parameter.at);

      this.form.addoralWater = this.NumberJudge(this.form.addoralWater);
    },
    compute_ADDoralFood() {

      this.density.PEClocalwater_ann=this.form.peclocalWater*this.form.temission/365;

      if(this.density.bcfFish==null)   this.density.bcfFish=42;// {

      this.density.cfish=this.density.PEClocalwater_ann*this.density.bcfFish;

      if(this.parameter.irFish==null) this.parameter.irFish=0.03;
      if(this.parameter.ef==null) this.parameter.ef=365;
      if(this.parameter.ed==null) this.parameter.ed=70;
      if(this.parameter.bw==null) this.parameter.bw=60.6;
      if(this.parameter.at==null) this.parameter.at=25550;
      this.form.addoralFood=((this.density.cfish/1000)*this.parameter.irFish*this.parameter.ef*this.parameter.ed)/(this.parameter.bw*this.parameter.at);

      this.form.addoralFood = this.NumberJudge(this.form.addoralFood);

    },
    compute_ADDT() {
      this.form.addt=Number((Number(this.form.addinh)+Number(this.form.addoralWater)+Number(this.form.addoralFood)).toFixed(7));
      this.form.addt=this.NumberJudge(this.form.addt);
    },
    compute_EnvirmentRcr()  {
      //2022 6.6
      this.form.pecstpRcr = this.NumberJudge(this.form.pecstp/this.pecstpPnec);
      this.form.peclocalWaterRcr = this.NumberJudge(this.form.peclocalWater/this.peclocalWaterPnec);
      this.form.peclocalSedRcr = this.NumberJudge(this.form.peclocalSed/this.peclocalSedPnec);
      this.form.peclocalSoil30Rcr = this.NumberJudge(this.form.peclocalSoil30/this.peclocalSoil30Pnec);
      this.form.peclocalGrwRcr = this.NumberJudge(this.form.peclocalGrw/this.peclocalGrwPnec);
      this.form.pecaquPredatorRcr = this.NumberJudge(this.form.pecaquPredator/this.pecaquPredatorPnec);
      this.form.pecterPredatorRcr = this.NumberJudge(this.form.pecterPredator/this.pecterPredatorPnec);
    },
    compute_HealthRcr(){
      this.form.addinhRcr=this.NumberJudge(Number(this.form.addinh)/Number(this.addtDnel));
      this.form.addoralWaterRcr=this.NumberJudge(this.form.addoralWater/this.addoralWaterDnel);
      this.form.addoralFoodRcr=this.NumberJudge(this.form.addoralFood/this.addoralFoodDnel);
      this.form.addtRcr=this.NumberJudge(Number(this.form.addt)/this.addtDnel);
    },
    setRegional(){
      // console.log("2333333更新了inputR");
      // this.$api.parameter.findByCas({cas:this.$store.getters.getCas}).then((res) => {
      //   this.parameter = res.data;
      //   this.input_R.tenv = res.data.temp+273;
      //   console.log("created_parameter对象:",this.parameter);
      // });
      //
      this.$store.commit('setResultflag',false);

    },

    compute_Kdeg_air_sed(){

      // elocalWater: 0, //直排时为0
      // elocalDirectwater: 0, //进入公共STP时为0
      // elocalAir: 0,
      // elocalstpAir: 0, //经过公共STP处理后大气排放，直排时为0
      // elocalSoil: 0,
      // elocalstpSoil: 0,
      // elocalstpWater: 0, //经过公共STP处理后水排放，直排时为
      //
      //
      //
      // elocalDirectwaterR: null,
      // elocalstpWaterR: null,
      // elocalAirR: null,
      // elocalstpAirR: null,
      // elocalSoilR: null,
      // elocalstpSoilR: null,
      console.log("2021 12月 11:",this.input_R)
      this.input_R.mw = this.density.molw;
      this.input_R.vp = this.density.vp;
      this.input_R.sol = this.density.sol;
      this.input_R.h = this.density.henry;
      this.input_R.kow = this.density.kow;
      this.input_R.koc = this.density.koc;
      this.$api.inputR.findByCas({cas:this.$store.getters.getCas}).then((res) => {
        this.input_R.areg = res.data.areg;
        this.input_R.fareaAir=res.data.fareaAir,
            this.input_R.fareaWater=res.data.fareaWater,
            this.input_R.fareaSed=res.data.fareaSed,
            this.input_R.fareaSoil=res.data.fareaSoil,
            this.input_R.hair=res.data.hair,
            this.input_R.hwater=res.data.hwater,
            this.input_R.hsed=res.data.hsed,
            this.input_R.hsoil=res.data.hsoil,
            console.log("2021 12月22:",this.input_R);
      });

      console.log("ssssssss测试 inputR 赋值   "+this.input_R.mw)
      console.log("*****测试 inputR 赋值   "+this.input_R.vp)
      console.log("*****测试 inputR 赋值   "+this.input_R.sol)
      console.log("*****测试 inputR 赋值   "+this.input_R.h)
      console.log("*****测试 inputR 赋值   "+this.input_R.kow)
      console.log("*****测试 inputR 赋值   "+this.input_R.koc)
      console.log("*****测试 inputR 赋值   "+this.input_R.areg)
      this.density.kdegAir = 1E-20
      this.density.kphotoWater = 1E-20
      this.density.kbioWater = 0.047
      this.density.kdegWater = this.density.khydrWater*24+this.density.kphotoWater+this.density.kbioWater
      this.input_R.kdegAir  = this.density.kdegAir/24
      this.input_R.kdegWater =this.density.kdegWater/24
      this.input_R.kdegSoil = this.density.kbioSoil/24
      this.input_R.kdegSed = this.density.kbioSed/24
      this.input_R.koa = this.density.kow/
          this.density.kairWater

      console.log('R的计算开始点1!!!!!!!!!!!!!!!!!!!!')
      console.log(this.density.kow)
      console.log(this.density.kairWater)
      console.log(this.input_R.koa)
      console.log(this.input_R.kdegSed)
      console.log(this.input_R.kdegSoil)
      // console.log('测试')

      // this.logs()
      // console.log('测试')
      console.log("mmmmmmmmmm");
      console.log("this.input_R.kdegAirthis",this.density.kdegAir)
      console.log("this.input_R.kdegAirthis",this.density.kdegWater)
      console.log("this.input_R.kdegAirthis",this.input_R.kdegWater)
      console.log("this.input_R.kdegAirthis",this.input_R.kdegAir)



      this.input_R.aregsss = this.input_R.areg*1000000
      this.input_R.vair = this.input_R.fareaAir*this.input_R.hair*this.input_R.aregsss
      this.input_R.vwater = this.input_R.fareaWater*this.input_R.hwater*this.input_R.aregsss
      this.input_R.vsoil = this.input_R.fareaSoil*this.input_R.hsoil*this.input_R.aregsss
      this.input_R.vsed = this.input_R.fareaSed*this.input_R.hsed*this.input_R.aregsss
      this.input_R.aair = this.input_R.aregsss*this.input_R.fareaAir
      this.input_R.awater= this.input_R.aregsss*this.input_R.fareaWater
      this.input_R.asoil = this.input_R.aregsss*this.input_R.fareaSoil
      this.input_R.ased = this.input_R.aregsss*this.input_R.fareaSed

      console.log('rrrrsssssssssssssssssssssssss')
      console.log(this.input_R.hair)
      console.log(this.input_R.areg)
      console.log(this.input_R.vair)
      console.log('vwater',this.input_R.vwater)
      console.log('vsoil',this.input_R.vsoil)
      console.log('fareaSoil',this.input_R.fareaSoil)
      console.log('hsoil',this.input_R.hsoil)
      console.log(this.input_R.fareaSed)
      console.log(this.input_R.hsed)
      console.log(this.input_R.vsed)
      console.log(this.input_R.areg)
      console.log(this.input_R.aair)
      console.log(this.input_R.awater)
      console.log(this.input_R.asoil)
      console.log(this.input_R.ased)

      this.parameter_R.vwind = this.parameter.wind
      this.parameter_R.fsolidSoil = this.parameter.fsolidSoil
      this.parameter_R.fwaterSoil = this.parameter.fwaterSoil
      this.parameter_R.fairSoil = this.parameter.fairSoil
      this.parameter_R.rsolid = this.parameter.rhoSolid
      this.parameter_R.rair = this.parameter.rhoAir
      this.parameter_R.rwater = this.parameter.rhoWater
      /*this.parameter_R.rsusp = this.parameter.rhoSusp
      this.parameter_R.rsoil = this.parameter.rhoSoil
      this.parameter_R.rsed = this.parameter.rhoSed*/
      this.parameter_R.focSusp = this.parameter.focSusp
      this.parameter_R.focSoil = this.parameter.focSoil
      this.parameter_R.suspWater = this.parameter.suspWater
      this.parameter_R.aaer = 6*this.parameter_R.tsp/1000000000*this.input_R.aair*this.input_R.hair/this.parameter_R.raer/this.parameter_R.daer
      this.parameter_R.vaer = this.parameter_R.tsp*Math.pow(10,-9)*this.input_R.vair/this.parameter_R.raer
      this.parameter_R.asusp = 6*this.parameter_R.suspWater*0.001*this.input_R.awater*this.input_R.hwater/(this.parameter_R.rsusp*this.parameter_R.dsusp)
      this.parameter_R.vsusp = this.parameter_R.suspWater*0.001*this.input_R.vwater/this.parameter_R.rsusp
      this.parameter_R.kpsoil = this.density.kpSoil    /*多了0.2*/
      this.parameter_R.kpsusp = this.density.kpSusp
      this.parameter_R.kpsed = this.density.kpSed
      this.parameter_R.kpaerAir = Math.pow(10,-11.91)*this.parameter_R.fomAer*this.input_R.koa/(1+4.18*Math.pow(10,-11)*this.parameter_R.fomAer*this.input_R.koa)
      this.parameter_R.koa = this.input_R.koa
      this.parameter_R.kaerAir = Math.pow(10,-2.91)*this.parameter_R.raer*this.parameter_R.fomAer*this.parameter_R.koa
      this.parameter_R.ksoil_water = this.density.ksoilWater
      this.parameter_R.kairWater = this.density.kairWater
      this.parameter_R.vrain = 674/1000/24/365
      this.parameter_R.faerAir = Math.pow(10,-9)*this.parameter_R.tsp/this.parameter_R.raer
      this.parameter_R.vrunoff = this.parameter_R.vrain*this.parameter_R.frunoff
      this.parameter_R.verosion = 0.2/365/24/1000
      this.parameter_R.vnetsed = 0.0004/24/365
      this.parameter_R.vresusp = 0.0001/24/365
      if(this.parameter_R.vwind < 10){
        this.parameter_R.corrAer = 5
      }else{
        this.parameter_R.corrAer = 50
      }
      this.parameter_R.kairAerAir = this.parameter_R.corrAer*this.parameter_R.diffAirAerAir/this.parameter_R.ldiffAirAerAir
      this.parameter_R.kwaterSuspWater = this.parameter_R.corrSusp*this.parameter_R.diffWaterSuspWater/this.parameter_R.ldiffWaterSuspWater
      this.parameter_R.tresid = 0.75*Math.sqrt(this.input_R.aregsss)/(this.parameter_R.vwind*3600)
      this.parameter_R.qwater = this.parameter_R.frunoff*(this.parameter_R.vrain)*this.input_R.aregsss
      this.parameter_R.qair = this.input_R.vair/this.parameter_R.tresid
      this.parameter_R.qaer = this.parameter_R.vaer/this.parameter_R.tresid
      this.parameter_R.qsusp = (this.parameter_R.suspWater*0.001)/this.parameter_R.rsusp*this.parameter_R.qwater
      this.parameter_R.qleach = this.parameter_R.fleach*this.parameter_R.vrain*this.input_R.aregsss




      console.log('ppppppppppppppppppppppppppp')
      console.log(this.parameter_R.vwind)
      console.log(this.parameter_R.fsolidSoil)
      console.log(this.parameter_R.fwaterSoil)
      console.log(this.parameter_R.fairSoil)
      console.log(this.parameter_R.rsolid)
      console.log(this.parameter_R.rair)
      console.log(this.parameter_R.rwater)
      console.log(this.parameter_R.rsusp)
      console.log(this.parameter_R.rsoil)
      console.log(this.parameter_R.rsed)
      console.log(this.parameter_R.focSusp)
      console.log(this.parameter_R.focSoil)
      console.log(this.parameter_R.suspWater)
      console.log(this.parameter_R.aaer)
      console.log('vaer:',this.parameter_R.vaer)
      console.log(this.parameter_R.asusp)
      console.log(this.parameter_R.vsusp)
      console.log('kpsoil:',this.parameter_R.kpsoil)
      console.log('kpsusp:',this.parameter_R.kpsusp)
      console.log('kpsed:',this.parameter_R.kpsed)
      console.log(this.parameter_R.kpaerAir)
      console.log(this.parameter_R.koa)
      console.log('kaerAir',this.parameter_R.kaerAir)
      console.log(this.parameter_R.ksoil_water)
      console.log(this.parameter_R.kairWater)
      console.log(this.parameter_R.kairWaterAir)
      console.log(this.parameter_R.kairWaterWater)
      console.log(this.parameter_R.vrain)
      console.log(this.parameter_R.qscaAer)
      console.log(this.parameter_R.faerAir)
      console.log(this.parameter_R.vdepAer)
      console.log('kairSoilAir:',this.parameter_R.kairSoilAir)
      console.log('vrunoff:',this.parameter_R.vrunoff)
      console.log('verosion:',this.parameter_R.verosion)
      console.log('kwaterSedWater:',this.parameter_R.kwaterSedWater)
      console.log('vnetsed:',this.parameter_R.vnetsed)
      console.log('vresusp:',this.parameter_R.vresusp)
      console.log('corrAer:',this.parameter_R.corrAer)
      console.log('diffAirAerAir:',this.parameter_R.diffAirAerAir)
      console.log('ldiffAirAerAir:',this.parameter_R.ldiffAirAerAir)
      console.log('kairAerAir:',this.parameter_R.kairAerAir)
      console.log('corrSusp:',this.parameter_R.corrSusp)
      console.log('diffWaterSuspWater:',this.parameter_R.diffWaterSuspWater)
      console.log('ldiffWaterSuspWater:',this.parameter_R.ldiffWaterSuspWater)
      console.log('kwaterSuspWater:',this.parameter_R.kwaterSuspWater)
      console.log('tttttttttttttttttttttttttttt')
      console.log('tresid:',this.parameter_R.tresid)
      console.log('qwater:',this.parameter_R.qwater)
      console.log('frunoff:',this.parameter_R.frunoff)
      console.log('fleach:',this.parameter_R.fleach)
      console.log('qair:',this.parameter_R.qair)
      console.log('qaer:',this.parameter_R.qaer)
      console.log('qsusp:',this.parameter_R.qsusp)
      console.log('qleach:',this.parameter_R.qleach)
      console.log('ksoilWater:',this.parameter_R.ksoilWater)
      console.log('ksoilAir:',this.parameter_R.ksoilAir)
      this.input_R.tenv = this.parameter.temp+273
      this.input_R.h = this.density.henry
      this.zd_R.zair = 1/(this.input_R.r *this.input_R.tenv)
      this.zd_R.zwater = 1/this.input_R.h

      this.zd_R.zsoil = this.parameter_R.kpsoil*
          this.parameter_R.rsoil/1000*this.zd_R.zwater
      this.zd_R.zsed  = this.parameter_R.kpsed*this.parameter_R.rsed/1000*this.zd_R.zwater
      this.zd_R.zaer  = this.parameter_R.kaerAir*this.zd_R.zair
      this.zd_R.zsusp = this.parameter_R.kpsusp*this.parameter_R.rsusp/1000*this.zd_R.zwater
      console.log('sssssssssssssssssssssssss')
      console.log('检查input')
      console.log(this.input_R.h)
      console.log(this.parameter_R.kpsoil,
          this.parameter_R.rsoil,
          this.zd_R.zwater)
      console.log(this.input_R.r)
      console.log(this.input_R.tenv)
      console.log(this.zd_R.zair)
      console.log(this.zd_R.zwater)
      console.log(this.zd_R.zsoil)
      console.log(this.zd_R.zsed)
      console.log(this.zd_R.zaer)
      console.log(this.zd_R.zsusp)


      this.zd_R.ddAirWater = 1/(
          1/(this.parameter_R.kairWaterAir*
              this.zd_R.zair*this.input_R.aair)+
          1/(this.parameter_R.kairWaterWater*this.input_R.awater*this.zd_R.zwater)
      )
      this.zd_R.dwetdepGasWater = this.input_R.awater*this.parameter_R.vrain*this.zd_R.zwater
      this.zd_R.dairWater = this.zd_R.ddAirWater+this.zd_R.dwetdepGasWater
      this.zd_R.dwaterAir = this.zd_R.ddAirWater
      console.log('sssssssssssssssssssssssss')
      console.log(this.parameter_R.kairWaterAir)
      console.log(this.parameter_R.kairWaterWater)
      console.log(this.input_R.awater)
      console.log(this.zd_R.ddAirWater)
      console.log(this.zd_R.dwetdepGasWater)
      console.log(this.zd_R.dairWater)
      console.log(this.zd_R.dwaterAir)

      //=1/(1/(kair_soil.air*Asoil*Zair)+1/(Asoil*(ksoil.air*Zair+ksoil.water*Zwater)))
      this.zd_R.ddAirSoil = 1/
          (1/ (this.parameter_R.kairSoilAir*this.zd_R.zair*this.input_R.asoil)
              +
              1/(this.input_R.asoil *(this.parameter_R.ksoilAir*this.zd_R.zair+this.parameter_R.ksoilWater*this.zd_R.zwater)))

      this.zd_R.dwetdepGasSoil = this.input_R.asoil*this.parameter_R.vrain*this.zd_R.zwater
      this.zd_R.dairSoil = this.zd_R.ddAirSoil+this.zd_R.dwetdepGasSoil
      this.zd_R.dsoilAir = this.zd_R.ddAirSoil
      console.log('sssssssssssssssssssssssss')
      console.log(this.zd_R.ddAirSoil)
      console.log(this.zd_R.dwetdepGasSoil)
      console.log(this.zd_R.dairSoil)
      console.log(this.zd_R.dsoilAir)

      this.zd_R.dwetdepAerSusp = this.input_R.awater*this.parameter_R.vrain*this.parameter_R.qscaAer*this.parameter_R.faerAir*this.zd_R.zaer
      this.zd_R.ddrydepAerSusp = this.input_R.awater*this.parameter_R.vdepAer*this.parameter_R.faerAir*this.zd_R.zaer
      this.zd_R.daerSusp = this.zd_R.dwetdepAerSusp+this.zd_R.ddrydepAerSusp
      this.zd_R.dwetdepAerSoil = this.input_R.asoil*this.parameter_R.vrain*this.parameter_R.qscaAer*this.parameter_R.faerAir*this.zd_R.zaer
      this.zd_R.ddrydepAerSoil = this.input_R.asoil*this.parameter_R.vdepAer*this.parameter_R.faerAir*this.zd_R.zaer
      this.zd_R.daerSoil = this.zd_R.dwetdepAerSoil+this.zd_R.ddrydepAerSoil

      console.log('dwetdepAerSusp',this.zd_R.dwetdepAerSusp)
      console.log('ddrydepAerSusp',this.zd_R.ddrydepAerSusp)
      console.log('daerSusp',this.zd_R.daerSusp)
      console.log('dwetdepAerSoil',this.zd_R.dwetdepAerSoil)
      console.log('ddrydepAerSoil',this.zd_R.ddrydepAerSoil)
      console.log('daerSoil',this.zd_R.daerSoil)
      console.log('asoil',this.input_R.asoil)
      console.log('vrain',this.parameter_R.vrain)
      console.log('qscaAer',this.parameter_R.qscaAer)
      console.log('faerAir',this.parameter_R.faerAir)
      console.log('zaer',this.zd_R.zaer)

      this.zd_R.dairAer = this.parameter_R.aaer*this.parameter_R.kairAerAir*this.zd_R.zair
      this.zd_R.daerAir = this.zd_R.dairAer

      console.log('dairAer',this.zd_R.dairAer)
      console.log('daerAir',this.zd_R.daerAir)

      this.zd_R.drunoff = this.input_R.asoil*this.parameter_R.vrunoff*this.zd_R.zwater
      this.zd_R.dsoilWater = this.zd_R.drunoff
      this.zd_R.derosion = this.input_R.asoil*this.parameter_R.verosion*this.zd_R.zsoil
      this.zd_R.dsoilSusp = this.zd_R.derosion
      this.zd_R.ddWaterSusp = this.parameter_R.asusp*this.parameter_R.kwaterSuspWater*this.zd_R.zwater
      this.zd_R.dwaterSusp = this.zd_R.ddWaterSusp
      this.zd_R.dsuspWater = this.zd_R.ddWaterSusp

      console.log('drunoff',this.zd_R.drunoff)
      console.log('dsoilWater',this.zd_R.dsoilWater)
      console.log('derosion',this.zd_R.derosion)
      console.log(this.zd_R.dsoilSusp)
      console.log(this.zd_R.ddWaterSusp)
      console.log(this.zd_R.dwaterSusp)
      console.log(this.zd_R.dsuspWater)


      this.zd_R.ddWaterSed = this.parameter_R.kwaterSedWater*this.input_R.awater*this.zd_R.zwater
      this.zd_R.dwaterSed = this.zd_R.ddWaterSed
      this.zd_R.dsedWater = this.zd_R.ddWaterSed
      this.zd_R.dresusp = this.parameter_R.vresusp*this.input_R.awater*this.zd_R.zsed
      this.zd_R.dnetsed = this.parameter_R.vnetsed*this.input_R.awater*this.zd_R.zsusp
      this.zd_R.dsedSusp = this.zd_R.dresusp
      this.zd_R.dsuspSed = this.zd_R.dnetsed
      this.zd_R.ddegAir = this.input_R.kdegAir*this.input_R.vair*this.zd_R.zair
      this.zd_R.ddegWater = this.input_R.kdegWater*this.input_R.vwater*this.zd_R.zwater
      this.zd_R.ddegSoil = this.input_R.kdegSoil*this.input_R.vsoil*this.zd_R.zsoil
      this.zd_R.ddegSed = this.input_R.kdegSed*this.input_R.vsed*this.zd_R.zsed
      this.zd_R.ddegaer = this.input_R.kdegAer*this.parameter_R.vaer*this.zd_R.zaer
      this.zd_R.ddegSusp = this.input_R.kdegSusp*this.parameter_R.vsusp*this.zd_R.zsusp


      console.log(this.zd_R.ddWaterSed)
      console.log(this.zd_R.dwaterSed )
      console.log(this.zd_R.dsedWater)
      console.log(this.zd_R.dresusp)
      console.log(this.zd_R.dnetsed)
      console.log(this.zd_R.dsedSusp)
      console.log(this.zd_R.dsuspSed)
      console.log(this.zd_R.ddegAir)
      console.log(this.zd_R.ddegWater)
      console.log('ddegsoil',this.zd_R.ddegSoil)
      console.log('ddegsed',this.zd_R.ddegSed)
      console.log('ddegaer',this.zd_R.ddegaer)
      console.log(this.zd_R.ddegSusp)

      console.log('kdegSoil',this.input_R.kdegSoil)
      console.log('vsoil',this.input_R.vsoil)
      console.log('kbioSoil',this.density.kbioSoil)

      console.log('qqqqqqqqqqqqqqqqq')
      console.log('kdegsed',this.input_R.kdegSed)
      console.log('vsed',this.input_R.vsed)
      console.log(this.density.kbioSed)

      this.zd_R.dadvAir = this.parameter_R.qair*this.zd_R.zair
      this.zd_R.dadvWaer = this.parameter_R.qwater*this.zd_R.zwater
      this.zd_R.dadvAer = this.parameter_R.qaer*this.zd_R.zaer
      this.zd_R.dadvSusp = this.parameter_R.qsusp*this.zd_R.zsusp
      this.zd_R.dleach = this.parameter_R.qleach*this.zd_R.zwater

      console.log(this.zd_R.dadvAir)
      console.log(this.zd_R.dadvWaer)
      console.log(this.zd_R.dadvAer)
      console.log(this.zd_R.dadvSusp)
      console.log(this.zd_R.dleach)

      this.zd_R.dt1 = this.zd_R.dairWater+this.zd_R.dairSoil+this.zd_R.dairAer+this.zd_R.ddegAir+this.zd_R.dadvAir
      this.zd_R.dt2 = this.zd_R.dwaterAir+this.zd_R.dwaterSed+this.zd_R.dwaterSusp+this.zd_R.ddegWater+this.zd_R.dadvWaer
      this.zd_R.dt3 = this.zd_R.dsoilAir+this.zd_R.dsoilWater+this.zd_R.dsoilSusp+this.zd_R.ddegSoil+this.zd_R.dleach
      this.zd_R.dt4 = this.zd_R.dsedWater+this.zd_R.dsedSusp+this.zd_R.ddegSed
      this.zd_R.dt5 = this.zd_R.daerSoil+this.zd_R.daerAir+this.zd_R.daerSusp+this.zd_R.ddegAer+this.zd_R.dadvAer
      this.zd_R.dt6 = this.zd_R.dsuspWater+this.zd_R.dsuspSed+this.zd_R.ddegSusp+this.zd_R.dadvSusp

      console.log(this.zd_R.dt1)
      console.log(this.zd_R.dt2)
      console.log(this.zd_R.dt3)
      console.log(this.zd_R.dt4)
      console.log(this.zd_R.dt5)
      console.log(this.zd_R.dt6)

      console.log('mwsssss',this.input_R.mw)




      // this.result_R.eairRegional =
      // this.result_R.ewaterRegional =
      // // this.result_R.esoilRegional =
      // this.Add_Blowdown();



      //   console.log("end 1111111111")
      //   console.log(this.result_R.eairRegional)
      //   console.log(this.result_R.ewaterRegional)
      //   console.log(this.result_R.esoilRegional)
      //   this.result_R.eaerRegional = 0
      //   this.result_R.esuspRegional = 0
      //
      //
      //
      //
      //
      //
      //
      //
      //   this.input_R.eairRegional = this.result_R.eairRegional*1000/(this.input_R.mw*24)+this.parameter_R.qair*this.input_R.cinAir/(1+this.parameter_R.kpaerAir*this.parameter_R.tsp)
      //   this.input_R.ewaterRegional = this.result_R.ewaterR*1000/(this.input_R.mw*24)+this.parameter_R.qwater*this.input_R.cinWater/(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))
      //   this.input_R.esoilRegional = (this.result_R.esoilRegional)*1000/this.input_R.mw/24
      //   this.input_R.eaerRegional = this.parameter_R.qair*this.input_R.cinAir*this.parameter_R.kpaerAir*this.parameter_R.tsp/(1+this.parameter_R.kpaerAir*this.parameter_R.tsp)
      //   this.input_R.esuspRegional = this.parameter_R.qwater*this.input_R.cinWater*this.parameter_R.kpsusp*this.parameter_R.suspWater*Math
      //     .pow(10,-6)/(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))
      //   this.input_R.esedRegional = 0
      //
      //   console.log('eairRegional2333333333',this.input_R.eairRegional)
      //   console.log(this.input_R.ewaterRegional)
      //   console.log(this.input_R.esoilRegional)
      //   console.log(this.input_R.eaerRegional)
      //   console.log(this.input_R.esuspRegional)
      //
      //   this.square=[
      //     [-this.zd_R.dt1,this.zd_R.dwaterAir,this.zd_R.dsoilAir,0,this.zd_R.daerAir,0],
      //     [this.zd_R.dairWater,-this.zd_R.dt2,this.zd_R.dsoilWater,this.zd_R.dsedWater,0,this.zd_R.dsuspWater],
      //     [this.zd_R.dairSoil,0,-this.zd_R.dt3,0,this.zd_R.daerSoil,0,],
      //     [0,this.zd_R.dwaterSed,0,-this.zd_R.dt4,0,this.zd_R.dsuspSed],
      //     [this.zd_R.dairAer,0,0,0,-this.zd_R.dt5,0],
      //     [0,this.zd_R.dwaterSusp,this.zd_R.dsoilSusp,this.zd_R.dsedSusp,this.zd_R.daerSusp,-this.zd_R.dt6]]
      //
      //   console.log("this.square",-this.zd_R.dt1,this.zd_R.dwaterAir,this.zd_R.dsoilAir,0,this.zd_R.daerAir,0)
      //   console.log("this.square",this.zd_R.dairWater,-this.zd_R.dt2,this.zd_R.dsoilWater,this.zd_R.dsedWater,0,this.zd_R.dsuspWater)
      //   console.log("this.square",this.zd_R.dairSoil,0,-this.zd_R.dt3,0,this.zd_R.daerSoil,0,)
      //   console.log("this.square",0,this.zd_R.dwaterSed,0,-this.zd_R.dt4,0,this.zd_R.dsuspSed)
      //   console.log("this.square",this.zd_R.dairAer,0,0,0,-this.zd_R.dt5,0)
      //   console.log("this.square",0,this.zd_R.dwaterSusp,this.zd_R.dsoilSusp,this.zd_R.dsedSusp,this.zd_R.daerSusp,-this.zd_R.dt6)
      //
      //
      //   this.inv_square = this.inv(this.square)
      //   console.log("this.inv_square",this.inv_square)
      //
      //   this.m_square = [
      //     [-this.input_R.eairRegional],
      //     [-this.input_R.ewaterRegional],
      //     [-this.input_R.esoilRegional],
      //     [-this.input_R.esedRegional],
      //     [-this.input_R.eaerRegional],
      //     [-this.input_R.esuspRegional]]
      //
      //   console.log("this.m_squarethis.m_squarethis.m_squarethis.m_square ",this.m_square)
      //
      //   this.f_square = this.multiply(this.inv_square,this.m_square)
      //   console.log("2333333333333:  ",this.f_square)
      //
      //   this.compute_R.fair = this.f_square[0][0]
      //   this.compute_R.fwater = this.f_square[1][0]
      //   this.compute_R.fsoil = this.f_square[2][0]
      //   this.compute_R.fsed = this.f_square[3][0]
      //   this.compute_R.faer = this.f_square[4][0]
      //   this.compute_R.fsusp = this.f_square[5][0]
      //
      //   console.log('********',this.compute_R.fair)
      //   console.log('********',this.compute_R.fwater)
      //   console.log('********',this.compute_R.fsoil)
      //   console.log('********',this.compute_R.fsed)
      //   console.log('********',this.compute_R.fsusp)
      //
      //
      //   this.compute_R.cairR = this.zd_R.zair*this.compute_R.fair
      //   this.compute_R.caerR = this.zd_R.zaer*this.compute_R.faer
      //   this.compute_R.cwaterR = this.zd_R.zwater*this.compute_R.fwater
      //   this.compute_R.csuspR = this.zd_R.zsusp*this.compute_R.fsusp
      //   this.compute_R.csoilR = this.zd_R.zsoil*this.compute_R.fsoil
      //   this.compute_R.csedR = this.zd_R.zsed*this.compute_R.fsed
      //
      //   console.log(this.compute_R.cairR)
      //   console.log(this.compute_R.caerR)
      //   console.log(this.compute_R.cwaterR)
      //   console.log(this.compute_R.csuspR)
      //   console.log(this.compute_R.csoilR)
      //   console.log(this.compute_R.csedR)
      //
      //   this.compute_R.nair = this.compute_R.cairR*this.input_R.vair
      //   this.compute_R.naer = this.compute_R.caerR*this.parameter_R.vaer
      //   this.compute_R.nwater = this.compute_R.cwaterR*this.input_R.vwater
      //   this.compute_R.nsusp = this.compute_R.csuspR*this.parameter_R.vsusp
      //   this.compute_R.nsoil = this.compute_R.csoilR*this.input_R.vsoil
      //   this.compute_R.nsed = this.compute_R.csedR*this.input_R.vsed
      //   this.compute_R.ntotal = this.compute_R.nair+this.compute_R.naer+this.compute_R.nwater+this.compute_R.nsusp+this.compute_R.nsoil+this.compute_R.nsed
      //   console.log('********')
      //   console.log(this.compute_R.nair)
      //   console.log(this.compute_R.naer)
      //   console.log(this.compute_R.nwater)
      //   console.log(this.compute_R.nsusp)
      //   console.log(this.compute_R.nsoil)
      //   console.log(this.compute_R.nsed )
      //   console.log(this.compute_R.ntotal)
      //
      //   this.compute_R.air = this.compute_R.nair/this.compute_R.ntotal
      //   this.compute_R.aerosol = this.compute_R.naer/this.compute_R.ntotal
      //   this.compute_R.water = this.compute_R.nwater/this.compute_R.ntotal
      //   this.compute_R.suspend = this.compute_R.nsusp/this.compute_R.ntotal
      //   this.compute_R.soil = this.compute_R.nsoil/this.compute_R.ntotal
      //   this.compute_R.sediment = this.compute_R.nsed/this.compute_R.ntotal
      //
      //   console.log(this.compute_R.air)
      //   console.log(this.compute_R.aerosol)
      //   console.log(this.compute_R.water)
      //   console.log(this.compute_R.suspend)
      //   console.log(this.compute_R.soil)
      //   console.log(this.compute_R.sediment)
      //
      //   this.result_R.pecairR = (this.compute_R.cairR+this.compute_R.caerR*this.parameter_R.faerAir)*this.input_R.mw*1000
      //   this.result_R.pecwaterR = this.compute_R.cwaterR*(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))*this.input_R.mw
      //   this.result_R.pecsoilR = this.compute_R.csoilR*this.input_R.mw/(0.001*this.parameter_R.rsoil)
      //   this.result_R.pecsedR = this.compute_R.csedR*this.input_R.mw/(0.001*this.parameter_R.rsed)
      //   this.result_R.pecgroundR =
      //     this.result_R.pecsoilR*
      //     this.parameter_R.rsoil/
      //     (this.parameter_R.ksoil_water*1000)
      //   console.log("end end  end ")
      //   console.log(this.result_R.pecsoilR)
      //   console.log(this.parameter_R.rsoil)
      //   console.log(this.parameter_R.ksoilWater)
      //   console.log(this.result_R.pecgroundR)
      //
      //
      //
      //
      //   console.log("最后大检查")
      //   console.log(this.input_R)
      //
      // },
      //
      // // 在分割出一步计算保存
      // //分割出的计算保存主要用来计算 R的所有
      // // 改变result_R 增加排放量中的这几个中间参数
      // // 点击计算以后先获取output的值  Add_Blowdown（）
      // // 在计算R_Totalcomputes（）
      //
      // computes_R() {
      //   console.log("获取output")
      //   console.log("获取output")
      //
      //
    },
    R_computesend(){
      console.log("end 1111111111")
      console.log(this.result_R.esoilRegional)
      console.log(this.result_R.eairRegional)
      console.log(this.result_R.ewaterRegional)
      console.log(typeof (this.result_R.ewaterRegional))
      console.log(typeof (this.input_R.mw))
      console.log('mw',this.input_R.mw)

      // this.result_R.eairRegional = 89.64067517
      // this.result_R.ewaterRegional = 8.31E+01
      // this.result_R.esoilRegional =3.11E+01+11.4
      // this.result_R.eaerRegional = 0
      // this.result_R.esuspRegional = 0
      // console.log(this.result_R.eairRegional)
      // console.log(this.result_R.ewaterRegional)
      // console.log(this.result_R.esoilRegional)

      this.input_R.eairRegional = this.result_R.eairRegional*1000/(this.input_R.mw*24)+this.parameter_R.qair*this.input_R.cinAir/(1+this.parameter_R.kpaerAir*this.parameter_R.tsp)
      this.input_R.ewaterRegional = this.result_R.ewaterRegional*1000/(this.input_R.mw*24)+this.parameter_R.qwater*this.input_R.cinWater/(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))
      this.input_R.esoilRegional = (this.result_R.esoilRegional)*1000/this.input_R.mw/24
      // this.input_R.eairRegional = 488.8*1000/(this.input_R.mw*24)+this.parameter_R.qair*this.input_R.cinAir/(1+this.parameter_R.kpaerAir*this.parameter_R.tsp)
      // this.input_R.ewaterRegional = 56.4*1000/(this.input_R.mw*24)+this.parameter_R.qwater*this.input_R.cinWater/(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))
      // this.input_R.esoilRegional =210.6*1000/this.input_R.mw/24
      this.input_R.eaerRegional = this.parameter_R.qair*this.input_R.cinAir*this.parameter_R.kpaerAir*this.parameter_R.tsp/(1+this.parameter_R.kpaerAir*this.parameter_R.tsp)
      this.input_R.esuspRegional = this.parameter_R.qwater*this.input_R.cinWater*this.parameter_R.kpsusp*this.parameter_R.suspWater*Math
          .pow(10,-6)/(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))
      this.input_R.esedRegional = 0

      console.log('eairRegional2333333333', this.input_R.eairRegional)
      console.log(this.input_R.ewaterRegional)
      console.log(this.input_R.esoilRegional)
      console.log(this.input_R.eaerRegional)
      console.log(this.input_R.esuspRegional)

      this.square=[
        [-this.zd_R.dt1,this.zd_R.dwaterAir,this.zd_R.dsoilAir,0,this.zd_R.daerAir,0],
        [this.zd_R.dairWater,-this.zd_R.dt2,this.zd_R.dsoilWater,this.zd_R.dsedWater,0,this.zd_R.dsuspWater],
        [this.zd_R.dairSoil,0,-this.zd_R.dt3,0,this.zd_R.daerSoil,0,],
        [0,this.zd_R.dwaterSed,0,-this.zd_R.dt4,0,this.zd_R.dsuspSed],
        [this.zd_R.dairAer,0,0,0,-this.zd_R.dt5,0],
        [0,this.zd_R.dwaterSusp,this.zd_R.dsoilSusp,this.zd_R.dsedSusp,this.zd_R.daerSusp,-this.zd_R.dt6]]

      console.log("this.square",-this.zd_R.dt1,this.zd_R.dwaterAir,this.zd_R.dsoilAir,0,this.zd_R.daerAir,0)
      console.log("this.square",this.zd_R.dairWater,-this.zd_R.dt2,this.zd_R.dsoilWater,this.zd_R.dsedWater,0,this.zd_R.dsuspWater)
      console.log("this.square",this.zd_R.dairSoil,0,-this.zd_R.dt3,0,this.zd_R.daerSoil,0,)
      console.log("this.square",0,this.zd_R.dwaterSed,0,-this.zd_R.dt4,0,this.zd_R.dsuspSed)
      console.log("this.square",this.zd_R.dairAer,0,0,0,-this.zd_R.dt5,0)
      console.log("this.square",0,this.zd_R.dwaterSusp,this.zd_R.dsoilSusp,this.zd_R.dsedSusp,this.zd_R.daerSusp,-this.zd_R.dt6)


      this.inv_square = this.inv(this.square)
      console.log("this.inv_square",this.inv_square)

      this.m_square = [
        [-this.input_R.eairRegional],
        [-this.input_R.ewaterRegional],
        [-this.input_R.esoilRegional],
        [-this.input_R.esedRegional],
        [-this.input_R.eaerRegional],
        [-this.input_R.esuspRegional]]

      console.log("this.m_squarethis.m_squarethis.m_squarethis.m_square ",this.m_square)

      this.f_square = this.multiply(this.inv_square,this.m_square)
      console.log("2333333333333:  ",this.f_square)

      this.compute_R.fair = this.f_square[0][0]
      this.compute_R.fwater = this.f_square[1][0]
      this.compute_R.fsoil = this.f_square[2][0]
      this.compute_R.fsed = this.f_square[3][0]
      this.compute_R.faer = this.f_square[4][0]
      this.compute_R.fsusp = this.f_square[5][0]

      console.log('********',this.compute_R.fair)
      console.log('********',this.compute_R.fwater)
      console.log('********',this.compute_R.fsoil)
      console.log('********',this.compute_R.fsed)
      console.log('********',this.compute_R.fsusp)


      this.compute_R.cairR = this.zd_R.zair*this.compute_R.fair
      this.compute_R.caerR = this.zd_R.zaer*this.compute_R.faer
      this.compute_R.cwaterR = this.zd_R.zwater*this.compute_R.fwater
      this.compute_R.csuspR = this.zd_R.zsusp*this.compute_R.fsusp
      this.compute_R.csoilR = this.zd_R.zsoil*this.compute_R.fsoil
      this.compute_R.csedR = this.zd_R.zsed*this.compute_R.fsed

      console.log(this.compute_R.cairR)
      console.log(this.compute_R.caerR)
      console.log(this.compute_R.cwaterR)
      console.log(this.compute_R.csuspR)
      console.log(this.compute_R.csoilR)
      console.log(this.compute_R.csedR)

      this.compute_R.nair = this.compute_R.cairR*this.input_R.vair
      this.compute_R.naer = this.compute_R.caerR*this.parameter_R.vaer
      this.compute_R.nwater = this.compute_R.cwaterR*this.input_R.vwater
      this.compute_R.nsusp = this.compute_R.csuspR*this.parameter_R.vsusp
      this.compute_R.nsoil = this.compute_R.csoilR*this.input_R.vsoil
      this.compute_R.nsed = this.compute_R.csedR*this.input_R.vsed
      this.compute_R.ntotal = this.compute_R.nair+this.compute_R.naer+this.compute_R.nwater+this.compute_R.nsusp+this.compute_R.nsoil+this.compute_R.nsed
      console.log('********')
      console.log(this.compute_R.nair)
      console.log(this.compute_R.naer)
      console.log(this.compute_R.nwater)
      console.log(this.compute_R.nsusp)
      console.log(this.compute_R.nsoil)
      console.log(this.compute_R.nsed )
      console.log(this.compute_R.ntotal)

      this.compute_R.air = this.compute_R.nair/this.compute_R.ntotal
      this.compute_R.aerosol = this.compute_R.naer/this.compute_R.ntotal
      this.compute_R.water = this.compute_R.nwater/this.compute_R.ntotal
      this.compute_R.suspend = this.compute_R.nsusp/this.compute_R.ntotal
      this.compute_R.soil = this.compute_R.nsoil/this.compute_R.ntotal
      this.compute_R.sediment = this.compute_R.nsed/this.compute_R.ntotal

      console.log(this.compute_R.air)
      console.log(this.compute_R.aerosol)
      console.log(this.compute_R.water)
      console.log(this.compute_R.suspend)
      console.log(this.compute_R.soil)
      console.log(this.compute_R.sediment)

      this.result_R.pecairR = this.NumberJudge(
          (this.compute_R.cairR+this.compute_R.caerR*this.parameter_R.faerAir)*this.input_R.mw*1000)
      this.result_R.pecwaterR = this.NumberJudge(
          this.compute_R.cwaterR*(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))*this.input_R.mw)
      this.result_R.pecsoilR = this.NumberJudge(this.compute_R.csoilR*this.input_R.mw/(0.001*this.parameter_R.rsoil))
      this.result_R.pecsedR = this.NumberJudge(this.compute_R.csedR*this.input_R.mw/(0.001*this.parameter_R.rsed))
      this.result_R.pecgroundR =this.NumberJudge(
          this.result_R.pecsoilR*
          this.parameter_R.rsoil/
          (this.parameter_R.ksoil_water*1000))
      console.log("end end  end ")
      console.log(this.result_R.pecsoilR)
      console.log(this.parameter_R.rsoil)
      console.log(this.parameter_R.ksoilWater)
      console.log(this.result_R.pecgroundR)

      this.result_R.eairRegional = this.NumberJudge(this.result_R.eairRegional)
      this.result_R.ewaterRegional = this.NumberJudge(this.result_R.ewaterRegional)
      this.result_R.esoilRegional  =this.NumberJudge(this.result_R.esoilRegional)
      this.result_R.esedRegional   =this.NumberJudge(this.result_R.esedRegional)
      this.result_R.eaerRegional   = this.NumberJudge(this.result_R.eaerRegional)
      this.result_R.esuspRegional  =this.NumberJudge(this.result_R.esuspRegional)
      this.result_R.estpSoilRegional =this.NumberJudge(this.result_R.estpSoilRegional)




      //
      //  this.density.pecregAir = this.result_R.pecairR
      //  this.density.pecregWater = this.result_R.pecwaterR
      //  this.density.pecregSoil = this.result_R.pecsoilR
      //  this.density.pecregSoilPorew = this.result_R.pecgroundR
      //  console.log("2021.12。2x",this.result_R.pecgroundR)
      //
      //  this.density.peclocalAirAnn =Math.max(Number(this.form.elocalAir),Number(this.form.elocalstpAir))* this.density.cstdAir*this.form.temission/365+this.density.pecregAir;
      //  this.form.addinh = this.NumberJudge(this.form.addinh);
      //
      //  this.density.peclocalWater =
      //          this.density.clocalWater +
      //          this.density.clocalDirectwater +
      //          this.density.pecregWater;
      //
      //
      // // 马蜂窝！
      //  this.density.peclocalWaterAnn =
      //          (this.density.clocalWater+this.density.clocalDirectwater) *
      //          this.form.temission/365 +this.density.pecregWater;
      //  this.form.pecaquPredator = 0.5 * (this.density.peclocalWaterAnn+this.density.pecregWater)*this.density.bcfFish *this.density.bmf1;
      //  this.density.peclocalSoil180=
      //          this.density.dair/this.density.kSoil+1/this.density.kSoil/
      //          180*(this.density.csoilFive0-this.density.dair/this.density.kSoil)*
      //          (1-Math.exp(-1*this.density.kSoil*180)) +
      //          this.density.pecregSoil;
      //
      //
      //
      //  this.compute_PECstp();
      //  this.compute_PEClocalwater();
      //  console.log("2021.12.01 this.form.peclocalWater",this.form.peclocalWater)
      //  this.compute_PEClocalsed();
      //  console.log("2021.12.02 this.form.peclocalWater",this.form.peclocalWater)
      //  this.compute_PEClocalsoli30();
      //
      //  this.compute_PEClocalgrw();
      //
      //  this.compute_PECaquPredator();
      //  this.density.peclocalWaterAnn =
      //          (this.density.clocalWater+this.density.clocalDirectwater) *
      //          this.form.temission/365 +this.density.pecregWater;
      //
      //
      //  this.form.pecaquPredator = 0.5 *
      //          (this.density.peclocalWaterAnn+
      //                  this.density.pecregWater)*
      //          this.density.bcfFish *this.density.bmf1;
      //
      //  console.log("2021.12.05 this.density.peclocalWaterAnn",      this.density.peclocalWaterAnn)
      //  console.log("this.density.clocalWater",this.density.clocalWater)
      //  console.log("2020    12.  5this.form.elocalDirectwater",this.form.elocalDirectwater)
      //  console.log("2021.12.     05 this.density.clocalDirectwater",this.density.clocalDirectwater)
      //  console.log("2021.12.     05 this.density.bmf1",this.density.bmf1)
      //  console.log("2021.12.     05 this.density.bcfFish",this.density.bcfFish)
      //  console.log("2021.12.05 this.density.pecregWater",this.density.pecregWater)
      //  console.log("2021.12.05  this.form.pecaquPredator", this.form.pecaquPredator)
      //  this.density.peclocalSoil180= this.density.dair/this.density.kSoil+1/this.density.kSoil/
      //          180*(this.density.csoilFive0-this.density.dair/this.density.kSoil)*(1-Math.exp(-1*this.density.kSoil*180)) +this.density.pecregSoil;
      //  this.compute_PECterPredator();
      //  this.density.pecregSoilPorew = this.result_R.pecgroundR
      //  this.form.pecterPredator = (0.5*
      //          (this.density.peclocalSoilPorew+this.density.pecregSoilPorew)
      //          *this.density.bcfWorm+
      //          0.5*(this.density.peclocalSoil180+this.density.pecregSoil)
      //          *this.parameter.fgutWorm* this.parameter.convSoil)/
      //          (1+this.parameter.fgutWorm*this.parameter.convSoil);
      //
      //
      //  this.compute_ADDinh();
      //  this.compute_ADDoralWater();
      //  this.compute_ADDoralFood();
      //  this.compute_ADDT();
      //
      //  this.compute_EnvirmentRcr();
      //  this.compute_HealthRcr();
      //  console.log("最后大检查")
      //  console.log(this.input_R)
      //  console.log(this.density.peclocalSoil180)
      //  console.log(this.density.peclocalSoil30)
      //  console.log(this.form.pecterPredator)

    },
    R_computesend2(){
      console.log("end 1111111111")
      console.log(this.result_R.esoilRegional)
      console.log(this.result_R.eairRegional)
      console.log(this.result_R.ewaterRegional)
      console.log(typeof (this.result_R.ewaterRegional))
      console.log(typeof (this.input_R.mw))
      console.log('mw',this.input_R.mw)

      // this.result_R.eairRegional = 89.64067517
      // this.result_R.ewaterRegional = 8.31E+01
      // this.result_R.esoilRegional =3.11E+01+11.4
      // this.result_R.eaerRegional = 0
      // this.result_R.esuspRegional = 0
      // console.log(this.result_R.eairRegional)
      // console.log(this.result_R.ewaterRegional)
      // console.log(this.result_R.esoilRegional)

      this.input_R.eairRegional = this.result_R.eairRegional*1000/(this.input_R.mw*24)+this.parameter_R.qair*this.input_R.cinAir/(1+this.parameter_R.kpaerAir*this.parameter_R.tsp)
      this.input_R.ewaterRegional = this.result_R.ewaterRegional*1000/(this.input_R.mw*24)+this.parameter_R.qwater*this.input_R.cinWater/(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))
      this.input_R.esoilRegional = (this.result_R.esoilRegional)*1000/this.input_R.mw/24
      // this.input_R.eairRegional = 488.8*1000/(this.input_R.mw*24)+this.parameter_R.qair*this.input_R.cinAir/(1+this.parameter_R.kpaerAir*this.parameter_R.tsp)
      // this.input_R.ewaterRegional = 56.4*1000/(this.input_R.mw*24)+this.parameter_R.qwater*this.input_R.cinWater/(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))
      // this.input_R.esoilRegional =210.6*1000/this.input_R.mw/24
      this.input_R.eaerRegional = this.parameter_R.qair*this.input_R.cinAir*this.parameter_R.kpaerAir*this.parameter_R.tsp/(1+this.parameter_R.kpaerAir*this.parameter_R.tsp)
      this.input_R.esuspRegional = this.parameter_R.qwater*this.input_R.cinWater*this.parameter_R.kpsusp*this.parameter_R.suspWater*Math
          .pow(10,-6)/(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))
      this.input_R.esedRegional = 0

      console.log('eairRegional2333333333', this.input_R.eairRegional)
      console.log(this.input_R.ewaterRegional)
      console.log(this.input_R.esoilRegional)
      console.log(this.input_R.eaerRegional)
      console.log(this.input_R.esuspRegional)

      this.square=[
        [-this.zd_R.dt1,this.zd_R.dwaterAir,this.zd_R.dsoilAir,0,this.zd_R.daerAir,0],
        [this.zd_R.dairWater,-this.zd_R.dt2,this.zd_R.dsoilWater,this.zd_R.dsedWater,0,this.zd_R.dsuspWater],
        [this.zd_R.dairSoil,0,-this.zd_R.dt3,0,this.zd_R.daerSoil,0,],
        [0,this.zd_R.dwaterSed,0,-this.zd_R.dt4,0,this.zd_R.dsuspSed],
        [this.zd_R.dairAer,0,0,0,-this.zd_R.dt5,0],
        [0,this.zd_R.dwaterSusp,this.zd_R.dsoilSusp,this.zd_R.dsedSusp,this.zd_R.daerSusp,-this.zd_R.dt6]]

      console.log("this.square",-this.zd_R.dt1,this.zd_R.dwaterAir,this.zd_R.dsoilAir,0,this.zd_R.daerAir,0)
      console.log("this.square",this.zd_R.dairWater,-this.zd_R.dt2,this.zd_R.dsoilWater,this.zd_R.dsedWater,0,this.zd_R.dsuspWater)
      console.log("this.square",this.zd_R.dairSoil,0,-this.zd_R.dt3,0,this.zd_R.daerSoil,0,)
      console.log("this.square",0,this.zd_R.dwaterSed,0,-this.zd_R.dt4,0,this.zd_R.dsuspSed)
      console.log("this.square",this.zd_R.dairAer,0,0,0,-this.zd_R.dt5,0)
      console.log("this.square",0,this.zd_R.dwaterSusp,this.zd_R.dsoilSusp,this.zd_R.dsedSusp,this.zd_R.daerSusp,-this.zd_R.dt6)


      this.inv_square = this.inv(this.square)
      console.log("this.inv_square",this.inv_square)

      this.m_square = [
        [-this.input_R.eairRegional],
        [-this.input_R.ewaterRegional],
        [-this.input_R.esoilRegional],
        [-this.input_R.esedRegional],
        [-this.input_R.eaerRegional],
        [-this.input_R.esuspRegional]]

      console.log("this.m_squarethis.m_squarethis.m_squarethis.m_square ",this.m_square)

      this.f_square = this.multiply(this.inv_square,this.m_square)
      console.log("2333333333333:  ",this.f_square)

      this.compute_R.fair = this.f_square[0][0]
      this.compute_R.fwater = this.f_square[1][0]
      this.compute_R.fsoil = this.f_square[2][0]
      this.compute_R.fsed = this.f_square[3][0]
      this.compute_R.faer = this.f_square[4][0]
      this.compute_R.fsusp = this.f_square[5][0]

      console.log('********',this.compute_R.fair)
      console.log('********',this.compute_R.fwater)
      console.log('********',this.compute_R.fsoil)
      console.log('********',this.compute_R.fsed)
      console.log('********',this.compute_R.fsusp)


      this.compute_R.cairR = this.zd_R.zair*this.compute_R.fair
      this.compute_R.caerR = this.zd_R.zaer*this.compute_R.faer
      this.compute_R.cwaterR = this.zd_R.zwater*this.compute_R.fwater
      this.compute_R.csuspR = this.zd_R.zsusp*this.compute_R.fsusp
      this.compute_R.csoilR = this.zd_R.zsoil*this.compute_R.fsoil
      this.compute_R.csedR = this.zd_R.zsed*this.compute_R.fsed

      console.log(this.compute_R.cairR)
      console.log(this.compute_R.caerR)
      console.log(this.compute_R.cwaterR)
      console.log(this.compute_R.csuspR)
      console.log(this.compute_R.csoilR)
      console.log(this.compute_R.csedR)

      this.compute_R.nair = this.compute_R.cairR*this.input_R.vair
      this.compute_R.naer = this.compute_R.caerR*this.parameter_R.vaer
      this.compute_R.nwater = this.compute_R.cwaterR*this.input_R.vwater
      this.compute_R.nsusp = this.compute_R.csuspR*this.parameter_R.vsusp
      this.compute_R.nsoil = this.compute_R.csoilR*this.input_R.vsoil
      this.compute_R.nsed = this.compute_R.csedR*this.input_R.vsed
      this.compute_R.ntotal = this.compute_R.nair+this.compute_R.naer+this.compute_R.nwater+this.compute_R.nsusp+this.compute_R.nsoil+this.compute_R.nsed
      console.log('********')
      console.log(this.compute_R.nair)
      console.log(this.compute_R.naer)
      console.log(this.compute_R.nwater)
      console.log(this.compute_R.nsusp)
      console.log(this.compute_R.nsoil)
      console.log(this.compute_R.nsed )
      console.log(this.compute_R.ntotal)

      this.compute_R.air = this.compute_R.nair/this.compute_R.ntotal
      this.compute_R.aerosol = this.compute_R.naer/this.compute_R.ntotal
      this.compute_R.water = this.compute_R.nwater/this.compute_R.ntotal
      this.compute_R.suspend = this.compute_R.nsusp/this.compute_R.ntotal
      this.compute_R.soil = this.compute_R.nsoil/this.compute_R.ntotal
      this.compute_R.sediment = this.compute_R.nsed/this.compute_R.ntotal

      console.log(this.compute_R.air)
      console.log(this.compute_R.aerosol)
      console.log(this.compute_R.water)
      console.log(this.compute_R.suspend)
      console.log(this.compute_R.soil)
      console.log(this.compute_R.sediment)

      this.result_R.pecairR = this.NumberJudge(
          (this.compute_R.cairR+this.compute_R.caerR*this.parameter_R.faerAir)*this.input_R.mw*1000)
      this.result_R.pecwaterR = this.NumberJudge(
          this.compute_R.cwaterR*(1+this.parameter_R.kpsusp*this.parameter_R.suspWater*Math.pow(10,-6))*this.input_R.mw)
      this.result_R.pecsoilR = this.NumberJudge(this.compute_R.csoilR*this.input_R.mw/(0.001*this.parameter_R.rsoil))
      this.result_R.pecsedR = this.NumberJudge(this.compute_R.csedR*this.input_R.mw/(0.001*this.parameter_R.rsed))
      this.result_R.pecgroundR =this.NumberJudge(
          this.result_R.pecsoilR*
          this.parameter_R.rsoil/
          (this.parameter_R.ksoil_water*1000))
      console.log("end end  end ")
      console.log(this.result_R.pecsoilR)
      console.log(this.parameter_R.rsoil)
      console.log(this.parameter_R.ksoilWater)
      console.log(this.result_R.pecgroundR)

      this.result_R.eairRegional = this.NumberJudge(this.result_R.eairRegional)
      this.result_R.ewaterRegional = this.NumberJudge(this.result_R.ewaterRegional)
      this.result_R.esoilRegional  =this.NumberJudge(this.result_R.esoilRegional)
      this.result_R.esedRegional   =this.NumberJudge(this.result_R.esedRegional)
      this.result_R.eaerRegional   = this.NumberJudge(this.result_R.eaerRegional)
      this.result_R.esuspRegional  =this.NumberJudge(this.result_R.esuspRegional)
      this.result_R.estpSoilRegional =this.NumberJudge(this.result_R.estpSoilRegional)




      //
      //  this.density.pecregAir = this.result_R.pecairR
      //  this.density.pecregWater = this.result_R.pecwaterR
      //  this.density.pecregSoil = this.result_R.pecsoilR
      //  this.density.pecregSoilPorew = this.result_R.pecgroundR
      //  console.log("2021.12。2x",this.result_R.pecgroundR)
      //
      //  this.density.peclocalAirAnn =Math.max(Number(this.form.elocalAir),Number(this.form.elocalstpAir))* this.density.cstdAir*this.form.temission/365+this.density.pecregAir;
      //  this.form.addinh = this.NumberJudge(this.form.addinh);
      //
      //  this.density.peclocalWater =
      //          this.density.clocalWater +
      //          this.density.clocalDirectwater +
      //          this.density.pecregWater;
      //
      //
      // // 马蜂窝！
      //  this.density.peclocalWaterAnn =
      //          (this.density.clocalWater+this.density.clocalDirectwater) *
      //          this.form.temission/365 +this.density.pecregWater;
      //  this.form.pecaquPredator = 0.5 * (this.density.peclocalWaterAnn+this.density.pecregWater)*this.density.bcfFish *this.density.bmf1;
      //  this.density.peclocalSoil180=
      //          this.density.dair/this.density.kSoil+1/this.density.kSoil/
      //          180*(this.density.csoilFive0-this.density.dair/this.density.kSoil)*
      //          (1-Math.exp(-1*this.density.kSoil*180)) +
      //          this.density.pecregSoil;
      //
      //
      //
      //  this.compute_PECstp();
      //  this.compute_PEClocalwater();
      //  console.log("2021.12.01 this.form.peclocalWater",this.form.peclocalWater)
      //  this.compute_PEClocalsed();
      //  console.log("2021.12.02 this.form.peclocalWater",this.form.peclocalWater)
      //  this.compute_PEClocalsoli30();
      //
      //  this.compute_PEClocalgrw();
      //
      //  this.compute_PECaquPredator();
      //  this.density.peclocalWaterAnn =
      //          (this.density.clocalWater+this.density.clocalDirectwater) *
      //          this.form.temission/365 +this.density.pecregWater;
      //
      //
      //  this.form.pecaquPredator = 0.5 *
      //          (this.density.peclocalWaterAnn+
      //                  this.density.pecregWater)*
      //          this.density.bcfFish *this.density.bmf1;
      //
      //  console.log("2021.12.05 this.density.peclocalWaterAnn",      this.density.peclocalWaterAnn)
      //  console.log("this.density.clocalWater",this.density.clocalWater)
      //  console.log("2020    12.  5this.form.elocalDirectwater",this.form.elocalDirectwater)
      //  console.log("2021.12.     05 this.density.clocalDirectwater",this.density.clocalDirectwater)
      //  console.log("2021.12.     05 this.density.bmf1",this.density.bmf1)
      //  console.log("2021.12.     05 this.density.bcfFish",this.density.bcfFish)
      //  console.log("2021.12.05 this.density.pecregWater",this.density.pecregWater)
      //  console.log("2021.12.05  this.form.pecaquPredator", this.form.pecaquPredator)
      //  this.density.peclocalSoil180= this.density.dair/this.density.kSoil+1/this.density.kSoil/
      //          180*(this.density.csoilFive0-this.density.dair/this.density.kSoil)*(1-Math.exp(-1*this.density.kSoil*180)) +this.density.pecregSoil;
      //  this.compute_PECterPredator();
      //  this.density.pecregSoilPorew = this.result_R.pecgroundR
      //  this.form.pecterPredator = (0.5*
      //          (this.density.peclocalSoilPorew+this.density.pecregSoilPorew)
      //          *this.density.bcfWorm+
      //          0.5*(this.density.peclocalSoil180+this.density.pecregSoil)
      //          *this.parameter.fgutWorm* this.parameter.convSoil)/
      //          (1+this.parameter.fgutWorm*this.parameter.convSoil);
      //
      //
      //  this.compute_ADDinh();
      //  this.compute_ADDoralWater();
      //  this.compute_ADDoralFood();
      //  this.compute_ADDT();
      //
      //  this.compute_EnvirmentRcr();
      //  this.compute_HealthRcr();
      //  console.log("最后大检查")
      //  console.log(this.input_R)
      //  console.log(this.density.peclocalSoil180)
      //  console.log(this.density.peclocalSoil30)
      //  console.log(this.form.pecterPredator)

    },

    R_Totalcomputes() {

      // if(this.keys == true){
      if(1){
        this.compute_Kdeg_air_sed();
        // this.R_computesend();
        this.keys = false
      }
    },
    computesblowdown(){
      debugger
      if(this.form.lifeCycle == "生产"||this.form.lifeCycle == "配制"||this.form.lifeCycle == "工业使用"||this.form.lifeCycle == "废物利用处置")
      {
        this.form.elocalDirectwaterR =
            this.form.elocalDirectwater * this.form.temission/
            this.form.main/365
        //22.8.8水-直排
        this.form.elocalDirectwaterR =this.form.elocalDirectwaterR.toExponential(2)
        console.log("区域环境派发百分率")

        this.form.elocalstpWaterR =
            this.form.elocalstpWater * this.form.temission/
            this.form.main/365
        //22.8.8水-集中式stp间接排放
        //this.form.elocalstpWaterR =this.NumberJudge(Number(this.form.elocalstpWaterR))
        this.form.elocalstpWaterR =this.form.elocalstpWaterR.toExponential(2)

        console.log(this.form.elocalstpWater , this.form.temission,
            this.form.main)
        console.log("区域环境派发百分率")
        this.form.elocalAirR =
            this.form.elocalAir * this.form.temission/
            this.form.main/365
        //大气直排22.8.8
        //this.form.elocalAirR =this.NumberJudge(Number(this.form.elocalAirR))
        this.form.elocalAirR =this.form.elocalAirR.toExponential(2)

        this.form.elocalstpAirR =
            this.form.elocalstpAir * this.form.temission/
            this.form.main/365
        //22.8.8 大气-集中式stp间接排放
        //this.form.elocalstpAirR = this.NumberJudge(this.form.elocalstpAirR)
        this.form.elocalstpAirR =this.form.elocalstpAirR.toExponential(2)

        this.form.elocalSoilR =
            this.form.elocalSoil * this.form.temission/
            this.form.main/365
        //22.8.8 土壤-直排
        //this.form.elocalSoilR = this.form.elocalSoilR.toExponential(2)
        this.form.elocalSoilR =this.form.elocalSoilR.toExponential(2)

        this.form.elocalstpSoilR =
            this.form.elocalstpSoil * this.form.temission/
            this.form.main/365
        //22.8.8 土壤-集中式STP间接排放
        //this.form.elocalstpSoilR = this.NumberJudge(this.form.elocalstpSoilR)
        this.form.elocalstpSoilR =this.form.elocalstpSoilR.toExponential(2)
      }else {
        debugger
        this.form.elocalDirectwaterR =
            this.form.elocalDirectwater * this.form.temission/
            this.form.flocal/365

        this.form.elocalstpWaterR =
            this.form.elocalstpWater * this.form.temission/
            this.form.flocal/365
        //22.8.8水-集中式stp间接排放
        //this.form.elocalstpWaterR =this.NumberJudge(Number(this.form.elocalstpWaterR))
        this.form.elocalstpWaterR =this.form.elocalstpWaterR.toExponential(2)

        //22.8.8水-直排
        //this.form.elocalDirectwaterR =this.NumberJudge(Number(this.form.elocalDirectwaterR))
        this.form.elocalDirectwaterR =this.form.elocalDirectwaterR.toExponential(2)

        this.form.elocalAirR =
            this.form.elocalAir * this.form.temission/
            this.form.flocal/365
        //大气直排22.8.8
        //this.form.elocalAirR =this.NumberJudge(Number(this.form.elocalAirR))
        this.form.elocalAirR =this.form.elocalAirR.toExponential(2)

        this.form.elocalstpAirR =
            this.form.elocalstpAir * this.form.temission/
            this.form.flocal/365
        //22.8.8 大气-集中式stp间接排放
        //this.form.elocalstpAirR = this.NumberJudge(this.form.elocalstpAirR)
        //this.form.elocalstpAirR =this.form.elocalstpAirR.toExponential(2)
        this.form.elocalstpAirR =this.form.elocalstpAirR.toExponential(2)

        this.form.elocalSoilR =
            this.form.elocalSoil * this.form.temission/
            this.form.flocal/365
        //22.8.8 土壤-直排
        //this.form.elocalSoilR = this.NumberJudge(this.form.elocalSoilR)
        this.form.elocalSoilR =this.form.elocalSoilR.toExponential(2)

        this.form.elocalstpSoilR =
            this.form.elocalstpSoil * this.form.temission/
            this.form.flocal/365
        //22.8.8 土壤-集中式STP间接排放
        //this.form.elocalstpSoilR = this.NumberJudge(this.form.elocalstpSoilR)
        this.form.elocalstpSoilR =this.form.elocalstpSoilR.toExponential(2)
      }

    },

    Add_Blowdown(){
      console.log("  login end 1111 rerererererererer  ")
      this.result_R.eairRegional = 0
      this.result_R.ewaterRegional = 0
      this.result_R.esoilRegional = 0
      let cas = {cas:this.form.cas};

      this.$api.output.findByCas(cas).then((res) => {
        if(res.data.length > 0){
          for (let i = 0; i <res.data.length ; i++) {
            this.blowdown = res.data[i]
            if(this.blowdown.elocalAirR!=null&&this.blowdown.elocalDirectwaterR!=null){
              console.log("进入循环");
              this.result_R.eairRegional = Number(this.blowdown.elocalAirR) + Number(this.blowdown.elocalstpAirR) + this.result_R.eairRegional
              this.result_R.ewaterRegional= Number(this.blowdown.elocalDirectwaterR)  + Number(this.blowdown.elocalstpWaterR) +this.result_R.ewaterRegional
              this.result_R.esoilRegional = Number(this.blowdown.elocalSoilR) + Number(this.blowdown.elocalstpSoilR)+this.result_R.esoilRegional

              // this.result_R.eairRegional = this.blowdown.elocalAirR + this.blowdown.elocalstpAirR
              // this.result_R.ewaterRegional= this.blowdown.elocalDirectwaterR  +this.blowdown.elocalstpWaterR
              // this.result_R.esoilRegional = this.blowdown.elocalSoilR + this.blowdown.elocalstpSoilR
              console.log("end+",i,this.result_R.eairRegional)
              console.log("end+",i,this.result_R.ewaterRegional)
              console.log("end+",i,this.result_R.esoilRegional)
            }
            //

          }

          // console.log("soil2",this.result_R.esoilRegional)
          // console.log("soil2",this.this.input_R.mw)
          // this.result_R.esoilRegional = this.result_R.esoilRegional*1000/(this.input_R.mw*24)
          // console.log("air,",this.result_R.eairRegional)
          // console.log("water,",this.result_R.ewaterRegional)
          // console.log("soil3",this.result_R.esoilRegional)

        }
        else{
          this.isLife = true;
        }

        this.R_computesend();
      });
      // this.R_computesend();
    },
    Add_Blowdown2(){




      this.R_computesend2();

      // this.R_computesend();
    },

    Inverse_Matrix(square){
      console.log("***********************")
      console.log(square)
      console.log(this.inv(this.square))
      return this.inv(square)
    },
    // multiply: function (a, b) {
    //   let m = a.length;
    //   let p = a[0].length;
    //   let n = b[0].length;
    //   // 初始化 m*n 全 0 二维数组
    //   let c = new Array(m).fill(0).map(arr => new Array(n).fill(0));
    //   for (let i = 0; i < m; i++) {
    //     for (let j = 0; j < n; j++) {
    //       for (let k = 0; k < p; k++) {
    //         c[i][j] += a[i][k] * b[k][j];
    //       }
    //     }
    //   }
    //   return c;
    // },
    // transpose: function (matrix) {
    //   let result = new Array(matrix.length).fill(0).map(arr => new Array(matrix[0].length).fill(0));
    //   for (let i = 0; i < result.length; i++) {
    //     for (let j = 0; j < result[0].length; j++) {
    //       result[i][j] = matrix[j][i];
    //     }
    //   }
    //   return result;
    // },
    // det: function (square) {
    //
    //   // 方阵阶数
    //   let n = square.length;
    //
    //   let result = 0;
    //   if (n > 3) {
    //     // n 阶
    //     for (let column = 0; column < n; column++) {
    //       // 去掉第 0 行第 column 列的矩阵
    //       let matrix = new Array(n - 1).fill(0).map(arr => new Array(n - 1).fill(0));
    //       for (let i = 0; i < n - 1; i++) {
    //         for (let j = 0; j < n - 1; j++) {
    //           if (j < column) {
    //             matrix[i][j] = square[i + 1][j];
    //           } else {
    //             matrix[i][j] = square[i + 1][j + 1];
    //           }
    //         }
    //       }
    //       result += square[0][column] * Math.pow(-1, 0 + column) * this.det(matrix);
    //     }
    //   } else if (n === 3) {
    //     // 3 阶
    //     result = square[0][0] * square[1][1] * square[2][2] +
    //       square[0][1] * square[1][2] * square[2][0] +
    //       square[0][2] * square[1][0] * square[2][1] -
    //       square[0][2] * square[1][1] * square[2][0] -
    //       square[0][1] * square[1][0] * square[2][2] -
    //       square[0][0] * square[1][2] * square[2][1];
    //   } else if (n === 2) {
    //     // 2 阶
    //     result = square[0][0] * square[1][1] - square[0][1] * square[1][0];
    //   } else if (n === 1) {
    //     // 1 阶
    //     result = square[0][0];
    //   }
    //   return result;
    // },
    // adjoint: function (square) {
    //   // 方阵约束
    //
    //   let n = square.length;
    //
    //   let result = new Array(n).fill(0).map(arr => new Array(n).fill(0));
    //   for (let row = 0; row < n; row++) {
    //     for (let column = 0; column < n; column++) {
    //       // 去掉第 row 行第 column 列的矩阵
    //       let matrix = [];
    //       for (let i = 0; i < square.length; i++) {
    //         if (i !== row) {
    //           let arr = [];
    //           for (let j = 0; j < square.length; j++) {
    //             if (j !== column) {
    //               arr.push(square[i][j]);
    //             }
    //           }
    //           matrix.push(arr);
    //         }
    //       }
    //       result[row][column] = Math.pow(-1, row + column) * this.det(matrix);
    //     }
    //   }
    //   return this.transpose(result);
    // },
    // inv: function (square) {
    //
    //   let detValue = this.det(square);
    //   let result = this.adjoint(square);
    //
    //   for (let i = 0; i < result.length; i++) {
    //     for (let j = 0; j < result.length; j++) {
    //       result[i][j] /= detValue;
    //     }
    //   }
    //
    //   console.log(result)
    //   return result;
    // },
    // logt :function(var1){
    //   var a = var1;
    //   this.logs({})
    // },

    logs :function(dict){
      // console.log("mmmmmmmmmm");
      //
      // let name = Object.keys(dict)[0];
      //
      // let value = dict[name];


      console.log(dict,"===",dict);        //prints foo


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
    showRegion(){

      this.results_show = false;
      this.region_show = true;
    },


    /* goTo(path) {
       this.$router.replace(path);
     },*/
  },
};
</script>

<style scoped lang="scss">
#Scenes {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
  Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #484a4d;
  /* background:  #b6bbbb21; */
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

.scenes-left{
  position: absolute;
  width: 13%;
  height: 10%;
  left:0;
}

.scenes-content{
  position:absolute;
  right:10%;
  left:17%;
  top:0%;
  bottom:10px;
}

.item-paifang {
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  font-size: 30px;
  font-weight: bold;
}
.el-form-item__label{
  font-size: 18px;
  /*font-weight: bold;*/
}

.emission-content{
  position:absolute;
  right:10%;
  left: 17%;
  top: 0;


  .el-col{
    color: #545c64;
  };
};
.emission-footer{
  position:absolute;
  right: 42.5%;
  top: 100%;
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

.result-content{
  top: 100%;
  right:10%;
  left: 13%;

}

.el-scrollbar {
  height: 100%;
  text-align: left;
  margin-left: 65px;

  .scrollbar-wrap {
    overflow-x: hidden;
  }
  .el-scrollbar__bar{

  }
}

</style>
