import { createStore } from "solid-js/store";

export const [state, setState] = createStore({
    apiUsed: '',
    lastJoke: '',
})