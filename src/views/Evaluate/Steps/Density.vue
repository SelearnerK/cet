<template>
  <div>
    <div class="title">
      <h2>暴露浓度</h2>

    </div>

    <div class="content">

      <el-form
        :model="dataForm"
        label-width="280px"
        :rules="dataFormRules"
        ref="dataForm"
        :size="size"
      >
        <el-tabs tab-position="left" style="height: 850px">
          <el-tab-pane label="基本性质">
            <el-form-item label="" prop="id" v-if="false">
              <el-input v-model="dataForm.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否固体(Solid)" prop="soild" v-if="true">
              <el-select v-model="dataForm.solid" placeholder="请选择">
                <el-option label="是" value="是"> </el-option>
                <el-option label="否" value="否"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="某场景涉及的化学物质的年使用量(Qchemical)"
              prop="qchemical"
              v-if="true"
            >
              <el-input
                v-model="dataForm.qchemical"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="分子量(MOLW)"
              prop="molw"
              v-if="true"
            >
              <el-input
                v-model="dataForm.molw"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="输入蒸气压(Vp.temptest)" prop="vpTemptest" v-if="true">
              <el-input v-model="dataForm.vpTemptest" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="蒸气压试验温度(TEMP.Vptest)" prop="tempVptest" v-if="true">
              <el-input v-model="dataForm.tempVptest" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="环境温度下的蒸气压(Vp)" prop="vp" v-if="true">
              <el-input
                v-model="dataForm.vp"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="输入水溶解度(Sol.TempTest)"
              prop="solTempTest"
              v-if="true"
            >
              <el-input
                v-model="dataForm.solTempTest"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="水溶解度试验温度(TEMP.SolTest)"
              prop="tempSoltest"
              v-if="true"
            >
              <el-input
                v-model="dataForm.tempSoltest"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="环境温度下的水溶解度(Sol)" prop="sol" v-if="true">
              <el-input v-model="dataForm.sol" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="有机碳-水分配系数(Koc)" prop="koc" v-if="true">
              <el-input
                v-model="dataForm.koc"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="正辛醇/水分配系数(Kow)" prop="kow" v-if="true">
              <el-input
                v-model="dataForm.kow"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="生物降解性(Biodeg)" prop="biodeg" v-if="true">
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
            <el-form-item label="熔点(TEMPmelt)" prop="tempmelt" v-if="true">
              <el-input
                v-model="dataForm.tempmelt"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="过冷液体蒸气压(VPL)" prop="vpl" v-if="true">
              <el-input
                v-model="dataForm.vpl"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="默认参数">
            <el-form-item
              label="Junge常数(CONjunge)"
              prop="conjunge"
              v-if="true"
            >
              <el-input
                v-model="dataForm.conjunge"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="气溶胶颗粒的表面积(SURF.aer)"
              prop="surfAer"
              v-if="true"
            >
              <el-input
                v-model="dataForm.surfAer"
                auto-complete="off"
              ></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="环境行为与归趋参数">
            <el-form-item label="亨利常数(HENRY)" prop="henry" v-if="true">
              <el-input
                v-model="dataForm.henry"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="气-水分配系数(Kair-water)"
              prop="kairWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kairWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="吸附于气溶胶颗粒的比例(Fass.aer)"
              prop="fassAer"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fassAer"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤固-水分配系数(Kp.soil)"
              prop="kpSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kpSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="悬浮物固-水分配系数(Kp.susp)"
              prop="kpSusp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kpSusp"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="沉积物-水分配系数(Kp.sed)"
              prop="kpSed"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kpSed"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤-水分配系数(Ksoil-water)"
              prop="ksoilWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.ksoilWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="悬浮颗粒物-水分配系数(Ksusp-water)"
              prop="ksuspWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.ksuspWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="沉积物-水分配(Ksed-water)"
              prop="ksedWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.ksedWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="鱼类生物放大系数(BMF.1)"
              prop="bmf1"
              v-if="true"
            >
              <el-input
                v-model="dataForm.bmf1"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="捕食动物生物放大系数(BMF.2)"
              prop="bmf2"
              v-if="true"
            >
              <el-input
                v-model="dataForm.bmf2"
                auto-complete="off"
              ></el-input>
            </el-form-item>


            <el-form-item
              label="蚯蚓的生物富集系数(BCF.worm)"
              prop="bcfWorm"
              v-if="true"
            >
              <el-input
                v-model="dataForm.bcfWorm"
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

            <el-form-item
              label="活性污泥中生物降解速率常数(kbio.stp)"
              prop="kbioStp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kbioStp"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="活性污泥中总降解速率常数(kdeg.stp)"
              prop="kdegStp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kdegStp"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="地表水生物降解速率常数(kbio.fresh)"
              prop="kbioFresh"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kbioFresh"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="土壤降解速率常数(kbio.soil)"
              prop="kbioSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kbioSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="鱼类生物蓄积系数(BCF.fish)"
              prop="bcfFish"
              v-if="true"
            >
              <el-input
                v-model="dataForm.bcfFish"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="环境排放量">
            <el-form-item label="排放源类型(Source.type)" prop="sourceType" v-if="true">
              <el-input
                v-model="dataForm.sourceType"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="日排放率(废水，进入STP)(Elocal.water)"
              prop="elocalWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.elocalWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="日排放率(大气)(Elocal.air)"
              prop="elocalAir"
              v-if="true"
            >
              <el-input
                v-model="dataForm.elocalAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>


            <el-form-item
              label="日排放率(直排地表水)(Elocal.directwater)"
              prop="elocalDirectwater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.elocalDirectwater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="使用阶段排放持续的时间(Temission)"
              prop="temission"
              v-if="true"
            >
              <el-input
                v-model="dataForm.temission"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="排放系数-水(Femisssion.water)"
              prop="femisssionWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.femisssionWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>


            <el-form-item
              label="土排放系数-大气(Femisssion.air)"
              prop="femisssionAir"
              v-if="true"
            >
              <el-input
                v-model="dataForm.femisssionAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="排放系数-土壤(Femisssion.soil)"
              prop="femisssionSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.femisssionSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="局部点源的比例(Fmainsource)"
              prop="fmainsource"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fmainsource"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="风险控制措施的减排效率(Fabatement.Water)"
              prop="fabatementWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fabatementWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="风险控制措施的减排效率(Fabatement.air)"
              prop="fabatementAir"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fabatementAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="日排放率(土壤)(Elocal.soil)"
              prop="elocalSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.elocalSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="风险控制措施的减排效率(Fabatement.Soil)"
              prop="fabatementSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fabatementSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="污水处理厂归趋" >
            <el-form-item label="经由污水处理厂排放的化学物质进入水体的比例(Fstp.water)" prop="fstpWater" v-if="true">
              <el-input
                v-model="dataForm.fstpWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="经由污水处理厂排放的化学物质进入大气的比例(Fstp.air)"
              prop=" fstpAir"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fstpAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="经由污水处理厂排放的化学物质进入污泥的比例(Fstp.sludge)"
              prop="fstpSludge"
              v-if="true"
            >
              <el-input
                v-model="dataForm.fstpSludge"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Elocalstp.water"
              prop="elocalstpWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.elocalstpWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="污水处理厂向大气环境间接排放化学物质的日排放量(ElocalSTP.air)"
              prop="elocalstpAir"
              v-if="true"
            >
              <el-input
                v-model="dataForm.elocalstpAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="干污泥中化学物质浓度(Csludge)"
              prop="csludge"
              v-if="true"
            >
              <el-input
                v-model="dataForm.csludge"
                auto-complete="off"
              ></el-input>
            </el-form-item>


            <el-form-item
              label="污泥产生量(SLUDGErate)"
              prop="sludgerate"
              v-if="true"
            >
              <el-input
                v-model="dataForm.sludgerate"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="地表水">
            <el-form-item
              label="STP 间接排放地表水浓度(Clocal.water)"
              prop="clocalWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.clocalWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="广泛分散使用源直排地表水浓度(Clocal.directwater)"
              prop="clocalDirectwater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.clocalDirectwater"
                auto-complete="off"
              ></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="化学物质大气沉降通量">
            <el-form-item
              label="大气日沉降通量(DEPtotal)"
              prop="deptptal"
              v-if="true"
            >
              <el-input
                v-model="dataForm.deptptal"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="源强为1 kg·d-1时，气溶胶中化学物质标准沉降通量(DEPstd.aer)"
              prop="depstdAer"
              v-if="true"
            >
              <el-input
                v-model="dataForm.depstdAer"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="源强为1 kg·d-1时，气体中化学物质的标准沉降通量(DEPstd.gas)"
              prop="depstdGas"
              v-if="true"
            >
              <el-input
                v-model="dataForm.depstdGas"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="化学物质大气年平均沉降通量(DEPtotal.ann)"
              prop="deptotalAnn"
              v-if="true"
            >
              <el-input
                v-model="dataForm.deptotalAnn"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="土壤中大气日沉降通量(Dair)"
              prop="dair"
              v-if="true"
            >
              <el-input
                v-model="dataForm.dair"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="源强为1 kg·d-1时空气中的浓度(Cstd.air)"
              prop="cstdAir"
              v-if="true"
            >
              <el-input
                v-model="dataForm.cstdAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="大气中局部年均预测环境浓度(PEClocal.air,ann)"
              prop="peclocalAirAnn"
              v-if="true"
            >
              <el-input
                v-model="dataForm.peclocalAirAnn"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="土壤中化学物质的去除">
            <el-form-item
              label="土壤中降解速率(k.soil)"
              prop="kSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤中化学物质挥发的准一级反应速率常数(kvolat)"
              prop="kvolat"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kvolat"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="空气-土壤界面气相侧传质系数(kasl.air)"
              prop="kaslAir"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kaslAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="空气-土壤界面土壤侧传质系数(kasl.soil)"
              prop="kaslSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.kaslSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="土壤中挥发校正系数(CorrVolat.s)"
              prop="corrVolatS"
              v-if="true"
            >
              <el-input
                v-model="dataForm.corrVolatS"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="顶层土壤化学物质淋溶的准一级反应速率常数(kleach)"
              prop=" kleach"
              v-if="true"
            >
              <el-input
                v-model="dataForm. kleach"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="渗透进入土壤的雨水比例(Finf.soil)"
              prop="finfSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.finfSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="自然土壤有效平流速率(Veff.s1R)"
              prop="veffS1r"
              v-if="true"
            >
              <el-input
                v-model="dataForm.veffS1r"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="自然土壤有效扩散系数(Deff.s1R)"
              prop="deffS1r"
              v-if="true"
            >
              <el-input
                v-model="dataForm.deffS1r"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="自然土壤可渗透深度(dp)"
              prop="dp"
              v-if="true"
            >
              <el-input
                v-model="dataForm.dp"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="土壤中化学物质暴露浓度">
            <el-form-item
              label="土壤中化学物质暴露浓度(Csoil10(0))"
              prop="csoilTen0"
              v-if="true"
            >
              <el-input
                v-model="dataForm.csoilTen0"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="污泥施用及大气沉降持续5年后0时刻(Csoil5(0))"
              prop="csoilFive0"
              v-if="true"
            >
              <el-input
                v-model="dataForm.csoilFive0"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="大气沉降持续10年后0时刻，土壤中化学物质的浓度(Cdep.soil10(0))"
              prop="cdepSoilTen0"
              v-if="true"
            >
              <el-input
                v-model="dataForm.cdepSoilTen0"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="大气沉降持续5年后0时刻，土壤中化学物质的浓度(Cdep.soil5(0))"
              prop="cdepSoilFive0"
              v-if="true"
            >
              <el-input
                v-model="dataForm.cdepSoilFive0"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="污泥施用1年后0时刻，土壤中化学物质的浓度(Csludge.soil.1(0))"
              prop="csludgeSoilOne0"
              v-if="true"
            >
              <el-input
                v-model="dataForm.csludgeSoilOne0"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="污泥施用持续10年后0时刻，土壤中化学物质的浓度(Csludge.soil.10(0))"
              prop=" csludgeSoilTen0"
              v-if="true"
            >
              <el-input
                v-model="dataForm. csludgeSoilTen0"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="污泥施用持续5年后0时刻，土壤中化学物质的浓度(Csludge.soil.5(0))"
              prop="csludgeSoilFive0"
              v-if="true"
            >
              <el-input
                v-model="dataForm.csludgeSoilFive0"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="一年内化学物质在土壤中累积的比例(Facc)"
              prop="facc"
              v-if="true"
            >
              <el-input
                v-model="dataForm.facc"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤中点源化学物质平均浓度(污泥施用后30d)(Clocal.soil(30))"
              prop=" clocalSoil30"
              v-if="true"
            >
              <el-input
                v-model="dataForm. clocalSoil30"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤中点源化学物质平均浓度(污泥施用后180d)(Clocal.soil(180))"
              prop="clocalSoil180"
              v-if="true"
            >
              <el-input
                v-model="dataForm.clocalSoil180"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="时间(Tav.soil)"
              prop="tavSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.tavSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="孔隙水中的浓度(PEClocal.soil,porew)"
              prop="peclocalSoilPorew"
              v-if="true"
            >
              <el-input
                v-model="dataForm.peclocalSoilPorew"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="二次中毒" >
            <el-form-item label="鱼体中化学物质浓度(Cfish)" prop="cfish" v-if="true">
              <el-input
                v-model="dataForm.cfish"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="水生捕食动物浓度(PECaqu,toppredator)"
              prop=" pecaquPredator"
              v-if="true"
            >
              <el-input
                v-model="dataForm.pecaquPredator"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="鱼体中化学物质浓度(PECaqu,toppredator)"
              prop="pecaquToppredator"
              v-if="true"
            >
              <el-input
                v-model="dataForm.pecaquToppredator"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="陆生捕食动物暴露浓度(PECter,predator)"
              prop="pecterPredator"
              v-if="true"
            >
              <el-input
                v-model="dataForm.pecterPredator"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="区域预测环境浓度" >
            <el-form-item label="区域预测环境浓度(PECreg.air)" prop="pecregAir" v-if="true">
              <el-input
                v-model="dataForm.pecregAir"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="区域水体中化学物质的浓度(PECreg.water)"
              prop="pecregWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.pecregWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="区域土壤中化学物质的浓度(PECreg.soil)"
              prop="pecregSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.pecregSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="区域土壤孔隙水化学物质的浓度(PECreg.soil,porew)"
              prop="pecregSoilPorew"
              v-if="true"
            >
              <el-input
                v-model="dataForm.pecregSoilPorew"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="局部预测环境浓度" >
            <el-form-item label="STP出水中化学物质的预测环境浓度(PECstp)" prop="pecstp" v-if="true">
              <el-input
                v-model="dataForm.pecstp"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="水体中化学物质的预测环境浓度(PEClocal.water)"
              prop="peclocalWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.peclocalWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="地表水年均局部预测环境浓度(PEClocal.water,ann)"
              prop="peclocalWaterAnn"
              v-if="true"
            >
              <el-input
                v-model="dataForm.peclocalWaterAnn"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="沉积物的预测环境浓度(PEClocal.sed)"
              prop="peclocalSed"
              v-if="true"
            >
              <el-input
                v-model="dataForm.peclocalSed"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="土壤中点源化学物质的预测环境浓度(30天平均)(PEClocal.soil,30)"
              prop="peclocalSoil30"
              v-if="true"
            >
              <el-input
                v-model="dataForm.peclocalSoil30"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="土壤中点源化学物质的预测环境浓度(30天平均)(PEClocal.soil,180)"
              prop="peclocalSoil180"
              v-if="true"
            >
              <el-input
                v-model="dataForm.peclocalSoil180"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="地下水中化学物质局部预测环境浓度(PEClocal.grw)"
              prop="peclocalGrw"
              v-if="true"
            >
              <el-input
                v-model="dataForm.peclocalGrw"
                auto-complete="off"
              ></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="人体健康暴露估计" >
            <el-form-item label="饮用水净化后剩余因子(F.pur)" prop="fPur" v-if="true">
              <el-input
                v-model="dataForm.fPur"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="局部环境饮用水浓度(PEC.drwL)"
              prop="pecDrwl"
              v-if="true"
            >
              <el-input
                v-model="dataForm.pecDrwl"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="吸入途径化学物质日均暴露量(ADDinh)"
              prop="addinh"
              v-if="true"
            >
              <el-input
                v-model="dataForm.addinh"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="经口摄入土壤中化学物质的日均暴露量(ADDoral-soil)"
              prop="addoralSoil"
              v-if="true"
            >
              <el-input
                v-model="dataForm.addoralSoil"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="经口摄食(鱼)途径化学物质日均暴露量(ADDoral-fish)"
              prop="addoralFish"
              v-if="true"
            >
              <el-input
                v-model="dataForm.addoralFish"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="饮水途径化学物质日均暴露(ADDoral-water)"
              prop="addoralWater"
              v-if="true"
            >
              <el-input
                v-model="dataForm.addoralWater"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="不同途径的化学物质日均总暴露量(ADDT)"
              prop="addt"
              v-if="true"
            >
              <el-input
                v-model="dataForm.addt"
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
        name: "Density",
        data() {
            return {
                size: "small",
                filters: {
                    label: "",
                },
                columns: [
                    { prop: "id", label: "ID", minWidth: 100 },
                    {prop:"soild", label:"是否固体", minWidth:100},
                    {prop:"qchemical", label:"某场景涉及的化学物质的年使用量", minWidth:100},
                    {prop:"molw", label:"分子量", minWidth:100},
                    {prop:"vpTemptest", label:"输入蒸气压", minWidth:100},
                    {prop:"tempVptest", label:"蒸气压试验温度", minWidth:100},
                    {prop:"vp", label:"蒸气压试验温度", minWidth:100},
                    {prop:"solTempTest", label:"输入水溶解度", minWidth:100},
                    {prop:"tempSoltest", label:"环境温度下的水溶解度", minWidth:100},
                    {prop:"sol", label:"环境温度下的水溶解度", minWidth:100},
                    {prop:"koc", label:"有机碳-水分配系数", minWidth:100},
                    {prop:"kow", label:"正辛醇/水分配系数", minWidth:100},
                    {prop:"biodeg", label:"生物降解性", minWidth:100},
                    {prop:"tempmelt", label:"熔点", minWidth:100},
                    {prop:"vpl", label:"过冷液体蒸气压", minWidth:100},
                    {prop:"conjunge", label:"Junge常数", minWidth:100},
                    {prop:"surfAer", label:"气溶胶颗粒的表面积", minWidth:100},
                    {prop:"henry", label:"亨利常数", minWidth:100},
                    {prop:"kairWater", label:"气-水分配系数", minWidth:100},
                    {prop:"fassAer", label:"", minWidth:100},
                    {prop:"kpSoil", label:"", minWidth:100},
                    {prop:"kpSusp", label:"", minWidth:100},
                    {prop:"kpSed", label:"", minWidth:100},
                    {prop:"ksoilWater", label:"", minWidth:100},
                    {prop:"ksuspWater", label:"", minWidth:100},
                    {prop:"ksedWater", label:"", minWidth:100},
                    {prop:"bmf1", label:"", minWidth:100},
                    {prop:"bmf2", label:"", minWidth:100},
                    {prop:"bcfWorm", label:"", minWidth:100},
                    {prop:"khydrWater", label:"", minWidth:100},
                    {prop:"kbioStp", label:"", minWidth:100},
                    {prop:"kdegStp", label:"", minWidth:100},
                    {prop:"kbioFresh", label:"", minWidth:100},
                    {prop:"kbioSoil", label:"", minWidth:100},
                    {prop:"bcfFish", label:"", minWidth:100},
                    {prop:"sourceType", label:"", minWidth:100},
                    {prop:"elocalWater", label:"", minWidth:100},
                    {prop:"elocalAir", label:"", minWidth:100},
                    {prop:"elocalDirectwater", label:"", minWidth:100},
                    {prop:"temission", label:"", minWidth:100},
                    {prop:"femisssionWater", label:"", minWidth:100},
                    {prop:"femisssionAir", label:"", minWidth:100},
                    {prop:"femisssionSoil", label:"", minWidth:100},
                    {prop:"fmainsource", label:"", minWidth:100},
                    {prop:"fabatementWater", label:"", minWidth:100},
                    {prop:"fabatementAir", label:"", minWidth:100},
                    {prop:"elocalSoil", label:"", minWidth:100},
                    {prop:"fabatementSoil", label:"", minWidth:100},
                    {prop:"fstpWater", label:"", minWidth:100},
                    {prop:"fstpAir", label:"", minWidth:100},
                    {prop:"fstpSludge", label:"", minWidth:100},
                    {prop:"elocalstpWater", label:"", minWidth:100},
                    {prop:"elocalstpAir", label:"", minWidth:100},
                    {prop:"csludge", label:"", minWidth:100},
                    {prop:"sludgerate", label:"", minWidth:100},
                    {prop:"clocalWater", label:"", minWidth:100},
                    {prop:"clocalDirectwater", label:"", minWidth:100},
                    {prop:"deptptal", label:"", minWidth:100},
                    {prop:"depstdAer", label:"", minWidth:100},
                    {prop:"depstdGas", label:"", minWidth:100},
                    {prop:"deptotalAnn", label:"", minWidth:100},
                    {prop:"dair", label:"", minWidth:100},
                    {prop:"cstdAir", label:"", minWidth:100},
                    {prop:"peclocalAirAnn", label:"", minWidth:100},
                    {prop:"kSoil", label:"", minWidth:100},
                    {prop:"kvolat", label:"", minWidth:100},
                    {prop:"kaslAir", label:"", minWidth:100},
                    {prop:"kaslSoil", label:"", minWidth:100},
                    {prop:"corrVolatS", label:"", minWidth:100},
                    {prop:"kleach", label:"", minWidth:100},
                    {prop:"finfSoil", label:"", minWidth:100},
                    {prop:"veffS1r", label:"", minWidth:100},
                    {prop:"deffS1r", label:"", minWidth:100},
                    {prop:"dp", label:"", minWidth:100},
                    {prop:"csoilTen0", label:"", minWidth:100},
                    {prop:"csoilFive0", label:"", minWidth:100},
                    {prop:"cdepSoilTen0", label:"", minWidth:100},
                    {prop:"cdepSoilFive0", label:"", minWidth:100},
                    {prop:"csludgeSoilOne0", label:"", minWidth:100},
                    {prop:"csludgeSoilTen0", label:"", minWidth:100},
                    {prop:"csludgeSoilFive0", label:"", minWidth:100},
                    {prop:"facc", label:"", minWidth:100},
                    {prop:"clocalSoil30", label:"", minWidth:100},
                    {prop:"clocalSoil180", label:"", minWidth:100},
                    {prop:"tavSoil", label:"", minWidth:100},
                    {prop:"peclocalSoilPorew", label:"", minWidth:100},
                    {prop:"cfish", label:"", minWidth:100},
                    {prop:"pecaquPredator", label:"", minWidth:100},
                    {prop:"pecaquToppredator", label:"", minWidth:100},
                    {prop:"pecterPredator", label:"", minWidth:100},
                    {prop:"pecregAir", label:"", minWidth:100},
                    {prop:"pecregWater", label:"", minWidth:100},
                    {prop:"pecregSoil", label:"", minWidth:100},
                    {prop:"pecregSoilPorew", label:"", minWidth:100},
                    {prop:"pecstp", label:"", minWidth:100},
                    {prop:"peclocalWater", label:"", minWidth:100},
                    {prop:"peclocalWaterAnn", label:"", minWidth:100},
                    {prop:"peclocalSed", label:"", minWidth:100},
                    {prop:"peclocalSoil30", label:"", minWidth:100},
                    {prop:"peclocalSoil180", label:"", minWidth:100},
                    {prop:"peclocalGrw", label:"", minWidth:100},
                    {prop:"fPur", label:"", minWidth:100},
                    {prop:"pecDrwl", label:"", minWidth:100},
                    {prop:"addinh", label:"", minWidth:100},
                    {prop:"addoralSoil", label:"", minWidth:100},
                    {prop:"addoralFish", label:"", minWidth:100},
                    {prop:"addoralWater", label:"", minWidth:100},
                    {prop:"addt", label:"", minWidth:100},
                ],
                pageRequest: { pageNum: 1, pageSize: 10 },
                pageResult: {},

                operation: false, // true:新增, false:编辑
                editDialogVisible: false, // 新增编辑界面是否显示
                editLoading: false,
                dataFormRules: {
                    molw:[{ required: true, message: "分子量不能为空", trigger: "blur" }],
                    vpTemptest:[{ required: true, message: "蒸汽压不能为空", trigger: "blur" }],
                    solTempTest:[{ required: true, message: "输入水溶解度不能为空", trigger: "blur" }],
                    koc:[{ required: true, message: "有机碳-水分配系数不能为空", trigger: "blur" }],
                    kow:[{ required: true, message: "正辛醇/水分配系数(Kow)不能为空", trigger: "blur" }],
                    biodeg:[{ required: true, message: "生物降解性不能为空", trigger: "blur" }],
                    bcfFish:[{ required: true, message: "鱼类生物富集性不能为空", trigger: "blur" }],
                    sourceType:[{ required: true, message: "排放源类型不能为空", trigger: "blur" }],
                    temission:[{ required: true, message: "排放持续的时间不能为空", trigger: "blur" }],
                    elocalWater:[{ required: true, message: "日排放率(废水，进入STP)不能为空", trigger: "blur" }],
                    elocalAir:[{ required: true, message: "日排放率(大气)不能为空", trigger: "blur" }],
                    elocalDirectwater:[{ required: true, message: "日排放率(直排地表水)不能为空", trigger: "blur" }]
                },
                // 新增编辑界面数据
                dataForm: {
                    id: null,
                    solid: null,
                    qchemical: 3300,
                    molw: 92,
                    vpTemptest: 3089,
                    tempVptest: 21.1,
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
                    bmf1:null,
                    bmf2:null,
                    bcfWorm: null,
                    khydrWater: null,
                    kbioStp: null,
                    kdegStp: null,
                    kbioFresh: null,
                    kbioSoil: null,
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
            };
        },
        methods: {
            last() {
                this.$emit('goBack');
            },
            next() {
                this.$emit('DensityValue',this.dataForm)
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
                            this.$api.density.save(params).then((res) => {
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
