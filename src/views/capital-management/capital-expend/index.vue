<template>
  <div class="capital-expend">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="微信支出" name="wechatPay"></el-tab-pane>
      <el-tab-pane label="支付宝支出" name="antPay"></el-tab-pane>
      <el-tab-pane label="现金支出" name="cachPay"></el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="24">
        <ExpendTableData :tableData="tableData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ExpendTableData from "./componets/ExpendTableData";
export default {
  name: "CapitalExpend",
  components: {
    ExpendTableData
  },
  data() {
    return {
      activeName: "wechatPay",
      tableData: [
        {
          date: "2016-05-02",
          userId: "peter.park",
          firstName: "peter",
          lastName: "Park",
          phone: "13981868694",
          email: "2428306489@qq.com",
          createBy: "admin",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          userId: "peter.park",
          firstName: "peter",
          lastName: "Park",
          phone: "13981868694",
          email: "2428306489@qq.com",
          createBy: "admin",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          userId: "peter.park",
          firstName: "peter",
          lastName: "Park",
          phone: "13981868694",
          email: "2428306489@qq.com",
          createBy: "admin",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          userId: "peter.park",
          firstName: "peter",
          lastName: "Park",
          phone: "13981868694",
          email: "2428306489@qq.com",
          createBy: "admin",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style>
.capital-expend {
  margin: 30px;
}
</style>