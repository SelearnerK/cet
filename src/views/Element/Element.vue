<template>
  <div>
    <div v-show="!currentRole">
      <el-tabs :tab-position="tabPosition" @tab-click="elementRefresh" v-model="currentTab">
        <el-tab-pane label="物质管理" name="elementManage">
          <el-container>
            <element-manage @getCurrentElement='getCurrentElement'></element-manage>
          </el-container>

        </el-tab-pane>
        <el-tab-pane label="物质属性" :disabled='!this.currentElement' name="density">
          <el-tag class="current-tag"><b>当前物质：</b>{{this.currentElement? this.currentElement.wzmc:null}}</el-tag>
          <density :current-element="this.currentElement"></density>
        </el-tab-pane>
        <el-tab-pane label="暴露参数" :disabled='!this.currentElement'>
          <el-tag class="current-tag"><b>当前物质：</b>{{this.currentElement? this.currentElement.wzmc:null}}</el-tag>
          <exposure-params :current-element="this.currentElement"></exposure-params>
        </el-tab-pane>
        <el-tab-pane label="标准STP归趋结果" :disabled='!this.currentElement'>
          <el-tag class="current-tag"><b>当前物质：</b>{{this.currentElement? this.currentElement.wzmc:null}}</el-tag>
          <standard-stp :current-element="this.currentElement"></standard-stp>
        </el-tab-pane>
        <el-tab-pane label="危害评估结果" :disabled='!this.currentElement'>
          <el-tag class="current-tag"><b>当前物质：</b>{{this.currentElement? this.currentElement.wzmc:null}}</el-tag>
          <assessment-results :current-element="this.currentElement"></assessment-results>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-show="currentRole">
      <el-tabs :tab-position="tabPosition" @tab-click="elementRefresh" v-model="currentTab">
        <el-tab-pane label="物质管理" name="elementManage">
          <el-container>
            <element-manage @getCurrentElement='getCurrentElement'></element-manage>
          </el-container>

        </el-tab-pane>
        <el-tab-pane label="物质属性" :disabled='!this.currentElement' name="density">
          <el-tag size="medium " class="current-tag"><b>当前物质：</b>{{this.currentElement? this.currentElement.wzmc:null}}</el-tag>
          <density :current-element="this.currentElement"></density>
        </el-tab-pane>
        <el-tab-pane label="暴露参数" :disabled='!this.currentElement'>
          <el-tag size="medium" class="current-tag"><b>当前物质：</b>{{this.currentElement? this.currentElement.wzmc:null}}</el-tag>
          <exposure-params :current-element="this.currentElement"></exposure-params>
        </el-tab-pane>
        <el-tab-pane label="标准STP归趋结果" :disabled='!this.currentElement'>
          <el-tag size="medium " class="current-tag"><b>当前物质：</b>{{this.currentElement? this.currentElement.wzmc:null}}</el-tag>
          <standard-stp :current-element="this.currentElement"></standard-stp>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import ElementManage from './ElementManage';
  import Density from './Density'
  import ExposureParams from './ExposureParams'
  import StandardStp from './StandardStp'
  import AssessmentResults from './AssessmentResults';
  import HeadBar from "../HeadBar/HeadBar";
  export default {
    name: "Elements",
    components: {
      ElementManage,
      Density,
      ExposureParams,
      StandardStp,
      AssessmentResults,
      HeadBar,
    },
    data() {
      return {
        tabPosition: 'left',
        currentElement: null,
        currentTab: 'elementManage',
        currentRole: false
      };
    },
    methods: {
      getCurrentElement(elem) {
        this.currentElement = elem;
        if (elem != null) {
          console.log("elem.cas:", elem.cas)
          this.$store.commit("setCas", elem.cas);
          this.currentTab = 'density'
        } else {
        this.$store.commit("setCas", '');
            console.log('setcas：空')

        }

      },
      elementRefresh() {}
    },
    created() {
      let currentUser = null
      this.$api.user.getCurrentUser().then((res) => {
        currentUser = res.msg
        if (currentUser == 'admin') {
          this.currentRole = false
        } else {
          this.currentRole = true
        }
      })

    }

  };

</script>

<style scoped lang="scss">


</style>
