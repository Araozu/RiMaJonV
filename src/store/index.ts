import { createStore } from 'vuex';
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export interface RiMaJonState {
    idUsuario: string | undefined,
    nombreUsuario: string | undefined,
    modoColor: string
}

export default createStore<RiMaJonState>({
    state: {
        idUsuario: undefined,
        nombreUsuario: undefined,
        modoColor: "auto"
    },
    mutations: {
        setIdUsuario(state, id) {
            state.idUsuario = id;
        },
        setNombreUsuario(state, nombre) {
            state.nombreUsuario = nombre;
        },
        setModoColor(state, modo) {
            state.modoColor = modo;
        }
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin]
});
