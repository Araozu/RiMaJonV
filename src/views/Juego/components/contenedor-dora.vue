<template lang="pug">
div.contenedor-dora
    carta(v-for="(c, i) in doraCerrado" :valor="c" :escala="0.75" :key="i")
    br
    carta(v-for="(c, i) in doraAbierto" :valor="c" :escala="0.75" :key="i")
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
        const {pH} = useDimensions();
        const pHc = computed(() => pH.value + "px");

        const doraCerrado = computed(() => {
            const narr = [...store.state.dora[0]];
            for (let i = narr.length; i < 5; i++) {
                narr.push(0);
            }
            return narr;
        });
        const doraAbierto = computed(() => {
            const narr = [...store.state.dora[1]];
            for (let i = narr.length; i < 5; i++) {
                narr.push(0);
            }
            return narr;
        });

        return {
            doraCerrado,
            doraAbierto,
            pHc
        }
    }
});

</script>

<style lang="sass" vars="{pHc}">

.contenedor-dora
    position: fixed
    top: calc(var(--pHc) * 2)
    left: calc(var(--pHc) * 2)
    padding: var(--pHc)
    border-radius: calc(var(--pHc) / 2)
    font-size: calc(var(--pHc) * 2.5)
    box-shadow: 0 0 calc(var(--pHc) * 0.75) calc(var(--pHc) * 0.75) #dedede
    background-color: var(--color-fondo)

//
</style>
