import Vue from "vue";
import VueRouter from "vue-router";
import Install from "../components/Install";
import Login from "../components/Login";
import Wizard from "../components/Wizard"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Install",
    component: Install,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/wizard",
    name: "Wizard",
    component: Wizard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
