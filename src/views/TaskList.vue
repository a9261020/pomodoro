<template>
  <div class="page">
    <header>
      <p class="text-left page__title">
        TASK LIST
        <button
          class="btn ml-50 border-radius"
          :class="{ 'btn-active': isCompleted === false }"
          @click="isCompletedBtn"
        >
          undone
        </button>
        <button
          class="btn ml-10 border-radius"
          :class="{ 'btn-active': isCompleted === true }"
          @click="isCompletedBtn"
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
        v-model="taskTitle"
        @keyup.enter="addTask"
      />
      <button class="taskList-btn text-center ml-20 mb-50" @click="addTask">
        <i class="fas fa-plus-circle"></i>
        ADD
      </button>
      <ul>
        <li
          class="taskList-item mb-20"
          v-for="(task, index) in filterTasklist"
          :key="index"
        >
          <input type="checkbox" />
          <p class="ds-inline-block taskList-item-context">
            {{ task.taskTitle }}
          </p>
          <i
            class="taskList-item-delete fas fa-trash-alt"
            @click="deleteTask(task.id)"
          ></i>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      taskTitle: "",
      isCompleted: false,
    };
  },
  computed: {
    filterTasklist() {
      return this.getTasklist.filter((task) => {
        return this.isCompleted ? task.isCompleted : !task.isCompleted;
      });
    },
    ...mapGetters("tasklistModule", ["getTasklist"]),
  },
  methods: {
    isCompletedBtn() {
      this.isCompleted = !this.isCompleted;
    },
    addTask() {
      const dateTime = Date.now();
      const timestamp = Math.floor(dateTime / 1000);
      const newTask = {
        taskTitle: this.taskTitle,
        isCompleted: true,
        id: timestamp,
      };
      this.$store.dispatch("tasklistModule/addTask", newTask);
      this.taskTitle = "";
    },
    deleteTask(id) {
      this.$store.dispatch("tasklistModule/deleteTask", id);
    },
    getTaskFromLocal() {
      this.$store.commit("tasklistModule/GETFROMLOCAL");
    },
  },
  created() {
    this.getTaskFromLocal();
  },
};
</script>
