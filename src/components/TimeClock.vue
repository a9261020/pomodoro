<template>
  <div class="TimeClock text-center">
    <header>
      <i class="far fa-clock mr-20"></i>
      <h3 class="ds-inline-block">
        {{ titleTime }}
      </h3>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowTime: new Date(),
    };
  },
  methods: {
    updateTime() {
      this.nowTime = new Date();
    },
  },
  computed: {
    titleTime() {
      return this.nowTime.getHours <= 12
        ? `AM ${this.nowTime.getHours()} : ${this.nowTime.getMinutes()} : ${this.nowTime.getSeconds()}`
        : `PM ${this.nowTime.getHours() -
            12} : ${this.nowTime.getMinutes()} : ${this.nowTime.getSeconds()}`;
    },
  },
  created() {
    setInterval(this.updateTime, 1000);
  },
};
</script>
