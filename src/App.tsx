import { Component, createEffect, createResource } from 'solid-js';
import { Routes, Route, Link } from 'solid-app-router';
import TodoList from './pages/TodoList';
import Joke from './pages/Joke';
import { setUser } from './stores/user.store';
import { db } from './api/db';
import axios, { AxiosResponse } from 'axios';

function fetchData(apiUrl: string) {
    if (!apiUrl) return;
    return axios
        .get(apiUrl)
        .then((res) => {
            return res;
        })
        .catch((err) => err);
}

const pageTitle = 'PM-Master 2000';

const App: Component = () => {
    const [apiRes] = createResource(db[0].url, fetchData);

    createEffect(() => {
        if (!apiRes()) return;
        if (apiRes().name === 'AxiosError') {
            console.error('Error while fetching user data.');
            return;
        }
        const { config, data }: AxiosResponse = apiRes()!;
        console.log(data);
        setUser({ name: data[0].name });
    });

    return (
        <div class='prose m-2'>
            <div class='navbar bg-base-300'>
                <div class='navbar-start'>
                    {/* Drop down on narrow screen */}
                    <div class='dropdown'>
                        <label tabindex='0' class='btn btn-ghost lg:hidden'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                class='h-5 w-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='M4 6h16M4 12h8m-8 6h16'
                                />
                            </svg>
                        </label>
                        <ul
                            tabindex='0'
                            class='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <a>
                                    <Link href='/'>Home</Link>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <Link href='/todo'>To do</Link>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <a class='btn btn-ghost normal-case text-xl'>{pageTitle}</a>
                </div>
                <div class='navbar-center hidden lg:flex'>
                    <ul class='menu menu-horizontal p-0'>
                        <li>
                            <a>
                                <Link href='/'>Home</Link>
                            </a>
                        </li>
                        <li>
                            <a>
                                <Link href='/todo'>To do</Link>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class='navbar-end'>
                    <div class='dropdown dropdown-end'>
                        <label
                            tabindex='0'
                            class='btn btn-ghost btn-circle avatar'
                        >
                            <div class='w-10 rounded-full'>
                                <img src='https://placeimg.com/80/80/people' />
                            </div>
                        </label>
                        <ul
                            tabindex='0'
                            class='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <a class='justify-between'>
                                    Profile
                                    <span class='badge'>New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Routes>
                <Route path='/' element={<Joke />} />
                <Route path='/todo' element={<TodoList />} />
            </Routes>
        </div>
    );
};

export default App;
