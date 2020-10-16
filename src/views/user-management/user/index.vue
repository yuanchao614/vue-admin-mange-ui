<template>
  <div class="user-list">
    <el-row>
      <el-col :span="24">
        <div class="header-box">
          <el-button type="primary" @click="addUser()">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="SN" type="index" width="180">
            <!-- <template slot-scope="scope">
              <span>{{ scope.row.userId}}</span>
            </template>-->
          </el-table-column>
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
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          style="margin-top: 15px;"
        ></el-pagination>
      </el-col>
    </el-row>
    <AddUser
      v-if="visibleAddUserModal"
      :visibleAddUserModal="visibleAddUserModal"
      :editData="editData"
      @closeAddUserModal="closeDialog"
    />
  </div>
</template>

<script>
import AddUser from "./componets/AddUser";
export default {
  name: "User",
  components: {
    AddUser
  },
  data() {
    return {
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
      ],
      visibleAddUserModal: false,
      editData: Object
    };
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.editData = row;
      this.visibleAddUserModal = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    addUser() {
      this.visibleAddUserModal = true;
      this.editData = null;
    },
    closeDialog(data) {
      console.log(data, "parent:::::::::::");
      this.visibleAddUserModal = data;
    },
    deleteUser() {}
  }
};
</script>

<style>
.user-list {
  margin: 30px;
}
.header-box {
  display: flex;
  justify-content: flex-start;
}
</style>