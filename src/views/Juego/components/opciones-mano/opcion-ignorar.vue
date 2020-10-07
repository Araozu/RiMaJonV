<template lang="pug">
div.opcion-mano(@click="enviarSolicitudIgnorarOportunidad" :style="{backgroundColor: '#9E9E9E'}")
    | Ignorar

//
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import { useRoute } from "vue-router";
import { useDimensions } from "@/components/useDimensions";

export default defineComponent({
    name: "opcion-ignorar",
    props: {
        idUsuario: {
            type: String,
            required: true
        },
        ws: {
            type: WebSocket,
            required: true
        }
    },
    setup(props) {
        const route = useRoute();
        const {pH, phx} = useDimensions();

        const idJuego = route.params.id;

        const enviarSolicitudIgnorarOportunidad = () => {
            props.ws.send(JSON.stringify({
                operacion: "ignorar_oportunidad",
                datos: JSON.stringify({
                    idJuego,
                    idUsuario: props.idUsuario
                })
            }));
        };

        return {
            enviarSolicitudIgnorarOportunidad,
            tamano: computed(() => (pH.value * -0.75) + "px"),
            phx
        }
    }
});

</script>

<style scoped lang="sass" vars="{tamano, phx}">

.opcion-mano
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
    &:hover
        transform: translateY(var(--tamano))

//
</style>
