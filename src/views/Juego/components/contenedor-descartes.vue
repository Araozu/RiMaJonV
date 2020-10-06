<template lang="pug">
div.cont-cuadrante-descarte(:class="claseTurnoActual")
    div(v-for="cartas in grupoCartas")
        carta(v-for="(c, i) in cartas" :valor="c" :escala="escala" :key="i")

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
            default: 0.75
        },
        esTurnoActual: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        const {phx} = useDimensions();

        const grupoCartas = computed(() => splitArray(props.cartas as number[], 6));
        const claseTurnoActual = computed(() => props.esTurnoActual? "cont-cuadrante-descarte-turno-actual": "");

        return {
            grupoCartas,
            claseTurnoActual,
            phx
        }
    }
});

</script>

<style scoped lang="sass" vars="{phx, escala}">

.cont-cuadrante-descarte
    position: absolute
    width: 25%
    height: 20%
    bottom: 17%
    right: 37.5%
    text-align: left
    border-radius: calc(var(--phx) * 1.5 * var(--escala))
    border-top-style: solid
    border-top-width: calc(var(--phx) * 1.25 * var(--escala))
    border-top-color: #4CAF50

.cont-cuadrante-descarte-turno-actual
    border-top-color: red

//
</style>
