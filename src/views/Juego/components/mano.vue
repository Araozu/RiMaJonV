<template lang="pug">
div.cont-cuadrante-2-mano
    div.cuadrante-mano
        carta(v-for="(c, i) in cartas" :valor="c" :movimiento="posiciones[i]" :fnDescartar="descartarCarta" :key="i")

//
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useDimensions } from "@/components/useDimensions";
import carta from "@/components/carta.vue";

const estaOrdenado = (nums: number[]) => {
    for (let i = 0, j = 1; j < nums.length ; i++, j++) {
        if (nums[i] > nums[j]) return false;
    }
    return true;
};

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineComponent({
    name: "mano",
    components: {carta},
    props: {
        mano: Object,
        posicion: Number,
        esTurnoActual: Boolean,
        oportunidades: Object,
        fnDescartarCarta: Function
    },
    setup(props) {
        const {pH, phx} = useDimensions();
        const anchoCarta = computed(() => pH.value * 5 + 2 * (pH.value * 0.225))
        const cartas = ref<number[]>(props.mano?.cartas);
        const entrada = props.mano?.sigCarta;
        const gruposAbiertos = props.mano?.cartasReveladas;
        const descartes = props.mano?.descartes;
        const ultimaCartaDescartada = props.oportunidades?.cartaDescartada ?? 0;
        const posicion = props.posicion;
        const esTurnoActual = props.esTurnoActual;
        const oportunidades = props.oportunidades;

        const descartarCarta = props.fnDescartarCarta ?? (() => {});

        const posiciones = ref<string[]>(new Array(cartas.value.length).fill("none"));

        const moverCarta = (posOriginal: number, posDestino: number, numCartas: number) => {
            if (posDestino >= 0 && posDestino < numCartas) {
                const cartasMovidas = -(posOriginal - posDestino);
                return cartasMovidas === 0 ? `none` : `translateX(${anchoCarta.value * cartasMovidas}px)`
            } else {
                throw new Error("Movimiento (de posicion) de carta invalido");
            }
        };

        const swap = (
            posOriginalElem1: number,
            posActualElem1: number,
            posOriginalElem2: number,
            posActualElem2: number,
            numCartas: number
        ) => {
            const operacion1 = moverCarta(posOriginalElem1, posActualElem2, numCartas);
            const operacion2 = moverCarta(posOriginalElem2, posActualElem1, numCartas);

            return [operacion1, operacion2];
        };

        const swapper = (arrSort: number[][], numElems: number) => (i: number, j: number) => {
            const [op1, op2] = swap(arrSort[i][1], i, arrSort[j][1], j, numElems);

            if (posiciones.value[arrSort[i][1]] !== op1) {
                posiciones.value[arrSort[i][1]] = op1;
            }
            if (posiciones.value[arrSort[j][1]] !== op2) {
                posiciones.value[arrSort[j][1]] = op2;
            }

            const swapT = arrSort[i];
            arrSort[i] = arrSort[j];
            arrSort[j] = swapT;
        };

        const retraso = 50;
        const isort = async (arr: number[]) => {
            const numElems = arr.length;
            const arrSort = arr.map((x, p) => [x, p]);
            const nSwap = swapper(arrSort, numElems);

            for (let actualiter = 1; actualiter < numElems; actualiter++) {
                let posActual = actualiter;
                while (posActual > 0 && arrSort[posActual - 1][0] > arrSort[posActual][0]) {
                    nSwap(posActual - 1, posActual);
                    await esperar(retraso);
                    posActual--;
                }
            }

            return arrSort;
        };

        const manoCartasWrapper = computed(() => props.mano?.cartas);
        watch(manoCartasWrapper, (n) => {
            cartas.value = n;
        });

        watch(cartas, (n) => {
            if (estaOrdenado(n)) return;
            // const arrOrdenado = await isort(cartas, setPosiciones);
            // setCartas(arrOrdenado.map(x => x[0]));
            cartas.value = n.sort((x, y) => (x < y)? -1 : 1);
            posiciones.value = new Array(n.length).fill("none");
        });


        return {
            cartas,
            posiciones,
            descartarCarta,
            phx,
            posicionW: computed(() => (90 * (5 - posicion!!)) + "deg")
        }
    }
});

</script>

<style scoped lang="sass" vars="{phx, posicionW}">

.cont-cuadrante-2-mano
    position: absolute
    width: 100%
    height: 100%
    transform: rotate(var(--posicionW))


.cuadrante-mano
    position: absolute
    width: 87%
    height: 10%
    bottom: 0
    right: 0
    text-align: left


//
</style>
