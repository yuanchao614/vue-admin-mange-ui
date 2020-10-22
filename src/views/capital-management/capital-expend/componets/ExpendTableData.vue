<template>
  <div class="expend-data">
    <el-table :data="tableDatas" style="width: 100%" v-if="tableDatas">
      <el-table-column label="SN" type="index" width="50"></el-table-column>
      <el-table-column label="订单号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品描述">
        <template slot-scope="scope">
          <span>{{ scope.row.productDesc }}</span>
        </template>
      </el-table-column>
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
      <el-table-column label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.createBy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.rmark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" style="text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pagination.total"
          :current-page="pagination.pageIndex + 1"
          :page-size="pagination.pageSize"
          @current-change="pageIndexChange"
          style="margin-top: 15px"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBillList } from "@/api/billService";

export default {
  name: "ExpendTableData",
  props: {
    payMethods: String,
  },
  data() {
    return {
      tableDatas: [],
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        total: 10,
      },
    };
  },

  created() {
    console.log(9999999999);
    this.getTableData();
  },

  methods: {
    getTableData() {
      const param = {
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
        payMethods: this.payMethods,
      };
      getBillList(param).then((res) => {
        console.log(res, "noted::::::::::::::");
        if (res.body.length) {
          this.tableDatas = res.body;
          console.log(this.tableDatas);
          this.pagination.total = res.total;
          this.$message({
            message: "查询微信支出信息成功！",
            type: "success",
          });
        }
      });
    },

    pageIndexChange() {},
  },
};
</script>

<style>
</style>