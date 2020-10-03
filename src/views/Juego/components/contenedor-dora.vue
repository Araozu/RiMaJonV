<template lang="pug">
div.contenedor-dora
    carta(v-for="(c, i) in dora" :valor="c" :escala="0.75" :key="i")
    br
    carta(v-for="(c, i) in doraOculto" :valor="c" :escala="0.75" :key="i")

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import { useDimensions } from "@/components/useDimensions";
import carta from "@/components/carta.vue";

export default defineComponent({
    name: "contenedor-dora",
    components: {carta},
    props: {
        dora: {
            type: Array,
            default: [0, 0, 0, 0, 0]
        },
        doraOculto: {
            type: Array,
            default: [0, 0, 0, 0, 0]
        },
        turnosRestantes: {
            type: Number,
            default: 32
        }
    },
    setup() {
        const {pH} = useDimensions();
        const pHc = computed(() => pH.value + "px");

        return {
            pHc
        }
    }
});

</script>

<style lang="sass" vars="{pHc}">

.contenedor-dora
    position: fixed
    top: calc(var(--pHc) * 2)
    left: calc(var(--pHc) * 2)
    padding: var(--pHc)
    border-radius: calc(var(--pHc) / 2)
    font-size: calc(var(--pHc) * 2.5)
    box-shadow: 0 0 calc(var(--pHc) * 0.75) calc(var(--pHc) * 0.75) #dedede
    background-color: var(--color-fondo)

//
</style>
