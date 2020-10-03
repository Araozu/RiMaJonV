<template lang="pug">
div
    p Crear una sala:
    form(@submit.prevent="crearSala")
        input(type="submit" value="Crear!")

    div(v-if="estado === 'creando'") Creando la sala...
    div(v-if="estado === 'error'") Hubo un error al crear la sala
    div(v-if="estado === 'listo'") La sala ha sido creada.

//
</template>

<script lang="ts">
import {defineComponent, ref, computed} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { servidorF } from "@/variables";

export default defineComponent({
    name: "crear-sala",
    setup() {
        const router = useRouter();
        const store = useStore();

        const estado = ref("inactivo");

        const idUsuario = computed(() => store.state.idUsuario);

        const crearSala = async () => {
            estado.value = "creando";

            try {
                const url = `${servidorF}/partida`;
                const respuesta = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({idUsuario: idUsuario.value})
                });

                if (respuesta.ok) {
                    const {id} = await respuesta.json();
                    estado.value = "listo";
                    router.push(`/sala/${id}`);
                } else {
                    console.error(respuesta);
                    estado.value = "error";
                }
            } catch (e) {
                console.log(e);
                estado.value = "error";
            }

        };

        return {
            estado,
            crearSala
        }
    }
});

</script>

<style scoped lang="sass">


//
</style>
