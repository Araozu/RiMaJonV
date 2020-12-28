<template lang="pug">
div.opcion-mano(v-for="opcion in opciones" @click="enviarSolicitudSeq(opcion)" :style="{backgroundColor: '#009688'}")
    div.contenedor-cartas-opcion-mano
        carta(v-for="(c, i) in obtCartasOrdenadas(opcion)"
            :valor="c"
            :key="i"
            :resaltarCarta="false"
        )
    span Seq

//
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useDimensions } from "@/components/useDimensions";
import { OportunidadSeq } from "@/views/Juego/types/Oportunidad";
import carta from "@/components/carta.vue";

export default defineComponent({
    name: "opcion-seq",
    components: {carta},
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
        const {pH} = useDimensions();

        const idJuego = route.params.id;

        const op = computed(() => props.oportunidad as OportunidadSeq | undefined)

        const opciones = computed(() => {
            return op.value?.combinaciones
        });

        const enviarSolicitudSeq = (opcion: {first: number, second: number}) => {
            if (op.value !== undefined) {
                props.ws.send(JSON.stringify({
                    operacion: "llamar_seq",
                    datos: JSON.stringify({
                        idJuego,
                        idUsuario: props.idUsuario,
                        cartaDescartada: op.value.cartaDescartada,
                        combinacion: opcion
                    })
                }));
            }
        };

        const obtCartasOrdenadas = (opcion: {first: number, second: number}) => {
            return [op.value!!.cartaDescartada, opcion.first, opcion.second].sort((x, y) => (x < y)? -1: 1)
        };

        return {
            opciones,
            enviarSolicitudSeq,
            obtCartasOrdenadas,
            tamano: computed(() => (pH.value * -0.25) + "px"),
            escala: 0.5
        }
    }
});

</script>

<style lang="sass" vars="{tamano, escala}">

.contenedor-cartas-opcion-mano
    position: absolute
    top: calc(var(--phx) * -3)
    left: calc(var(--phx) * 1.25)


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
