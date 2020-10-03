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
        path: "/sala/:id",
        name: "Sala",
        component: Sala
    },
    {
        path: "/juego/:id",
        name: "Juego",
        component: Juego
    },
    {
        path: "/ayuda",
        name: "Ayuda",
        component: () => import(/* webpackChunkName: "ayuda" */ "../views/Ayuda/Ayuda.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
