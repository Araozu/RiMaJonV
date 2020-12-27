<template lang="pug">
div
    pantalla-ganador(:datos="datosJuego")
    contenedor-dora(:turnosRestantes="turnosDora")
    div.con-int-juego
        div.cont-2-juego
            contenedorCartas(:cartasRestantes="cartasRestantes" :dragonPartida="dragonPartida")
            mano(:mano="mano2" :posicion="2" :esTurnoActual="turnoActual === obtClaveMap('2')")
            mano(:mano="mano3" :posicion="3" :esTurnoActual="turnoActual === obtClaveMap('3')")
            mano(:mano="mano4" :posicion="4" :esTurnoActual="turnoActual === obtClaveMap('4')")
            mano(
                :mano="mano1"
                :posicion="1"
                :esTurnoActual="turnoActual === obtClaveMap('1')"
                :fnDescartarCarta="descartarCarta"
                :idUsuario="idUsuario"
                :ws="socket"
            )

//
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, onUnmounted} from "vue";
import { useRoute } from "vue-router";
import { useDimensions } from "@/components/useDimensions";
import { useStore } from "vuex";
import { wsServidor } from "@/variables";
import contenedorDora from "./components/contenedor-dora.vue"
import mano from "@/views/Juego/components/mano.vue";
import contenedorCartas from "./components/contenedor-cartas.vue"
import pantallaGanador from "./components/pantalla-ganador.vue"
import { EstadoJuego } from "@/views/Juego/types/EstadoJuego";
import { DatosJuego } from "@/views/Juego/types/DatosJuego";
import { Dragon, Mano } from "@/views/Juego/types/Mano";

const manoInicial: Mano = {
    cartas: [],
    cartasReveladas: [],
    descartes: [],
    sigCarta: -1,
    oportunidades: [],
    dragon: "Negro" as Dragon,
    esGanador: false
};

const obtClave = (obj: any, valor: string): string | undefined => {
    for (const k in obj) if (obj.hasOwnProperty(k)) {
        if (obj[k] === valor) return k;
    }
}

export default defineComponent({
    name: "Juego",
    components: {contenedorDora, mano, contenedorCartas, pantallaGanador},
    setup() {
        const route = useRoute();
        const store = useStore();
        const {pH, phx, pW, pwx} = useDimensions();

        const esPantallaCompleta = ref(false);
        const dora = ref([0, 0, 0, 0, 0]);
        const turnoActual = ref<string | undefined>(undefined);
        const cartasRestantes = ref(58);
        const cartaDescartada = ref(false);
        const turnosDora = ref(32);

        const dragonPartida = ref("");

        const mano1 = ref<Mano>(manoInicial);
        const mano2 = ref<Mano>(manoInicial);
        const mano3 = ref<Mano>(manoInicial);
        const mano4 = ref<Mano>(manoInicial);

        const estadoJuego = ref<EstadoJuego>("Iniciado");
        const datosJuego = ref<DatosJuego>();

        const idJuego: string = route.params.id as string;
        const idUsuario = store.state.idUsuario;

        const pantallaCompleta = () => {
            const elem = document.documentElement;
            elem.requestFullscreen();
            esPantallaCompleta.value = true;
        }

        const salirPantallaCompleta = () => {
            document.exitFullscreen();
            esPantallaCompleta.value = false;
        };

        let socket = ref<WebSocket | undefined>(undefined);
        const map: any = {};
        onMounted(() => {
            if (!idJuego || !idUsuario) return;

            const socketInner = new WebSocket(`${wsServidor}/juego`);

            socketInner.addEventListener("open", () => {
                socketInner.send(JSON.stringify({
                    operacion: "conectar",
                    datos: JSON.stringify({
                        idJuego,
                        idUsuario
                    })
                }));
            });

            socketInner.addEventListener("message", (ev) => {
                const info = JSON.parse(ev.data);
                switch (info.operacion) {
                    case "actualizar_datos": {
                        cartaDescartada.value = false;
                        const d: DatosJuego = info.datos;
                        datosJuego.value = d;
                        dora.value = d.dora;
                        store.commit("setDora", [info.datos.dora]);

                        turnosDora.value = info.datos.turnosHastaDora;
                        dragonPartida.value = d.dragonPartida;
                        estadoJuego.value = d.estadoJuego;

                        // Mapear IDS a posiciones
                        const turnoJugador = d.ordenJugadores.findIndex((id: string) => id === idUsuario);
                        map[idUsuario] = "1";
                        map[d.ordenJugadores[(turnoJugador + 1) % 4]] = "2";
                        map[d.ordenJugadores[(turnoJugador + 2) % 4]] = "3";
                        map[d.ordenJugadores[(turnoJugador + 3) % 4]] = "4";

                        for (const idUsuario in d.manos) {
                            const mano: Mano = d.manos[idUsuario];
                            const posMano = map[idUsuario];

                            const vSetMano = (() => {
                                switch (posMano) {
                                    case "1": return mano1;
                                    case "2": return mano2;
                                    case "3": return mano3;
                                    case "4": return mano4;
                                }
                            })();
                            vSetMano!!.value = mano;
                        }

                        cartasRestantes.value = d.cartasRestantes;
                        turnoActual.value = d.turnoActual;

                        break;
                    }
                    case "actualizar_manos": {
                        const d = info.datos;
                        console.log(info.datos);
                        dora.value = info.datos.dora;
                        store.commit("setDora", [...info.datos.dora, ...info.datos.doraOculto]);
                        cartaDescartada.value = false;
                        turnosDora.value = info.datos.turnosHastaDora;

                        for (const idUsuario in d.manos) {
                            const mano = d.manos[idUsuario];
                            const posMano = map[idUsuario];
                            console.log("idUsuario", idUsuario);
                            console.log("pos mano", posMano);

                            const vSetMano = (() => {
                                switch (posMano) {
                                    case "1": return mano1;
                                    case "2": return mano2;
                                    case "3": return mano3;
                                    case "4": return mano4;
                                }
                            })();
                            vSetMano!!.value = mano;
                        }

                        cartasRestantes.value = d.cartasRestantes;
                        turnoActual.value = d.turnoActual;

                        break;
                    }
                }
            });

            socket.value = socketInner;
        });
        onUnmounted(() => {
            if (socket) socket.value!!.close();
        });

        const descartarCarta = (valorCarta: number) => {
            if (turnoActual.value === obtClave(map, "1") && !cartaDescartada.value) {
                cartaDescartada.value = true;
                socket.value!!.send(JSON.stringify({
                    operacion: "descarte",
                    datos: JSON.stringify({
                        idJuego,
                        idUsuario,
                        carta: valorCarta
                    })
                }));
            }
        };

        const obtClaveMap = (s: string) => obtClave(map, s);
        return {
            dora,
            turnosDora,
            cartasRestantes,
            dragonPartida,
            idUsuario,
            socket,
            mano1,
            mano2,
            mano3,
            mano4,
            turnoActual,
            estadoJuego,
            datosJuego,
            obtClaveMap,
            descartarCarta,
            pH,
            phx,
            pW,
            pwx,
            escala: 1
        }
    }
});

</script>

<style lang="sass" vars="{pH, phx, pW, pwx, escala}">

.con-int-juego
    position: absolute
    top: 0
    left: calc((var(--pwx) * 100 - var(--phx) * 100) / 2)
    width: calc(var(--phx) * 100)
    height: calc(var(--phx) * 100)
    perspective: calc(var(--pwx) * 10)
    transform-style: preserve-3d


.cont-2-juego
    position: absolute
    border: solid 3px #795548
    background: radial-gradient(var(--color-mesa-1), var(--color-mesa-2))
    transform: rotateX(2deg)
    width: 100%
    height: 100%


.cont-cuadrante-cartas-juego
    position: absolute
    display: inline-block
    width: 18%
    height: 18%
    bottom: 41%
    right: 41%
    text-align: center

//
</style>
