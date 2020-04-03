import Vue from "vue";
import Router from "vue-router";

import TaskList from "@/views/TaskList";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "TaskList",
      component: TaskList
    }
  ]
});

export default router;
