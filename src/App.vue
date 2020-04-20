<template>
  <div id="app">
    <Navbar />
    <keep-alive include="TaskList">
      <router-view />
    </keep-alive>
    <TimeClock />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import TimeClock from "@/components/TimeClock";

export default {
  name: "App",
  components: {
    Navbar,
    TimeClock
  }
};
</script>

<style lang="scss">
@import "assets/scss/index.scss";
</style>
