<template lang="pug">
div
    h1 Ri Ma Jon
    p Ri Ma Jon Esmeralda!
    div(v-if="datosVerificados")
        div(v-if="idUsuario && nombreUsuario")
            h2 Salas
            p Bienvenido, {{nombreUsuario}}
            entrar-sala
            crear-sala

        div(v-else)
            crear-usuario

    div(v-else)
        p Conectando al servidor...

    p Modo de color: {{ modoColor }}
    button(@click="cambiarModoColor('claro')") Cambiar a claro
    button(@click="cambiarModoColor('oscuro')") Cambiar a oscuro

    br
    p
        router-link(to="/ayuda/") Ayuda
    br
    p
        router-link(to="/tutorial/") Tutorial

//
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted} from "vue";
import {useStore} from "vuex";
import crearUsuario from "./components/crear-usuario.vue";
import crearSala from "./components/crear-sala.vue";
import entrarSala from "./components/entrar-sala.vue";
import { servidorF } from "@/variables";

export default defineComponent({
    name: "Inicio",
    components: {crearUsuario, crearSala, entrarSala},
    setup() {
        const store = useStore();

        const datosVerificados = ref(false);

        const idUsuario = computed(() => store.state.idUsuario);
        const nombreUsuario = computed(() => store.state.nombreUsuario);
        const modoColor = computed(() => store.state.modoColor);

        onMounted(async () => {
            if (idUsuario.value && nombreUsuario.value) {
                const solicitud = await fetch(`${servidorF}/usuario/validar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombreUsuario: nombreUsuario.value,
                        idUsuario: idUsuario.value
                    })
                });

                if (solicitud.ok) {

                    const datos = await solicitud.json();
                    switch (datos.estado) {
                        case "ok": {
                            datosVerificados.value = true;
                            break;
                        }
                        case "nombreUsuarioInvalido": {
                            store.commit("setNombreUsuario", datos.nombreUsuario);

                            datosVerificados.value = true;
                            break;
                        }
                        case "idInvalido": {
                            console.log("El id provisto es invalido.");

                            store.commit("setIdUsuario", undefined);
                            store.commit("setNombreUsuario", undefined);

                            datosVerificados.value = true;
                            break;
                        }
                    }

                } else {
                    // TODO
                    console.error("TODO");
                }
            } else {
                datosVerificados.value = true;
            }
        });

        const cambiarModoColor = (modo: string) => {
            localStorage?.setItem("modoColorUsuario", modo);
            store.commit("setModoColorUsuario", modo);
        };

        return {
            datosVerificados,
            idUsuario,
            nombreUsuario,
            modoColor,
            cambiarModoColor
        }
    }
});

</script>

<style scoped lang="sass">

a
    color: var(--color-fondo)
    background-color: var(--color-texto)
    border-radius: 0.25rem
    padding: 0.5rem 1rem
    text-decoration: none

    &:hover
        text-decoration: underline

//
</style>
