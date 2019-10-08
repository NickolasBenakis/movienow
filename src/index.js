import getNowPlayingMovies from './components/nowPlayingMovies/getNowPlayingMovies.js';
import ObserveElement from './utils/ObserveElement';
import createMovieList from './components/movieCard/movieList';
import './theme/index.scss';
import _ from 'lodash';
import { setState } from './utils/setState';
import cacheGenres from './utils/cacheGenres';
import appRouting from './components/appRouting.js';
import {loadSpinner, removeSpinner} from './components/spinner/spinner'
import { getScrollTop, getDocumentHeight} from './utils/documentData';
export const state = {
    section: 'nowPlaying',
    elementObserved: false,
    searchInput: '',
    onlinePage: 1,
    searchPage: 1,
    searchMoviesCache: [],
    onlineMoviesCache: [],
};

window.addEventListener('load', () => {
    cacheGenres();
    appRouter();
});
window.addEventListener('hashchange',()=>{
    appRouter();
});

const nowPlayingMoviesLogic = async () => {
    loadSpinner();
    const results = await getNowPlayingMovies(
        state.onlinePage
    );
    removeSpinner();
    setState('onlineMoviesCache', results);
    const movieList = createMovieList(
        state.onlineMoviesCache,
        state.section
    );
    const elementToObserve = document.getElementById(
        movieList[movieList.length - 4] &&
            movieList[movieList.length - 4].values[0] &&
            movieList[movieList.length - 4].values[0].toString()
    );
    ObserveElement(elementToObserve);
    window.addEventListener(
        'scroll',
        _.throttle(() => {
            applyColorToHeader('colorfull');
            if (state.elementObserved) {
                state.onlinePage++;
                state.elementObserved = false;
                nowPlayingMoviesLogic();
            }
        }),
        5000
    );
};

const applyColorToHeader = className => {
    const rootElement = document.querySelector('#header');
    const sectionElement = document.querySelector('#main-content');
    if (sectionElement.scrollTop === 0) {
        if (rootElement.classList.contains(className))
            rootElement.classList.remove(className);
    } else if (sectionElement.scrollTop > 15) {
        rootElement.classList.add(className);
    }
};


const appRouter = async ()=> {
    state.section = location.hash.slice(1)  || '/';
    console.log(location.hash.slice(1))
    const sections = document.querySelectorAll('section');
    sections.forEach(section =>{
        section.style.display = 'none';
    })

    switch(state.section) {
        case 'nowPlaying':
            document.getElementById(state.section).style.display = "flex";
            await nowPlayingMoviesLogic();
            break;
        case 'search':
            document.getElementById(state.section).style.display = "flex";
            break;
        default:
            window.location.hash = "#nowPlaying"
            break;
    }
}