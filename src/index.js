import getNowPlayingMovies from './components/nowPlayingMovies/getNowPlayingMovies.js';
import ObserveElement from './utils/ObserveElement';
import createMovieList from './components/movieCard/movieList';
import './theme/index.scss';
import _ from 'lodash';
import { setState } from './utils/setState';
import cacheGenres from './utils/cacheGenres';
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
        cacheGenres();
        nowPlayingMoviesLogic();
    }
});

const nowPlayingMoviesLogic = async () => {
    const results = await getNowPlayingMovies(
        state.onlinePage,
        state.showingNowPlaying
    );
    setState('onlineMoviesCache', results);
    const movieList = createMovieList(
        state.onlineMoviesCache,
        state.showingNowPlaying
    );
    const elementToObserve = document.getElementById(
        movieList[movieList.length - 2] &&
            movieList[movieList.length - 2].values[0] &&
            movieList[movieList.length - 2].values[0].toString()
    );
    console.log(elementToObserve);
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
