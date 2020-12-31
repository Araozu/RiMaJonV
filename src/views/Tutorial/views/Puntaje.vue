<template lang="pug">
div
    h2 Puntaje

    p Primero se obtienen los puntos otorgados por los yaku.
    p Luego se obtienen los puntos otorgados por los bonus.
    p La suma de estos dos es la cantidad de puntos total. Para obtener las monedas se usa la formula:

    img(:src="'/img/formula-puntaje.png'" style="height: 100px; width: auto;")

    p En la siguiente tabla se muestran los valores comunes:

    table.tabla-puntaje
        thead
            tr
                td Puntos
                td Monedas
        tbody
            tr(v-for="i in puntos")
                td {{ i }}
                td {{ formulaPuntos(i) }}

    p La cantidad maxima de puntos es 10
    p Cada jugador inicia con 100,000 monedas

//
</template>

<script lang="ts">
import { defineComponent } from "vue";

const formulaPuntos = (x: number) => 1000 * Math.floor(
    3 * x + (x ** 3 * 125) / 1000
);

const puntos = [
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
    7.5,
    8,
    8.5,
    9,
    9.5,
    10
];

export default defineComponent({
    name: "Puntaje",
    setup() {
        return {
            puntos,
            formulaPuntos
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
