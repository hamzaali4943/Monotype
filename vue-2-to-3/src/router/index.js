import { createRouter, createWebHistory } from "vue-router";
import todoList from "../views/ToDoList.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: todoList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
