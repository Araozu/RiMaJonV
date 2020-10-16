<template lang="pug">
div
    img(:src="rutaSvg")

//
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { getEsOscuro } from "@/components/getEsOscuro";

export default defineComponent({
    name: "v-img-corazon",
    setup() {
        const store = useStore();

        const {esOscuro} = getEsOscuro(store);

        const rutaSvg = computed(() => `/img/simbolos-cartas/T${esOscuro.value? "Oscuro": "Claro"}_corazon.svg`);

        return {
            rutaSvg
        }
    }
});

</script>

<style scoped lang="sass">



//
</style>
