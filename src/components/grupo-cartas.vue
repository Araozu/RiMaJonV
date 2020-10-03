<template lang="pug">
carta(v-for="(c, i) in cartas" :valor="c" :key="i")

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
