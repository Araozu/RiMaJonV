<template lang="pug">
div.opcion-mano(@click="enviarSolicitudWin()" :style="{backgroundColor: '#f44336'}")
    span Win

//
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useDimensions } from "@/components/useDimensions";
import { OportunidadTri, OportunidadWin } from "../../types/Oportunidad";

export default defineComponent({
    name: "opcion-tri",
    props: {
        idUsuario: {
            type: String,
            required: true
        },
        ws: {
            type: WebSocket,
            required: true
        },
        oportunidad: {
            type: Object
        }
    },
    setup(props) {
        const route = useRoute();
        const {pH, phx} = useDimensions();

        const idJuego = route.params.id;

        const op = computed(() => props.oportunidad as OportunidadWin)

        const enviarSolicitudWin = () => {
            console.log(props.oportunidad);
            props.ws.send(JSON.stringify({
                operacion: "llamar_ron",
                datos: JSON.stringify({
                    idJuego,
                    idUsuario: props.idUsuario,
                    cartaDescartada: op.value.cartaDescartada
                })
            }));
        };

        return {
            enviarSolicitudWin,
            tamano: computed(() => (pH.value * -0.75) + "px"),
            phx
        }
    }
});

</script>

<style scoped lang="sass" vars="{tamano, phx}">

.opcion-mano
    position: relative
    display: inline-block
    min-width: 17%
    font-size: calc(var(--phx) * 3)
    text-align: center
    cursor: pointer
    margin-left: var(--phx)
    padding: var(--phx) 0
    color: white
    font-weight: bold
    border-radius: calc(var(--phx) * 0.5)
    box-shadow: 0 0 10px 1px rgba(100, 100, 100, 0.5)
    transition: transform 100ms
    user-select: none
    &:hover
        transform: translateY(var(--tamano))

//
</style>
