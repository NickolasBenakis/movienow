import movieCard from './movieCard.js';
import { VirtualList } from '../../vendor/vlist.js';

export default (movies, nowPlayingMoviesState) => {
    let rootElement;
    nowPlayingMoviesState
        ? (rootElement = document.getElementById('nowPlaying'))
        : (rootElement = document.getElementById('searchMovies'));

    const moviesArray = movies.map(movie => {
        const child = movieCard(movie.poster_path, movie.title, movie.id);
        rootElement.appendChild(child);
        return child;
    });
    return moviesArray;
};
