import { Store } from "vuex";
import { RiMaJonState } from "@/store";
import { computed, ComputedRef } from "vue";

const valoresNumNegro = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
const valoresNumRojo = [34, 36, 38, 40, 42, 44, 46, 48, 50, 52];
const valoresDragones = [64, 96, 128, 160];
const valoresReyes = [192, 224, 256];

const obtenerCartaBonus = (dora: number, tipo: number) => {
    const arr: number[] = (() => {
        switch (tipo) {
            case 0: return valoresNumNegro
            case 1: return valoresNumRojo
            case 2:
            case 3:
            case 4:
            case 5: return valoresDragones
            case 6:
            case 7:
            case 8:
                return valoresReyes;
            default:
                return [];
        }
    })();

    const posicionDora = arr.findIndex((x) => x === dora);
    const posicionBonus = (posicionDora + 1) % arr.length;
    return arr[posicionBonus];
};

const verificarTipoCarta = (tipoCartaActual: number, tipoCartaD: number): boolean => {

    let tipoCartaActualF = tipoCartaActual;
    if (tipoCartaActual >= 2 && tipoCartaActual <= 5) {
        tipoCartaActualF = 5;
    } else if (tipoCartaActual >= 6 && tipoCartaActual <= 8) {
        tipoCartaActualF = 8;
    }

    let tipoCartaDF = tipoCartaD;
    if (tipoCartaD >= 2 && tipoCartaD <= 5) {
        tipoCartaDF = 5;
    } else if (tipoCartaD >= 6 && tipoCartaD <= 8) {
        tipoCartaDF = 8;
    }

    return tipoCartaActualF !== tipoCartaDF;
};

export const getClaseDora = (valor: ComputedRef<number>, store: Store<RiMaJonState>) => computed<string>(() => {
    const [dora1, dora2] = store.state.dora;

    const tipoCartaActual = (valor.value << 23) >>> 28;
    const numeroCartaActual = (valor.value >>> 1) << 1;

    for (const d of dora1) {
        const tipoCartaD = (d << 23) >>> 28;
        const vCartaD = (d >>> 1) << 1;
        if (verificarTipoCarta(tipoCartaActual, tipoCartaD)) continue;

        const cartaBonus = obtenerCartaBonus(vCartaD, tipoCartaD);

        if (numeroCartaActual === cartaBonus) return "c-carta-bonus";
    }

    for (const d of dora2) {
        const tipoCartaD = (d << 23) >>> 28;
        const vCartaD = (d >>> 1) << 1;
        if (verificarTipoCarta(tipoCartaActual, tipoCartaD)) continue;

        const cartaBonus = obtenerCartaBonus(vCartaD, tipoCartaD);

        if (numeroCartaActual === cartaBonus) return "c-carta-bonus";
    }

    return "";
});
