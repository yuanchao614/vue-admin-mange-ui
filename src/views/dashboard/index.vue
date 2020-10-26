<template>
  <div class="dashboard-container">
    <el-row>
  <el-col :span="24">
    <PanelGroup />
    <!-- <LineEcharts/> -->
  </el-col>
</el-row>
<el-row>
    <el-col :span="24">
    <LineEcharts/>
  </el-col>
</el-row>
<el-row>
   <el-col :span="8" style="margin-top: 30px;">
    <LatestData/>
  </el-col>
   <el-col :span="6" :offset="1" style="margin-top: 30px;display: flex;justify-content: center;">
    <Calendar />
  </el-col>
  <el-col :span="8" :offset="1" style="margin-top: 30px;">
    <PieEcharts/>
  </el-col>
</el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import  LineEcharts  from "./componets/LineEcharts";
import LatestData from "./componets/LatestData";
import PieEcharts from "./componets/PieEcharts";
import PanelGroup from "./componets/PanelGroup";
import Calendar from './componets/Calendar';

export default {
  name: 'Dashboard',
  components: {
    LineEcharts,
    LatestData,
    PieEcharts,
    PanelGroup,
    Calendar
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  height: 90vh;
}
</style>
