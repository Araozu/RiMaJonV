<template lang="pug">
div.opcion-mano(@click="enviarSolicitudIgnorarOportunidad" :style="'background-color: #9E9E9E; --tamano: ' + tamano + ';'")
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
        },
        tipoOportunidad: {
            type: String,
            default: "oportunidad"
        }
    },
    setup(props) {
        const route = useRoute();
        const {pH} = useDimensions();

        const idJuego = route.params.id;

        const enviarSolicitudIgnorarOportunidad = () => {
            props.ws.send(JSON.stringify({
                operacion: `ignorar_${props.tipoOportunidad}`,
                datos: JSON.stringify({
                    idJuego,
                    idUsuario: props.idUsuario
                })
            }));
        };

        return {
            enviarSolicitudIgnorarOportunidad,
            tamano: computed(() => (pH.value * -0.25) + "px")
        }
    }
});

</script>

<style lang="sass">

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
    user-select: none
    &:hover
        transform: translateY(var(--tamano))

//
</style>
