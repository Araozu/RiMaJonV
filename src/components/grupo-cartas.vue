<template lang="pug">
carta(v-for="(c, i) in cartas" :valor="c" :resaltarCarta="false" :key="i")

//
</template>

<script lang="ts">
import {defineComponent} from "vue";
import carta from "@/components/carta.vue";

export default defineComponent({
    name: "grupo-cartas",
    components: {carta},
    props: {
        cartas: Array
    }
});

</script>
