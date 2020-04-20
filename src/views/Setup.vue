<template>
  <div class="page">
    <header>
      <p class="text-left page__title">SET UP</p>
    </header>
    <main class="setup">
      <div class="mb-50">
        <p class="setup-font ds-inline-block">Task Time :</p>
        <input class="setup-input" type="text" v-model.number="taskTime" />
        <p class="setup-font ds-inline-block mr-20">Minutes</p>
        <button class="setup-btn" @click="setuptaskTime">save</button>
      </div>
      <div>
        <p class="setup-font ds-inline-block">Break Time :</p>
        <input class="setup-input" type="text" v-model.number="breakTime" />
        <p class="setup-font ds-inline-block mr-20">Minutes</p>
        <button class="setup-btn" @click="setupBreakTime">save</button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      taskTime: 0,
      breakTime: 0
    };
  },
  methods: {
    setuptaskTime() {
      if (this.getIsStart) {
        alert("請先停止工作");
      } else {
        this.$store.dispatch("timeModule/setuptaskTime", this.taskTime);
      }
    },
    setupBreakTime() {
      if (this.getIsStart) {
        alert("請先停止工作");
      } else {
        this.$store.dispatch("timeModule/setupbreakTime", this.breakTime);
      }
    }
  },
  computed: {
    ...mapGetters("timeModule", ["getIsStart"])
  },
  created() {
    this.taskTime = this.$store.state.timeModule.task.taskTime;
    this.breakTime = this.$store.state.timeModule.break.breakTime;
  }
};
</script>
