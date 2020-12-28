<template lang="pug">
div.cont-carta(
        @click="fnDescartar"
        style="display: inline-block"
        @mouseenter="aplicarResaltadoCarta"
        @mouseleave="quitarResaltadoCarta"
    )
    div.c-carta.c-carta-transparente(v-if="valor === -1")
    // Carta oculta
    div.c-carta.c-carta-oculta-top(v-else-if="valor === 0")
        div.c-carta-oculta(v-html="'&nbsp;'")
    // Carta de números
    div.c-carta.c-carta-pointer(v-else-if="tipo === 0 || tipo === 1" :class="['carta-' + tipoCarta, claseResaltado, claseDora]")
        span.c-carta-numero {{ valorC }}
        div.c-carta-img
            v-img-simbolo(:tipo="nombreSimbolo")
    // Carta de dragon
    div.c-carta.c-carta-pointer(v-else-if="tipo === 2 || tipo === 3 || tipo === 4 || tipo === 5" :class="['carta-' + tipoCarta, claseResaltado, claseDora]")
        img.img-dragon(:src="'/img/Dragon_' + colorDragon + '.webp'" :alt="'Dragon ' + colorDragon")
    // Carta de realeza
    div.c-carta.c-carta-pointer(v-else :class="['carta-' + tipoCarta, claseDora, claseResaltado]" v-html="valorC")

//
</template>

<script lang="ts">
import {defineComponent, computed, ref, watchEffect} from "vue";
import {useDimensions} from "@/components/useDimensions";
import { useStore } from "vuex";
import { getEsOscuro } from "@/components/getEsOscuro";
import vImgSimbolo from "./img-cartas/v-img-simbolo.vue";
import { getClaseDora } from "./getValorDora";

export default defineComponent({
    name: "carta",
    components: {vImgSimbolo},
    props: {
        valor: {
            type: Number,
            default: 0
        },
        movimiento: {
            type: String,
            default: "none"
        },
        fnDescartar: {
            type: Function,
            required: false
        },
        resaltarCarta: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const store = useStore();
        const valorR = computed(() => props.valor);

        const {esOscuro} = getEsOscuro(store);

        const tipo = computed<number>( () => (valorR.value << 23) >>> 28);
        const tipoCarta = computed<string>(() => {
            switch (tipo.value) {
                case 0:
                    return "cNegro";
                case 1:
                    return "cRojo";
                case 2:
                    return "dNegro"
                case 3:
                    return "dRojo";
                case 4:
                    return "dVerde";
                case 5:
                    return "dAzul";
                case 6:
                case 7:
                case 8:
                    return "cReyes";
                default:
                    return "";
            }
        });

        const valorC = computed(() => {
            switch (tipo.value) {
                case 0:
                case 1: {
                    const valor = (valorR.value << 27) >>> 28;
                    return valor === 1? "A": valor;
                }
                case 6:
                    return "J";
                case 7:
                    return "Q";
                case 8:
                    return "K";
                default:
                    return "&nbsp;"
            }
        });

        const nombreSimbolo = computed(() => {
            if (tipo.value === 0) {
                return (((valorR.value << 31) >>> 31) === 1)? "trebol": "pica";
            } else if (tipo.value === 1) {
                return (((valorR.value << 31) >>> 31) === 1)? "corazon": "diamante";
            } else {
                return "";
            }
        });

        const colorDragon = computed<string>(() => {
            if (esOscuro.value) return "blanco";
            switch (tipo.value) {
                case 2:
                    return "negro";
                case 3:
                    return "rojo";
                case 4:
                    return "verde";
                default:
                    return "azul";
            }
        });

        const claseDora = ref("");
        const claseDoraWatcher = getClaseDora(valorR, store);
        watchEffect(() => {
            if (claseDoraWatcher.value !== "") {
                const tiempoHastaSigIntervalo = 4000 - (new Date()).getTime() % 4000;
                setTimeout(() => {
                    claseDora.value = claseDoraWatcher.value;
                }, tiempoHastaSigIntervalo);
            }
        });

        const claseResaltado = computed(() => {
            if (!props.resaltarCarta) return "";
            const valorPar = (valorR.value >>> 1) << 1;
            return (valorPar === store.state.cartaResaltada)? "c-carta-resaltada": "";
        });

        const fnDescartar = () => {
            props.fnDescartar!!(valorR.value);
        }

        const aplicarResaltadoCarta = () => {
            if (!props.resaltarCarta) return;
            if (valorR.value <= 1) return;
            const valorCarta = (valorR.value >>> 1) << 1;
            store.commit("setCartaResaltada", valorCarta);
        };

        const quitarResaltadoCarta = () => {
            if (!props.resaltarCarta) return;
            store.commit("setCartaResaltada", -2);
        };

        return {
            tipo,
            tipoCarta,
            valorC,
            nombreSimbolo,
            colorDragon,
            claseDora,
            claseResaltado,
            fnDescartar,
            aplicarResaltadoCarta,
            quitarResaltadoCarta
        }
    }
});

</script>

<style lang="sass">

.cont-carta
    margin-left: 1px

.c-carta-resaltada
    transform: translateY(calc(var(--phx) * -1))
    filter: saturate(1.75) !important
    opacity: 1 !important

.c-carta
    opacity: 0.85
    position: relative
    font:
        size: calc(var(--phx) * 4 * var(--escala))
        weight: normal
        family: "Secular One", "Pt Serif", serif
    display: table-cell
    border: solid calc(var(--phx) * 0.3 * var(--escala)) var(--color-borde)
    margin-left: 1px
    width: calc(var(--phx) * 5 * var(--escala))
    height: calc(var(--phx) * 8.5 * var(--escala))
    min-width: calc(var(--phx) * 5 * var(--escala))
    text-align: center
    vertical-align: middle
    cursor: default
    transition: transform 50ms, opacity 50ms
    user-select: none

.c-carta-pointer
    cursor: pointer


.c-carta-bonus
    overflow: hidden

    &::after
        content: ""
        display: inline-block
        position: absolute
        left: 0
        top: -95%
        width: 100%
        height: 100%
        background-image: linear-gradient(135deg, rgba(210, 210, 210, 0.0) 0%, rgba(210, 210, 210, 0.0) 45%, rgba(210, 210, 210, 0.3) 55%, rgba(210, 210, 210, 0.9) 63%, rgba(210, 210, 210, 0.3) 67%, rgba(210, 210, 210, 0.0) 75%, rgba(210, 210, 210, 0.0) 100%)
        transition: transform 1000ms
        animation-duration: 4s
        animation-name: brillocarta
        animation-iteration-count: infinite

@keyframes brillocarta
    50%
        transform: translateY(200%)

    to
        transform: translateY(200%)


.c-carta-oculta-top
    background-color: var(--color-fondo)


.c-carta-oculta
    display: inline-block
    width: 60%
    height: 80%
    border: solid calc(var(--phx) * 0.4 * var(--escala)) var(--color-texto)
    border-radius: 0.1rem
    opacity: 0.75

.c-carta-transparente
    opacity: 0

.c-carta-numero
    display: inline-block
    position: absolute
    top: 5%
    left: 10%
    font-size: 100%
    line-height: 1

.c-carta-img
    display: inline-block
    position: absolute
    bottom: 7%
    right: 10%
    width: 60%

.img-dragon
    width: 90%
    height: auto
    bottom: 0
    vertical-align: middle
    display: inline-block


.carta-cNegro
    background-color: var(--color-fondo)
    color: var(--color-texto)

.carta-cRojo
    background-color: var(--color-fondo-carta-roja)
    color: var(--color-texto-carta-roja)

.carta-cReyes
    background-color: var(--color-fondo-reyes)
    color: var(--color-texto-reyes)

.carta-dNegro
    background-color: var(--color-fondo)

.carta-dRojo
    background-color: var(--color-fondo-dragon-rojo)

.carta-dVerde
    background-color: var(--color-fondo-dragon-verde)

.carta-dAzul
    background-color: var(--color-fondo-dragon-azul)

.carta-
    opacity: 0

//
</style>
