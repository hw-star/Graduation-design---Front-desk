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
};
</script>
