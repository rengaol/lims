<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          show-password
        />
      </el-form-item>

      <el-form-item>
        <el-button
          class="loginBtn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const store = useStore();
const router = useRouter();
const ruleForm = reactive({
  name: "",
  password: "",
});
const rules = reactive({
  name: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
// 登录
const submitForm = async () => {
  await proxy.$refs.ruleFormRef.validate();
  const data = {
    user: {
      name: ruleForm.name,
      password: ruleForm.password,
    },
  };
  console.log(ruleForm, data);
  store.dispatch("Login", data).then((res) => {
    loadUserInfo();
    router.push({ path: "/" });
  });
  console.log(localStorage.getItem("token"));
};
//获取用户信息
let loadUserInfo = () => {
  store.dispatch("GetUserInfo").then(() => {});
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/login.jpg");
  text-align: center;
  overflow: hidden;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 40px;
    border-radius: 20px;
  }

  .loginBtn {
    width: 48%;
    text-align: center;
  }

  h2 {
    margin-bottom: 10px;
  }
}
</style>
