import Vue from "vue";
import VueRouter from "vue-router";
import Install from "../components/Install";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Install",
    component: Install,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
