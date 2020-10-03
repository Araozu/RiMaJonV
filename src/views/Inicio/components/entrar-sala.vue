<template lang="pug">
div
    p Entrar a una sala:
    form(@submit.prevent="ingresar")
        input(type="text" name="id_sala" placeholder="Codigo de sala" v-model="codigoSala")
        input(type="submit" value="Entrar!")

//
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import { servidorF } from "@/variables";

export default defineComponent({
    name: "entrar-sala",
    setup() {
        const store = useStore();
        const router = useRouter();

        const codigoSala = ref("");

        const ingresar = async () => {
            const request = await fetch(`${servidorF}/partida-join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: codigoSala.value})
            });

            if (request.ok) {
                const data = await request.json();
                if (data.ok) {
                    router.push(`/sala/${codigoSala.value}`);
                }
            } else {
                console.error(request);
            }
        };

        return {
            codigoSala,
            ingresar
        }
    }
});

</script>

<style scoped lang="sass">


//
</style>
