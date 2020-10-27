import { Dragon, Mano } from "./Mano";
import { EstadoJuego } from "./EstadoJuego";

export interface DatosJuego {
    dora: Array<number>,
    doraOculto: Array<number>,
    manos: {
        [s: string]: Mano
    },
    cartasRestantes: number,
    ordenJugadores: Array<string>,
    turnoActual: string,
    turnosHastaDora: number,
    dragonPartida: Dragon,
    estadoJuego: EstadoJuego
}
