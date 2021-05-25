<template>
  <div class="applogin_navigation">
    <el-backtop></el-backtop>
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
            <li>
              <router-link to="/policy">政策文件</router-link>
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
        <el-form
          label-width="100px"
          class="demo-ruleForm"
          ref="ruleFormlogin"
          :model="ruleFormlogin"
          :rules="ruleFormloginRules"
          auto-complete="on"
        >
          <el-form-item label="账号" prop="userLoginId">
            <el-input
              ref="userLoginId"
              v-model="ruleFormlogin.userLoginId"
              placeholder="请输入手机号"
              auto-complete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userLoginPwd">
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
        <el-form
          label-width="100px"
          class="demo-ruleForm"
          ref="findPwd"
          :model="findPwd"
          :rules="findPwdRules"
          auto-complete="on"
        >
          <el-form-item label="账号" prop="id">
            <el-input
              ref="userLoginId"
              v-model="findPwd.id"
              placeholder="请输入账号"
              @blur="onBsp($event)"
              auto-complete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-if="theSuggestion"
              ref="userLoginPwd"
              v-model="findPwd.email"
              placeholder="此账号绑定的邮箱"
              auto-complete="on"
            ></el-input>
            <el-input
              v-else
              ref="userLoginPwd"
              v-model="findPwd.email"
              :placeholder="`此ID：` + findPwd.id + `\u3000绑定的邮箱`"
              auto-complete="on"
              @keyup.enter.native="submitFindPwd"
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
          :model="ruleFormregister"
          :rules="ruleFormregisterRules"
        >
          <el-form-item label="账号" prop="userId">
            <el-input
              v-model="ruleFormregister.userId"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPwd">
            <el-input
              v-model="ruleFormregister.userPwd"
              placeholder="请输入6-18位密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPwdtwo">
            <el-input
              v-model="ruleFormregister.userPwdtwo"
              placeholder="请 再 次输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="名字" prop="userName">
            <el-input
              v-model="ruleFormregister.userName"
              placeholder="请输入名字"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input
              v-model="ruleFormregister.userEmail"
              placeholder="请输入邮箱账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" @keyup.enter.native="submitFormregister">
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
      <div class="navigation_baidu">
        <div class="logo_baidu">
          <a
            href="https://chinavolunteer.mca.gov.cn/NVSI/LEAP/site/index.html#/home"
            target="_blank"
          >
            <img src="../assets/images/news.png" />
          </a>
        </div>
        <div class="contianer_baidu">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="wd" id="news_input" placeholder="请输入内容">
                <template slot="prepend">新闻文章</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="talk">
        <div class="talk_left">
          <div
            style="
              border-left: 5px solid #409eff;
              padding-left: 10px;
              font-weight: bold;
              font-size: 16px;
            "
          >
            &nbsp;&nbsp;通知公告
          </div>
          <div>
            <!-- 数据展示 -->
            <el-table
              style="margin-top: 6px"
              :data="list"
              v-loading="loading"
              :show-header="false"
              @row-click="noticeDetail"
            >
              <el-table-column label="序号" width="26" align="center">
                <i
                  class="iconfont iconyuandianlv"
                  style="color: rgb(230, 0, 18)"
                ></i>
              </el-table-column>
              <el-table-column
                align="left"
                width="390"
                label="标题"
                prop="noTitle"
              >
              </el-table-column>
              <el-table-column align="center" label="发布日期" prop="noTime">
              </el-table-column>
            </el-table>
            <!-- 分页 -->
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
        <div class="talk_right">
          <div
            style="
              border-left: 5px solid #409eff;
              padding-left: 10px;
              font-weight: bold;
              font-size: 16px;
            "
          >
            &nbsp;&nbsp;志愿风采
          </div>
          <div>

          </div>
        </div>
      </div>
      <div class="recommended">
        <div
          style="
            border-left: 5px solid #409eff;
            padding-left: 10px;
            font-weight: bold;
          "
        >
          &nbsp;&nbsp;推荐导航
        </div>
        <div class="listLink">
          <span
            ><a href="http://www.zgzyz.org.cn/" target="_blank"
              >中国青年志愿者</a
            ></span
          >
          <el-divider direction="vertical"></el-divider>
          <span
            ><a href="https://chinavolunteer.mca.gov.cn/NVSI/LEAP/site/index.html#/home" target="_blank"
              >中国志愿服务网</a
            ></span
          >
          <el-divider direction="vertical"></el-divider>
          <span
            ><a href="https://www.cvf.org.cn/" target="_blank"
              >中国志愿联合服务会</a
            ></span
          >
          <el-divider direction="vertical"></el-divider>
          <span
            ><a href="http://www.chinanpo.gov.cn/" target="_blank"
              >中国社会组织政府服务平台</a
            ></span
          >
          <el-divider direction="vertical"></el-divider>
          <span
            ><a href="https://www.bv2008.cn/" target="_blank">志愿北京</a></span
          >
          <el-divider direction="vertical"></el-divider>
          <span
            ><a href="http://www.pubchn.com/" target="_blank">公益中国</a></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "../api/user";
import noticeApi from "../api/notice";
import { validId, validEmail, validName } from "../utils/validate";
export default {
  name: "Navigation",
  created() {
    if (window.sessionStorage.getItem("userMsg")) {
      this.$store.replaceState(
        JSON.parse(window.sessionStorage.getItem("userMsg"))
      );
    }
    this.getlist();
    this.yzLogin();
  },
  watch: {
    centerforlogin() {
      if (this.centerforlogin == true) {
        this.$nextTick(() => {
          this.$refs.ruleFormlogin.resetFields();
          if (this.$refs["findPwd"] !== undefined) {
            this.$refs.findPwd.resetFields();
          }
        });
      }
    },
    centerforregister() {
      if (this.centerforregister == true) {
        this.$nextTick(() => {
          this.$refs["ruleFormregister"].resetFields();
          this.ruleFormregister.userSex = "1";
        });
      }
    },
  },
  data() {
    const validateUserId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        if (!validId(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        if (validEmail(value)) {
          callback();
        } else {
          return callback(new Error("邮箱格式不正确"));
        }
      }
    };
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名字不能为空"));
      } else {
        if (validName(value)) {
          callback();
        } else {
          return callback(new Error("名字必须是汉字"));
        }
      }
    };
    const validateYZPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else {
        if (this.ruleFormregister.userPwd == value) {
          callback();
        } else {
          return callback(new Error("两次输入的密码不一致"));
        }
      }
    };
    return {
      wd: "",
      page: 1, //当前页
      limit: 16, //每页记录数
      list: null,
      total: 0,
      loading: false,
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
        userPwdtwo: "",
      },
      centerforlogin: false,
      centerforregister: false,
      isLoginOrNologin: true,
      findPwd: {
        id: "",
        email: "",
      },
      toFindPwd: false,
      theSuggestion: true,

      ruleFormloginRules: {
        userLoginId: [
          { required: true, trigger: "blur", validator: validateUserId },
        ],
        userLoginPwd: [
          {
            required: true,
            type: "string",
            trigger: "blur",
            max: 18,
            min: 6,
            message: "密码位数不够",
          },
        ],
      },
      findPwdRules: {
        id: [{ required: true, trigger: "blur", validator: validateUserId }],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
      },
      ruleFormregisterRules: {
        userId: [
          { required: true, trigger: "blur", validator: validateUserId },
        ],
        userPwd: [
          {
            required: true,
            type: "string",
            trigger: "blur",
            max: 18,
            min: 6,
            message: "密码位数不够",
          },
        ],
        userEmail: [
          { required: true, trigger: "blur", validator: validateEmail },
        ],
        userPwdtwo: [
          {
            required: true,
            type: "string",
            trigger: "blur",
            max: 18,
            min: 6,
            message: "密码位数不够",
          },
          {
            required: true,
            type: "string",
            trigger: "blur",
            validator: validateYZPwd,
          },
        ],
        userName: [
          { required: true, trigger: "blur", validator: validateName },
        ],
      },
    };
  },
  methods: {
    submitFormlogin() {
      this.$refs.ruleFormlogin.validate((valid) => {
        if (valid) {
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
              this.$router.push({ path: "/navigation" });
              this.centerforlogin = false;
              this.loading = false;
            })
            .catch((error) => {});
        } else {
          return false;
        }
      });
    },
    resetFormlogin() {
      // this.ruleFormlogin = {};
      this.$refs["ruleFormlogin"].resetFields();
    },
    submitFormregister() {
      this.$refs.ruleFormregister.validate((valid) => {
        if (valid) {
          userApi
            .add(this.ruleFormregister)
            .then((response) => {
              this.$message({
                type: "success",
                message: "注册成功!",
              });
              this.resetFormregister();
              this.centerforregister = false;
              this.$router.push({ path: "/navigation" });
            })
            .catch((error) => {});
        } else {
          return false;
        }
      });
    },
    resetFormregister() {
      this.$refs["ruleFormregister"].resetFields();
      this.ruleFormregister.userSex = "1";
    },
    onSubmit() {
      //window.open("https://www.baidu.com/s?wd=" + this.wd);
      if (this.wd == "") {
        this.$message("请输入搜索关键字");
      } else {
        window.open(
          "https://chinavolunteer.mca.gov.cn/NVSI/LEAP/site/index.html#/news/5/" +
            this.wd
        );
      }
      this.wd = "";
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
      this.$router.push({ path: "/navigation" });
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
      this.$refs["findPwd"].resetFields();
      this.theSuggestion = true;
    },
    submitFindPwd() {
      this.$refs.findPwd.validate((valid) => {
        if (valid) {
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
        } else {
          return false;
        }
      });
    },
    onBsp(event) {
      this.theSuggestion = false;
    },
    saveData() {
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state));
      });
    },
    getlist(page = 1) {
      this.page = page;
      noticeApi
        .getNoticeListPage(this.page, this.limit)
        .then((response) => {
          this.list = response.data.noticedata;
          this.total = response.data.total;
          this.loading = false;
        })
        .catch((error) => {});
    },
    noticeDetail(row, column, event) {
      let detailPage = this.$router.resolve({
        path: "/noticedetail",
        query: {
          id: row.id,
        },
      });
      window.open(detailPage.href, "_blank");
    },
  },
};
</script>
<style scoped>
@import "../assets/css/navigation.css";
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>