<template lang="pug">
div.opcion-mano(@click="enviarSolicitudSeq()" :style="{backgroundColor: '#3F51B5'}")
    div.contenedor-cartas-opcion-mano
        carta(v-for="(c, i) in obtCartas()" :valor="c" :escala="0.5" :key="i")
    span Tri

//
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useDimensions } from "@/components/useDimensions";
import { OportunidadTri } from "../../types/Oportunidad";
import carta from "@/components/carta.vue";

export default defineComponent({
    name: "opcion-tri",
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
        const {pH, phx} = useDimensions();

        const idJuego = route.params.id;

        const op = computed(() => props.oportunidad as OportunidadTri | undefined)

        const enviarSolicitudSeq = () => {
            const opcion = op.value!!.cartas;
            if (op.value !== undefined) {
                props.ws.send(JSON.stringify({
                    operacion: "llamar_tri",
                    datos: JSON.stringify({
                        idJuego,
                        idUsuario: props.idUsuario,
                        cartaDescartada: op.value.cartaDescartada,
                        combinacion: opcion
                    })
                }));
            }
        };

        const obtCartas = () => {
            if (op.value !== undefined) {
                const v: OportunidadTri = op.value;
                return [
                    v.cartas.first,
                    v.cartas.second,
                    v.cartaDescartada
                ];
            } else {
                return [];
            }
        };

        return {
            enviarSolicitudSeq,
            obtCartas,
            tamano: computed(() => (pH.value * -0.75) + "px"),
            phx
        }
    }
});

</script>

<style scoped lang="sass" vars="{tamano, phx}">

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
    &:hover
        transform: translateY(var(--tamano))

//
</style>
