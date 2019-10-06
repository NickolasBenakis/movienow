import movieCard from './movieCard.js';
import { VirtualList } from '../../vendor/vlist.js';
import { html, render } from 'lit-html';

export default (movies, nowPlayingMoviesState) => {
    let rootElement;
    nowPlayingMoviesState
        ? (rootElement = document.getElementById('nowPlaying'))
        : (rootElement = document.getElementById('searchMovies'));

    const moviesArray = movies.map(movie => {
        const child = movieCard(movie.poster_path, movie.title, movie.id);
        return child;
        //render(child, rootElement);
        //rootElement.appendChild(child);
        //return child;
    });
    render(moviesArray, rootElement);
    return moviesArray;
};
