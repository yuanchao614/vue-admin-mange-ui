.<template>
  <div class="addExpend">
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="35%"
      @close="closeDialog"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品描述">
          <el-input v-model="form.productDesc"></el-input>
        </el-form-item>
        <el-form-item label="支出分类">
          <el-select
            v-model="form.billCategry"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in billCategryList"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支出日期">
          <el-col :span="24">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.createDate"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="form.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="支出金额">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio-group v-model="form.payMethods">
            <el-radio label="微信"></el-radio>
            <el-radio label="支付宝"></el-radio>
            <el-radio label="现金"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <!-- <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createBill, updateBill } from "@/api/billService";

export default {
  name: "AddExpend",
  props: {
    addExpendVisible: false,
    editData: Object,
  },
  data() {
    return {
      dialogFormVisible: this.addExpendVisible,
      title: "新增支持账单",
      form: {
        productDesc: "",
        billCategry: "",
        createDate: "",
        orderNum: "",
        amount: "",
        payMethods: "",
        remark: "",
      },
      billCategryList: [
        { label: "餐饮", value: "餐饮" },
        { label: "购物", value: "购物" },
        { label: "交通", value: "交通" },
        { label: "医疗", value: "医疗" },
        { label: "转账", value: "转账" },
        { label: "外卖", value: "外卖" },
        { label: "住房缴费", value: "住房缴费" },
        { label: "生活服务", value: "生活服务" },
      ],
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
      this.$emit("closeAddExpend", { close: false });
    },

    createExpend() {
      const param = {
        createDate: this.form.createDate ? this.form.createDate : new Date(),
        createBy: "admin",
        payMethods: this.form.payMethods,
        productDesc: this.form.productDesc,
        orderNum: Number(this.form.orderNum),
        remark: this.form.remark,
        billCategry: this.form.billCategry,
        amount: this.form.amount,
      };
      createBill(param).then(
        (res) => {
          console.log(res, "noted:::::::::add");
          if (res) {
            this.$message({
              message: `新增账单信息成功！`,
              type: "success",
            });
            //   this.dialogFormVisible = false;
            this.dialogFormVisible = false;
            this.$emit("closeAddExpend", { close: false, refresh: true });
            // this.closeDialog()
          }
        },
        (error) => {}
      );
    },

    updateExpend() {
      const param = {
        createDate: this.form.createDate
          ? this.form.createDate
          : this.editData.createDate,
        createBy: "admin",
        payMethods: this.form.payMethods,
        productDesc: this.form.productDesc,
        orderNum: Number(this.form.orderNum),
        remark: this.form.remark,
        billCategry: this.form.billCategry,
        amount: this.form.amount,
        updateDate: new Date(),
        updateBy: "admin",
      };
      const _id = this.editData._id;
      updateBill(_id, param).then(
        (res) => {
          console.log(res, "noted:::::::::edit");
          if (res) {
            this.$message({
              message: `编辑账单信息成功！`,
              type: "success",
            });
            //   this.dialogFormVisible = false;
            this.dialogFormVisible = false;
            this.$emit("closeAddExpend", { close: false, refresh: true });
            // this.closeDialog()
          }
        },
        (error) => {}
      );
    },

    handleOk() {
      if (this.editData._id) {
        this.updateExpend();
      } else {
        this.createExpend();
      }
    },

    featchForm() {
      this.title = "编辑账单";
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = this.editData[key];
        }
      }
    },
  },
};
</script>

<style>
</style>