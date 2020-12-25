<template>
    <router-view/>
    <div style="display: none;">{{ modoColor }}</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const modoColorUsuario = computed<string>(() => store.state.modoColorUsuario);

        const query = window.matchMedia("(prefers-color-scheme: dark)");
        const funActualizarMediaQuery = (ev: MediaQueryListEvent | MediaQueryList) => {
            store.commit(
                "setModoColorUsuario",
                ev.matches ? "oscuro" : "claro"
            );
        };
        query.addEventListener("change", funActualizarMediaQuery);
        funActualizarMediaQuery(query);

        watch(modoColorUsuario, (v) => {
            console.log("Modo actualizado");
            if (v === "oscuro") {
                document.body.className = "tema-oscuro";
            } else if (v === "claro") {
                document.body.className = "tema-claro";
            } else {
                document.body.className = "tema-automatico";
            }
        });

        (() => {
            const modo = localStorage.getItem("modoColorUsuario");
            if (modo === "claro" || modo === "oscuro") {
                store.commit("setModoColorUsuario", modo);
            } else {
                store.commit("setModoColorUsuario", "");
            }
        })();

        return {
            modoColor: modoColorUsuario
        }
    }
});

</script>
