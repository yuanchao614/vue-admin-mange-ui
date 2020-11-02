.<template>
  <div class="capital-income">
    <el-row>
      <el-col :span="24">
        <div class="header-box">
          <el-button type="primary" @click="addIncome">新增收入</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableDatas" style="width: 100%" v-if="tableDatas">
      <el-table-column label="SN" type="index" width="50"></el-table-column>
      <el-table-column label="收入平台">
        <template slot-scope="scope">
          <span>{{ scope.row.incomePlatform }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收入类别">
        <template slot-scope="scope">
          <span>{{ scope.row.incomeCategry }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收入金额">
        <template slot-scope="scope">
          <span>{{ scope.row.incomeAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateDate | dateformat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人">
        <template slot-scope="scope">
          <span>{{ scope.row.updateBy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">
            {{
            scope.row.createDate | dateformat
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.createBy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <AddIncome
      v-if="addIncomeVisible"
      :addIncomeVisible="addIncomeVisible"
      :editData="editData"
      @closeAddIncome="closeDialog"
    />
  </div>
</template>

<script>
import { getIncomeList, deleteIncome } from "@/api/incomeService";
import AddIncome from "./componets/AddIncome";

export default {
  name: "CapitalIncome",
  components: {
    AddIncome
  },
  data() {
    return {
      pagination: {
        pageSize: 10,
        pageIndex: 0
      },
      tableDatas: [],
      addIncomeVisible: false
    };
  },

  created() {
    this.getTableData();
  },

  methods: {
    getTableData() {
      const param = {
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      };
      getIncomeList(param).then(res => {
        console.log(res, "noted:::::::::::::::");
        if (res) {
          this.tableDatas = res;
        } else {
          this.tableDatas = [];
        }
      });
    },

    handleEdit(index, data) {
      this.editData = data;
      this.addIncomeVisible = true;
    },

    handleDelete(index, data) {
      this.deleteIncomeFun(data._id);
    },

    pageIndexChange() {
      this.pagination.pageIndex = e - 1;
      this.getTableData();
    },

    addIncome() {
      this.editData = {};
      this.addIncomeVisible = true;
    },

    deleteIncomeFun(_id) {
      deleteIncome(_id).then(res => {
        console.log(res);
        this.getTableData();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },

    closeDialog(e) {
      console.log(e);
      this.addIncomeVisible = false;
      if (e.refresh) {
        this.getTableData();
      }
    }
  }
};
</script>

<style>
.capital-income {
  margin: 30px;
}
</style>