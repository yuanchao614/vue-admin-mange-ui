<template>
  <div class="latest-data-table" style="box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);">
    <div style="width: 100%;height: 50px;" class="flex is-justify-center is-align-center">
      <span style="font-size: 20px;">今日支出</span>
    </div>
    <el-table :data="tableData" style="width: 100%" v-if="tableData">
      <el-table-column label="SN" type="index" width="50"></el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <span>{{ scope.row.payMethods }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单分类">
        <template slot-scope="scope">
          <span>{{ scope.row.billCategry }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.createDate | dateformat
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDateStr3, getNextDate } from '@/utils/utils'
import { getTodayData } from '@/api/billService'


export default {
  name: "LatestData",
  data() {
    const tableData = []
    return {
      tableData
    };
  },

  created() {
    const curentDate = getDateStr3(new Date());
    const nextDate = getNextDate(new Date());
    this.getLatestData(curentDate, nextDate)
    console.log(curentDate, nextDate, 'noted:::::::::');
  },

  methods: {
    getLatestData(today, nextDay) {
      const param = {
        today,
        nextDay
      };
      getTodayData(param).then(res => {
        if (res.length) {
          this.tableData = res;
        }
      })
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
}  
.is-justify-center {
  justify-content: center;
}
.is-align-center {
  align-items: center;
}
</style>
</style>