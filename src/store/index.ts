import { createStore } from 'vuex';
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer(state: RiMaJonState) {
        const datos = Object.assign({}, state);
        delete datos.dora;
        delete datos.cartaResaltada;
        return datos;
    }
});

export interface RiMaJonState {
    idUsuario: string | undefined,
    nombreUsuario: string | undefined,
    modoColor: string,
    modoColorUsuario: string,
    dora: [Array<number>, Array<number>],
    cartaResaltada: number
}

export default createStore<RiMaJonState>({
    state: {
        idUsuario: undefined,
        nombreUsuario: undefined,
        modoColor: "auto",
        modoColorUsuario: "claro",
        dora: [[], []],
        cartaResaltada: -2
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
        },
        setModoColorUsuario(state, modo) {
            state.modoColorUsuario = modo;
        },
        agregarDora(state, dora) {
            state.dora.push(dora);
        },
        setDora(state, dora) {
            state.dora = dora;
        },
        setCartaResaltada(state, valor) {
            state.cartaResaltada = valor;
        }
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin]
});
