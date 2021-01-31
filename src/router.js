import { createRouter, createWebHistory } from "vue-router";
import Tasks from "./views/Tasks";
import Task from "./views/Task";
import NewTask from "./views/New";

const routes = [
  {
    path: "/",
    component: Tasks,
    name: Tasks
  },
  {
    path: "/task/:id",
    component: Task,
    name: Task
  },
  {
    path: "/new",
    component: NewTask,
    name: NewTask
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes
});

export default router;
