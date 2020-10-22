<template lang="pug">
div
    p.
        RiMaJon es un juego de cartas para 4 jugadores. Cada jugador inicia con 10 cartas,
        y la meta es ser el primero en formar una mano válida.

    br
    img(:src="rutaImg")
    br

    p.
        Cada jugador se toma turnos para extraer una carta, verificar si le sirve, y desechar otra carta.
        <br>
        Este proceso se repite hasta que alguien forme una mano válida, con lo cual es el ganador.

    p El tutorial está dividido en varios temas, los cuales se encuentran en la barra lateral.
    p Para empezar a jugar solo necesitas aprender los primeros 4 temas, puedes aprender el resto a medida que juegas.

    sig-anterior-pagina(:rutaSig="rutaSig")

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import { useStore } from "vuex";
import { getEsOscuro } from "@/components/getEsOscuro";
import sigAnteriorPagina from "@/views/Tutorial/components/sig-ant-pagina.vue";

export default defineComponent({
    name: "Index",
    components: {sigAnteriorPagina},
    setup() {
        const store = useStore();
        const {esOscuro} = getEsOscuro(store);

        const rutaImg = computed(() => (esOscuro.value)
            ? "/img/tutorial/Img_rimajon_oscuro.webp"
            : "/img/tutorial/Img_rimajon_claro.webp"
        );

        const rutaSig = {
            nombre: "Cartas",
            ruta: "/tutorial/cartas/"
        };

        return {
            rutaImg,
            rutaSig
        }
    }
});

</script>

<style scoped lang="sass">

p
    font-size: 1.35rem
    text-align: justify

a
    display: inline-block
    color: var(--color-texto)
    font-size: 1.15rem
    line-height: 1.2rem
    margin: 0.3rem 0

img
    width: 100%
    height: auto
    max-width: 50rem

//
</style>
