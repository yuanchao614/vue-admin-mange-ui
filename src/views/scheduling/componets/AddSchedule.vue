.<template>
  <div class="add-schedule">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="450px" @close="closeDialog">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="计划描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="计划时间">
          <el-col :span="24">
            <el-date-picker
              type="datetime"
              placeholder="选择计划日期时间"
              v-model="form.dates"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="是否完成">
          <el-switch v-model="form.isComplete" active-text="完成" inactive-text="未完成"></el-switch>
        </el-form-item>
        <el-form-item label="计划等级">
          <el-radio-group v-model="form.color">
            <el-radio label="red">重要</el-radio>
            <el-radio label="orange">一般</el-radio>
            <el-radio label="green">次要</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createSchedule, updateSchedule } from "@/api/scheduleService";

export default {
  name: "AddSchedule",
  props: {
    addSchedulingVisible: false,
    editData: Object
  },
  data() {
    return {
      dialogFormVisible: this.addSchedulingVisible,
      title: "",
      form: {
        dates: "",
        description: "",
        isComplete: false,
        color: ""
      }
    };
  },

  created() {
    if (this.editData._id) {
        console.log(89999);
       this.featchForm();
    } else {
        this.title = '新增计划';
    }
  },

  methods: {
    closeDialog() {
      this.dialogFormVisible = false;
      this.$emit("closeAddSchedule", { close: false });
    },

    addSchedule() {
      const param = {
        createBy: "admin",
        updateBy: "admin",
        createDate: new Date(),
        updateDate: new Date(),
        dates: this.form.dates,
        description: this.form.description,
        isComplete: this.form.isComplete,
        color: this.form.color
      };
      createSchedule(param).then(res => {
        if (res) {
          this.$message({
            message: `新增计划信息成功！`,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.$emit("closeAddSchedule", { close: false, refresh: true });
        }
      });
    },

    editSchedule(_id) {
      const param = {
        createBy: this.editData.createBy,
        updateBy: "admin",
        createDate: this.editData.createDate,
        updateDate: new Date(),
        dates: this.form.dates,
        description: this.form.description,
        isComplete: this.form.isComplete,
        color: this.form.color
      };
      updateSchedule(_id, param).then(res => {
        if (res) {
          this.$message({
            message: `更新计划信息成功！`,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.$emit("closeAddSchedule", { close: false, refresh: true });
        }
      });
    },

    featchForm() {
      this.title = "编辑计划";
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = this.editData[key];
        }
      }
    },

    handleOk() {
      if (this.editData._id) {
        // 编辑
        this.editSchedule(this.editData._id);
      } else {
        // 新增
        this.addSchedule();
      }
    }
  }
};
</script>

<style>
</style>