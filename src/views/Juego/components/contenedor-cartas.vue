<template lang="pug">
div.cont-cuadrante-cartas-juego
    img.img-dragon-partida(:src="rutaImgDragon" title="Dragon de la partida")
    br
    span.txt-cartas {{ cartasRestantes }} cartas

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";

export default defineComponent({
    name: "contenedor-cartas",
    props: {
        cartasRestantes: {
            type: Number,
            required: true
        },
        dragonPartida: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const rutaImgDragon = computed(() => {
            const nombreDragonMin = props.dragonPartida.toLowerCase();

            return `/img/Dragon_${nombreDragonMin}.webp`;
        });

        return {
            rutaImgDragon
        };
    }
});

</script>

<style scoped lang="sass">

.cont-cuadrante-cartas-juego
    position: absolute
    display: inline-block
    width: 24%
    height: 24%
    bottom: 37.5%
    right: 37.5%
    text-align: center
    border: solid calc(var(--phx) / 2) #212121
    border-radius: calc(var(--phx))
    z-index: 10


.txt-cartas
    font-size: calc(var(--phx) * 3)


.img-dragon-partida
    height: calc(var(--phx) * 15)
    width: auto

//
</style>
