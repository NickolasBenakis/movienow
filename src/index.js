import getNowPlayingMovies from './components/nowPlayingMovies/getNowPlayingMovies.js';
import ObserveElement from './utils/ObserveElement';
import createMovieList from './components/movieCard/movieList';
import './theme/index.scss';
import _ from 'lodash';
import { setState } from './utils/setState';
export const state = {
    showingNowPlaying: true,
    elementObserved: false,
    searchInput: '',
    onlinePage: 1,
    searchPage: 1,
    searchMoviesCache: [],
    onlineMoviesCache: [],
};

window.addEventListener('load', async () => {
    if (state.showingNowPlaying) {
        nowPlayingMoviesLogic();
    }
});

const nowPlayingMoviesLogic = async () => {
    const results = await getNowPlayingMovies(
        state.onlinePage,
        state.showingNowPlaying
    );
    setState('onlineMoviesCache', results);
    const movieList = createMovieList(results, state.showingNowPlaying);
    const elementToObserve = document.getElementById(
        movieList[movieList.length - 2] &&
            movieList[movieList.length - 2].id &&
            movieList[movieList.length - 2].id.toString()
    );
    ObserveElement(elementToObserve);
    window.addEventListener(
        'scroll',
        _.debounce(async () => {
            if (state.elementObserved) {
                state.onlinePage++;
                state.elementObserved = false;
                await nowPlayingMoviesLogic();
            }
        }),
        5000
    );
};
