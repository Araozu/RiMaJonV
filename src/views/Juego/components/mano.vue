<template lang="pug">
div.cont-cuadrante-2-mano(:style="'transform: rotate(' + posicionW + ')'")
    contenedor-descartes(:cartas="mano.descartes" :esTurnoActual="esTurnoActual")
    div.cont-opciones-mano
        opcion-tri(v-if="oportunidadTri"
            :idUsuario="idUsuario"
            :ws="ws"
            :oportunidad="oportunidadTri"
        )
        opcion-seq(v-if="oportunidadSeq"
            :idUsuario="idUsuario"
            :ws="ws"
            :oportunidad="oportunidadSeq"
        )
        opcion-win(v-if="oportunidadWin"
            :idUsuario="idUsuario"
            :ws="ws"
            :oportunidad="oportunidadWin"
        )
        opcion-ignorar(v-if="oportunidadTri || oportunidadSeq || oportunidadWin"
            :idUsuario="idUsuario" :ws="ws"
        )
    div.contenedor-dragon-jugador
        img.imagen-dragon-jugador(:src="rutaDragonJugador" title="Dragon del jugador")
        i.ph-lock.img-lock-jugador(v-if="idUsuario && mano.cartasReveladas.length === 0" title="Mano cerrada")
        i.ph-lock-open.img-lock-jugador(v-else-if="idUsuario && mano.cartasReveladas.length !== 0" title="Mano abierta")
    div.cuadrante-mano
        carta(v-for="(c, i) in cartas" :valor="c" :movimiento="posiciones[i]" :fnDescartar="descartarCarta" :key="i")
        carta(:valor="-1")
        carta(:valor="mano.sigCarta" :fnDescartar="descartarCarta")
        carta(:valor="-1")
        div(v-for="g in mano.cartasReveladas" :style="{display: 'inline-block'}")
            carta(v-for="(c, i) in g" :valor="c" :key="i")

//
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useDimensions } from "@/components/useDimensions";
import carta from "@/components/carta.vue";
import contenedorDescartes from "./contenedor-descartes.vue";
import { Mano } from "@/views/Juego/types/Mano";
import opcionIgnorar from "./opciones-mano/opcion-ignorar.vue";
import opcionSeq from "./opciones-mano/opcion-seq.vue";
import opcionTri from "./opciones-mano/opcion-tri.vue";
import opcionWin from "./opciones-mano/opcion-win.vue"
import { Oportunidad, OportunidadSeq, OportunidadTri, OportunidadWin } from "@/views/Juego/types/Oportunidad";

const estaOrdenado = (nums: number[]) => {
    for (let i = 0, j = 1; j < nums.length ; i++, j++) {
        if (nums[i] > nums[j]) return false;
    }
    return true;
};

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineComponent({
    name: "mano",
    components: {
        carta,
        contenedorDescartes,
        opcionSeq,
        opcionIgnorar,
        opcionTri,
        opcionWin
    },
    props: {
        idUsuario: String,
        ws: WebSocket,
        mano: {
            type: Object,
            required: true
        },
        posicion: Number,
        esTurnoActual: Boolean,
        oportunidades: Object,
        fnDescartarCarta: Function
    },
    setup(props) {
        const {pH} = useDimensions();
        const anchoCarta = computed(() => pH.value * 5 + 2 * (pH.value * 0.225))
        const cartas = ref<number[]>((props.mano as Mano).cartas);
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

        const oportunidadSeq = computed<Oportunidad | undefined>(() => {
            return (props.mano as Mano).oportunidades.find((obj: Oportunidad) => obj.nombreOportunidad === "Seq")
        });

        const oportunidadTri = computed<Oportunidad | undefined>(() => {
            return (props.mano as Mano).oportunidades.find((obj: Oportunidad) => obj.nombreOportunidad === "Tri")
        });

        const oportunidadWin = computed<Oportunidad | undefined>(() => {
            return (props.mano as Mano).oportunidades.find((obj: Oportunidad) => obj.nombreOportunidad === "Win")
        });

        const rutaDragonJugador = computed(() => {
            const nombreDragonMin = props.mano?.dragon?.toLowerCase();
            return `/img/Dragon_${nombreDragonMin}.webp`;
        });

        return {
            cartas,
            posiciones,
            descartarCarta,
            oportunidadSeq,
            oportunidadTri,
            oportunidadWin,
            rutaDragonJugador,
            posicionW: computed(() => (90 * (5 - posicion!!)) + "deg")
        }
    }
});

</script>

<style lang="sass">

.cont-opciones-mano
    position: absolute
    width: 65%
    height: 7%
    bottom: 11%
    left: 13%
    text-align: right


.opcion-mano
    display: inline-block
    min-width: 17%
    font-size: calc(var(--phx) * 3)
    text-align: center
    cursor: pointer
    margin-left: var(--phx)
    padding: var(--phx) 0
    color: white
    font-weight: bold
    border-radius: calc(var(--phx) * 0.5)
    box-shadow: 0 0 10px 1px rgba(100, 100, 100, 0.5)
    transition: transform 100ms


.cont-cuadrante-2-mano
    position: absolute
    width: 100%
    height: 100%


.cuadrante-mano
    position: absolute
    width: 87%
    height: 10%
    bottom: 0
    right: 0
    text-align: left


.contenedor-dragon-jugador
    position: absolute
    bottom: 10%
    left: 13%


.imagen-dragon-jugador
    width: calc(var(--phx) * 5)


.img-lock-jugador
    font-size: calc(var(--phx) * 3)
    display: inline-block
    padding-left: calc(var(--phx))

//
</style>
