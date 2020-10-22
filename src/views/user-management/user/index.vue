<template>
  <div class="user-list">
    <el-row>
      <el-col :span="24">
        <div class="header-box">
          <el-button type="primary" @click="addUser()">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="SN" type="index" width="100">
            <!-- <template slot-scope="scope">
              <span>{{ scope.row.userId}}</span>
            </template>-->
          </el-table-column>
          <el-table-column label="用户ID">
            <template slot-scope="scope">
              <span>{{ scope.row.userId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="密码">
            <template slot-scope="scope">
              <span>{{ scope.row.password }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人">
            <template slot-scope="scope">
              <span>{{ scope.row.createBy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="220"
            >>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{
                scope.row.createDate | dateformat
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.phoneNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱 " width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
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
      </el-col>
    </el-row>
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
import { getUserList, deleteUser } from "@/api/user";

export default {
  name: "User",
  components: {
    AddUser,
  },
  data() {
    return {
      tableData: [],
      visibleAddUserModal: false,
      editData: Object,
      userData: [],
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        total: 10,
      },
    };
  },
  created() {
    this.getUserList();
  },
  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.editData = row;
      this.visibleAddUserModal = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteUserFun(row);
    },
    addUser() {
      this.visibleAddUserModal = true;
      this.editData = null;
    },
    closeDialog(data) {
      console.log(data, "parent:::::::::::");
      this.visibleAddUserModal = data.close;
      if (data.refresh) {
        // create/update 后刷新
        this.getUserList(false);
      }
    },
    deleteUserFun(row) {
      deleteUser(row._id).then(
        (res) => {
          console.log(res, "noted::::::::::::");
          if (res) {
            this.$message({
              message: `删除用户${row.userId}成功！`,
              type: "success",
            });
            this.getUserList(false);
          }
        },
        (error) => {
          this.$message.error("删除用户失败！");
        }
      );
    },

    getUserList(showMessage = true) {
      const pageParam = {
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      };
      getUserList(pageParam).then((res) => {
        console.log(res, "noted::::");
        if (res) {
          this.tableData = res.body;
          this.pagination.total = res.total;
          showMessage
            ? this.$message({
                message: "查询用户信息成功！",
                type: "success",
              })
            : "";
        }
      });
    },

    pageIndexChange(e) {
      // console.log(this.pagination);
      this.pagination.pageIndex = e - 1;
      this.getUserList();
    },
  },
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