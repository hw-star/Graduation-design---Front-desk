<template>
  <div id="app">
    <router-view />
    <audio
      ref="myaudio"
      src="../public/hwly.mp3"
      @ended="nextplay"
      hidden="true"
    ></audio>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isplay: false,
    }
  },
  mounted(){
    this.$keyBoard(this, "playMusic", 32);
  },
  methods:{
    playMusic() {
      if (this.isplay) {
        this.$refs.myaudio.pause();
        this.isplay = false;
      } else {
        this.$refs.myaudio.play();
        this.isplay = true;
      }
    },
    nextplay() {
      this.isplay = false;
      this.playMusic();
    },
  }
};
</script>
