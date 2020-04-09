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
          v-for="task in filterTasklist"
          :key="task.id"
        >
          <div
            class="ds-inline-block taskList-item-check"
            :class="{ checked: isChecked === task.id }"
            @click="checked(task)"
          ></div>
          <p
            @click="checked(task)"
            class="ds-inline-block taskList-item-context"
            :class="{ taskCompleted: isCompleted === true }"
            v-if="!task.isEditing"
          >
            {{ task.taskTitle }}
          </p>

          <input
            type="text"
            class="ds-inline-block item-editing"
            :placeholder="task.taskTitle"
            @blur="cancelEdit(task)"
            @keyup.esc="cancelEdit(task)"
            @keyup.enter="doneEdit(task)"
            v-focus
            v-model="afterEdit"
            v-else
          />

          <i
            class="taskList-item-icon fas fa-edit ml-20"
            @click="editTask(task)"
          ></i>
          <i
            class="taskList-item-icon fas fa-trash-alt ml-20"
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
      afterEdit: "",
      isChecked: "",
    };
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      },
    },
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
        id: timestamp,
        isCompleted: true,
        isEditing: false,
      };
      this.$store.dispatch("tasklistModule/addTask", newTask);
      this.taskTitle = "";
    },
    checked(task) {
      this.isChecked = task.id;
    },
    deleteTask(id) {
      this.$store.dispatch("tasklistModule/deleteTask", id);
    },
    editTask(task) {
      task.isEditing = true;
      this.afterEdit = task.taskTitle;
      this.isChecked = task.id;
    },
    doneEdit(task) {
      task.isEditing = false;
      this.$store.dispatch("tasklistModule/editTask", {
        id: task.id,
        afterEdit: this.afterEdit,
      });
    },
    cancelEdit(task) {
      task.isEditing = false;
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
