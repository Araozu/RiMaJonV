<template lang="pug">
div.cont-carta(@click="fnDescartar" style="display: inline-block")
    div.c-carta(v-if="valor === 0" :class="claseDora")
        div.c-carta-oculta(v-html="'&nbsp;'")
    div.c-carta(v-else-if="tipo === 0 || tipo === 1" :class="['carta-' + tipoCarta, claseDora]")
        span.c-carta-numero {{ valorC }}
        div.c-carta-img
            v-img-simbolo(:tipo="nombreSimbolo")
    div.c-carta(v-else-if="tipo === 2 || tipo === 3 || tipo === 4 || tipo === 5" :class="['carta-' + tipoCarta, claseDora]")
        img.img-dragon(:src="'/img/Dragon_' + colorDragon + '.webp'" :alt="'Dragon ' + colorDragon")
    div.c-carta(v-else :class="['carta-' + tipoCarta, claseDora]" v-html="valorC")

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
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
        escala: {
            type: Number,
            default: 1
        }
    },
    setup(props) {
        const {pH} = useDimensions();
        const store = useStore();
        const pxesc = computed(() => pH.value + "px");

        const {esOscuro} = getEsOscuro(store);

        const tipo = computed<number>( () => (props.valor << 23) >>> 28);
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
                    const valor = (props.valor << 27) >>> 28;
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
                return (((props.valor << 31) >>> 31) === 1)? "trebol": "pica";
            } else if (tipo.value === 1) {
                return (((props.valor << 31) >>> 31) === 1)? "corazon": "diamante";
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

        const valorR = computed(() => props.valor);
        const claseDora = getClaseDora(valorR, store);

        const fnDescartar = () => {
            props.fnDescartar!!(props.valor);
        }

        return {
            tipo,
            tipoCarta,
            valorC,
            nombreSimbolo,
            colorDragon,
            claseDora,
            fnDescartar,
            pxesc
        }
    }
});

</script>

<style lang="sass" vars="{pxesc, escala}">

.c-carta
    position: relative
    font:
        size: calc(var(--pxesc) * 4 * var(--escala))
        weight: normal
        family: "Secular One", "Pt Serif", serif
    display: table-cell
    border: solid calc(var(--pxesc) * 0.2 * var(--escala)) var(--color-borde)
    width: calc(var(--pxesc) * 5 * var(--escala))
    height: calc(var(--pxesc) * 8.5 * var(--escala))
    min-width: calc(var(--pxesc) * 5 * var(--escala))
    text-align: center
    vertical-align: middle
    cursor: pointer
    transition: transform 50ms, opacity 50ms
    user-select: none


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
        color: #ffb500
        background-image: linear-gradient(135deg, rgba(220, 220, 220, 0.0) 0%, rgba(220, 220, 220, 0.0) 35%, rgba(220, 220, 220, 0.3) 45%, rgba(220, 220, 220, 0.6) 53%, rgba(220, 220, 220, 0.3) 57%, rgba(220, 220, 220, 0.0) 65%, rgba(220, 220, 220, 0.0) 100%)
        transition: transform 500ms
        animation-duration: 5s
        animation-name: brillocarta
        animation-iteration-count: infinite

@keyframes brillocarta
    35%
        transform: translateY(200%)

    to
        transform: translateY(200%)


.c-carta-oculta
    display: inline-block
    width: 60%
    height: 80%
    border: solid calc(var(--pxesc) * 0.4 * var(--escala)) var(--color-texto)
    border-radius: 0.1rem
    opacity: 0.75

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
