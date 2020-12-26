<template lang="pug">
div
    h1 Sobre el juego
    p Ri Ma Jon es un juego inspirado en Mahjong, pero ejecutado con cartas.

    h2 Cartas
    p Existen 108 cartas en el juego:

    carta(v-for="(c, i) in cartas" :valor="c" :key="i")

    h2 Puntaje
    p Cada mano completa vale una cantidad de puntos según las combinaciones de cartas que posee.

    div.tabla-puntos

        h3 1 punto

        div.pad

            div.yaku
                h4
                    i.ph-lock-bold.img-lock(title="Solo en mano cerrada")
                    | Doble secuencia
                p 2 secuencias iguales del mismo color en mano cerrada.
                grupo-cartas(:cartas="[2, 2, 4, 5, 6, 7, 44, 45, 44, 128, 128]")

            div.yaku
                h4 Variedad
                p Al menos una carta de cada tipo
                grupo-cartas(:cartas="[10, 11, 35, 36, 39, 160, 160, 160, 192, 192, 192]")

            div.yaku
                h4 Realeza
                p 1 triple de J, K o Q. Acumulable.
                grupo-cartas(:cartas="[5, 5, 4, 40, 43, 44, 128, 128, 256, 256, 256]")

            div.yaku
                h4 Triple triples
                p 3 triples
                grupo-cartas(:cartas="[6, 6, 7, 48, 48, 49, 160, 160, 160, 192, 192]")

            div.yaku
                h4 Interior
                p Solo números del 2 al 9
                grupo-cartas(:cartas="[4, 4, 4, 5, 7, 8, 12, 13, 13, 40, 41]")

            div.yaku
                h4 Dragones
                p 1 triple del dragon del color de la partida o del jugador. Acumulable.
                grupo-cartas(:cartas="[6, 6, 7, 48, 49, 49, 160, 160, 160, 192, 192]")

        h3 2 puntos

        div.pad

            div.yaku
                h4
                    i.ph-lock-bold.img-lock(title="Solo en mano cerrada")
                    | Doble secuencia pura
                p 2 secuencias iguales del mismo color y mismo simbolo en mano cerrada.
                grupo-cartas(:cartas="[2, 2, 4, 4, 6, 6, 44, 45, 44, 128, 128]")

            div.yaku
                h4 Semi exterior
                p Cada par o grupo contiene al menos un 1, 10, J, Q, K o dragón.
                grupo-cartas(:cartas="[2, 4, 7, 20, 20, 21, 48, 50, 52, 192, 192]")

            div.yaku
                h4 Rojo
                p Solo cartas de color rojo.
                grupo-cartas(:cartas="[42, 43, 47, 48, 51, 53, 53, 52, 96, 96, 96,]")

            div.yaku
                h4 Negro
                p Solo cartas de color negro.
                grupo-cartas(:cartas="[4, 7, 8, 8, 9, 12, 15, 16, 64, 64, 64]")

            div.yaku
                h4 Escalera
                p Cartas del 1 al 9 o del 2 al 10 del mismo color.
                grupo-cartas(:cartas="[2, 4, 7, 9, 10, 12, 15, 16, 19, 128, 128]")

        h3 3 puntos

        div.pad

            div.yaku
                h4 Exterior
                p Solo 1, 10, dragones y reyes.
                grupo-cartas(:cartas="[2, 2, 3, 20, 20, 21, 52, 52, 53, 128, 128]")
                p No se acumula con "semi exterior".

            div.yaku
                h4
                    i.ph-lock-bold.img-lock(title="Solo en mano cerrada")
                    | Triple triples cerrados
                p 3 triples en mano cerrada
                grupo-cartas(:cartas="[6, 6, 7, 48, 49, 49, 160, 160, 160, 192, 192]")

        h3 5 puntos

        div.pad
            div.yaku
                h4 Escalera full
                p Una escalera y un par del numero faltante del mismo color
                grupo-cartas(:cartas="[35, 37, 38, 40, 42, 45, 47, 48, 51, 52, 52]")
                p No se acumula con "escalera", "negro" o "rojo".

        h3 7 puntos

        div.pad

            div.yaku
                h4 A-10
                p Solo A y 10.
                grupo-cartas(:cartas="[2, 2, 3, 20, 20, 21, 34, 35, 35, 52, 52]")
                p No se acumula con ningún otro yaku.

            div.yaku
                h4 Escalera Perfecta
                p Una Escalera Full, pero todas las cartas del mismo símbolo
                grupo-cartas(:cartas="[34, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52]")
                p No se acumula con ningún otro yaku.

            div.yaku
                h4 Realeza full
                p 3 triples de J, Q y K
                grupo-cartas(:cartas="[16, 16, 192, 192, 192, 224, 224, 224, 256, 256, 256]")
                p No se acumula con ningún otro yaku.

            div.yaku
                h4 Realeza y Dragones
                p Solo dragones, J, K y Q
                grupo-cartas(:cartas="[64, 64, 64, 160, 160, 160, 192, 192, 192, 224, 224]")
                p No se acumula con ningún otro yaku.

        h3 10 puntos

        div.pad

            div.yaku
                h4 Dragones full
                p Solo dragones
                grupo-cartas(:cartas="[64, 64, 64, 96, 96, 96, 128, 128, 128, 160, 160]")
                p No se acumula con ningún otro yaku.

            div.yaku
                h4 Verde
                p Solo cartas de color verde
                grupo-cartas(:cartas="[128, 128, 128, 192, 192, 192, 224, 224, 224, 256, 256]")
                p No se acumula con ningún otro yaku.

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
