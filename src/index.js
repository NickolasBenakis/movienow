import getNowPlayingMovies from './components/nowPlayingMovies/getNowPlayingMovies.js';
import ObserveElement from './utils/ObserveElement';
import createMovieList from './components/movieCard/movieList';
import './theme/index.scss';
import _ from 'lodash';
import { setState } from './utils/setState';
import cacheGenres from './utils/cacheGenres';
import { loadSpinner, removeSpinner } from './components/spinner/spinner';
import { getScrollTop } from './utils/documentData';
import getAllMovies from './components/searchMovies/getAllMovies';
import { lazyLoad } from './utils/lazyLoad';
import { showErrorTpl } from './utils/errorHandling';
export const state = {
    section: 'nowPlaying',
    elementObserved: false,
    input: '',
    lastList: false,
    onlinePage: 1,
    searchPage: 1,
    searchMoviesCache: [],
    onlineMoviesCache: [],
};

window.addEventListener('load', () => {
    cacheGenres();
    appRouter();
    window.addEventListener('scroll', _.throttle(infinityScrollCb), 5000, {
        passive: true,
    });
    window.removeEventListener('scroll', infinityScrollCb);
});
window.addEventListener('hashchange', () => {
    appRouter();
});

const nowPlayingMoviesLogic = async () => {
    loadSpinner();
    const results = await getNowPlayingMovies(state.onlinePage);
    removeSpinner();
    setState('onlineMoviesCache', results);
    const movieList = createMovieList(state.onlineMoviesCache, state.section);
    lazyLoad();

    const elementToObserve = document.getElementById(
        movieList[movieList.length - 1] &&
            movieList[movieList.length - 1].values[0] &&
            movieList[movieList.length - 1].values[0].toString()
    );
    ObserveElement(elementToObserve);
};

const searchMoviesLogic = async () => {
    if (state.input && state.input !== undefined) {
        loadSpinner();
        const results = await getAllMovies(state.input, state.searchPage);
        removeSpinner();
        if (results.length) {
            setState('searchMoviesCache', results);
            const movieList = createMovieList(
                state.searchMoviesCache,
                state.section
            );
            lazyLoad();

            const elementToObserve = document.getElementById(
                movieList[movieList.length - 1] &&
                    movieList[movieList.length - 1].values[0] &&
                    movieList[movieList.length - 1].values[0].toString()
            );
            ObserveElement(elementToObserve);
        } else if (!results.length && !state.searchMoviesCache.length) {
            showErrorTpl(results.length);
        }
    }
};

const applyColorToHeader = className => {
    const rootElement = document.querySelector('#header');
    const form = document.querySelector('.mdl-js-textfield');
    if (getScrollTop() === 0) {
        if (rootElement.classList.contains(className))
            rootElement.classList.remove(className);
        if (form.classList.contains('md-light')) form.classList.add('md-cyan');
        form.classList.remove('md-light');
    } else if (getScrollTop() > 15) {
        rootElement.classList.add(className);
        form.classList.remove('md-cyan');
        form.classList.add('md-light');
    }
};

const appRouter = async () => {
    state.section = location.hash.slice(1) || '/';
    const sections = document.querySelectorAll('section');
    const form = document.querySelector('.search-form');
    if (form.classList.contains('is-form-visible')) {
        form.classList.remove('is-form-visible');
    }
    sections.forEach(section => {
        section.style.display = 'none';
    });

    switch (state.section) {
        case 'nowPlaying':
            document.getElementById(state.section).style.display = 'flex';
            await nowPlayingMoviesLogic();
            break;
        case 'search':
            document.getElementById(state.section).style.display = 'flex';
            const input = document.getElementById('searchBar');
            form.classList.add('is-form-visible');
            input.addEventListener(
                'keyup',
                _.debounce(async () => {
                    const inputValue = input.value && input.value.toLowerCase();
                    if (inputValue !== state.input) {
                        document.getElementById('search').style.display =
                            'none';
                        state.searchPage = 1;
                        state.searchMoviesCache = [];
                    }
                    document.getElementById('search').style.display = 'flex';
                    state.input = inputValue;
                    await searchMoviesLogic();
                }, 2000)
            );
            break;
        default:
            window.location.hash = '#nowPlaying';
            break;
    }
};

const infinityScrollCb = async () => {
    applyColorToHeader('colorfull');
    if (state.elementObserved) {
        state.elementObserved = false;
        switch (state.section) {
            case 'nowPlaying':
                state.onlinePage++;
                await nowPlayingMoviesLogic();
                break;
            case 'search':
                state.searchPage++;
                await searchMoviesLogic();
                break;
            default:
        }
    }
};
