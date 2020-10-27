import { Oportunidad } from "@/views/Juego/types/Oportunidad";

export type Dragon = "Negro" | "Rojo" | "Verde" | "Azul";

export declare class Mano {
    cartas: number[]
    cartasReveladas: number[][]
    descartes: number[]
    sigCarta: number
    oportunidades: Oportunidad[]
    dragon: Dragon
    esGanador: boolean
}

