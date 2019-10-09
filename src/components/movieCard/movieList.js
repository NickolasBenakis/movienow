import movieCard from './movieCard.js';
import { html, render } from 'lit-html';
import dialogTemplate from '../dialog/dialog';

export default (movies, section) => {
    let rootElement;
    (section === 'nowPlaying')
        ? (rootElement = document.getElementById('nowPlaying'))
        : (rootElement = document.getElementById('search-list'));

    const moviesArray = movies.map(movie => {
        const child = movieCard(movie);
        return child;
    });
    // const dialogTpl = dialogTemplate();
    // render(dialogTpl, document.querySelector('#dialog-container'));
    render(moviesArray, rootElement);
    return moviesArray;
};
