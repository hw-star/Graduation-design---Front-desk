<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { bestwishes } from "./assets/js/bestwishes";
export default {
  mounted() {
    bestwishes();
  },
  watch:{
    $route(){
      window.localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
    }
    // watch和windows有冲突  未解决  ！！！！！！！！！！！！！！！！！！！
  },
  created() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
    });
    // this.$store.commit("RESET_STATE");
  },
};
</script>
