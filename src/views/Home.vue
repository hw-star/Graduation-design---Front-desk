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
        :ref="ruleFormlogin"
        v-model="ruleFormlogin"
      >
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="userLoginId">
            <el-input
              v-model="ruleFormlogin.userLoginId"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userLoginPwd">
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
            <div class="divgetPwd" @click="toFindP">忘记密码</div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="密码找回" :visible.sync="toFindPwd" width="30%" center>
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号">
            <el-input
              ref="userLoginId"
              v-model="findPwd.id"
              placeholder="请输入账号"
              @blur="onBsp($event)"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              v-if="theSuggestion"
              ref="userLoginPwd"
              v-model="findPwd.email"
              placeholder="此账号绑定的邮箱"
            ></el-input>
            <el-input
              v-else
              ref="userLoginPwd"
              v-model="findPwd.email"
              :placeholder="`此ID：` + findPwd.id + `\u3000绑定的邮箱`"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 39%"
              type="primary"
              :loading="loading"
              @click="submitFindPwd()"
              >找回</el-button
            >
            <el-button style="width: 39%" @click="resetFindPwd()"
              >重置</el-button
            >
          </el-form-item>
          <el-form-item>
            <div class="divgetPwd" @click="toLogin">返回登录</div>
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
          ref="ruleFormregister"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="registerid">
            <el-input
              v-model="ruleFormregister.userId"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="registerpwdf">
            <el-input
              v-model="ruleFormregister.userPwd"
              placeholder="请输入6-18位密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="registerpwds">
            <el-input
              v-model="userPwd"
              placeholder="请 再 次输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="名字" prop="registername">
            <el-input
              v-model="ruleFormregister.userName"
              placeholder="请输入名字"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="registeremail">
            <el-input
              v-model="ruleFormregister.userEmail"
              placeholder="请输入邮箱账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="registersex">
            <el-radio v-model="ruleFormregister.userSex" label="1">男</el-radio>
            <el-radio v-model="ruleFormregister.userSex" label="0">女</el-radio>
            <el-tag type="info">注：登陆后可更换头像</el-tag>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 39%"
              type="primary"
              @click="submitFormregister()"
              >注册</el-button
            >
            <el-button style="width: 39%" @click="resetFormregister()"
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
import userApi from "../api/user";
export default {
  name: "Home",
  created() {
    if (window.sessionStorage.getItem("userMsg")) {
      this.$store.replaceState(
        JSON.parse(window.sessionStorage.getItem("userMsg"))
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
        id: "",
        userName: "",
        userId: "",
        userSex: "1",
        userEmail: "",
        userPwd: "",
      },
      findPwd: {
        id: "",
        email: "",
      },
      userPwd: "",
      centerforlogin: false,
      centerforregister: false,
      loading: false,
      isLoginOrNologin: true,

      toFindPwd: false,
      theSuggestion: true,
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
              this.saveData();
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
      this.ruleFormlogin = {};
    },
    submitFormregister() {
      userApi
        .add(this.ruleFormregister)
        .then((response) => {
          this.$message({
            type: "success",
            message: "注册成功!",
          });
          this.resetFormregister();
          this.centerforregister = false;
          this.$router.push({ path: "/" });
        })
        .catch((error) => {});
    },
    resetFormregister() {
      this.ruleFormregister = {};
      this.ruleFormregister.registersex = "1";
      this.userPwd = "";
    },
    yzLogin() {
      let valid = this.$store.state.avatar;
      if (valid != "") {
        this.isLoginOrNologin = false;
      }
    },
    async loginout() {
      this.isLoginOrNologin = true;
      await this.$store.dispatch("logout");
      this.$router.push({ path: "/" });
      window.sessionStorage.removeItem("userMsg");
    },
    toFindP() {
      this.centerforlogin = false;
      setTimeout(() => {
        this.toFindPwd = true;
        this.resetFormlogin();
      }, 500);
    },
    toLogin() {
      this.toFindPwd = false;
      setTimeout(() => {
        this.centerforlogin = true;
        this.resetFindPwd();
      }, 500);
    },
    resetFindPwd() {
      this.findPwd = {};
      this.theSuggestion = true;
    },
    submitFindPwd() {
      userApi
        .FindPwd(this.findPwd)
        .then((response) => {
          const h = this.$createElement;
          this.$notify({
            title: "密码找回消息提示",
            position: "top-right",
            message: h(
              "i",
              { style: "color: #4169e1;font-weight:bold" },
              "您原来的密码已发送到您账号绑定的邮箱，邮箱号：" +
                this.findPwd.email
            ),
          });
          this.resetFindPwd();
          this.toFindPwd = false;
        })
        .catch((error) => {});
    },
    onBsp(event) {
      this.theSuggestion = false;
    },
    saveData(){
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state));
      });
    }
  },
};
</script>
<style scoped>
@import "../assets/css/index.css";
</style>
