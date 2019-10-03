import movieCard from './movieCard.js';
import fetchPosterImage from '../../api/fetchPosterImage';

export default (movies) => {

    movies.map(movie => {
        return movieCard(fetchPosterImage(movie.poster_path), movie.title, movie.movieId)
    })
};