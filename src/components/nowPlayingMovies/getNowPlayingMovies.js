import fetchNowPlayingMovies from '../../api/fetchNowPlayingMovies';
import createMovieList from '../movieCard/movieList';
import infinityScroller from '../../utils/elementObserver';

export default async (pageNumber, nowPlayingMoviesState) => {
    try {
        const movies = await fetchNowPlayingMovies(pageNumber);
        return movies;
    } catch (error) {
        console.log(error);
        alert('Sorry there was an error Please reload', error);
    }
};
