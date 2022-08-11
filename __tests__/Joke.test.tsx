import { describe, it, expect } from 'vitest';
import { fireEvent, render } from 'solid-testing-library';
import Joke from '../src/pages/Joke';

describe('Joke Page', () => {
    it('renders', () => {
        const { getByText, unmount } = render(() => <Joke />);
        // expect(getByText('Category:')).toBeInTheDocument();
        unmount(); 1
    });

    // it('Gimme More Btn changes joke text', async () => {
    //     const { getByTestId, unmount } = render(() => <Joke />);
    //     const btn = getByTestId('btn-fetch-new');
    //     const textJoke = getByTestId('text-joke');
    // expect(btn).toBeInTheDocument();
    // expect(btn).toHaveTextContent('Gimme more');
    // fireEvent.click(btn);
    // expect(textJoke).toHaveTextContent('tested');
    //     unmount();
    // });
});