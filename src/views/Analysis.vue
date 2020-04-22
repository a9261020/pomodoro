<template>
  <div class="page">
    <header>
      <p class="text-left page__title">ANALYSIS</p>
    </header>
    <main class="analysis">
      <div class="analysis-number">
        <div class="analysis-number-box ds-inline-block mr-50">
          <p class="number-box-title">Today</p>
          /task
        </div>
        <div class="analysis-number-box ds-inline-block">
          <p class="number-box-title">Week</p>
          /task
        </div>
      </div>
      <div class="analysis-graph">
        <button @click="changeDate('-')">
          <i class="fas fa-angle-left"></i>
        </button>
        <button @click="changeDate('+')">
          <i class="fas fa-angle-right"></i>
        </button>
        {{ date }}
        {{ firstDayOfWeek }} - {{ lastDayOfWeek }}
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Analysis",
  data() {
    return {
      date: Object.assign({}, this.$store.state.date),
    };
  },
  methods: {
    changeDate(operator) {
      this.date.day = operator === "+" ? this.date.day + 7 : this.date.day - 7;
    },
  },
  computed: {
    firstDayOfWeek() {
      return this.date.day - this.date.week;
    },
    lastDayOfWeek() {
      return this.date.day + (6 - this.date.week);
    },
  },
};
</script>

<style></style>
