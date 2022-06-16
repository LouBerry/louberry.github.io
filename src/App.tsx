import { Component } from 'solid-js';
import { createStore } from "solid-js/store";
import { Routes, Route, Link } from 'solid-app-router';
import TodoList from './pages/TodoList';
import Joke from './pages/Joke';

export const [state, setState] = createStore({
    name: "Lou",
    apiUsed: ''
})

const App: Component = () => {
    return (
        <div>
            <div>
                <h1>Solidus</h1>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/todo">To do</Link>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<Joke />} />
                <Route path="/todo" element={<TodoList />} />
            </Routes>
        </div>
    )

};

export default App;
