<template lang="pug">
div
    h1 Sobre el juego
    p Ri Ma Jon es un juego inspirado en Mahjong, pero ejecutado con cartas.

    h2 Cartas
    p Existen 108 cartas en el juego:

    carta(v-for="(c, i) in cartas" :valor="c" :key="i")

    p 4 cartas de los números 1 al 10 de color negro y rojo, 4 cartas de dragones de 4 colores, 4 J, Q y K.

    h2 Mano
    p Cada mano se compone de 10 + 1 cartas aleatorias.
    grupo-cartas(:cartas="cartasR")

    h2 Flujo del juego
    p.
        Hay 4 jugadores, cada uno con una mano de 10 cartas. En cada turno el jugador extrae una carta
        y la une a su mano. Luego, debe descartar 1 carta.
    p El objetivo del juego es formar una mano con 3 grupos y 1 par de cartas.

    h2 Par de cartas
    p Un par son 2 cartas del mismo color y valor.
    grupo-cartas(:cartas="parCartasR")

    h2 Grupo de cartas
    p Un grupo de cartas puede ser cualquiera de los siguientes:
    div(style="padding-left: 2rem")
        h3 Secuencia
        p 3 cartas del mismo color y con números consecutivos
        grupo-cartas(:cartas="seqCartasR")
        p J, Q, K y los dragones no pueden formar sequencias.
        p Los números deben ser consecutivos: 1 2 3 es válido, pero 9 10 1 no lo es.

        h3 Triple
        p 3 cartas del mismo color y valor.
        grupo-cartas(:cartas="triCartasR")

        h3 Cuádruple
        p 4 cartas del mismo color y valor.
        grupo-cartas(:cartas="cuaCartasR")
        p Cuando se forma un cuádruple se agrega una carta a la mano. Los cuadruples se consideran triples para el
            | resto de efectos.

    h2 Mano lista
    p Una mano está lista cuando solo le falta 1 carta para ganar

    grupo-cartas(:cartas="[10, 10, 11, 34, 36, 38, 38, 38, 128, 128]")
    p.
        Por ejemplo, la mano anterior está lista, porque solo le falta un dragon verde
        para completar sus 3 grupos y 1 par.
    p.
        En esa mano, el primer grupo es un triple negro, el segundo grupo una secuencia de A-2-3 rojo, el
        par son dos 3 rojos, y el último grupo sería un triple de dragon verde.

    h2 Robar cartas
    p Puedes robar cartas que tus oponentes descartan para formar tu mano en varias situaciones:

    div.pad
        h3 Robar para formar una secuencia
        p.
            Si tu oponente a tu izquierda descarta una carta que necesitas para formar una secuencia,
            puedes robarla y formar tu secuencia.
        p Por ejemplo, a las siguientes dos cartas les falta un 3 o 6 rojo para formar una secuencia.
        grupo-cartas(:cartas="[40, 42]")
        br
        p Al siguiente par le falta un 6 negro para formar una secuencia.
        grupo-cartas(:cartas="[10, 14]")

        h3 Robar para formar un triple
        p.
            Si algún oponente descarta una carta que necesitas para formar un triple,
            puedes robarla.
        p Por ejemplo, al siguiente par le falta una J verde para formar un triple
        grupo-cartas(:cartas="[192, 192]")

        h3 Robar para formar un cuádruple
        p.
            Si algún oponente descarta una carta que necesitas para formar un cuádruple,
            puedes robarla.
        p Por ejemplo. al siguiente triple le falta un dragon azul para formar un cuádruple.
        grupo-cartas(:cartas="[160, 160, 160]")

        h3 Robar para ganar
        p.
            Si tu mano está lista, y algún oponente descarta la carta que necesitas para ganar,
            puedes robarla. No importa si hacerlo forma una secuencia, triple, cuádruple o par.

        h3 Prioridad de los robos
        p.
            Existe la posibilidad de que varios jugadores puedan robar una carta a la vez.
            Si esto sucede la prioridad es la siguiente:
        ol
            li Robar para ganar
            li Robar para cuádruple
            li Robar para triple
            li Robar para secuencia

        h3 Consecuencias del robo
        p Cuando robas una carta suceden 2 cosas:
        ul
            li Todos pueden ver la secuencia/triple/cuádruple que formaste
            li No puedes cambiar esa secuencia/triple/cuádruple
        p Adicionalmente, al robar una carta tu mano se considera "abierta"

    h2 Mano abierta y cerrada
    p Se dice que tu mano está abierta cuando tus oponentes pueden ver uno o más grupos de tu mano.
    p Robar una carta para ganar no cuenta como abrir tu mano.

    h2 Restricciones para ganar
    ol
        li No puedes ganar robando una carta que descartaste. No importa cuando.

    h2 Indicadores de bonus
    div
        p Todas las partidas tienen 10 cartas reservadas que todos pueden ver. Estos son los indicadores de bonus.
        grupo-cartas(:cartas="[0, 0, 0, 0, 0]")
        br
        grupo-cartas(:cartas="[0, 0, 0, 0, 0]")

        p Al inicio de la partida se revela el primer indicador:
        grupo-cartas(:cartas="[14, 0, 0, 0, 0]")
        br
        grupo-cartas(:cartas="[0, 0, 0, 0, 0]")

        p Los siguientes 4 indicadores se revelan despues de 32/16/8/4 turnos.
        p Los últimos 5 indicadores se revelan cada vez que alguien declara un cuádruple, uno a la vez.

        div.pad
            h3 Funcionamiento

            p Cada carta igual al indicador vale 0.2 puntos extra.

            h3 Indicadores y bonus repetidos
            p Si algún bonus se repite se aumenta su valor.


    h2 Indicadores de dragones
    div
        p.
            A cada partida se le asigna un color, y a cada jugador se le asigna otro. Esos colores indican
            qué triple/cuáduple de dragones brindan 1 punto adicional.

        p.
            Por ejemplo, si la partida es de color rojo, y tu eres de color verde, entonces
            cualquier triple/cuádruple del dragon rojo o verde da 3 puntos adicionales.

        grupo-cartas(:cartas="[96, 96, 96, -1, 128, 128, 128]")


    h2 Puntaje
    p Cada mano completa vale una cantidad de puntos según las combinaciones de cartas que posee.

    div.tabla-puntos

        h3 0.2 puntos - Bonus
        div.yaku
            p Cualquier bonus en una mano ganadora. 100% acumulable.

        h3 1 puntos

        div.pad

            div.yaku
                h4
                    i.ph-lock-bold.img-lock(title="Solo en mano cerrada")
                    | Doble secuencia pura
                p 2 secuencias iguales del mismo color en mano cerrada.
                grupo-cartas(:cartas="[2, 2, 4, 5, 6, 7, 44, 45, 44, 128, 128]")

            div.yaku
                h4 Realeza
                p 1 triple de J, K o Q.
                grupo-cartas(:cartas="[5, 5, 4, 40, 43, 44, 128, 128, 256, 256, 256]")

            div.yaku
                h4 Triple triples
                p 3 triples
                grupo-cartas(:cartas="[6, 6, 5, 48, 48, 49, 160, 160, 160, 192, 192]")

            div.yaku
                h4 Interior
                p Solo números del 2 al 9
                grupo-cartas(:cartas="[4, 4, 4, 5, 7, 8, 12, 13, 13, 40, 41]")

            div.yaku
                h4 Dragones
                p 1 triple del dragon del color de la partida o del jugador (acumulable).
                grupo-cartas(:cartas="[6, 6, 7, 48, 49, 49, 160, 160, 160, 192, 192]")

            div.yaku
                h4 Par único
                p
                    i.ph-lock-bold.img-lock(title="Solo en mano cerrada")
                    | 1 par del mismo número, color y símbolo en mano cerrada
                grupo-cartas(:cartas="[6, 9, 11, 12, 15, 16, 41, 41, 128, 128, 128]")

        h3 2 puntos

        div.pad

            div.yaku
                h4
                    i.ph-lock-open-bold.img-lock(title="En mano abierta -1 punto")
                    | Semi exterior
                p
                    | Cada par o grupo contiene al menos un 1, 10, J, Q, K o dragón.
                    | -1 punto en mano abierta.
                grupo-cartas(:cartas="[2, 4, 7, 20, 20, 21, 48, 50, 52, 192, 192]")

            div.yaku
                h4
                    i.ph-lock-open-bold.img-lock(title="En mano abierta -1 punto")
                    | Rojo
                p Solo cartas de color rojo en mano cerrada. En mano abierta vale 1 punto menos.
                grupo-cartas(:cartas="[42, 43, 47, 48, 51, 53, 53, 52, 96, 96, 96,]")

            div.yaku
                h4
                    i.ph-lock-open-bold.img-lock(title="En mano abierta -1 punto")
                    | Negro
                p Solo cartas de color negro en mano cerrada. En mano abierta vale 1 punto menos.
                grupo-cartas(:cartas="[4, 7, 8, 8, 9, 12, 15, 16, 64, 64, 64]")

            div.yaku
                h4
                    i.ph-lock-open-bold.img-lock(title="En mano abierta -1 punto")
                    | Escalera
                p 1,2,3,4,5,6,7,8,9 del mismo color. -1 punto en mano abierta.
                grupo-cartas(:cartas="[2, 4, 7, 9, 10, 12, 15, 16, 19, 128, 128]")

            div.yaku
                h4
                    i.ph-lock-open-bold.img-lock(title="En mano abierta -1 punto")
                    | Escalera
                p 2,3,4,5,6,7,8,9,10 del mismo color. -1 punto en mano abierta.
                grupo-cartas(:cartas="[5, 7, 9, 10, 12, 14, 17, 18, 20, 41, 41]")

        h3 3 puntos

        div.pad

            div.yaku
                h4 A-10
                p Solo A y 10.
                grupo-cartas(:cartas="[2, 2, 3, 20, 20, 21, 34, 35, 35, 52, 52]")

            div.yaku
                h4
                    i.ph-lock-open-bold.img-lock(title="En mano abierta -1 punto")
                    | Exterior
                p Solo 1, 10, dragones y reyes. -1 punto en mano abierta.
                grupo-cartas(:cartas="[2, 2, 3, 20, 20, 21, 52, 52, 53, 128, 128]")

            div.yaku
                h4 Escalera full
                p 1,1,2,3,4,5,6,7,8,9,10 del mismo color
                grupo-cartas(:cartas="[2, 3, 4, 7, 9, 10, 13, 14, 17, 19, 21]")
                p No se acumula con 2,3,4,5,6,7,8,9,10.

            div.yaku
                h4 Escalera full
                p 1,2,3,4,5,6,7,8,9,10,10 del mismo color
                grupo-cartas(:cartas="[35, 37, 38, 40, 42, 45, 47, 48, 51, 52, 52]")
                p No se acumula con 1,2,3,4,5,6,7,8,9.

            div.yaku
                h4
                    i.ph-lock-bold.img-lock(title="Solo en mano cerrada")
                    | Triple triples cerrados
                p 3 triples en mano cerrada
                grupo-cartas(:cartas="[6, 6, 7, 48, 49, 49, 160, 160, 160, 192, 192]")

        h3 7 puntos

        div.pad

            div.yaku
                h4
                    i.ph-lock-bold.img-lock(title="En mano abierta -1 punto")
                    | A-10 cerrado.
                p Solo A y 10 en mano cerrada.
                grupo-cartas(:cartas="[2, 2, 3, 20, 20, 21, 34, 35, 35, 52, 52]")
                p No se acumula con ninguna otra mano.

            div.yaku
                h4 Escalera Perfecta
                p Una Escalera Full, pero todas las cartas del mismo símbolo
                grupo-cartas(:cartas="[34, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52]")
                p No se acumula con ninguna otra mano.

            div.yaku
                h4 Realeza full
                p 3 triples de J, Q y K
                grupo-cartas(:cartas="[16, 16, 192, 192, 192, 224, 224, 224, 256, 256, 256]")
                p No se acumula con ninguna otra combinación.

            div.yaku
                h4 Realeza y Dragones
                p Solo dragones, J, K y Q
                grupo-cartas(:cartas="[64, 64, 64, 160, 160, 160, 192, 192, 192, 224, 224]")
                p No se acumula con ninguna otra combinación.

        h3 10 puntos

        div.pad

            div.yaku
                h4 Dragones full
                p Solo dragones
                grupo-cartas(:cartas="[64, 64, 64, 96, 96, 96, 128, 128, 128, 160, 160]")
                p No se acumula con ninguna otra combinación.

            div.yaku
                h4 Verde
                p Solo cartas de color verde
                grupo-cartas(:cartas="[128, 128, 128, 192, 192, 192, 224, 224, 224, 256, 256]")
                p No se acumula con ninguna otra combinación.

    p Formula para puntos: 1000 + 270 * x^2 - 18 x^3
    p Máxima cantidad de puntos: 10 - equivale a 10000

    img(src="/img/formula_puntos_rimajon.png")
    br
    img(src="/img/grafica_puntos_rimajon.png")

//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import carta from "@/components/carta.vue";
import grupoCartas from "../../components/grupo-cartas.vue";
import { useDimensions } from "@/components/useDimensions";

const cartas = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41,
    41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 64, 64,
    64, 64, 96, 96, 96, 96, 128, 128, 128, 128, 160, 160, 160, 160, 192, 192, 192, 192, 224, 224, 224, 224,
    256, 256, 256, 256];

const cartasR = (() => {
    const indices = [];
    for (let i = 0; i < 11; i++) {
        let sigIndice = Math.floor(Math.random() * cartas.length);
        while (indices.find((s) => s === sigIndice) !== undefined) {
            sigIndice = Math.floor(Math.random() * cartas.length);
        }
        indices.push(sigIndice);
    }
    const cartasN = indices.map((i) => cartas[i]);
    const ultimaCarta = cartasN[10];
    cartasN.pop();

    const cartasN2 = cartasN.sort((x, y) => (x < y) ? -1 : 1);
    cartasN2.push(-1);
    cartasN2.push(ultimaCarta);

    return cartasN2;
})();

const seqCartasR = (() => {
    let base = Math.round(Math.random() * 9) + 1;

    let nums;
    switch (base) {
        case 1:
            nums = [1, 2, 3];
            break;
        case 10:
            nums = [8, 9, 10];
            break;
        default:
            const n = Math.random();
            if (n < 0.33 && base !== 2) {
                nums = [base - 2, base - 1, base]
            } else if (n < 0.66 && base !== 9) {
                nums = [base, base + 1, base + 2]
            } else {
                nums = [base - 1, base, base + 1]
            }
    }

    return (Math.random() < 0.5)
        ? nums.map((n) => n * 2)
        : nums.map((n) => (n + 16) * 2);

})();

const parCartasR = new Array(2).fill(cartas[Math.floor(Math.random() * cartas.length)]);
const triCartasR = new Array(3).fill(cartas[Math.floor(Math.random() * cartas.length)]);
const cuaCartasR = new Array(4).fill(cartas[Math.floor(Math.random() * cartas.length)]);


export default defineComponent({
    name: "Ayuda",
    components: {
        carta,
        grupoCartas
    },
    setup() {
        const {phx} = useDimensions();

        return {
            cartas,
            cartasR,
            parCartasR,
            seqCartasR,
            triCartasR,
            cuaCartasR,
            phx,
            escala: 1
        }
    }
});

</script>

<style lang="sass" vars="{phx, escala}">

.pad
    padding-left: 2rem

.tabla-puntos
    padding-left: 2rem
    h3
        text-decoration: underline
        font-size: 1.45rem
        position: sticky
        top: 0
        z-index: 10
        background-color: var(--color-fondo)
        padding: 0.5rem 0

.yaku
    margin: 2rem 0
    h4
        font-size: 1.15rem
        margin: 0
    p
        margin: 0.5rem 0


.img-lock
    padding-right: 0.5rem
    font-size: 1.35rem
    vertical-align: middle

//
</style>
