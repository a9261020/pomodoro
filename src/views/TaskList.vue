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
          :class="{ 'not-working': isChecked !== task.id && getIsStart }"
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
            v-if="isEditing !== task.id"
          >
            {{ task.taskTitle }}
          </p>

          <input
            type="text"
            class="ds-inline-block item-editing"
            :placeholder="task.taskTitle"
            @blur="cancelEdit"
            @keyup.esc="cancelEdit"
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
      isChecked: "",
      isEditing: "",
      afterEdit: "",
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
    ...mapGetters("timeModule", ["getIsStart"]),
  },
  methods: {
    isCompletedBtn() {
      this.isCompleted = !this.isCompleted;
    },
    addTask() {
      if (this.getIsStart) {
        alert("請先將工作暫停");
        return;
      }

      if (this.taskTitle === "") {
        alert("請輸入工作項目");
        return;
      }
      const dateTime = Date.now();
      const timestamp = Math.floor(dateTime / 1000);
      const newTask = {
        taskTitle: this.taskTitle,
        id: timestamp,
        isCompleted: false,
      };
      this.$store.dispatch("tasklistModule/addTask", newTask);
      this.taskTitle = "";
    },
    checked(task) {
      if (this.getIsStart || task.isCompleted) {
        return;
      }
      this.isChecked = task.id;
      this.$store.dispatch("tasklistModule/isChecked", task);
    },
    deleteTask(id) {
      if (this.getIsStart) {
        return;
      }
      this.$store.dispatch("tasklistModule/deleteTask", id);
    },
    editTask(task) {
      if (this.getIsStart || task.isCompleted) {
        return;
      }
      this.isEditing = task.id;
      this.isChecked = task.id;
      this.afterEdit = task.taskTitle;
    },
    doneEdit(task) {
      this.isEditing = "";
      this.$store.dispatch("tasklistModule/editTask", {
        id: task.id,
        afterEdit: this.afterEdit,
      });
    },
    cancelEdit() {
      this.isEditing = "";
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
