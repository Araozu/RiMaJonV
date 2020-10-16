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

        const query = window.matchMedia("(prefers-color-scheme: dark)");
        const funActualizarMediaQuery = (ev: MediaQueryListEvent | MediaQueryList) => {
            store.commit(
                "setModoColorUsuario",
                ev.matches? "oscuro": "claro"
            );
        };
        query.addEventListener("change", funActualizarMediaQuery);
        funActualizarMediaQuery(query);

    }
});

</script>
