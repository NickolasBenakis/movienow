import movieCard from './movieCard.js';
import fetchPosterImage from '../../api/fetchPosterImage';

export default (movies) => {
    const el = document.getElementById('movies');
    movies.forEach(movie => {
        //const child = document.createElement('div')
        const child = movieCard(fetchPosterImage(movie.poster_path), movie.title, movie.id)

        el.appendChild(child)
    })

};