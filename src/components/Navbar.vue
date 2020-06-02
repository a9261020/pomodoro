<template>
  <nav class="position-fixed">
    <router-link
      class="text-center border-circle ds-inline-block"
      :class="{ 'nav-active': status === 'TaskList' }"
      to="/"
      @click.native="changePage('TaskList')"
    >
      <i class="fas fa-align-left"></i>
    </router-link>
    <!-- <router-link
      class="text-center border-circle ds-inline-block mt-30"
      :class="{ 'nav-active': status === 'Analysis' }"
      to="/analysis"
      @click.native="changePage('Analysis')"
    >
      <i class="fas fa-chart-line"></i>
    </router-link>-->
    <router-link
      class="text-center border-circle ds-inline-block mt-30"
      :class="{ 'nav-active': status === 'Ringtones' }"
      to="/Ringtones"
      @click.native="changePage('Ringtones')"
    >
      <i class="far fa-bell"></i>
    </router-link>
    <router-link
      class="text-center border-circle ds-inline-block mt-30"
      :class="{ 'nav-active': status === 'Setup' }"
      to="/Setup"
      @click.native="changePage('Setup')"
    >
      <i class="fas fa-cog"></i>
    </router-link>
    <h1>POMODORO</h1>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      status: "TaskList"
    };
  },
  methods: {
    changePage(input) {
      this.status = input;
    }
  }
};
</script>
