.<template>
  <div class="addIncome">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="450px" @close="closeDialog">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="收入金额">
          <el-input v-model="form.incomeAmount"></el-input>
        </el-form-item>
        <el-form-item label="收入分类">
          <el-select v-model="form.incomeCategry" placeholder="请选择分类" style="width: 100%">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in incomeCategryList"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入日期">
          <el-col :span="24">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.createDate"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="收入平台">
          <el-radio-group v-model="form.incomePlatform">
            <el-radio label="微信"></el-radio>
            <el-radio label="支付宝"></el-radio>
            <el-radio label="银行卡"></el-radio>
            <el-radio label="现金"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <!-- <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createIncome, updateIncome } from "@/api/incomeService";

export default {
  name: "AddIncome",
  props: {
    addIncomeVisible: false,
    editData: Object
  },
  data() {
    return {
      dialogFormVisible: this.addIncomeVisible,
      title: "新增收入数据",
      form: {
        incomeCategry: "",
        createDate: "",
        incomeAmount: "",
        incomePlatform: "",
        remark: ""
      },
      incomeCategryList: [
        { label: "工资", value: "工资" },
        { label: "理财", value: "理财" },
        { label: "收益", value: "收益" },
        { label: "红包", value: "红包" },
        { label: "转账", value: "转账" }
      ]
    };
  },

  created() {
    console.log(this.editData, "noted:::::::edit");
    if (this.editData._id) {
      this.featchForm();
    }
  },

  methods: {
    closeDialog() {
      this.dialogFormVisible = false;
      this.$emit("closeAddIncome", { close: false });
    },

    createIncomeFun() {
      console.log(8888);
      const param = {
        createDate: this.form.createDate ? this.form.createDate : new Date(),
        createBy: "admin",
        updateBy: "admin",
        updateDate: this.form.createDate ? this.form.createDate : new Date(),
        incomePlatform: this.form.incomePlatform,
        remark: this.form.remark,
        incomeCategry: this.form.incomeCategry,
        incomeAmount: this.form.incomeAmount
      };
      createIncome(param).then(
        res => {
          console.log(res, "noted:::::::::add");
          if (res) {
            this.$message({
              message: `新增收入信息成功！`,
              type: "success"
            });
            //   this.dialogFormVisible = false;
            this.dialogFormVisible = false;
            this.$emit("closeAddIncome", { close: false, refresh: true });
            // this.closeDialog()
          }
        },
        error => {}
      );
    },

    updateIncomeFun() {
      const param = {
        createDate: this.form.createDate
          ? this.form.createDate
          : this.editData.createDate,
        createBy: this.editData.createBy,
        updateBy: "admin",
        updateDate: new Date(),
        incomePlatform: this.form.incomePlatform,
        remark: this.form.remark,
        incomeCategry: this.form.incomeCategry,
        incomeAmount: this.form.incomeAmount
      };
      const _id = this.editData._id;
      updateIncome(_id, param).then(
        res => {
          console.log(res, "noted:::::::::edit");
          if (res) {
            this.$message({
              message: `编辑收入信息成功！`,
              type: "success"
            });
            //   this.dialogFormVisible = false;
            this.dialogFormVisible = false;
            this.$emit("closeAddIncome", { close: false, refresh: true });
            // this.closeDialog()
          }
        },
        error => {}
      );
    },

    handleOk() {
      if (this.editData._id) {
        this.updateIncomeFun();
      } else {
        console.log("test:::::::::");
        this.createIncomeFun();
      }
    },

    featchForm() {
      this.title = "编辑收入数据";
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = this.editData[key];
        }
      }
    }
  }
};
</script>

<style>
</style>