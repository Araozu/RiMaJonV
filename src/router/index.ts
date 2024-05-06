import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from "../views/Inicio/Inicio.vue";
import Sala from "../views/Sala/Sala.vue";
import Juego from "../views/Juego/Juego.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Inicio
    },
    {
      path: "/sala/:id/",
      name: "Sala",
      component: Sala
    },
    {
      path: "/juego/:id/",
      name: "Juego",
      component: Juego
    },

    {
        path: "/ayuda/",
        name: "Ayuda",
        component: () => import("../views/Ayuda/Ayuda.vue")
    },
    {
        path: "/tutorial/",
        name: "Tutorial",
        component: () => import("../views/Tutorial/Tutorial.vue"),
        children: [
            {
                path: "",
                component: () => import("../views/Tutorial/views/Index.vue")
            },
            {
                path: "cartas/",
                component: () => import( "../views/Tutorial/views/Cartas.vue")
            },
            {
                path: "mano/",
                component: () => import("../views/Tutorial/views/Mano.vue")
            },
            {
                path: "mano/par/",
                component: () => import("../views/Tutorial/views/Mano/Par.vue")
            },
            {
                path: "mano/secuencia/",
                component: () => import("../views/Tutorial/views/Mano/Secuencia.vue")
            },
            {
                path: "mano/triple/",
                component: () => import("../views/Tutorial/views/Mano/Triple.vue")
            },
            {
                path: "mano-lista/",
                component: () => import( "../views/Tutorial/views/ManoLista.vue")
            },
            {
                path: "bonus/",
                component: () => import("../views/Tutorial/views/Bonus.vue")
            },
            {
                path: "puntaje/",
                component: () => import("../views/Tutorial/views/Puntaje.vue")
            }
        ]
    }
  ]
})

export default router
