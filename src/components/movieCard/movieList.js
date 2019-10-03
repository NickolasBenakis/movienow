import movieCard from './movieCard.js';
import fetchPosterImage from '../../api/fetchPosterImage';

export default (movies, nowPlayingMoviesState) => {
    let rootElement;
    nowPlayingMoviesState
        ? (rootElement = document.getElementById('nowPlaying'))
        : (rootElement = document.getElementById('searchMovies'));

    movies.forEach(movie => {
        const child = movieCard(
            fetchPosterImage(movie.poster_path),
            movie.title,
            movie.id
        );

        rootElement.appendChild(child);
    });
};
