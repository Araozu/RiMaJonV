<template lang="pug">
div
    contenedor-dora(:dora="dora" :doraOculto="doraOculto" :turnosRestantes="turnosDora")
    div.con-int-juego
        div.cont-2-juego
            div.cont-cuadrante-cartas-juego
                span(:style="{fontSize: `${pH * 10}px`}") {{ cartasRestantes }}
                br
                span(:style="{fontSize: `${pH * 2.5}px`}") Cartas restantes
            mano(:mano="mano2" :posicion="2" :esTurnoActual="turnoActual === obtClave(map, '2')")
            mano(:mano="mano3" :posicion="3" :esTurnoActual="turnoActual === obtClave(map, '3')")
            mano(:mano="mano4" :posicion="4" :esTurnoActual="turnoActual === obtClave(map, '4')")
            mano(:mano="mano1" :posicion="1" :esTurnoActual="turnoActual === obtClave(map, '1')")

//
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted, onUnmounted} from "vue";
import { useRoute } from "vue-router";
import { useDimensions } from "@/components/useDimensions";
import { useStore } from "vuex";
import { wsServidor } from "@/variables";
import contenedorDora from "./components/contenedor-dora.vue"
import mano from "@/views/Juego/components/mano.vue";

const manoInicial = {
    cartas: [],
    allIn: false,
    cartaSig: -1,
    cartasReveladas: [],
    descartes: [],
    sigCarta: -1,
};

const obtClave = (obj: any, valor: string): string | undefined => {
    for (const k in obj) if (obj.hasOwnProperty(k)) {
        if (obj[k] === valor) return k;
    }
}

export default defineComponent({
    name: "Juego",
    components: {contenedorDora, mano},
    setup() {
        const route = useRoute();
        const store = useStore();
        const {pH, pW} = useDimensions();
        const ph = computed(() => pH.value + "px");
        const pw = computed(() => pW.value + "px");

        const esPantallaCompleta = ref(false);
        const dora = ref([0, 0, 0, 0, 0]);
        const doraOculto = ref([0, 0, 0, 0, 0]);
        const turnoActual = ref<string | undefined>(undefined);
        const cartasRestantes = ref(58);
        const cartaDescartada = ref(false);
        const turnosDora = ref(32);

        const mano1 = ref(manoInicial);
        const mano2 = ref(manoInicial);
        const mano3 = ref(manoInicial);
        const mano4 = ref(manoInicial);

        const oportunidades = ref({});

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

        let socket: WebSocket;
        const map: any = {};
        onMounted(() => {
            if (!idJuego || !idUsuario) return;

            socket = new WebSocket(`${wsServidor}/juego`);

            socket.addEventListener("open", () => {
                socket.send(JSON.stringify({
                    operacion: "conectar",
                    datos: JSON.stringify({
                        idJuego,
                        idUsuario
                    })
                }));
            });

            socket.addEventListener("message", (ev) => {
                const info = JSON.parse(ev.data);
                switch (info.operacion) {
                    case "actualizar_datos": {
                        const d = info.datos;
                        console.log(info.datos);
                        dora.value = info.datos.dora;
                        console.log(dora.value);
                        doraOculto.value = info.datos.doraOculto;
                        turnosDora.value = info.datos.turnosHastaDora;

                        // Mapear IDS a posiciones
                        const turnoJugador = d.ordenJugadores.findIndex((id: string) => id === idUsuario);
                        map[idUsuario] = "1";
                        map[d.ordenJugadores[(turnoJugador + 1) % 4]] = "2";
                        map[d.ordenJugadores[(turnoJugador + 2) % 4]] = "3";
                        map[d.ordenJugadores[(turnoJugador + 3) % 4]] = "4";

                        for (const idUsuario in d.manos) {
                            const mano = d.manos[idUsuario];
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
                        doraOculto.value = info.datos.doraOculto;
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
                    case "oportunidad": {
                        oportunidades.value = info.datos;
                    }
                }
            });
        });
        onUnmounted(() => {
            if (socket) socket.close();
        });

        const descartarCarta = (valorCarta: number) => {
            if (turnoActual.value === obtClave(map, "1") && !cartaDescartada.value) {
                cartaDescartada.value = true;
                socket.send(JSON.stringify({
                    operacion: "descarte",
                    datos: JSON.stringify({
                        idJuego,
                        idUsuario,
                        carta: valorCarta
                    })
                }));
            }
        };

        return {
            dora,
            doraOculto,
            turnosDora,
            cartasRestantes,
            mano1,
            mano2,
            mano3,
            mano4,
            turnoActual,
            obtClave,
            pH,
            ph,
            pw,
        }
    }
});

</script>

<style lang="sass" vars="{ph, pw}">

.con-int-juego
    position: absolute
    top: 0
    left: calc((var(--pw) * 100 - var(--ph) * 100) / 2)
    width: calc(var(--ph) * 100)
    height: calc(var(--ph) * 100)
    perspective: calc(var(--pw) * 10)


.cont-2-juego
    position: absolute
    border: solid 2px green
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
