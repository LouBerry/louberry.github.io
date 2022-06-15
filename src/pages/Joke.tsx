import { Component, createEffect, createResource, createSignal, For, Suspense } from 'solid-js';
import axios, { AxiosResponse } from 'axios';

type ApiOrigin = {
    category: string;
    url: string;
}

const origins: Array<ApiOrigin> = [
    {
        category: 'Excuse',
        url: 'https://excuser.herokuapp.com/v1/excuse/office'
    },
    {
        category: 'Chuck Norris Joke',
        url: 'https://api.chucknorris.io/jokes/random'
    },
    {
        category: 'Useless Facts',
        url: 'https://uselessfacts.jsph.pl/random.json?language=en'
    }
]

function fetchData(apiUrl: string) {
    if (!apiUrl) return;
    return axios.get(apiUrl)
        .then(res => {
            return res;
        })
}

const Joke: Component = () => {

    const [api, setApi] = createSignal<string>('');
    const [joke, setJoke] = createSignal<string>('');

    const [apiRes, { refetch }] = createResource(api, fetchData);

    createEffect(() => {
        if (!apiRes()) return;
        const { config, data }: AxiosResponse = apiRes()!;
        if (config.url === origins[0].url) setJoke(data[0].excuse)
        if (config.url === origins[1].url) setJoke(data.value)
        if (config.url === origins[2].url) setJoke(data.text)
    })

    const handle = () => {
        refetch()
    }

    return (
        <div>
            <form>
                <label for="category">Choose category</label>
                <select name="category" id="category" onChange={(event) => {
                    event.preventDefault()
                    setApi(event.currentTarget.value as string)
                }}>
                    <option value="" disabled selected>Select your option</option>
                    <For each={origins}>
                        {(e: ApiOrigin) =>
                            <option value={e.url} >{e.category}</option>
                        }
                    </For>
                </select>
            </form>
            <Suspense fallback={<div>Loading...</div>}>
                <div>
                    {joke}
                </div>
            </Suspense>
            <button onclick={() => handle()}>Gimme more</button>
        </div>
    );
};

export default Joke;
