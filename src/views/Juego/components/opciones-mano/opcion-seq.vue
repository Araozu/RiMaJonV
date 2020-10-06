<template lang="pug">
div.opcion-mano(v-if="haySeq" :style="{backgroundColor: '#009688'}")
    | Seq

//
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "opcion-seq"
});

</script>

<style scoped lang="sass">



//
</style>
