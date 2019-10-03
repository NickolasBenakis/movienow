import fetchNowPlayingMovies from '../../api/fetchNowPlayingMovies';
import movieList from '../movieCard/movieList';

export default async (pageNumber) => {

    try {
        const movies = await fetchNowPlayingMovies(pageNumber);
        movieList(movies.results);
    } catch (error) {
        console.log(error)
        alert('Sorry there was an error Please reload', error);
    }
}