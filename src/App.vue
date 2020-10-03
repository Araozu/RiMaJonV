<template>
    <router-view/>
</template>

<script lang="ts">
import {defineComponent, computed, watch} from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const modoColor = computed<string>(() => store.state.modoColor);
        watch(modoColor, (n) => {
            console.log(`Modo color cambiado: ${n}`);
        });
    }
});

</script>
