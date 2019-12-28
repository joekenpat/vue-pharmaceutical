import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "sell_drug_view",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/sell_drug_view.vue")
  },
  {
    path: "/sell_drug_view",
    name: "sell_drug_view",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/sell_drug_view.vue")
  },
  {
    path: "/add_drug_view",
    name: "add_drug_view",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/add_drug_view.vue")
  },
  {
    path: "/add_stock_view",
    name: "add_stock_view",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/add_stock_view.vue")
  },
  {
    path: "/summary_view",
    name: "summary_view",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/summary_view.vue")
  },
  {
    path: "/sales_view",
    name: "sales_view",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/sales_view.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
