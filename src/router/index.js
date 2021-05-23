import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/painel",
    name: "Panel",
    component: () => import("../views/Panel.vue"),
    children: [
      {
        path: "/painel/cadastro-aluno",
        name: "RegistrationStudent",
        component: () => import("../components/forms/Student"),
      },
      {
        path: "/painel/cadastro-pessoa",
        name: "RegistrationPerson",
        component: () => import("../components/forms/Person"),
      },
      {
        path: "/painel/mensalidades",
        name: "Payments",
        component: () => import("../components/Payments"),
      },
      {
        path: "/painel/historico",
        name: "History",
        component: () => import("../components/History"),
      },
      {
        path: "/painel/alunos",
        name: "ListStudents",
        component: () => import("../components/lists/Students"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
