<template>
  <div class="TimeClock text-center">
    <header class="mb-50">
      <i class="far fa-clock mr-20"></i>
      <h3 class="ds-inline-block">
        {{ titleTime }}
      </h3>
    </header>
    <main>
      {{ this.taskTimer }}
      <button @click="startTask">
        <p v-if="!taskTimer.isStart">START</p>
        <p v-else>PAUSE</p>
      </button>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      nowTime: new Date(),
      taskTimer: {
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isStart: false,
      },
    };
  },
  methods: {
    updateTime() {
      this.nowTime = new Date();
    },
    startTask() {
      if (!this.taskTimer.isStart) {
        this.taskTimer.isStart = true;
        setInterval(this.updateTaskTimer, 1000);
      } else {
        this.taskTimer.isStart = false;
      }
    },
    updateTaskTimer() {
      this.taskTimer.totalSeconds--;
      this.taskTimer.minutes = Math.floor(this.taskTimer.totalSeconds / 60);
      this.taskTimer.seconds =
        this.taskTimer.totalSeconds - this.taskTimer.minutes * 60;
    },
  },
  computed: {
    ...mapGetters("timeModule", ["getWorkTime", "getTotalSeconds"]),
    titleTime() {
      return this.nowTime.getHours <= 12
        ? `AM ${this.nowTime.getHours()} : ${this.nowTime.getMinutes()} : ${this.nowTime.getSeconds()}`
        : `PM ${this.nowTime.getHours() -
            12} : ${this.nowTime.getMinutes()} : ${this.nowTime.getSeconds()}`;
    },
    getTaskTotalSeconds() {
      const vm = this;
      vm.taskTimer.totalSeconds = this.getTotalSeconds;
      return vm.taskTimer.totalSeconds;
    },
  },
  created() {
    setInterval(this.updateTaskTimer, 1000);
    setInterval(this.updateTime, 1000);
    this.$store.dispatch("timeModule/setupWorkTime", 25);
    this.taskTimer.totalSeconds = this.getTotalSeconds;
  },
};
</script>
