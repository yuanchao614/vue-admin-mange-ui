<template>
  <div class="expend-data">
    <el-table :data="tableDatas" style="width: 100%" v-if="tableDatas">
      <el-table-column label="SN" type="index" width="180"></el-table-column>
      <el-table-column label="用户ID">
        <template slot-scope="scope">
          <span>{{ scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓">
        <template slot-scope="scope">
          <span>{{ scope.row.firstName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名">
        <template slot-scope="scope">
          <span>{{ scope.row.lastName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱 ">
        <template slot-scope="scope">
          <span>{{ scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 15px;"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ExpendTableData",
  props: {
    tableData: Array
  },
  data() {
    return {
      tableDatas: this.tableData
    };
  }
};
</script>

<style>
</style>