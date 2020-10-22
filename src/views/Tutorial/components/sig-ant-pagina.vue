<template lang="pug">
div.sig-ant-pagina
    div.cont
        div.link(v-if="rutaAnt")
            router-link(:to="rutaAnt.ruta")
                p {{ rutaAnt.nombre }}
    div(style="opacity: 0") &nbsp;
    div.cont
        div.link(v-if="rutaSig")
            router-link(:to="rutaSig.ruta")
                p {{ rutaSig.nombre }}

//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "sig-ant-pagina",
    props: {
        rutaAnt: {
            type: Object,
            required: false
        },
        rutaSig: {
            type: Object,
            required: false
        }
    },
    setup() {
        const router = useRouter();

        const irA = (ruta: string) => router.push(ruta);

        return {
            irA
        }
    }
});

</script>

<style scoped lang="sass">

.sig-ant-pagina
    display: grid
    grid-template-columns: 15rem calc(100% - 30rem) 15rem

.cont
    position: relative
    text-align: center

.link
    border: solid 1px var(--color-borde)
    border-radius: 0.2rem
    max-width: 15rem
    cursor: pointer
    user-select: none
    &:hover
        border-color: var(--color-texto)

a
    display: inline-block
    width: 100%
    color: var(--color-texto)
    p
        text-align: center

//
</style>
