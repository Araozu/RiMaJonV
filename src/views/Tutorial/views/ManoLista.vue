<template lang="pug">
div
    h2 Mano lista

    p Ahora que conoces los 3 componentes de una mano, vamos a armar una mano paso a paso.
    p Nuestra mano inicial es la siguiente:

    grupo-cartas(:cartas="[4, 6, 10, 11, 44, 50, 128, 128, 256, 256]")

    p Ahora mismo tenemos varios pares, de 5 negro, de dragon verde y de K. No tenemos ninguna secuencia o triple.

    p En nuestro turno nos llega una carta:

    grupo-cartas(:cartas="[4, 6, 10, 11, 44, 50, 128, 128, 256, 256, -1, 8]")

    p Esta carta nos es útil para formar una secuencia de 2, 3, 4 negro, así que nos quedamos con ella.
        |  Entonces, debemos descartar otra carta para seguir teniendo 10 cartas.
    p Los pares nos son útiles, pues solo les falta una carta para convertirse en triples. Sin embargo,
        |  el 6 y 9 rojo no tienen el potencial de formar ni un par, triple o secuencia. Entonces vamos a
        |  descartar uno de ellos:

    grupo-cartas(:cartas="[4, 6, 8, 10, 11, 50, 128, 128, 256, 256]")

    p En nuestro siguiente turno nos llega una carta:

    grupo-cartas(:cartas="[4, 6, 8, 10, 11, 50, 128, 128, 256, 256, -1, 160]")

    p Este dragon azul no nos sirve, pues no tenemos ningún otro dragon azul con el cual formar un par o triple,
        |  así que lo descartamos

    grupo-cartas(:cartas="[4, 6, 8, 10, 11, 50, 128, 128, 256, 256]")

    p Hasta ahora tenemos 1 secuencia y 3 pares. Nos faltan 2 secuencias o pares para tener una mano válida.
    p En el siguiente turno nos llega una carta:

    grupo-cartas(:cartas="[4, 6, 8, 10, 11, 50, 128, 128, 256, 256, -1, 128]")

    p Con esta carta podemos formar un triple de dragon verde, así que nos la quedamos. La única carta inutil
        |  que tenemos es el 9 rojo, así que la descartamos.

    grupo-cartas(:cartas="[4, 6, 8, 10, 11, 128, 128, 128, 256, 256]")
    br
    br

    h3 Mano lista

    p En este punto aún no ganamos, tenemos 1 secuencia, 1 triple y 2 pares.
        |  Sin embargo, solo nos falta 1 carta para completar 1 triple, ya sea el triple de 5 negro
        |  o de K.

    p Cuando solo nos falta 1 carta para armar una mano válida, se dice que tenemos una Mano lista.
    br
    p En la siguiente sección veremos cómo ganar una vez que tenemos una mano lista.

    sigAnteriorPagina(:rutaSig="rutaSig" :rutaAnt="rutaAnt")

//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import grupoCartas from "@/components/grupo-cartas.vue";
import sigAnteriorPagina from "@/views/Tutorial/components/sig-ant-pagina.vue";

export default defineComponent({
    name: "ManoLista",
    components: {grupoCartas, sigAnteriorPagina},
    setup() {
        const rutaAnt = {
            nombre: "Triple",
            ruta: "/tutorial/mano/triple"
        };

        const rutaSig = {
            nombre: "Cómo ganar",
            ruta: "/tutorial/mano/como-ganar"
        };

        return {
            rutaAnt,
            rutaSig
        }
    }
});

</script>

<style scoped lang="sass">



//
</style>
