<template lang="pug">
div.cont-cuadrante-descarte(:class="claseTurnoActual" :style="'--escala: ' + escala + ';'")
    div(v-for="cartas in grupoCartas")
        carta(v-for="(c, i) in cartas" :valor="c" :key="i")

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import { useDimensions } from "@/components/useDimensions";
import carta from "@/components/carta.vue";

const splitArray = (arr: number[], numElems: number) => {
    const res = [];
    let i = 0;
    while (true) {
        if (i >= arr.length) break;
        const arrTemp = [];
        for (let j = 0; j < numElems; i++, j++) {
            if (i >= arr.length) break;
            arrTemp.push(arr[i]);
        }
        res.push(arrTemp);
    }
    return res;
};

export default defineComponent({
    name: "contenedor-descartes",
    components: {carta},
    props: {
        cartas: {
            type: Array,
            default: []
        },
        escala: {
            type: Number,
            default: 0.7
        },
        esTurnoActual: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        const grupoCartas = computed(() => splitArray(props.cartas as number[], 6));
        const claseTurnoActual = computed(() => props.esTurnoActual? "cont-cuadrante-descarte-turno-actual": "");

        return {
            grupoCartas,
            claseTurnoActual
        }
    }
});

</script>

<style lang="sass" vars="{escala}">

.cont-cuadrante-descarte
    position: absolute
    width: 23%
    height: 20%
    bottom: 17%
    right: 38.5%
    text-align: left
    border-top-style: solid
    border-top-width: calc(var(--phx) / 2)
    border-top-color: transparent
    transition: border-top-color 250ms


.cont-cuadrante-descarte-turno-actual
    border-top-color: #FF5722
    animation-duration: 4s
    animation-name: indicadorTurno
    animation-iteration-count: infinite


@keyframes indicadorTurno
    50%
        border-top-color: #FFEB3B


//
</style>
