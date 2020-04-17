<template>
  <div class="TimeClock text-center">
    <header class="mb-50 clock">
      <i class="far fa-clock mr-20"></i>
      <h3 class="ds-inline-block">{{ titleTime }}</h3>
    </header>
    <main class="taskTimer">
      <h3 class="taskTimer-taskTitle">
        選擇任務：
        <p
          class="ds-inline-block"
          v-show="Object.keys(this.getIsChecked).length === 0"
        >
          無
        </p>
        <p class="ds-inline-block">{{ getIsChecked.taskTitle }}</p>
      </h3>
      <h3 class="taskTimer-timer">{{ timerMinutes }}:{{ timerSeconds }}</h3>
      <button class="taskTimer-btn" @click="startTask">
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
        taskTime: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isStart: false,
      },
      breakTimer: {
        breakTime: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isStart: false,
      },
      start: "",
    };
  },
  methods: {
    updateTime() {
      this.nowTime = new Date();
    },
    startTask() {
      if (Object.keys(this.getIsChecked).length === 0) {
        alert("請先選擇任務");
        return;
      }
      if (!this.taskTimer.isStart) {
        this.taskTimer.isStart = true;
        this.$store.dispatch("timeModule/taskStart", true);
        this.updateTaskTimer();
      } else {
        this.taskTimer.isStart = false;
        this.$store.dispatch("timeModule/taskStart", false);
        // 計時停止的方法
        // 參考：https://jd615645.github.io/2017/10/16/Vue.js%E4%B8%AD%E4%BD%BF%E7%94%A8setInterval%E3%80%81clearInterval%E3%80%81clearLnterval%E3%80%81setTimeout/index.html
        clearInterval(this.start);
      }
    },
    updateTaskTimer() {
      this.start = setInterval(() => {
        // 計時完之後會做這件事情
        if (this.taskTimer.totalSeconds === 0) {
          alert("任務完成");
          clearInterval(this.start);
          this.taskTimer.isStart = false;
          this.$store.dispatch("timeModule/taskStart", false);
          this.$store.dispatch("tasklistModule/doneTask", this.getIsChecked.id);
        }
        this.taskTimer.totalSeconds--;
        this.taskTimer.minutes = Math.floor(this.taskTimer.totalSeconds / 60);
        this.taskTimer.seconds =
          this.taskTimer.totalSeconds - this.taskTimer.minutes * 60;
      }, 1000);
    },
  },
  computed: {
    ...mapGetters("timeModule", ["getWorkTime", "getTotalSeconds"]),
    ...mapGetters("tasklistModule", ["getIsChecked"]),
    titleTime() {
      const hours =
        this.nowTime.getHours() < 10
          ? `0${this.nowTime.getHours()}`
          : this.nowTime.getHours();
      const minutes =
        this.nowTime.getMinutes() < 10
          ? `0${this.nowTime.getMinutes()}`
          : this.nowTime.getMinutes();
      const seconds =
        this.nowTime.getSeconds() < 10
          ? `0${this.nowTime.getSeconds()}`
          : this.nowTime.getSeconds();
      return this.nowTime.getHours() <= 12
        ? `AM ${hours} : ${minutes} : ${seconds}`
        : `PM ${hours - 12} : ${minutes} : ${seconds}`;
    },
    timerSeconds() {
      return this.taskTimer.seconds < 10
        ? `0${this.taskTimer.seconds}`
        : this.taskTimer.seconds;
    },
    timerMinutes() {
      return this.taskTimer.minutes < 10
        ? `0${this.taskTimer.minutes}`
        : this.taskTimer.minutes;
    },
  },
  watch: {
    getTotalSeconds() {
      this.taskTimer.taskTime = this.getWorkTime;
      this.taskTimer.totalSeconds = this.getTotalSeconds;
      this.taskTimer.minutes = this.getWorkTime;
      this.taskTimer.seconds = 0;
    },
  },
  created() {
    setInterval(this.updateTime, 1000);
    // 初始化taskTimer
    this.taskTimer.totalSeconds = this.getTotalSeconds;
    this.taskTimer.minutes = this.getWorkTime;
    this.taskTimer.taskTime = this.getWorkTime;
  },
};
</script>
