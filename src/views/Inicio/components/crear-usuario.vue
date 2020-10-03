<template lang="pug">
div
    h2 Coloca un nombre para empezar:
    form(@submit.prevent="registrar")
        input(type="text" name="nombre_usuario" placeholder="Nombre" v-model="nombreUsuario")
        input(type="submit" value="Registrar")

//
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import { servidorF } from "@/variables";
import {useStore} from "vuex";

export default defineComponent({
    name: "crear-usuario",
    setup() {
        const nombreUsuario = ref("");
        const store = useStore();

        const registrar = async () => {
            try {
                const peticion = await fetch(`${servidorF}/usuario/crear`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombreUsuario: nombreUsuario.value
                    })
                });

                if (peticion.ok) {
                    const {id} = await peticion.json();
                    store.commit("setIdUsuario", id);
                    store.commit("setNombreUsuario", nombreUsuario.value);
                } else {
                    console.error("D:");
                    console.error(peticion);
                }

            } catch (e) {
                console.error("D:");
                console.error(e);
            }
        };

        return {
            nombreUsuario,
            registrar
        }
    }
});

</script>

<style scoped lang="sass">



//
</style>
