<template lang="pug">
div.contenedor-tutorial
    barra-lateral.layout

    div.layout.contenido
        h1 Tutorial de RiMaJon

        slot-estilos
            router-view

//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import barraLateral from "./components/barra-lateral.vue";
import slotEstilos from "./components/slot-estilos.vue"

export default defineComponent({
    name: "Tutorial",
    components: {barraLateral, slotEstilos}
});

</script>

<style scoped lang="sass">

.contenedor-tutorial
    display: grid
    grid-template-columns: 15rem auto
    grid-column-gap: 2rem

.inner
    padding: 0.5rem 0 0.5rem 1rem

.barra-lateral
    position: sticky
    max-height: calc(100vh - 3rem)
    overflow-y: auto
    top: 0.3rem
    margin: 0.3rem

.layout
    max-width: 75rem
    border: solid 1px pink
    padding: 1rem
    border-radius: 0.3rem

.contenido
    margin: 0.3rem

p
    font-size: 1.35rem
    text-align: justify

a
    display: inline-block
    color: var(--color-texto)
    font-size: 1.15rem
    line-height: 1.2rem
    margin: 0.3rem 0

img
    width: 100%
    height: auto
    max-width: 50rem

//
</style>
