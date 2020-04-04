import Vue from "vue";
import Router from "vue-router";

import TaskList from "@/views/TaskList";
import Analysis from "@/views/Analysis";
import Ringtones from "@/views/Ringtones";
import Setup from "@/views/Setup";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "TaskList",
      component: TaskList,
    },
    {
      path: "/analysis",
      name: "Analysis",
      component: Analysis,
    },
    {
      path: "/ringtones",
      name: "Ringtones",
      component: Ringtones,
    },
    {
      path: "/setup",
      name: "Setup",
      component: Setup,
    },
  ],
});

export default router;
