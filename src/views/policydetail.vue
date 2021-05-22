<template>
  <div class="applogin_policydetail">
    <el-backtop></el-backtop>
    <div id="nav_set_fix">
      <nav class="nav_set">
        <div class="nav_set_left">
          <ul>
            <li>相关政策文件具体内容</li>
          </ul>
        </div>
      </nav>
    </div>
    <div id="data_list">
      <h2>{{ this.oneData.poTitle }}</h2>
      <div class="policy_content"><span v-html="this.oneData.poContent"></span></div>
    </div>
  </div>
</template>

<script>
import policyApi from "../api/policy";
export default {
  name: "PolicyDetail",
  created() {
    this.getData();
  },
  data() {
    return {
      id: this.$route.query.id,
      oneData: {},
    };
  },
  methods: {
    getData() {
      policyApi
        .getOnePolicy(this.id)
        .then((response) => {
          this.oneData = response.data;
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scoped>
@import "../assets/css/policydetail.css";
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