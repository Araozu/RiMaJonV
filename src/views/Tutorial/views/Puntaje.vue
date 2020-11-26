<template lang="pug">
div
    h2 Puntaje

    p Primero se obtienen los puntos otorgados por los yaku.
    p Luego se obtienen los puntos otorgados por los bonus.
    p La suma de estos dos es la cantidad de puntos total. Luego se busca esa cantidad en la tabla:

    table.tabla-puntaje
        thead
            tr
                td Puntos
                td Monedas
        tbody
            tr(v-for="(p, i) in puntos")
                td {{ i * 0.5 }}
                td {{ p }}

//
</template>

<script lang="ts">
import { defineComponent } from "vue";

const puntos = [0, 0, 1000, 2000, 3000, 4500, 6500, 9000, 12000, 15000, 18000, 21000, 24000, 28000,
    35000, 36500, 38000, 39500, 41000, 42500, 50000];

export default defineComponent({
    name: "Puntaje",
    setup() {
        return {
            puntos
        }
    }
});

</script>

<style scoped lang="sass">

.tabla-puntaje
    text-align: center
    font-size: 1.15rem
    td
        border: solid 1px var(--color-texto)

//
</style>
