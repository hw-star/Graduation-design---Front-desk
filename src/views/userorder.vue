<template>
  <div class="apporder">
    <div id="nav_set_fix">
      <nav class="nav_set">
        <div class="nav_set_left">
          <ul>
            <li>
              <router-link to="/" :title="titlemesg"
                ><i
                  class="iconfont iconhongqi"
                  style="color: red !important"
                ></i>
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
    </div>
    <div class="set_login">
      <el-dialog
        title="账号登录"
        :visible.sync="centerforlogin"
        width="30%"
        center
      >
        <el-form label-width="100px" class="demo-ruleForm" auto-complete="on">
          <el-form-item label="账号">
            <el-input
              ref="userLoginId"
              v-model="ruleFormlogin.userLoginId"
              placeholder="请输入手机号"
              auto-complete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              ref="userLoginPwd"
              v-model="ruleFormlogin.userLoginPwd"
              placeholder="请输入6-18位密码"
              show-password
              auto-complete="on"
              @keyup.enter.native="submitFormlogin"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 39%"
              type="primary"
              :loading="loading_login"
              @click="submitFormlogin()"
              >登录</el-button
            >
            <el-button style="width: 39%" @click="resetFormlogin()"
              >重置</el-button
            >
          </el-form-item>
          <el-form-item>
            <div class="divgetPwd">忘记密码</div>
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
          <el-form-item label="性别" @keyup.enter.native="submitFormregister" prop="registersex">
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

    <div id="data_list">
      <!--查询-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="fuzzyquery" placeholder="活动号或者名称" />
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="getlist()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
      <!--数据展示-->
      <el-table
        :data="list"
        v-loading="loading"
        style="width: 100%; height: 469.6px; border-radius: 8px"
      >
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动号" prop="orAcid">
        </el-table-column>
        <el-table-column align="center" label="活动名称" prop="actName">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              style="margin: 0px 4px"
              size="mini"
              type="danger"
              @click="cancelActivity(scope.row.id)"
              >取消报名</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-footer class="footerPage">
        <el-pagination
          background
          align="center"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="getlist"
          :total="total"
          :current-page="page"
          :page-size="limit"
        >
        </el-pagination>
      </el-footer>
    </div>
  </div>
</template>

<script>
import orderApi from "../api/userorder";
export default {
  name: "Home",
  created() {
    if (window.sessionStorage.getItem("userMsg")) {
      this.$store.replaceState(
        JSON.parse(window.sessionStorage.getItem("userMsg"))
      );
    }
    this.getlist();
    this.yzLogin();
  },
  data() {
    return {
      page: 1, //当前页
      limit: 8, //每页记录数
      list: null,
      total: 0,
      fuzzyquery: "",
      loading: true,
      loading_login: false,

      titlemesg: '青年志愿者是"奉献、友爱、互助、进步"的精神。',
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
      userPwd: "",
      centerforlogin: false,
      centerforregister: false,
      isLoginOrNologin: true,
    };
  },
  methods: {
    submitFormlogin() {
      this.centerforlogin = false;
    },
    resetFormlogin() {
      this.ruleFormlogin = {};
    },
    submitFormregister() {
      this.centerforregister = false;
    },
    resetFormregister() {
      this.ruleFormregister = {};
      this.ruleFormregister.registersex = "1";
      this.userPwd = "";
    },
    getlist(page = 1) {
      this.page = page;
      orderApi
        .getUserOrdersListPage(this.page, this.limit, this.fuzzyquery)
        .then((response) => {
          this.list = response.data.orderdata;
          this.total = response.data.total;
          this.loading = false;
        })
        .catch((error) => {});
    },
    cancelActivity(id) {
      this.$confirm("此操作将取消报名该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          orderApi.cancelActivity(id).then((response) => {
            this.$message({
              type: "success",
              message: "取消报名成功!",
            });
            this.getlist();
          });
        })
        .catch((error) => {});
    },
    resetData() {
      this.fuzzyquery = "";
      this.getlist();
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
      this.$router.push({ path: "/activity" });
      window.sessionStorage.removeItem("userMsg");
    },
  },
};
</script>
<style scoped>
@import "../assets/css/userorder.css";
</style>