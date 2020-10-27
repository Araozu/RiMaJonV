
export type Yaku =
    | "DragonesFull"
    | "Verde"
    | "RealezaDragones"
    | "RealezaFull"
    | "TripleTriplesCerrados"
    | "EscaleraFull"
    | "Exterior"
    | "Escalera"
    | "TripleCuadruples"
    | "Negro"
    | "Rojo"
    | "SemiExterior"
    | "ParUnico"
    | "DragonJugador"
    | "DragonPartida"
    | "Interior"
    | "TripleTriples"
    | "TripleSecuenciaCerrada"
    | "Realeza"
    | "DobleSecuenciaPura"
    | "Cerrado"


export const obtValorYaku = (y: Yaku): number => {
    switch (y) {
        case "DragonesFull": return 10
        case "Verde": return 10
        case "RealezaDragones": return 7
        case "RealezaFull": return 7
        case "TripleTriplesCerrados": return 3
        case "EscaleraFull": return 3
        case "Exterior": return 3
        case "Escalera": return 2
        case "TripleCuadruples": return 2
        case "Negro": return 2
        case "Rojo": return 2
        case "SemiExterior": return 2
        case "ParUnico": return 1
        case "DragonJugador": return 1
        case "DragonPartida": return 1
        case "Interior": return 1
        case "TripleTriples": return 1
        case "TripleSecuenciaCerrada": return 1
        case "Realeza": return 1
        case "DobleSecuenciaPura": return 1
        case "Cerrado": return 0
    }
}
