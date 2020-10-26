<template lang="pug">
div.barra-lateral
    router-link(to="/tutorial/") Inicio
    hr
    router-link(to="/tutorial/cartas/") Cartas
    br
    router-link(to="/tutorial/mano/") Mano
    div.inner
        router-link(to="/tutorial/mano/par") Par
        br
        router-link(to="/tutorial/mano/secuencia") Secuencia
        br
        router-link(to="/tutorial/mano/triple") Triple

    router-link(to="/tutorial/mano-lista") Mano lista
    br
    router-link(to="/") Cómo ganar
    div.inner
        router-link(to="/") Ganar al recibir una carta
        br
        router-link(to="/") Ganar robando una carta
        br
        router-link(to="/") Restricciones para ganar

    hr

    router-link(to="/") Descartes y Robos
    div.inner
        router-link(to="/") Robar para formar secuencia
        br
        router-link(to="/") Robar para formar triple

    router-link(to="/") Mano abierta/cerrada
    br

    router-link(to="/") Yaku - Manos
    div.inner
        router-link(to="/") Yaku normal
        br
        router-link(to="/") Yaku en mano cerrada
        br
        router-link(to="/") Yaku en mano cerrada y abierta
        br
        router-link(to="/") Yaku no acumulable

    router-link(to="/") Bonus
    div.inner
        router-link(to="/") Bonus cerrado
        br
        router-link(to="/") Bonus abierto

    router-link(to="/") Dragones
    div.inner
        router-link(to="/") Dragon de la partida
        br
        router-link(to="/") Dragon del jugador

    router-link(to="/") Puntaje
    div.inner
        router-link(to="/") Al ganar robando la carta ganadora
        br
        router-link(to="/") Al ganar recibiendo la carta ganadora
        br
        router-link(to="/") Múltiples ganadores

    router-link(to="/") Empate
    br
    br

//
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "barra-lateral"
});

</script>

<style scoped lang="sass">

.barra-lateral
    position: sticky
    max-height: calc(100vh - 3rem)
    overflow-y: auto
    top: 0.3rem
    margin: 0.3rem

.inner
    padding: 0.5rem 0 0.5rem 1rem

a
    display: inline-block
    color: var(--color-texto)
    font-size: 1.15rem
    line-height: 1.2rem
    margin: 0.3rem 0

//
</style>
