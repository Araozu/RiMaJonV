<template lang="pug">
div
    h2 Triple

    p Como el nombre indica, un triple son 3 cartas del mismo valor y color.

    grupo-cartas(:cartas="[2, 2, 3]")
    br
    grupo-cartas(:cartas="[48, 48, 49]")
    br
    grupo-cartas(:cartas="[64, 64, 64]")
    br
    grupo-cartas(:cartas="[256, 256, 256]")

    p Los triples sí se pueden formar de cualquier tipo de carta, sea número, dragon o realeza.

    sigAnteriorPagina(:rutaSig="rutaSig" :rutaAnt="rutaAnt")
//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import carta from "@/components/carta.vue";
import grupoCartas from "@/components/grupo-cartas.vue";
import sigAnteriorPagina from "@/views/Tutorial/components/sig-ant-pagina.vue";

const cartas = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41,
    41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 64, 64,
    64, 64, 96, 96, 96, 96, 128, 128, 128, 128, 160, 160, 160, 160, 192, 192, 192, 192, 224, 224, 224, 224,
    256, 256, 256, 256];

const triCartasR = new Array(3).fill(cartas[Math.floor(Math.random() * cartas.length)]);

export default defineComponent({
    name: "Triple",
    components: {carta, grupoCartas, sigAnteriorPagina},
    setup() {
        const rutaAnt = {
            nombre: "Secuencia",
            ruta: "/tutorial/mano/secuencia"
        };

        const rutaSig = {
            nombre: "Armar una Mano",
            ruta: "/tutorial/mano/armar-una-mano"
        };

        return {
            triCartasR,
            rutaAnt,
            rutaSig
        }
    }
});

</script>

<style scoped lang="sass">



//
</style>
