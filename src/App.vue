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
  created() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state));
    });
    // this.$store.commit("RESET_STATE");
  },
  destroyed() {
    window.removeEventListener("beforeunload", () => {
      sessionStorage.removeItem("userMsg");
    });
  },
  watch: {
    $route() {
      if (this.$route.state) {
        window.sessionStorage.setItem(
          "userMsg",
          JSON.stringify(this.$store.state)
        );
      }
    },
  },
};
</script>
