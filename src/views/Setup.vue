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
      workTime: 0,
      breakTime: 0
    };
  },
  methods: {
    setupWorkTime() {
      if (this.getIsStart) {
        alert("請先停止工作");
      } else {
        this.$store.dispatch("timeModule/setupWorkTime", this.workTime);
      }
    },
    setupBreakTime() {
      if (this.getIsStart) {
        alert("請先停止工作");
      } else {
        this.$store.dispatch("timeModule/setupBreakTime", this.breakTime);
      }
    }
  },
  computed: {
    ...mapGetters("timeModule", ["getIsStart"])
  },
  created() {
    this.workTime = this.$store.state.timeModule.workTime;
    this.breakTime = this.$store.state.timeModule.breakTime;
  }
};
</script>
