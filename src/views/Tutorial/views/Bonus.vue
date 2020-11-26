<template lang="pug">
div
    h2 Bonus
    p Todas las partidas tienen 10 cartas en la esquina superior izquierda.

    img(:src="rutaImg")

    p.
        De estas cartas, las primeras 5 son los indicadores de bonus. Estas cartas brindan puntos adicionales
        al ganador, cuando se cumplen ciertas condiciones.

    p.
        Por ejemplo, en la imagen se puede ver que el indicador es el 4 negro. Eso quiere decir
        que todos los 4 negros otorgan puntos adicionales al ganador.

    p.
        Estas 10 cartas se extraen de la baraja al inicio del juego, y no se pueden usar en las manos
        para crear pares/secuencias/triples.

    p Las últimas 5 cartas no se revelan.

    h3 Revelar bonus

    p El juego siempre inicia con 1 indicador revelado, y a medida que pasa el juego se revelan los
        |  4 bonus restantes. Estos se revelan despues de 20/15/10/5 turnos.

    h3 Puntaje

    p.
        Los puntos que dan los bonus dependen de:

    ol
        li La cantidad de veces que un mismo indicador se repite (en la esquina superior izquierda).
        li La cantidad de veces que tienes el bonus en tu mano.

    p Todas las situaciones se detallan en la siguiente tabla:

    - valorBonus = 5
    table.tabla-puntaje-bonus
        tbody
            tr
                td
                td 1 bonus en mano
                td 2 bonus en mano
                td 3 bonus en mano
            tr
                td 1 indicador
                td= valorBonus / 10 + ' puntos'
                td= (valorBonus * 2) / 10 + ' puntos'
                td= (valorBonus * 3) / 10 + ' puntos'
            tr
                td 2 indicadores
                td= (valorBonus * 3) / 10 + ' puntos'
                td= (valorBonus * 6) / 10 + ' puntos'
                td -
            tr
                td 3 indicadores
                td= (valorBonus * 9) / 10 + ' puntos'
                td -
                td -
            tr
                td 4 indicadores
                td -
                td -
                td -

    p Si un indicador se repite 4 veces, entonces no queda ninguna carta igual en las manos,
        |  por lo tanto no daría ningún punto.

//
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { getEsOscuro } from "@/components/getEsOscuro";

export default defineComponent({
    name: "Bonus",
    setup() {
        const store = useStore();
        const {esOscuro} = getEsOscuro(store);

        const rutaImg = computed(() => (esOscuro.value)
            ? "/img/tutorial/Img_rimajon_oscuro.webp"
            : "/img/tutorial/Img_rimajon_claro.webp"
        );

        const rutaSig = {
            nombre: "Cartas",
            ruta: "/tutorial/cartas/"
        };

        return {
            rutaImg,
            rutaSig
        }
    }
});

</script>

<style scoped lang="sass">


.tabla-puntaje-bonus
    text-align: center
    font-size: 1.25rem
    td
        border: solid 1px var(--color-texto)
        padding: 0.5rem


//
</style>
