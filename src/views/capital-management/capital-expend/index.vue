<template>
  <div class="capital-expend">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="微信支出" name="wechatPay"></el-tab-pane>
      <el-tab-pane label="支付宝支出" name="antPay"></el-tab-pane>
      <el-tab-pane label="现金支出" name="cachPay"></el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="24">
        <ExpendTableData :payMethods="payMethods" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ExpendTableData from "./componets/ExpendTableData";
// import { getBillList } from "@/api/billService";

export default {
  name: "CapitalExpend",
  components: {
    ExpendTableData,
  },
  data() {
    return {
      activeName: "wechatPay",
      payMethods: "微信",
    };
  },
  created() {
    console.log("noted::::::::::");
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style>
.capital-expend {
  margin: 30px;
}
</style>