<template>
  <div class="applogin-container">
    <nav class="nav_set">
      <div class="nav_set_left">
        <ul>
          <li>
            <router-link to="/" :title="titlemesg"
              ><i class="iconfont iconhongqi" style="color: red !important"></i>
              青年志愿者</router-link
            >
          </li>
          <li>
            <router-link to="/activity">活动</router-link>
          </li>
          <li>
            <router-link to="/navigation">导航</router-link>
          </li>
        </ul>
      </div>
      <div class="nav_set_right">
        <ul v-if="isLoginOrNologin">
          <li>
            <el-button type="text" @click="centerforregister = true">
              <i class="iconfont iconzhuce"></i>注册
            </el-button>
          </li>
          <li>
            <el-button type="text" @click="centerforlogin = true">
              <i class="iconfont icondenglu"></i>登录
            </el-button>
          </li>
        </ul>
        <ul v-else>
          <li>
            <el-button type="text" @click="loginout">
              <i class="iconfont icontuichu1"></i>退出
            </el-button>
          </li>
          <li>
            <router-link to="/about"
              ><img :src="this.$store.state.avatar"
            /></router-link>
          </li>
        </ul>
      </div>
    </nav>
    <canvas id="line">浏览器版本太低，请升级浏览器！</canvas>
    <h1>
      青年志愿者 <i class="iconfont iconshuxian"></i>Chinese Youth Volunteers
    </h1>
    <div class="set_background"></div>
    <div class="set_login">
      <el-dialog
        title="账号登录"
        :visible.sync="centerforlogin"
        width="30%"
        center
      >
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号">
            <el-input
              ref="userLoginId"
              v-model="ruleFormlogin.userLoginId"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              ref="userLoginPwd"
              v-model="ruleFormlogin.userLoginPwd"
              placeholder="请输入6-18位密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 39%"
              type="primary"
              :loading="loading"
              @click="submitFormlogin()"
              >登录</el-button
            >
            <el-button style="width: 39%" @click="resetFormlogin()"
              >重置</el-button
            >
          </el-form-item>
          <el-form-item>
            <div class="divgetPwd">
              <router-link to="/about">忘记密码</router-link>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="set_register">
      <el-dialog
        title="账号注册"
        :visible.sync="centerforregister"
        width="30%"
        center
      >
        <el-form
          :model="ruleFormregister"
          ref="ruleFormregister"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="registerid">
            <el-input
              v-model="ruleFormregister.registerid"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="registerpwdf">
            <el-input
              v-model="ruleFormregister.registerpwdf"
              placeholder="请输入6-18位密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="registerpwds">
            <el-input
              v-model="ruleFormregister.registerpwds"
              placeholder="请 再 次输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="名字" prop="registername">
            <el-input
              v-model="ruleFormregister.registername"
              placeholder="请输入名字"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="registeremail">
            <el-input
              v-model="ruleFormregister.registeremail"
              placeholder="请输入邮箱账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="registersex">
            <el-radio v-model="sex" label="1">男</el-radio>
            <el-radio v-model="sex" label="2">女</el-radio>
            <el-tag type="info">注：登陆后可更换头像</el-tag>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 39%"
              type="primary"
              @click="submitFormregister('ruleFormregister')"
              >注册</el-button
            >
            <el-button
              style="width: 39%"
              @click="resetFormregister('ruleFormregister')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { createcanvasline } from "../assets/js/createcanvasline";
export default {
  name: "Home",
  created() {
    if (window.localStorage.getItem("userMsg")) {
      this.$store.replaceState(
        JSON.parse(window.localStorage.getItem("userMsg"))
      );
    }
    this.yzLogin();
  },
  mounted() {
    createcanvasline();
  },
  data() {
    return {
      titlemesg: '青年志愿者是"奉献、友爱、互助、进步"的精神。',
      sex: "1",
      ruleFormlogin: {
        userLoginId: "",
        userLoginPwd: "",
      },
      ruleFormregister: {
        registerid: "",
        registerpwdf: "",
        registerpwds: "",
        registername: "",
        registeremail: "",
      },
      centerforlogin: false,
      centerforregister: false,
      loading: false,
      isLoginOrNologin: true,
    };
  },
  methods: {
    submitFormlogin() {
      this.loading = true;
      this.$store
        .dispatch("login", this.ruleFormlogin)
        .then(() => {
          this.$store
            .dispatch("getInfo", this.$store.state.token)
            .then(() => {
              this.isLoginOrNologin = false;
              this.$message({
                message: "登录成功！",
                type: "success",
              });
            })
            .catch((error) => {});
          this.$router.push({ path: "/" });
          this.centerforlogin = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    resetFormlogin() {
      this.ruleFormlogin.resetFields();
    },
    submitFormregister(data) {},
    resetFormregister() {},
    yzLogin() {
      let valid = this.$store.state.avatar;
      if (valid != "") {
        this.isLoginOrNologin = false;
      }
    },
    async loginout() {
      this.isLoginOrNologin = true;
      await this.$store.dispatch("logout");
      this.$router.push(`/?redirect=${this.$route.fullPath}`);
      window.localStorage.removeItem("userMsg");
    },
  },
};
</script>
<style scoped>
@import "../assets/css/index.css";
</style>
