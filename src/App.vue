<template>
  <div id="app">
    <Alert />
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
import Alert from "@/components/Alert";

export default {
  name: "App",
  components: {
    Navbar,
    TimeClock,
    Alert,
  },
};
</script>

<style lang="scss">
@import "assets/scss/index.scss";
</style>
