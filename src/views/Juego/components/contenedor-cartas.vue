<template lang="pug">
div.cont-cuadrante-cartas-juego
    img.img-dragon-partida(:src="rutaImgDragon")
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
    width: 18%
    height: 18%
    bottom: 41%
    right: 41%
    text-align: center


.txt-cartas
    font-size: calc(var(--phx) * 2)


.img-dragon-partida
    height: calc(var(--phx) * 12)
    width: auto

//
</style>
