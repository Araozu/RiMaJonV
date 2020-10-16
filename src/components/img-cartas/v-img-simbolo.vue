<template lang="pug">
img(:src="rutaSvg")

//
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { getEsOscuro } from "@/components/getEsOscuro";

export default defineComponent({
    name: "v-img-simbolo",
    props: {
        tipo: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const store = useStore();

        const {esOscuro} = getEsOscuro(store);

        const rutaSvg = computed(() => `/img/simbolos-cartas/T${esOscuro.value? "Oscuro": "Claro"}_${props.tipo}.svg`);

        return {
            rutaSvg
        }
    }
});

</script>

<style scoped lang="sass">

img
    width: 100%
    height: auto
    position: absolute
    bottom: 0
    left: 0

//
</style>
