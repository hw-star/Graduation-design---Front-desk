<template>
  <div class="applogin_navigation">
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
              <el-button type="text" @click="centerforlogin = true">
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
      <div class="navigation_baidu">
        <div class="logo_baidu">
          <a href="https://www.baidu.com" target="_blank">
            <img src="../assets/images/baidu.jpg" />
          </a>
        </div>
        <div class="contianer_baidu">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="wd" placeholder="请输入搜索内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="talk">
        志愿者是指志愿贡献个人的时间及精力，在不为任何物质报酬的情况下，为改善社会服务，促进社会进步而提供服务的人。
        志愿工作具有志愿性、无偿性、公益性、组织性四大特征。参与志愿工作既是“助人”，亦是“自助”，既是“乐人”，同时也“乐己”。参与志愿工作，既是在帮助他人、服务社会，同时也是在传递爱心和传播文明。志愿服务个人化、人性化的特征，可以有效地拉近人与人之间的心灵距离，减少疏远感，对缓解社会矛盾，促进社会稳定有一定的积极作用。
      <div style="color: #409eff">此模块待完善，以上内容占位</div>
      </div>
      <div class="recommended">
        <div style="border-left: 5px solid #409eff;padding-left: 10px;font-weight:bold">&nbsp;&nbsp;推荐导航</div>
        <div class="listLink">
          <span
            ><a href="http://www.zgzyz.org.cn/" target="_blank"
              >中国青年志愿者</a
            ></span
          >
          <el-divider direction="vertical"></el-divider>
          <span
            ><a href="https://www.chinavolunteer.cn/" target="_blank"
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
// import activity from "../api/activity";
export default {
  name: "Navigation",
  created() {},
  data() {
    return {
      wd: "",
      loading: true,
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
      loading_login: false,
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
          this.$router.push({ path: "/navigation" });
          this.centerforlogin = false;
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
    onSubmit() {
      window.open("https://www.baidu.com/s?wd=" + this.wd);
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


