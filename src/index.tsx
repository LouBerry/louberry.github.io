import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';
import App from './App';

import 'tailwindcss/tailwind.css';
import './index.css';

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('root')!
);
