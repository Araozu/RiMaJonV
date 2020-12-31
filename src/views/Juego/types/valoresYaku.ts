
export type Yaku =
    // 10
    | "DragonesFull"
    | "Verde"
    // 8
    | "RealezaDragones"
    | "RealezaFull"
    | "EscaleraPerfecta"
    | "A10"
    // 5
    | "EscaleraFull"
    // 3
    | "TripleTriplesCerrados"
    | "Exterior"
    // 2
    | "Escalera"
    | "Negro"
    | "Rojo"
    | "SemiExterior"
    | "DobleSecuenciaPura"
    // 1
    | "Dragones"
    | "Interior"
    | "TripleTriples"
    | "Realeza"
    | "DobleSecuencia"
    | "ManoCerrada"


export const obtValorYaku = (y: Yaku): number => {
    switch (y) {
        case "DragonesFull":
            return 10;
        case "Verde":
            return 10;
        case "RealezaDragones":
            return 8;
        case "RealezaFull":
            return 8;
        case "EscaleraPerfecta":
            return 8;
        case "A10":
            return 8;
        case "EscaleraFull":
            return 5;
        case "TripleTriplesCerrados":
            return 3;
        case "Exterior":
            return 3;
        case "Escalera":
            return 2;
        case "Negro":
            return 2;
        case "Rojo":
            return 2;
        case "SemiExterior":
            return 2;
        case "DobleSecuenciaPura":
            return 2;
        case "Dragones":
            return 1;
        case "Interior":
            return 1;
        case "TripleTriples":
            return 1;
        case "Realeza":
            return 1;
        case "DobleSecuencia":
            return 1;
        case "ManoCerrada":
            return 1;
    }
}
