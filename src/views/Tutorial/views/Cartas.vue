<template lang="pug">
div
    h2 Cartas

    p RiMaJon usa su propio conjunto de cartas, similar a una baraja normal. Estas son todas las cartas:

    carta(v-for="(c, i) in cartas" :valor="c" :key="i")

    p Hay 108 cartas, y se dividen en 4 tipos:

    div.inner
        h3 Números rojos
        p Son cartas de la A hasta el 10 de color negro. Hay 4 cartas de cada número.
        h3 Números negros
        p Son cartas de la A hasta el 10 de color negro. Hay 4 cartas de cada número.
        h3 Dragones
        p Son cartas con imágenes de dragones, de 4 colores diferentes. Hay 4 cartas de cada color de dragon.
        h3 Realeza
        p Son las cartas de J, Q, K. Son de color verde y no tienen símbolo. Hay 4 cartas de cada uno.

    p Los símbolos de las cartas de números no tienen importancia por ahora.

    sigAnteriorPagina(:rutaSig="rutaSig" :rutaAnt="rutaAnt")

//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import carta from "@/components/carta.vue";
import sigAnteriorPagina from "@/views/Tutorial/components/sig-ant-pagina.vue";

const cartas = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41,
    41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 64, 64,
    64, 64, 96, 96, 96, 96, 128, 128, 128, 128, 160, 160, 160, 160, 192, 192, 192, 192, 224, 224, 224, 224,
    256, 256, 256, 256];

export default defineComponent({
    name: "Cartas",
    components: {carta, sigAnteriorPagina},
    setup() {

        const rutaAnt = {
            nombre: "Inicio",
            ruta: "/tutorial/"
        };

        const rutaSig = {
            nombre: "Mano",
            ruta: "/mano/"
        };

        return {
            cartas,
            rutaSig,
            rutaAnt
        }
    }
});

</script>

<style scoped lang="sass">


//
</style>
