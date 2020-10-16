import { computed } from "vue";
import { RiMaJonState } from "@/store";
import { Store } from "vuex";

export const getEsOscuro = (store: Store<RiMaJonState>) => {
    const esOscuro = computed(() => {
        if (store.state.modoColor === "oscuro") {
            return true;
        } else if (store.state.modoColor === "auto") {
            return store.state.modoColorUsuario === "oscuro";
        }
        return false;
    });

    return {esOscuro};
};
