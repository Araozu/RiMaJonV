<template lang="pug">
div.contenedor-dora(:style="'--escala: ' + escala + ';'")
    carta(v-for="(c, i) in doraCerrado" :valor="c" :key="i")
    br
    carta(v-for="(c, i) in doraAbierto" :valor="c" :key="i")
    br
    span(v-if="turnosRestantes === 1") Bonus en {{turnosRestantes}} turno
    span(v-else-if="turnosRestantes > 1") Bonus en {{turnosRestantes}} turnos

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import { useDimensions } from "@/components/useDimensions";
import carta from "@/components/carta.vue";
import { useStore } from "vuex";

export default defineComponent({
    name: "contenedor-dora",
    components: {carta},
    props: {
        turnosRestantes: {
            type: Number,
            default: 32
        }
    },
    setup() {
        const store = useStore();

        const doraCerrado = computed(() => {
            const narr = [...store.state.dora[0]];
            for (let i = narr.length; i < 5; i++) {
                narr.push(0);
            }
            return narr;
        });
        const doraAbierto = [0, 0, 0, 0, 0];

        return {
            doraCerrado,
            doraAbierto,
            escala: 0.75
        }
    }
});

</script>

<style lang="sass">

.contenedor-dora
    position: fixed
    top: calc(var(--phx) * 2)
    left: calc(var(--phx) * 2)
    padding: var(--phx)
    border-radius: calc(var(--phx) / 2)
    font-size: calc(var(--phx) * 2.5)
    box-shadow: 0 0 calc(var(--phx)) calc(var(--phx)) rgba(120, 120, 120, 0.25)
    background-color: var(--color-fondo)

//
</style>
