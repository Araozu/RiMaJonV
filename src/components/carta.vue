<template lang="pug">
div(style="display: inline-block")
    div.c-carta(v-if="valor === 0")
        div.c-carta-oculta(v-html="'&nbsp;'")
    div.c-carta(v-else-if="tipo === 2 || tipo === 3 || tipo === 4 || tipo === 5" :class="'carta-' + tipoCarta")
        img.img-dragon(:src="'/img/Dragon_' + colorDragon + '.webp'" :alt="'Dragon ' + colorDragon")
    div.c-carta(v-else :class="'carta-' + tipoCarta" v-html="valorC")

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import {useDimensions} from "@/components/useDimensions";
import { useStore } from "vuex";

export default defineComponent({
    name: "carta",
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

        const esOscuro = computed(() => {
            if (store.state.modoColor === "oscuro") {
                return true;
            } else if (store.state.modoColor === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return true;
            }
            return false;
        });

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

        return {
            tipo,
            tipoCarta,
            valorC,
            colorDragon,
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
    border: solid calc(var(--pxesc) * 0.225 * var(--escala)) var(--color-borde)
    border-radius: 0.1rem
    width: calc(var(--pxesc) * 5 * var(--escala))
    height: calc(var(--pxesc) * 8.5 * var(--escala))
    min-width: calc(var(--pxesc) * 5 * var(--escala))
    text-align: center
    vertical-align: middle
    cursor: pointer
    transition: transform 50ms, opacity 50ms
    user-select: none

.c-carta-oculta
    display: inline-block
    width: 60%
    height: 80%
    border: solid calc(var(--pxesc) * 0.4 * var(--escala)) var(--color-texto)
    border-radius: 0.1rem
    opacity: 0.75

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
    background-color: #b71c1c
    color: var(--color-texto)

.carta-cReyes
    background-color: #2E7D32
    color: var(--color-texto)

.carta-dNegro
    background-color: var(--color-fondo)
    color: var(--color-texto)

.carta-dRojo
    background-color: #b71c1c
    color: var(--color-texto)

.carta-dVerde
    background-color: #2E7D32
    color: var(--color-texto)

.carta-dAzul
    background-color: #1565C0
    color: var(--color-texto)

.carta-
    opacity: 0

//
</style>
