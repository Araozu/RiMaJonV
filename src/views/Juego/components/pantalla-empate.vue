<template lang="pug">
div.contenedor-pantalla-empate
    h1 Empate
    hr
    router-link(to="/") Ir al inicio

//
</template>

<script lang="ts">

export default {
    name: "pantalla-empate"
}

</script>

<style lang="sass" scoped>

.contenedor-pantalla-empate
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


</style>