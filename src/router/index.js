import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home")
  },
  {
    path: "/about",
    component: () => import("@/views/About")
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((_1, _2, next) => {
  store.dispatch("updateBoardState", "unready")
  next()
})

export default router
