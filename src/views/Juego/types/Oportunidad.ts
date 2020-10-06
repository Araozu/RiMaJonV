export declare interface Oportunidad {
    cartaDescartada: number
    nombreOportunidad: string
}

export declare class OportunidadSeq implements Oportunidad {
    cartaDescartada: number;
    nombreOportunidad: string;
    combinaciones: {first: number, second: number}[]
}

export declare class OportunidadTri implements Oportunidad {
    cartaDescartada: number;
    nombreOportunidad: string;
}