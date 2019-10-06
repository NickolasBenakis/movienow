import fetchNowPlayingMovies from '../../api/fetchNowPlayingMovies';
import createMovieList from '../movieCard/movieList';
import infinityScroller from '../../utils/ObserveElement';

export default async (pageNumber, nowPlayingMoviesState) => {
    try {
        const { results } = await fetchNowPlayingMovies(pageNumber);
        return results;
    } catch (error) {
        console.log(error);
        alert('Sorry there was an error Please reload', error);
    }
};
