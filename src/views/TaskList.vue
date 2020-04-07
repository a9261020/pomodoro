<template>
  <div class="page">
    <header>
      <p class="text-left page__title">
        TASK LIST
        <button
          class="btn ml-50 border-radius"
          :class="{ 'btn-active': mode === 'undone' }"
          @click="changeMode('undone')"
        >
          undone
        </button>
        <button
          class="btn ml-10 border-radius"
          :class="{ 'btn-active': mode === 'completed' }"
          @click="changeMode('completed')"
        >
          completed
        </button>
      </p>
    </header>

    <!-- main -->
    <main class="taskList">
      <input
        class="taskList-input ds-inline-block border-radius"
        type="text"
        placeholder="Add new task..."
      />
      <button class="taskList-btn text-center ml-20 mb-50">
        <i class="fas fa-plus-circle"></i>
        ADD
      </button>
      <ul>
        <li class="taskList-item mb-20">
          <input type="checkbox" name="" id="" />
          <p class="ds-inline-block taskList-item-context">some task</p>
          <i class="taskList-item-delete fas fa-trash-alt"></i>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: "undone",
    };
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
    },
  },
};
</script>
