<template lang="pug">
div.cont-cuadrante-cartas-juego
    span.num-cartas(:style="{fontSize: `${pH * 10}px`}") {{ cartasRestantes }}
    br
    span.txt-cartas(:style="{fontSize: `${pH * 2.5}px`}") Cartas restantes {{ dragonPartida }}

//
</template>

<script lang="ts">
import {defineComponent} from "vue";

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
        return {

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

    .num-cartas
        font-size: calc(var(--pH) * 10px)

    .txt-cartas
        font-size: calc(var(--pH) * 2.5px)


//
</style>
