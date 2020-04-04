<template>
  <div class="layout">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  width: 15%;
  .item {
    height: 100px;
    width: 100px;
    background-color: gray;
    margin: 10px;
  }
}
</style>
