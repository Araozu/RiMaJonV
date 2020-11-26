import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Inicio from "../views/Inicio/Inicio.vue";
import Sala from "@/views/Sala/Sala.vue";
import Juego from "@/views/Juego/Juego.vue";

const routes: Array<RouteRecordRaw> = [
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
        component: () => import(/* webpackChunkName: "ayuda" */ "../views/Ayuda/Ayuda.vue")
    },
    {
        path: "/tutorial/",
        name: "Tutorial",
        component: () => import(/* webpackChunkName: "tutorial" */ "../views/Tutorial/Tutorial.vue"),
        children: [
            {
                path: "",
                component: () => import(/* webpackChunkName: "tutorial_index" */ "../views/Tutorial/views/Index.vue")
            },
            {
                path: "cartas/",
                component: () => import(/* webpackChunkName: "tutorial_cartas" */ "../views/Tutorial/views/Cartas.vue")
            },
            {
                path: "mano/",
                component: () => import(/* webpackChunkName: "tutorial_mano" */ "../views/Tutorial/views/Mano.vue")
            },
            {
                path: "mano/par/",
                component: () => import(/* webpackChunkName: "tutorial_mano_par" */ "../views/Tutorial/views/Mano/Par.vue")
            },
            {
                path: "mano/secuencia/",
                component: () => import(/* webpackChunkName: "tutorial_mano_secuencia" */ "../views/Tutorial/views/Mano/Secuencia.vue")
            },
            {
                path: "mano/triple/",
                component: () => import(/* webpackChunkName: "tutorial_mano_triple" */ "../views/Tutorial/views/Mano/Triple.vue")
            },
            {
                path: "mano-lista/",
                component: () => import(/* webpackChunkName: "tutorial_flujo-juego" */ "../views/Tutorial/views/ManoLista.vue")
            },
            {
                path: "bonus/",
                component: () => import(/* webpackChunkName: "tutorial_bonus" */ "../views/Tutorial/views/Bonus.vue")
            },
            {
                path: "puntaje/",
                component: () => import(/* webpackChunkName: "tutorial_puntaje" */ "../views/Tutorial/views/Puntaje.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
