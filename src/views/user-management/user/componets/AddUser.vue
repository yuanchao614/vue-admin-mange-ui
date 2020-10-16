<template>
  <div class="addUser">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="20%" @close="closeDialog">
      <el-form :model="form" :label-position="formLabelPosition">
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input v-model="form.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="FirstName" :label-width="formLabelWidth">
          <el-input v-model="form.firstName" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="LastName" :label-width="formLabelWidth">
          <el-input v-model="form.lastName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  props: {
      visibleAddUserModal: Boolean,
      editData: Object
  },
  data() {
    return {
      form: {
        nameId: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
      },
      formLabelPosition: "left",
      formLabelWidth: "100px",
      dialogFormVisible: this.visibleAddUserModal,
      title: ""
    };
  },

  created() {
      console.log(this.editData, 'child:::::::::::');
      if (this.editData) {
          this.title = '编辑用户'
          for (const key in this.form) {
              if (this.form.hasOwnProperty(key)) {
                  this.form[key] = this.editData[key];
              }
          }
      } else {
          this.title = '新增用户'
      }
  },

  methods: {
      closeDialog() {
          this.dialogFormVisible = false;
          this.$emit('closeAddUserModal', false)
      },

      handleOk() {
          
      }
  }
};
</script>

<style>
</style>