<template lang="pug">
div
    h2 Secuencia

    p Como el nombre indica, una secuencia es un grupo de cartas en las que su valor es consecutivo.
    p Son 3 cartas de números del mismo color y en orden.

    grupo-cartas(:cartas="seqCartasR")

    p No necesitan tener el mismo símbolo.
    p Solo se pueden formar secuencias de los números (y la A), es decir, desde A hasta 10.
    p J, Q y K no se pueden usar en secuencias, tampoco los dragones
    p Los números deben ser consecutivos. No se puede formar un par con 9, 10, A, o 10, A, 2

    sigAnteriorPagina(:rutaSig="rutaSig" :rutaAnt="rutaAnt")
//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import carta from "@/components/carta.vue"
import grupoCartas from "@/components/grupo-cartas.vue";
import sigAnteriorPagina from "@/views/Tutorial/components/sig-ant-pagina.vue";

const cartas = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41,
    41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 64, 64,
    64, 64, 96, 96, 96, 96, 128, 128, 128, 128, 160, 160, 160, 160, 192, 192, 192, 192, 224, 224, 224, 224,
    256, 256, 256, 256];

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

export default defineComponent({
    name: "Secuencia",
    components: {carta, grupoCartas, sigAnteriorPagina},
    setup() {

        const rutaAnt = {
            nombre: "Par",
            ruta: "/tutorial/mano/par"
        };

        const rutaSig = {
            nombre: "Triple",
            ruta: "/tutorial/mano/triple"
        };

        return {
            seqCartasR,
            rutaAnt,
            rutaSig
        }
    }
});

</script>

<style scoped lang="sass">



//
</style>
