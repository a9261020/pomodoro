<template>
  <div class="page">
    <header>
      <p class="text-left page__title">SET UP</p>
    </header>
    <main class="setup">
      <div class="mb-50">
        <p class="setup-font ds-inline-block">Work Time :</p>
        <input class="setup-input" type="text" v-model.number="workTime" />
        <p class="setup-font ds-inline-block mr-20">Minutes</p>
        <button class="setup-btn" @click="setupWorkTime">save</button>
      </div>
      <div>
        <p class="setup-font ds-inline-block">Break Time :</p>
        <input class="setup-input" type="text" />
        <p class="setup-font ds-inline-block mr-20">Minutes</p>
        <button class="setup-btn" @click="setupWorkTime">save</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workTime: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0
    };
  },
  methods: {
    setupWorkTime() {
      // this.totalSeconds = this.workTime * 60;
      this.$store.dispatch("timeModule/setupWorkTime", this.workTime);
    }
    // updateWorkTime() {
    //   this.totalSeconds--;
    //   this.minutes = Math.floor(this.totalSeconds / 60);
    //   this.seconds = this.totalSeconds - this.minutes * 60;
    // },
  },
  created() {
    // this.setupWorkTime();
    this.workTime = this.$store.state.timeModule.workTime;
    this.minutes = this.workTime;
    this.seconds = this.workTime * 60;
    // setInterval(this.updateWorkTime, 1000);
  }
};
</script>
