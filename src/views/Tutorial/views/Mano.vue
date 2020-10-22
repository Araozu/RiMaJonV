<template lang="pug">
div
    h2 Mano

    p Todos los jugadores inician con 10 cartas aleatorias, por ejemplo:
    grupo-cartas(:cartas="cartasR")
    p En cada turno recibirás una carta nueva, la cual se coloca a la izquierda:
    grupo-cartas(:cartas="cartasR_1")
    p En este punto debes decidir qué hacer con esta nueva carta. Pueden pasar 3 cosas:
    div.inner
        h3 - La carta nueva no te sirve
        p.inner Si la carta nueva no te ayuda a formar una mano válida, o mejorar tu mano, la descartas.

        h3 - La carta nueva te sirve
        p.inner Si la carta nueva te ayuda formar o mejorar tu mano, la conservas, y debes descartar alguna otra carta.

        h3 - La carta nueva completa tu mano
        p.inner Si la carta nueva es la última que te faltaba para formar una mano válida, puedes declarar tu victoria.
            |  Opcionalmente puedes ignorar tu victoria y realizar una de las 2 acciones anteriores.

    h2 Mano válida

    p Una mano válida está compuesta de 4 grupos de cartas:
    p - 1 par
    p - 3 grupos

    p Cada grupo a su vez puede ser:
    p - 1 secuencia
    p - 1 triple

    p Cada uno de estos se explican en las siguientes secciones.

    sigAnteriorPagina(:rutaSig="rutaSig" :rutaAnt="rutaAnt")

//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import grupoCartas from "@/components/grupo-cartas.vue"
import sigAnteriorPagina from "@/views/Tutorial/components/sig-ant-pagina.vue";

const cartas = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41,
    41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 64, 64,
    64, 64, 96, 96, 96, 96, 128, 128, 128, 128, 160, 160, 160, 160, 192, 192, 192, 192, 224, 224, 224, 224,
    256, 256, 256, 256];

const [cartasR, cartasR_1] = (() => {
    const indices = [];
    for (let i = 0; i < 11; i++) {
        let sigIndice = Math.floor(Math.random() * cartas.length);
        while (indices.find((s) => s === sigIndice) !== undefined) {
            sigIndice = Math.floor(Math.random() * cartas.length);
        }
        indices.push(sigIndice);
    }
    const cartasN = indices.map((i) => cartas[i]);
    const ultimaCarta = cartasN[10];
    cartasN.pop();

    const cartasN2 = cartasN.sort((x, y) => (x < y) ? -1 : 1);
    const cartasN2_1 = [...cartasN2];
    cartasN2_1.push(-1);
    cartasN2_1.push(ultimaCarta);

    return [cartasN2, cartasN2_1];
})();

export default defineComponent({
    name: "Mano",
    components: {grupoCartas, sigAnteriorPagina},
    setup() {

        const rutaAnt = {
            nombre: "Cartas",
            ruta: "/tutorial/cartas/"
        };

        const rutaSig = {
            nombre: "Par",
            ruta: "/tutorial/mano/par"
        };

        return {
            cartasR,
            cartasR_1,
            rutaAnt,
            rutaSig
        }
    }
});

</script>

<style scoped lang="sass">



//
</style>
