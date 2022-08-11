import {
    Component,
    createEffect,
    createResource,
    createSignal,
    For,
    Show,
    Suspense,
} from 'solid-js';
import axios, { AxiosResponse } from 'axios';
import { user } from '../stores/user.store';
import { setState, state } from '../stores/state.store';
import { ApiOrigin, origins } from '../api/origins';

function fetchData(apiUrl: string) {
    if (!apiUrl) return;
    return axios
        .get(apiUrl)
        .then((res) => {
            return res;
        })
        .catch((err) => err);
}

const Joke: Component = () => {
    const [api, setApi] = createSignal<string>(state.apiUsed);
    const [apiRes, { refetch }] = createResource(api, fetchData);

    createEffect(() => {
        if (!apiRes()) return;
        if (apiRes().name === 'AxiosError') {
            setState((olState) => ({ ...olState, lastJoke: apiRes().message }));
            return;
        }
        const { config, data }: AxiosResponse = apiRes()!;

        if (config.url === origins[0].url)
            setState((olState) => ({ ...olState, lastJoke: data[0].excuse }));
        if (config.url === origins[1].url)
            setState((olState) => ({ ...olState, lastJoke: data.value }));
        if (config.url === origins[2].url)
            setState((olState) => ({ ...olState, lastJoke: data.text }));
    });

    const handleApiSelection = (
        event: Event & {
            currentTarget: HTMLSelectElement;
            target: Element;
        }
    ) => {
        event.preventDefault();
        const selection = event.currentTarget.value;
        for (const origin of origins) {
            if (origin.category === selection) {
                setApi(origin.url);
                setState((state) => ({ ...state, apiUsed: origin.category }));
            }
        }
    };

    return (
        <div class='prose'>
            <h3>Hi {user.name}</h3>
            <div class='flex items-center'>
                <h4>How is your mood today? </h4>
                <label class='swap swap-flip text-2xl'>
                    <input type='checkbox' />
                    <div class='swap-on'>😈</div>
                    <div class='swap-off'>😇</div>
                </label>
            </div>
            <div>
                <h4>Up for some Joke?</h4>
                <h4>Category: {state.apiUsed}</h4>
            </div>
            <form class='flex'>
                <label for='category'>Choose category</label>
                <select
                    class='select select-bordered select-sm w-full max-w-xs'
                    name='category'
                    id='category'
                    onChange={(event) => handleApiSelection(event)}
                    value={state.apiUsed}
                >
                    <option value='' disabled selected>
                        Select your option
                    </option>
                    <For each={origins}>
                        {(e: ApiOrigin) => (
                            <option value={e.category}>{e.category}</option>
                        )}
                    </For>
                </select>
                <Show when={apiRes.loading}>
                    <div class='animate-spin '> 🤣 </div>
                </Show>
            </form>
            <Suspense fallback={<div>Loading...</div>}>
                <div data-testid='text-joke'>{state.lastJoke}</div>
            </Suspense>
            <button
                class='btn btn-primary'
                onclick={() => refetch()}
                data-testId='btn-fetch-new'
            >
                Gimme more
            </button>
        </div>
    );
};

export default Joke;
