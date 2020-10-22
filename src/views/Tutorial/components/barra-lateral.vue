<template lang="pug">
div.barra-lateral
    router-link(to="/tutorial/") Inicio
    br
    hr
    router-link(to="/tutorial/cartas/") Cartas
    br
    router-link(to="/") Mano
    br
    div.inner
        router-link(to="/") Par
        br
        router-link(to="/") Secuencia
        br
        router-link(to="/") Triple
        br

    router-link(to="/") Flujo del juego
    br
    router-link(to="/") Cómo ganar
    br
    div.inner
        router-link(to="/") Mano lista
        br
        router-link(to="/") Ganar al recibir una carta
        br
        router-link(to="/") Ganar robando una carta
        br
        router-link(to="/") Restricciones para ganar
        br

    hr

    router-link(to="/") Descartes y Robos
    br
    div.inner
        router-link(to="/") Robar para formar secuencia
        br
        router-link(to="/") Robar para formar triple
        br

    router-link(to="/") Mano abierta/cerrada
    br
    router-link(to="/") Cuádruple
    br
    div.inner
        router-link(to="/") Robar para formar un cuádruple
        br
        router-link(to="/") Formar un cuádruple al recibir una carta
        br
        router-link(to="/") Formar un cuádruple en un triple robado
        br
        router-link(to="/") Bonus abierto
        br

    router-link(to="/") Yaku - Manos
    br
    div.inner
        router-link(to="/") Yaku normal
        br
        router-link(to="/") Yaku en mano cerrada
        br
        router-link(to="/") Yaku en mano cerrada y abierta
        br
        router-link(to="/") Yaku no acumulable
        br

    router-link(to="/") Bonus
    br
    div.inner
        router-link(to="/") Bonus cerrado
        br
        router-link(to="/") Bonus abierto
        br

    router-link(to="/") Dragones
    br
    div.inner
        router-link(to="/") Dragon de la partida
        br
        router-link(to="/") Dragon del jugador
        br

    router-link(to="/") Puntaje
    br
    div.inner
        router-link(to="/") Al ganar robando la carta ganadora
        br
        router-link(to="/") Al ganar recibiendo la carta ganadora
        br
        router-link(to="/") Múltiples ganadores
        br

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
