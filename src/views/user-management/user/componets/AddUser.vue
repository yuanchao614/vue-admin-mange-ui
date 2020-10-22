<template>
  <div class="addUser">
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="35%"
      @close="closeDialog"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        :label-position="formLabelPosition"
      >
        <el-form-item
          label="用户名"
          prop="userId"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phoneNo"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.phoneNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleOk('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createUser, updateUser } from "@/api/user";

export default {
  name: "AddUser",
  props: {
    visibleAddUserModal: Boolean,
    editData: Object,
  },
  data() {
    return {
      form: {
        userId: "",
        password: "",
        phoneNo: "",
        email: "",
      },
      rules: {
        userId: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        phoneNo: [
          { required: true, message: "请输入手机号", trigger: "change" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
      },
      formLabelPosition: "left",
      formLabelWidth: "100px",
      dialogFormVisible: this.visibleAddUserModal,
      title: "",
    };
  },

  created() {
    console.log(this.editData, "child:::::::::::");
    if (this.editData) {
      this.title = "编辑用户";
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = this.editData[key];
        }
      }
    } else {
      this.title = "新增用户";
    }
  },

  methods: {
    closeDialog() {
      this.dialogFormVisible = false;
      this.$emit("closeAddUserModal", { close: false });
    },

    createUserFun() {
      console.log(this.editData);
      const paramData = !this.editData
        ? {
            userId: this.form.userId,
            password: this.form.password,
            phoneNo: this.form.phoneNo,
            email: this.form.email,
            createDate: new Date(),
            createBy: "admin",
            updateDate: new Date(),
            updateBy: "admin",
          }
        : {
            userId: this.form.userId,
            password: this.form.password,
            phoneNo: this.form.phoneNo,
            email: this.form.email,
            createDate: this.editData.createDate,
            createBy: this.editData.createBy,
            updateDate: new Date(),
            updateBy: "admin",
          };
      !this.editData
        ? createUser(paramData).then(
            (res) => {
              console.log(res);
              if (res) {
                this.$emit("closeAddUserModal", {
                  close: false,
                  refresh: true,
                });
                this.$message({
                  message: `新增用户${res.userId}成功！`,
                  type: "success",
                });
              } else {
                this.$emit("closeAddUserModal", { close: false });
                this.$message.error("新增用户失败！");
              }
            },
            (error) => {
              this.$message.error("新增用户失败！");
            }
          )
        : updateUser(this.editData._id, paramData).then((res) => {
            console.log(res);
            if (res) {
              this.$emit("closeAddUserModal", { close: false, refresh: true });
            } else {
              this.$emit("closeAddUserModal", { close: false });
            }
          });
    },

    handleOk(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.createUserFun();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>