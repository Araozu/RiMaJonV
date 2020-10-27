<template lang="pug">
div.contenedor-pantalla-ganador(v-if="manoGanadora" :style="'--escala: 1.5; --phx: ' + phx + ';'")
    h1 Ganador!

    grupo-cartas(:cartas="cartasManoGanadora")

    hr

    h2 Yaku:
    h3.yaku(v-for="y in yaku") {{ y }} : {{ obtValorYaku(y) }} puntos

    hr

    h2 {{ valorMano }} puntos!

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import { DatosJuego } from "@/views/Juego/types/DatosJuego";
import { useDimensions } from "@/components/useDimensions";
import { Mano } from "@/views/Juego/types/Mano";
import grupoCartas from "@/components/grupo-cartas.vue"
import { OportunidadWin } from "@/views/Juego/types/Oportunidad";
import { obtValorYaku, Yaku } from "@/views/Juego/types/valoresYaku";

export default defineComponent({
    name: "pantalla-ganador",
    components: {grupoCartas},
    props: {
        datos: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const datos = computed<DatosJuego>(() => (props.datos as unknown) as DatosJuego);
        const {phx} = useDimensions();

        const manoGanadora = computed<Mano | undefined>(() => {
            if (!datos.value) return;

            return Object.values(datos.value.manos).find((m) => m.esGanador);
        });

        const cartasManoGanadora = computed(() => {
            if (manoGanadora.value === undefined) return [];

            const cartas: Array<number> = [];

            cartas.push(...manoGanadora.value.cartas)
            cartas.push(-1);

            // TODO: Diferenciar entre Ron y Tsumo. Por ahora solo Ron
            const manoDescartadorTupla = Object.entries(datos.value.manos).find(([id]) =>
                id === datos.value.turnoActual
            );

            if (manoDescartadorTupla === undefined) return [];

            const descartesDescartador = manoDescartadorTupla[1].descartes;
            const cartaDescartada = descartesDescartador[descartesDescartador.length - 1];

            cartas.push(cartaDescartada);

            for (const grupo of manoGanadora.value.cartasReveladas) {
                cartas.push(-1);
                cartas.push(...grupo);
            }

            return cartas;
        });

        const yaku = computed<Array<Yaku>>(() => {
            if (manoGanadora.value === undefined) return [];

            const oportunidadWin = manoGanadora.value!!.oportunidades.find((o) => o.nombreOportunidad === "Win")!! as OportunidadWin;
            return oportunidadWin.yaku;
        });

        const valorMano = computed(() => {
            let n = 0;
            for (const y of yaku.value) {
                n += obtValorYaku(y)
            }
            if (n === 0) return 100;

            const preValor = 1000 + (270 * n**2) - (18 * n**3);
            // Eliminar los 2 ultimos números.
            return Math.floor(preValor / 100) * 100;
        });

        return {
            manoGanadora,
            cartasManoGanadora,
            phx,
            valorMano,
            yaku,
            obtValorYaku
        }
    }
});

</script>

<style scoped lang="sass">

.contenedor-pantalla-ganador
    position: fixed
    top: 10%
    left: 10%
    width: 80%
    height: 80%
    z-index: 100
    background-color: var(--color-fondo-transparente)
    padding: 1rem

h1, h2, h3, h4, h5
    margin: 0
    padding: 1rem 0

.yaku
    padding: 0

//
</style>
