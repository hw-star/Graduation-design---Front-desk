<template>
  <div class="appabout">
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
    <div class="aboutMsg">
      <el-form label-width="80px" ref="User" :model="User">
        <el-form-item label="名字" prop="userName">
          <el-input
            style="width: 38%"
            v-model="User.userName"
            :disabled="isUpdateInformation"
          />
        </el-form-item>
        <el-form-item label="账号">
          <el-input style="width: 38%" v-model="User.userId" :disabled="true" />
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input
            style="width: 38%"
            v-model="User.userPwd"
            :disabled="isUpdateInformation"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            style="width: 38%"
            v-model="User.userEmail"
            :disabled="isUpdateInformation"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            :disabled="isUpdateInformation"
            style="width: 16%"
            v-model="User.userSex"
            clearable
            placeholder="请选择性别"
          >
            <el-option :value="1" label="男" />
            <el-option :value="0" label="女" />
          </el-select>
        </el-form-item>

        <!-- 头像 -->
        <el-form-item label="头像">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="User.userAvatar + ''" />
          <!-- 文件上传按钮 -->
          <el-button
            v-if="isUpdateInformation == false"
            type="primary"
            icon="el-icon-upload"
            @click="imagecropperShow = true"
            >更换头像
          </el-button>

          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
        <input type="file" name="file"/>
      -->
          <image-cropper
            v-show="imagecropperShow"
            :width="300"
            :height="300"
            :key="imagecropperKey"
            :url="BASE_API + '/oss/fileoss'"
            field="file"
            @close="close"
            @crop-upload-success="cropSuccess"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            :disabled="saveBtnDisabled"
            v-if="isUpdateInformation == true"
            type="primary"
            @click="toUpdate"
            >修改个人信息</el-button
          >
          <el-button
            :disabled="saveBtnDisabled"
            v-if="isUpdateInformation == false"
            type="warning"
            @click="channelUpdate"
            >取消</el-button
          >
          <el-button
            :disabled="saveBtnDisabled"
            v-if="isUpdateInformation == false"
            type="warning"
            @click="startUpdate"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import userApi from "../api/user";
import ImageCropper from "../components/ImageCropper";
import PanThumb from "../components/PanThumb";
export default {
  name: "About",
  created() {
    if (window.sessionStorage.getItem("userMsg")) {
      this.$store.replaceState(
        JSON.parse(window.sessionStorage.getItem("userMsg"))
      );
    }
    this.yzLogin();
    this.getMsg();
  },
  watch: {
    isLoginOrNologin() {
      if (window.sessionStorage.getItem("applyId")) {
        setTimeout(() => {
          this.signUpActivity(window.sessionStorage.getItem("applyId"));
          window.sessionStorage.removeItem("applyId");
        }, 500);
      }
    },
  },
  components: { ImageCropper, PanThumb },
  data() {
    return {
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
      User: {},
      centerforlogin: false,
      centerforregister: false,
      isLoginOrNologin: true,
      loading_login: false,
      // 负责头像以及是否更新部分
      saveBtnDisabled: false,
      isUpdateInformation: true,
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: "http://127.0.0.1:10010",
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
    getMsg() {
      userApi
        .getInfoMsg()
        .then((response) => {
          this.User = response.data;
          console.log(this.User);
        })
        .catch((error) => {});
    },
    toUpdate() {
      this.isUpdateInformation = false;
    },
    // 更新个人信息
    startUpdate() {
      userApi
        .updateUser(this.User)
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.go({ path: "/about" });
        })
        .catch((error) => {});
    },
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      this.User.userAvatar = data;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      this.imagecropperShow = false;
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    channelUpdate() {
      //this.$refs["sysUser"].resetFields();
      this.isUpdateInformation = true;
      //this.getInfoMsg();
    },
  },
};
</script>
<style scoped>
@import "../assets/css/about.css";
</style>
