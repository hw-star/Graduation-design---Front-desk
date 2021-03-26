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
  // created() {
  //   if (store.state.avatar) {
  //     window.addEventListener("beforeunload", () => {
  //       sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state));
  //     });
  //   }
  //   // this.$store.commit("RESET_STATE");
  // },
  // watch: {
  //   $route() {
  //     if (store.state.avatar) {
  //       window.sessionStorage.setItem("userMsg", JSON.stringify(store.state));
  //       console.log(store.state.name);
  //     }
  //   },
  // },
};
</script>
