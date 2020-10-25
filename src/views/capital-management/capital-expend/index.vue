<template>
  <div class="capital-expend">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="微信支出" name="wechatPay"></el-tab-pane>
      <el-tab-pane label="支付宝支出" name="antPay"></el-tab-pane>
      <el-tab-pane label="现金支出" name="cachPay"></el-tab-pane>
    </el-tabs>
    <!-- <el-row>
        <el-col :span="24">
        <div class="header-box">
          <el-button type="primary" @click="addExpend()">新增账单</el-button>
        </div>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="24">
        <ExpendTableData :payMethods="payMethods" />
      </el-col>
    </el-row>
  <!-- <AddExpend v-if="addExpendVisible" :addExpendVisible="addExpendVisible" @closeAddExpend="closeDialog"/> -->
  </div>
</template>

<script>
import ExpendTableData from "./componets/ExpendTableData";
// import AddExpend from "./componets/AddExpend";

// import { getBillList } from "@/api/billService";

export default {
  name: "CapitalExpend",
  components: {
    ExpendTableData,
    // AddExpend
  },
  data() {
    return {
      activeName: "wechatPay",
      payMethods: "微信",
      // addExpendVisible: false,
    };
  },
  created() {
    console.log("noted::::::::::");
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name === 'wechatPay') {
        this.payMethods = '微信'
      } else if (tab.name === 'antPay') {
        this.payMethods = '支付宝';
      } else {
        this.payMethods = '现金';
      }
    },

    addExpend() {
      this.addExpendVisible = true;
    },

    closeDialog(e) {
      console.log(e);
      this.addExpendVisible = false;
    }
  },
};
</script>

<style>
.capital-expend {
  margin: 30px;
}
.header-box {
  display: flex;
  justify-content: flex-start;
}
</style>