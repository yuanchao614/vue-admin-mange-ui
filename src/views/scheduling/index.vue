.<template>
  <div class="scheduling">
    <el-row>
      <el-col :span="24">
        <div class="header-box">
          <el-button type="primary" @click="addScheduling()">新增计划</el-button>
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
          <el-table-column label="计划时间">
            <template slot-scope="scope">
              <span>{{ scope.row.dates | dateformat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划描述">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否完成">
            <template slot-scope="scope">
              <i class="el-icon-check" v-if="scope.row.isComplete" style="color: green;"></i>
              <i class="el-icon-close" v-if="!scope.row.isComplete" style="color: red;"></i>
              <span style="margin-left: 5px;">{{ scope.row.isComplete | isCompletePiple }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划等级">
            <template slot-scope="scope">
              <i class="el-icon-message-solid" :style="{color: scope.row.color}"></i>
              <span style="margin-left: 5px;">{{ scope.row.color | scheduleLevel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人">
            <template slot-scope="scope">
              <span>{{ scope.row.createBy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="220">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">
                {{
                scope.row.createDate | dateformat
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <AddSchedule
      v-if="addSchedulingVisible"
      :addSchedulingVisible="addSchedulingVisible"
      :editData="editData"
      @closeAddSchedule="closeDialog"
    />
  </div>
</template>

<script>
import { getScheduleList, deleteSchedule } from "@/api/scheduleService";
import AddSchedule from "./componets/AddSchedule";

export default {
  name: "Scheduling",
  components: {
    AddSchedule
  },
  data() {
    const tableData = [];
    let pagination = {
      pageIndex: 0,
      pageSize: 10,
      total: 10
    };
    let addSchedulingVisible = false;
    const editData = {};
    return {
      tableData,
      pagination,
      addSchedulingVisible,
      editData
    };
  },

  created() {
    this.getTableData();
  },

  methods: {
    handleEdit(index, data) {
      this.editData = data;
      this.addSchedulingVisible = true;
    },

    handleDelete(index, data) {
      this.deleteData(data._id);
    },

    addScheduling() {
      this.addSchedulingVisible = true;
      console.log(this.addSchedulingVisible);
    },

    closeDialog(e) {
      this.addSchedulingVisible = false;
      this.editData = {};
      if (e.refresh) {
        this.getTableData();
      }
    },
    getTableData() {
      const param = {
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      };
      getScheduleList(param).then(res => {
        console.log(res);
        if (res.body) {
          this.tableData = res.body;
          this.pagination.total = res.total;
          this.$message({
            message: "查询计划信息成功！",
            type: "success"
          });
        }
      });
    },

    deleteData(_id) {
      deleteSchedule(_id).then(res => {
        if (res) {
          console.log(res);
          this.$message({
            message: "删除计划信息成功！",
            type: "success"
          });
          this.getTableData();
        }
      });
    },

    pageIndexChange(e) {
      this.pagination.pageIndex = e - 1;
      this.getTableData();
    }
  },

  filters: {
    // 组件里自定义管道
    scheduleLevel: value => {
      if (value === "red") {
        return "重要";
      } else if (value === "orange") {
        return "一般";
      } else {
        return "次要";
      }
    },

    isCompletePiple: value => {
      if (value) {
        return "已完成";
      } else {
        return "未完成";
      }
    }
  }
};
</script>

<style scoped>
.scheduling {
  margin: 30px;
}

.header-box {
  display: flex;
  justify-content: flex-start;
}
</style>>

</style>