import { Store } from "vuex";
import type { RiMaJonState } from "../store";
import { computed} from "vue";
import type { ComputedRef } from "vue";

export const getClaseDora = (valor: ComputedRef<number>, store: Store<RiMaJonState>) => computed<string>(() => {
    const [dora1] = store.state.dora;

    const valorG = (valor.value >>> 1) << 1;

    for (const d of dora1) {
        const cartaBonus = (d >>> 1) << 1;

        if (valorG === cartaBonus) return "c-carta-bonus";
    }

    return "";
});
