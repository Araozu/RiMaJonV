<template lang="pug">
div
    slot

//
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "slot-estilos"
});

</script>

<style lang="sass">

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

.inner
    padding: 0.5rem 0 0.5rem 1rem



//
</style>
