<template>
  <div>
    <el-steps :active="active" simple>
      <el-step title="排放评估" icon="el-icon-edit-outline"></el-step>
      <el-step title="环境暴露评估" icon="el-icon-tickets"></el-step>
      <el-step title="健康暴露评估" icon="el-icon-document-copy"></el-step>
    </el-steps>
    <div class="content">
      <emissions-assessment
        ref="SubstanceChoose"
        v-show="active <= 0"
        @listenChild="next"
        @inputValue="getInputValue"
      ></emissions-assessment>

      <environmental-exposure
        :result_PECstp="this.PECstp"
        :result_PEClocal_water="this.PEClocal_water"
        :result_PEClocal_sed="this.PEClocal_sed"
        :result_PEClocalsoil_30="this.PEClocalsoil_30"
        :result_compute_PEClocalgrw="this.PEClocal_grw"
        :result_PECaqu_predator="this.PECaqu_predator"
        :result_compute_PECterPredator="this.PECter_predator"
        :result_compute_Rcr1="this.EnvirmentRCrform"
        ref="EnvironmentalExposure"
        v-show="active == 1"
        @DensityValue="getDensityValue"
        @ToCompute="toCompute"
        @listenChild="next"
        @goBack="last"
      ></environmental-exposure>
      <health-exposure
        :result_compute_ADDinh="this.ADDinh"
        :result_compute_ADDoralWater="this.ADDoral_water"
        :result_compute_ADDoralFood="this.ADDoral_food"
        :result_compute_ADDT="this.ADDT"
        :result_compute_Rcr2="this.HealthRcrform"
        ref="Parameter"
        v-show="active == 2"
        @ParameterValue="getParameterValue"
        @listenChild="next"
        @goBack="last"
      ></health-exposure>
      <emissions-assessment
        ref="EmissionsAssessment"

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


        @toCompute="Computes"


      >
      </emissions-assessment>

    </div>
  </div>
</template>
<script>
  import SubstanceChoose from "./Steps/SubstanceChoose";
  import Density from "./Steps/Density";
  import Parameter from "./Steps/Parameter";
  import Result from "./Steps/Result";
  import RiskAssessment from "./RiskAssessment";
  import EmissionsAssessment from "./Steps/EmissionsAssessment";
  import EnvironmentalExposure from "./Steps/EnvironmentalExposure";
  import HealthExposure from "./Steps/HealthExposure";
  export default {
    components: {

      SubstanceChoose,
      Density,
      Parameter,
      Result,
      RiskAssessment,
      EmissionsAssessment,
      EnvironmentalExposure,
      HealthExposure,
    },
    data() {
      return {
        message: "",
        active: 0,
        input:{},
        density:{},
        parameter:{},
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
        result:{},

        EFFLUENTstp: 2000,
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
        this.cas=this.$store.getters.getCas;

          this.$api.input.findByCas({cas:this.cas}).then((res) => {
              if(res.data!= null){
                  this.input = res.data;
              }
              console.log("input:",this.input);
          });

          this.$api.output.findByCas({cas:this.cas}).then((res) => {
              if(res.data!= null){
                  this.output = res.data;
                  this.input.elocalWater=this.output.elocalWater;
                  this.input.elocalAir=this.output.elocalAir;
                  this.input.elocalDirectwater=this.output.elocalDirectwater;
              }
              console.log("output:",this.output);
          });

          this.$api.density.findByCas({cas:this.$store.getters.getCas}).then((res) => {
              if(res.data!=null){
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
              console.log("Parameter:",this.parameter);
          });
          this.$api.parameter.findByCas({cas:this.$store.getters.getCas}).then((res) => {
              this.density = res.data;
              console.log("density:",this.density);
          });
          console.log("output:",this.input);

      },


    methods: {
      getInputValue(inputValue) {
        this.input = inputValue;
      },
      getDensityValue(DensityValue) {
        this.density = DensityValue;
      },
      getParameterValue(ParameterValue) {
        this.parameter = ParameterValue;
      },
      last() {
        this.active--;
        console.log("goback");
      },
      assessment(){

      },
      next() {
        this.active++;
        console.log("active:",this.active);
        if(this.active===4){
          let result = {cas:this.cas,pecstp:this.PECstp,peclocalWater:this.PEClocal_water,peclocalSed:this.PEClocal_sed,peclocalSoil30:this.PEClocalsoil_30,peclocalGrw:this.PEClocal_grw,pecaquPredator:this.PECaqu_predator,pecterPredator:this.PECter_predator,addinh:this.ADDinh,addoralWater:this.ADDoral_water,addoralFood:this.ADDoral_food,addt:this.ADDT,}
          this.$store.commit("setResult",result);
        }
      },
        Computes() {
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
              this.PECstp = Number(a.toFixed(5));
          }
          else{
              if(this.parameter.effluentStp == null){
                  this.parameter.effluentStp=2000;
              }
              if(this.density.fstpWater==null){
                  this.density.fstpWater=0.061;
              }
              let a = this.input.elocalWater*1000000*this.density.fstpWater/(this.parameter.effluentStp*1000);
              this.PECstp = Number(a.toFixed(5));

              console.log("PECstp",this.PECstp);
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

        this.PEClocal_water = Number(this.PEClocal_water.toFixed(5));
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
        console.log("CONV.sed:",this.parameter.convSed);
        //计算1.4  RHOsusp==(Fsolid.susp*RHOsolid+Fwater.susp*RHOwater)
        if(this.parameter.fsoildSusp==null) this.parameter.fsoildSusp=0.1;
        if(this.parameter.fwaterSusp==null) this.parameter.fwaterSusp=0.9;
        this.parameter.rhoSusp=(this.parameter.fsoildSusp*this.parameter.rhoSolid+this.parameter.fwaterSusp*this.parameter.rhoWater);
        //console.log("RHOSusp:",this.parameter.rhoSusp)
        //计算：PEClocal.sed =Ksusp_water*PEClocal.water*1000*CONV.sed/RHOsusp
        let result3 =this.density.ksuspWater*this.PEClocal_water*1000*this.parameter.convSed/this.parameter.rhoSusp;
        this.PEClocal_sed =Number(result3.toFixed(5));


      },
      compute_PEClocalsoli30() {
        //计算ouput中PEClocal.soli,30的值
        //*****PEClocal.soil,30=(Clocal.soil_30+PECreg.soil)*CONV.soil
        //计算1.1 Clocal.soil_30=Dair/k.soil+1/k.soil/Tav.soil*(Csoil5_0-Dair/k.soil)*(1-EXP(-1*k.soil*Tav.soil))

        //1.1.1 Dair=DEPtotal.ann/(DEPTHsoil*RHOsoil)
        //1.1.1.1 DEPtotal.ann =DEPtotal*Temission/365
        //1.1.1.1.1 DEPtotal==(Elocal.air+ElocalSTP.air)*(Fass.aer*DEPstd.aer+(1-Fass_aer)*DEPstd.gas)

        if(this.density.elocalAir==null) this.density.elocalAir=8.33;
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
        // console.log("FassAer",this.density.fassAer);
        // console.log("depstdAer",this.density.depstdAer);
        // console.log("VPL",this.density.vpl);
        // console.log("Vp", this.density.vp);
        //
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
        //1.1.1  Dair    =DEPtotal.ann/(DEPTHsoil*RHOsoil)
        // console.log("DEPtotal.ann",this.density.deptotalAnn);
        // console.log("DEPTHsoil",this.parameter.depthSoil);
        // console.log("RHOsoil",this.parameter.rhoSoil);
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
        //直接调用  this.parameter.depthSoil=0.2 bug
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
        //console.log("Clocal.soil_30**",this.density.clocalSoil30);

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
        this.parameter.convSoil = (this.parameter.rhoSoil/(this.parameter.fsolidSoil*this.parameter.rhoSolid)).toFixed(2);


        //*****PEClocal.soil,30=(Clocal.soil_30+PECreg.soil)*CONV.soil
        let result4=(this.density.clocalSoil30+this.input.pecregSoil)*this.parameter.convSoil;
        this.PEClocalsoil_30=Number(result4.toFixed(5));
        //console.log("PEClocalsoil_30",this.PEClocalsoil_30);

      },
      compute_PEClocalgrw() {
        if(this.parameter.DEPTHsoil==null) this.parameter.DEPTHsoil=0.2;
        if(this.density.fstpWater==null) this.density.fstpWater=0.061;
        if(this.density.EFFLUENTstp==null)
        {
          console.log("2022 3.13  EFFLUENTstp", this.density.EFFLUENTstp)
          this.density.EFFLUENTstp=2000;

        }else {
          console.log("2022 3.13  EFFLUENTstp !==== null", this.density.EFFLUENTstp)
        }
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
          (this.density.fassAer*this.density.depstdAer+(1-this.density.fassAer)*this.density.depstdGas)
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
        console.log("Result_fPur:",this.density.fPur);

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
        this.PEClocal_grw = Number(this.PEClocal_grw.toFixed(5));

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
        this.PECaqu_predator = 0.5 * (this.density.peclocalWaterAnn+this.density.pecregWater)*this.input.bcfFish *this.density.bmf1;

       //("Result_PECaqu_predator:",this.PECaqu_predator);
        this.PECaqu_predator = Number(this.PECaqu_predator.toFixed(5));
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
        this.PECter_predator = Number(this.PECter_predator.toFixed(5));

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
        if(this.input.elocalWater==null) this.input.elocalWater=9.99;
        if(this.density.fstpAir==null) this.density.fstpAir=0.211;

        //elocalstpAir null->=Fstp.air*Elocal.water  notnull->input
        if (this.input.elocalstpAir == null) this.parameter.elocalstpAir = this.input.elocalWater*this.density.fstpAir;

        //求 PEClocal.air_ann=MAX(Elocal.air,ElocalSTP.air)*Cstd.air*Temission/365+PECreg.air
        if(this.input.elocalAir==null) this.input.elocalAir=8.33;
        if (this.input.temission == null) this.input.temission =20;
        if(this.input.pecregAir == null) this.density.pecregAir = 0;
        if (this.input.cstdAir == null) this.input.cstdAir=0.000278;

        this.parameter.peclocalAirAnn =Math.max(this.parameter.elocalstpAir,this.input.elocalAir)* this.input.cstdAir*this.input.temission/365+this.density.pecregAir;


        // ADDinh=PEClocal.air_ann*IRair*ET*EF*ED/(BW*AT)
        this.ADDinh = this.parameter.peclocalAirAnn*this.parameter.irAir*this.parameter.et*this.parameter.ef*this.parameter.ed/(this.parameter.bw*this.parameter.at);
        //console.log("#Result:addinh",this.ADDinh);
        this.ADDinh = Number(this.ADDinh.toFixed(7));
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
        this.ADDoral_water = Number(this.ADDoral_water.toFixed(4));
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
        if(this.input.temission==null) this.input.temission=20;
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
        this.ADDoral_food = Number(this.ADDoral_food.toFixed(7));

      },
      compute_ADDT() {
        this.ADDT=Number((Number(this.ADDinh)+Number(this.ADDoral_water)+Number(this.ADDoral_food)).toFixed(5));


      },
        compute_EnvirmentRcr()  {
            this.EnvirmentRCrform.pecstpRcr=this.PECstp/this.pecstpPnec;
            this.EnvirmentRCrform.peclocalWaterRcr=this.PEClocal_water/this.peclocalWaterPnec;
            this.EnvirmentRCrform.peclocalSedRcr=this.PEClocal_sed/this.peclocalSedPnec;
            this.EnvirmentRCrform.peclocalSoil30Rcr=this.PEClocalsoil_30/this.peclocalSoil30Pnec;
            this.EnvirmentRCrform.peclocalGrwRcr=this.PEClocal_grw/this.peclocalGrwPnec;
            this.EnvirmentRCrform.pecaquPredatorRcr=this.PECaqu_predator/this.pecaquPredatorPnec;
            this.EnvirmentRCrform.pecterPredatorRcr=this.PECter_predator/this.pecterPredatorPnec;
            console.log("风险表征结果1",this.EnvirmentRCrform);
        },
        compute_HealthRcr(){
              this.HealthRcrform.addinhRcr=Number(this.ADDinh)/Number(this.addtDnel);
              this.HealthRcrform.addoralWaterRcr=this.ADDoral_water/this.addoralWaterDnel;
              this.HealthRcrform.addoralFoodRcr=this.ADDoral_food/this.addoralFoodDnel;
              this.HealthRcrform.addtRcr=Number(this.ADDT)/this.addtDnel;
            console.log("风险表征结果2",this.HealthRcrform);
        },
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .content {
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
  }
  .top {
    position: absolute;
    top: 80%;
    left: 50%;
    right: 5%;
  }
</style>
