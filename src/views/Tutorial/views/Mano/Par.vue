<template lang="pug">
div
    h2 Par

    p Como el nombre sugiere, un par son 2 cartas iguales

    carta(:valor="6")
    carta(:valor="7")

    p Pueden haber 4 tipos de pares, uno por cada tipo de carta.
    br

    h3 Par de número negro
    p Son 2 cartas con el mísmo número. No es necesario que el símbolo sea el mismo, aunque ello da más puntos.

    carta(:valor="10")
    carta(:valor="11")

    h3 Par de número rojo
    p Son 2 cartas con el mísmo número. No es necesario que el símbolo sea el mismo, aunque ello da más puntos.

    carta(:valor="34")
    carta(:valor="34")

    h3 Par de dragones
    p Son 2 cartas de dragon del mismo color.
    carta(:valor="160")
    carta(:valor="160")

    h3 Par de realeza
    p Son 2 cartas de la misma letra.
    carta(:valor="224")
    carta(:valor="224")

    sigAnteriorPagina(:rutaSig="rutaSig" :rutaAnt="rutaAnt")

//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import carta from "@/components/carta.vue"
import sigAnteriorPagina from "@/views/Tutorial/components/sig-ant-pagina.vue";

const cartas = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41,
    41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 64, 64,
    64, 64, 96, 96, 96, 96, 128, 128, 128, 128, 160, 160, 160, 160, 192, 192, 192, 192, 224, 224, 224, 224,
    256, 256, 256, 256];

const parCartasR = new Array(2).fill(cartas[Math.floor(Math.random() * cartas.length)]);

export default defineComponent({
    name: "Par",
    components: {carta, sigAnteriorPagina},
    setup() {

        const rutaAnt = {
            nombre: "Mano",
            ruta: "/tutorial/mano/"
        };

        const rutaSig = {
            nombre: "Secuencia",
            ruta: "/tutorial/mano/secuencia"
        };

        return {
            parCartasR,
            rutaAnt,
            rutaSig
        }
    }
});

</script>

<style scoped lang="sass">



//
</style>
