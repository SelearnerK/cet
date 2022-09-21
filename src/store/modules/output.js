export default {
  state: { // this.$store.state.***
    output: {}, // 将 评估程序中的数据，存储到evaluate对象中， 咱们可以暂时将这个评估对象，设计成这个样子
    // { casNo,  lhsxbSrjdKeyValue, lhsxbBhzqyKeyValue,}
    cas: '',
    id: '',
    flag: true,
    stp: true,
    wzmc: '',
    density: true,
    parameter: true,
    result: true,
  },
  mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
    setResult(state, result) {
      if (result !== '') {
        console.log("result.pecstp;",result.pecstp);
        state.output.cas = result.cas;
        state.output.pecstp = result.pecstp;
        state.output.peclocalWater = result.peclocalWater;
        state.output.peclocalSed = result.peclocalSed;
        state.output.peclocalSoil30 = result.peclocalSoil30;
        state.output.peclocalGrw = result.peclocalGrw;
        state.output.pecaquPredator = result.pecaquPredator;
        state.output.pecterPredator = result.pecterPredator;
        state.output.addinh = result.addinh;
        state.output.addoralWater = result.addoralWater;
        state.output.addoralFood = result.addoralFood;
        state.output.addt = result.addt;
      }
    },

    setCas(state,cas){
        console.log("setcas:",cas);
        state.cas = cas;
    },
    setId(state,id){
        console.log("setid:",id);
        state.id = id;
    },
    setWzmc(state,wzmc){
      if(wzmc !== ''){
        console.log("setwzmc:",wzmc);
        state.wzmc = wzmc;
      }
    },
    setFlag(state,flag){
      if(flag !== ''){
        console.log("setflag:",flag);
        state.flag = flag;
      }
    },

    setStp(state,stp){
      if(stp !== ''){
        console.log("setstp:",stp);
        state.stp = stp;
      }
    },

    setDensityflag(state,density){
        console.log("setdensityFlag:",density);
        state.density = density;
    },
    setParameterflag(state,parameter){
        console.log("setparameterFlag:",parameter);
        state.parameter = parameter;
    },
    setResultflag(state,result){
      console.log("setResultflag:",result);
      state.result = result;
    },
  },
  setOutput(state){
    state.output = {}
  },

getters: {
  getOutput: function(state) {
    console.log('state.output', state.output)
    return state.output;
  },
  getCas(state){
    console.log("getcas:",state.cas);
    return state.cas;
  },
  getId(state){
    console.log("getid:",state.id);
    return state.id;
  },
  getWzmc(state){
    console.log("getwzmc:",state.wzmc);
    return state.wzmc;
  },
  getFlag(state){
    console.log("getflag:",state.flag);
    return state.flag;
  },
  getStp(state){
    console.log("getstp:",state.stp);
    return state.stp;
  },
  getDensityflag(state){
    console.log("getdensity:",state.density);
    return state.density;
  },
  getParameterflag(state){
    console.log("getparameter:",state.parameter);
    return state.parameter;
  },
  getResultflag(state){
    console.log("getResultflag:",state.result);
    return state.result;
  },
},
}
