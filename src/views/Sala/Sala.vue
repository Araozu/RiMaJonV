<template lang="pug">
div
    div(v-if="!idSala || !idUsuario")
        h1 Sala de espera - Error
        p No te has conectado a ninguna sala
        router-link(to="/") Regresar al inicio

    div(v-else-if="estado === 'conectando'")
        h1 Sala de espera - Conectando
        h2 El código de la sala es {{idSala}}
        p Conectando al servidor...

    div(v-else-if="estado === 'conectado'")
        h1 Sala de espera
        h2 El código de la sala es {{idSala}}
        p Jugadores conectados:
        p(v-for="u in usuarios") Usuario: {{u.nombreUsuario}}

        button(@click="iniciarJuego") Iniciar el juego!

    div(v-else-if="estado.startsWith('error') && estado.substr(6) === 'Sala no existe'")
        h1 Sala de espera - Error
        p No existe la sala {{idSala}}
        router-link(to="/") Regresar al inicio

    div(v-else)
        p Algo salió mal.
        router-link(to="/") Regresar al inicio

//
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted, onUnmounted} from "vue";
import { useStore } from "vuex";
import { wsServidor } from "@/variables";
import router from "@/router";
import { useRoute } from "vue-router";

interface Usuario {
    idUsuario: string,
    nombreUsuario: string
}

export default defineComponent({
    name: "Sala",
    setup() {
        const store = useStore();
        const route = useRoute();

        const estado = ref("conectando");
        const usuarios = ref<Array<Usuario>>([]);
        const idSala = route.params.id;
        const idUsuario = computed(() => store.state.idUsuario);
        const nombreUsuario = computed(() => store.state.nombreUsuario);

        let socket: WebSocket;

        onMounted(() => {
            if (!idUsuario) return;

            socket = new WebSocket(`${wsServidor}/socket`);

            socket.addEventListener("open", () => {
                socket.send(JSON.stringify({
                    operacion: "conectar",
                    datos: JSON.stringify({
                        idJuego: idSala,
                        idUsuario: idUsuario.value
                    })
                }));
            });

            socket.addEventListener("message", (ev) => {
                const datos = JSON.parse(ev.data);
                switch (datos.operacion) {
                    case "conexion_exitosa": {
                        estado.value = "conectado";
                        const jugadores = datos.jugadores;
                        jugadores.push({idUsuario, nombreUsuario})
                        usuarios.value = jugadores;
                        break;
                    }
                    case "usuario_conectado": {
                        const idUsuario = datos.idUsuario;
                        const nombreUsuario = datos.nombreUsuario;
                        usuarios.value.push({idUsuario, nombreUsuario});
                        break;
                    }
                    case "juego_iniciado": {
                        router.push(`/juego/${idSala}`);
                    }
                }
            });
        });

        onUnmounted(() => {
            socket.close();
        });

        const iniciarJuego = () => {
            socket.send(JSON.stringify({
                operacion: "iniciar",
                datos: JSON.stringify({
                    idJuego: idSala
                })
            }));
        };

        return {
            estado,
            usuarios,
            idSala,
            idUsuario,
            nombreUsuario,
            iniciarJuego
        }
    }
});

</script>

<style scoped lang="sass">



//
</style>
