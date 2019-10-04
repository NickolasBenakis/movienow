import getNowPlayingMovies from './components/nowPlayingMovies/getNowPlayingMovies.js';
import infinityScroll from './utils/infinityScroll';
import createMovieList from './components/movieCard/movieList';
import './theme/index.scss';
import _ from 'lodash';

export const state = {
    showingNowPlaying: true,
    elementObserved: false,
    searchInput: '',
    page: 1,
    resultsCache: {},
};

window.addEventListener('load', async () => {
    if (state.showingNowPlaying) {
        nowPlayingMoviesLogic();
    }
});

const nowPlayingMoviesLogic = async () => {
    const movies = await getNowPlayingMovies(
        state.page,
        state.showingNowPlaying
    );
    const sortedArray = movies.results.sort(
        (a, b) => b.popularity - a.popularity
    );
    const movieList = createMovieList(sortedArray, state.showingNowPlaying);
    const elementToObserveId = movieList[movieList.length - 2].id.toString();
    const elementToObserve = document.getElementById(elementToObserveId);

    infinityScroll(elementToObserve);
    window.addEventListener(
        'scroll',
        _.throttle(async () => {
            if (state.elementObserved) {
                state.page++;
                state.elementObserved = false;
                await nowPlayingMoviesLogic();
            }
        }),
        5000
    );
};
