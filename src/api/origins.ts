export type ApiOrigin = {
    category: string;
    url: string;
}

export const origins: Array<ApiOrigin> = [
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
    },
]