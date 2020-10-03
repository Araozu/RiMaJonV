import {ref, computed, onMounted, onUnmounted} from "vue";

export const useDimensions = () => {
    const pH = ref(Math.floor(window.innerHeight / 100));
    const pW = ref(Math.floor(window.innerWidth / 100));
    const phx = computed(() => pH.value + "px");
    const pwx = computed(() => pW.value + "px");

    const listener = () => {
        pH.value = Math.floor(window.innerHeight / 100);
        pW.value = Math.floor(window.innerWidth / 100);
    };

    onMounted(() => {
        window.addEventListener("resize", listener);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", listener);
    });

    return {pH, pW, phx, pwx};
};
