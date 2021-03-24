<template>
  <div class="applogin">
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
              :loading="loading_login"
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

    <div id="data_list">
      <!--查询-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="activityBody.fuzzyquery"
            placeholder="活动号或者名称"
          />
        </el-form-item>
        <el-form-item label="添加时间">
          <el-date-picker
            v-model="activityBody.begin"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="activityBody.end"
            type="datetime"
            placeholder="选择截止时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
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
        <el-table-column align="center" label="活动号" prop="id">
        </el-table-column>
        <el-table-column align="center" label="名称" prop="actName">
        </el-table-column>
        <el-table-column align="center" label="需求/已报人数">
          <template slot-scope="scope">
            {{ scope.row.actNumber + "/" + scope.row.actNumbered }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开始时间" prop="actUpdate">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="left-start"
              :title="`活动号：${scope.row.id}\u3000\u3000可报人数：${
                scope.row.actNumber - scope.row.actNumbered
              }\u3000\u3000时间：${scope.row.actUpdate}`"
              width="480"
              trigger="hover"
              :content="`描述：${scope.row.actDescription}`"
            >
              <el-button slot="reference" style="margin: 0px 4px" size="mini"
                >活动描述</el-button
              >
            </el-popover>

            <el-button
              style="margin: 0px 4px"
              size="mini"
              type="danger"
              @click="signUpActivity(scope.row.id)"
              >申请</el-button
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
import activity from "../api/activity";
export default {
  name: "Home",
  created() {
    if (window.localStorage.getItem("userMsg")) {
      this.$store.replaceState(JSON.parse(window.localStorage.getItem("userMsg")));
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
      activityBody: {},
      loading: true,
      loading_login: false,

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
      isLoginOrNologin: true,
    };
  },
  methods: {
    submitFormlogin() {
      this.loading_login = true;
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
              this.loading_login = false;
            })
            .catch((error) => {
              this.loading_login = false;
            });
          this.$router.push({ path: "/activity" });
          this.centerforlogin = false;
        })
        .catch((error) => {});
    },
    resetFormlogin() {
      this.ruleFormlogin.resetFields();
    },
    submitFormregister(data) {},
    resetFormregister() {},

    getlist(page = 1) {
      this.page = page;
      activity
        .getActivityListPage(this.page, this.limit, this.activityBody)
        .then((response) => {
          this.list = response.data.activitydata;
          this.total = response.data.total;
          this.loading = false;
        })
        .catch((error) => {});
    },
    signUpActivity(id) {
      if (this.$store.state) {
        this.$confirm("此操作将报名该活动, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 此方法暂时未实现
            manageactivity.signUpActivity(id).then((response) => {
              this.$message({
                type: "success",
                message: "报名成功!",
              });
              this.getlist();
            });
          })
          .catch((error) => {});
      } else {
        this.centerforlogin = true;
      }
    },
    resetData() {
      this.activityBody = {};
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
      this.$router.push(`/activity?redirect=${this.$route.fullPath}`);
      window.localStorage.removeItem("userMsg");
    },
  },
};
</script>
<style scoped>
@import "../assets/css/activity.css";
</style>


