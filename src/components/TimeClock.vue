<template>
  <div class="TimeClock text-center">
    <header class="mb-50 clock">
      <i class="far fa-clock mr-20"></i>
      <h3 class="ds-inline-block">{{ titleTime }}</h3>
    </header>
    <main class="taskTimer">
      <h3 class="taskTimer-taskTitle" v-show="taskTimer.totalSeconds !== 0">
        <p class="ds-inline-block" v-show="checkIsNotEmpty">尚未選擇任務</p>
        <p class="ds-inline-block" v-show="!checkIsNotEmpty">
          {{ getIsChecked.taskTitle }}
          <span v-show="!checkIsNotEmpty && !taskTimer.isStart">暫停中</span>
          <span v-show="!checkIsNotEmpty && taskTimer.isStart">進行中</span>
        </p>
      </h3>
      <h3 class="taskTimer-taskTitle" v-show="taskTimer.totalSeconds === 0">
        <p class="ds-inline-block" v-show="!checkIsNotEmpty">
          <span v-show="!checkIsNotEmpty && !breakTimer.isStart">暫停中</span>
          <span v-show="!checkIsNotEmpty && breakTimer.isStart">請好好的休息</span>
        </p>
      </h3>
      <h3 class="taskTimer-timer">
        <p v-show="taskTimer.totalSeconds !== 0">{{ taskTimerMinutes }}:{{ taskTimerSeconds }}</p>
        <p v-show="taskTimer.totalSeconds === 0">{{ breakTimerMinutes }}:{{ breakTimerSeconds }}</p>
      </h3>
      <button class="taskTimer-btn" @click="startTask" v-show="taskTimer.totalSeconds !== 0">
        <p v-show="!taskTimer.isStart">START</p>
        <p v-show="taskTimer.isStart">PAUSE</p>
      </button>
      <button class="taskTimer-btn" @click="startBreak" v-show="taskTimer.totalSeconds === 0">
        <p v-show="!breakTimer.isStart">START</p>
        <p v-show="breakTimer.isStart">PAUSE</p>
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
        isStart: false
      },
      breakTimer: {
        breakTime: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isStart: false
      },
      taskStart: "",
      breakStart: ""
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
        this.$store.dispatch("timeModule/start", true);
        this.updatetaskTimer();
      } else {
        this.taskTimer.isStart = false;
        this.$store.dispatch("timeModule/start", false);
        // 計時停止的方法
        // 參考：https://jd615645.github.io/2017/10/16/Vue.js%E4%B8%AD%E4%BD%BF%E7%94%A8setInterval%E3%80%81clearInterval%E3%80%81clearLnterval%E3%80%81setTimeout/index.html
        clearInterval(this.taskStart);
      }
    },
    updatetaskTimer() {
      this.taskStart = setInterval(() => {
        // 計時完之後會做這件事情
        if (this.taskTimer.totalSeconds === 0) {
          alert("任務完成");
          clearInterval(this.taskStart);
          this.taskTimer.isStart = false;
          this.$store.dispatch("timeModule/start", false);
          this.$store.dispatch("tasklistModule/doneTask", this.getIsChecked.id);
          this.$store.dispatch("tasklistModule/isChecked", {});

          this.breakTimer.taskTime = this.getBreak.breakTime;
          this.breakTimer.totalSeconds = this.getBreak.breakTotalSeconds;
          this.breakTimer.minutes = this.getBreak.breakTime;
          this.breakTimer.seconds = 0;
        } else {
          this.taskTimer.totalSeconds--;
          this.taskTimer.minutes = Math.floor(this.taskTimer.totalSeconds / 60);
          this.taskTimer.seconds =
            this.taskTimer.totalSeconds - this.taskTimer.minutes * 60;
        }
      }, 1000);
    },
    startBreak() {
      if (!this.breakTimer.isStart) {
        this.breakTimer.isStart = true;
        this.$store.dispatch("timeModule/start", true);
        this.updatebreakTimer();
      } else {
        this.breakTimer.isStart = false;
        this.$store.dispatch("timeModule/start", false);
        clearInterval(this.breakStart);
      }
    },
    updatebreakTimer() {
      this.breakStart = setInterval(() => {
        // 計時完之後會做這件事情
        if (this.breakTimer.totalSeconds === 0) {
          clearInterval(this.breakStart);
          this.breakTimer.isStart = false;
          this.$store.dispatch("timeModule/start", false);

          this.taskTimer.taskTime = this.getTask.taskTime;
          this.taskTimer.totalSeconds = this.getTask.taskTotalSeconds;
          this.taskTimer.minutes = this.getTask.taskTime;
          this.taskTimer.seconds = 0;
        } else {
          this.breakTimer.totalSeconds--;
          this.breakTimer.minutes = Math.floor(
            this.breakTimer.totalSeconds / 60
          );
          this.breakTimer.seconds =
            this.breakTimer.totalSeconds - this.breakTimer.minutes * 60;
        }
      }, 1000);
    }
  },
  computed: {
    ...mapGetters("timeModule", ["getTask", "getBreak"]),
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
    taskTimerSeconds() {
      return this.taskTimer.seconds < 10
        ? `0${this.taskTimer.seconds}`
        : this.taskTimer.seconds;
    },
    taskTimerMinutes() {
      return this.taskTimer.minutes < 10
        ? `0${this.taskTimer.minutes}`
        : this.taskTimer.minutes;
    },
    breakTimerSeconds() {
      return this.breakTimer.seconds < 10
        ? `0${this.breakTimer.seconds}`
        : this.breakTimer.seconds;
    },
    breakTimerMinutes() {
      return this.breakTimer.minutes < 10
        ? `0${this.breakTimer.minutes}`
        : this.breakTimer.minutes;
    },
    checkIsNotEmpty() {
      return Object.keys(this.getIsChecked).length === 0;
    }
  },
  watch: {
    getTask: {
      // 監聽陣列的話必須寫成物件，並加入deep:true，才會去監聽每個物件、陣列的變化
      handler() {
        this.taskTimer.taskTime = this.getTask.taskTime;
        this.taskTimer.totalSeconds = this.getTask.taskTotalSeconds;
        this.taskTimer.minutes = this.getTask.taskTime;
        this.taskTimer.seconds = 0;
      },
      deep: true
    },
    getBreak: {
      handler() {
        this.breakTimer.breakTime = this.getBreak.breakTime;
        this.breakTimer.totalSeconds = this.getBreak.breakTotalSeconds;
        this.breakTimer.minutes = this.getBreak.breakTime;
        this.breakTimer.seconds = 0;
      },
      deep: true
    }
  },
  created() {
    setInterval(this.updateTime, 1000);
    // 初始化taskTimer
    this.taskTimer.totalSeconds = this.getTask.taskTotalSeconds;
    this.taskTimer.minutes = this.getTask.taskTime;
    this.taskTimer.taskTime = this.getTask.taskTime;
    // 初始化breakTimer
    this.breakTimer.breakTime = this.getBreak.breakTime;
    this.breakTimer.totalSeconds = this.getBreak.breakTotalSeconds;
    this.breakTimer.minutes = this.getBreak.breakTime;
  }
};
</script>
