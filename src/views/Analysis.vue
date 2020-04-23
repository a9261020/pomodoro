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
      if (operator === "+") {
        this.date.day += 7;
        if (this.date.day > this.monthDay) {
          this.date.day -= this.monthDay;
          this.date.month++;
        }
      } else {
        this.date.day -= 7;
        if (this.date.day + (6 - this.date.week) <= 0) {
          this.date.month--;
          this.date.day = this.monthDay + this.date.day;
        }
      }
    },
  },
  computed: {
    firstDayOfWeek() {
      let firstDay = this.date.day - this.date.week;
      if (firstDay <= 0) {
        firstDay += this.lastMonthDay;
      }
      return firstDay;
    },
    lastDayOfWeek() {
      let lastDay = this.date.day + (6 - this.date.week);
      if (lastDay > this.monthDay) {
        lastDay -= this.monthDay;
      }
      return lastDay;
    },
    lastMonthDay() {
      const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return months[this.date.month];
    },
    monthDay() {
      const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return months[this.date.month - 1];
    },
  },
};
</script>

<style></style>
